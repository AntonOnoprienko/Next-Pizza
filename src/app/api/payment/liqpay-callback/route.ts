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

    console.log('📩 Получен callback от LiqPay:', { data, signature });

    if (typeof data !== 'string' || typeof signature !== 'string') {
      console.error('❌ Невалидный payload');
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    if (!validateSignature(data, signature)) {
      console.error('❌ Невалидная сигнатура');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const jsonData = JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));
    console.log('🧾 Декодированные данные из LiqPay:', jsonData);

    const isPaid =
      jsonData.status === 'success' || jsonData.status === 'sandbox';

    if (isPaid && jsonData.order_id) {
      const orderId = Number(jsonData.order_id);
      if (!orderId) {
        console.error('❌ Невалидный order_id');
        return NextResponse.json(
          { error: 'Invalid order_id' },
          { status: 400 },
        );
      }

      console.log(`📦 Обновляем заказ ${orderId}`);

      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: 'SUCCEEDED', paymentID: String(jsonData.payment_id) },
      });

      console.log(`✅ Заказ ${orderId} обновлён:`, order);

      if (typeof order.items !== 'string') {
        throw new Error('order.items is not a string');
      }

      const parsed = JSON.parse(order.items);
      const items = parsed.items as CartItem[];

      const emailHtml = await generatePaymentSuccessEmail({
        fullName: order.fullName,
        items,
        totalAmount: order.totalAmount,
        address: order.address,
        orderId,
        paymentDate: new Date().toLocaleString('uk-UA'),
        paymentId: order.paymentID!,
      });

      await sendMail({
        to: order.email,
        subject: 'Оплата подтверждена — Спасибо за заказ!',
        html: emailHtml,
      });

      console.log(`📨 Письмо отправлено клиенту: ${order.email}`);
    } else {
      console.warn('⚠️ Статус не "success" или нет order_id:', jsonData.status);
    }

    return NextResponse.json({ result: 'ok' });
  } catch (error) {
    console.error('🔥 LiqPay callback error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
