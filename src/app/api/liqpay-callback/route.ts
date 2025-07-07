import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/prisma/prisma-client';
import { sendMail } from '@/src/lib';
import { CartItem } from '@/src/lib/mails/types';
import { generatePaymentSuccessEmail } from '@/src/lib/mails/generate-payment-success-email';

const LIQPAY_PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY!;

function validateSignature(data: string, signature: string): boolean {
  const sha1 = crypto.createHash('sha1');
  sha1.update(LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY);
  const expectedSignature = sha1.digest('base64');
  return signature === expectedSignature;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data = formData.get('data');
    const signature = formData.get('signature');

    if (typeof data !== 'string' || typeof signature !== 'string') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    if (!validateSignature(data, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const jsonData = JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));

    if (jsonData.status === 'success' && jsonData.order_id) {
      const orderId = Number(jsonData.order_id);

      // Обновляем статус заказа и получаем сам заказ
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: 'SUCCEEDED', paymentID: jsonData.payment_id },
      });

      // Парсим items из JSON
      const items = order.items as CartItem[];

      // Генерируем письмо
      const emailHtml = await generatePaymentSuccessEmail({
        fullName: order.fullName,
        items,
        totalAmount: order.totalAmount,
        address: order.address,
        orderId,
        paymentDate: new Date().toLocaleString('uk-UA'),
        paymentId: order.paymentID!,
      });

      // Отправляем письмо клиенту
      await sendMail({
        to: order.email,
        subject: 'Оплата подтверждена — Спасибо за заказ!',
        html: emailHtml,
      });

      console.log(`Order ${orderId} marked as SUCCEEDED and email sent`);
    }

    return NextResponse.json({ result: 'ok' });
  } catch (error) {
    console.error('LiqPay callback error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
