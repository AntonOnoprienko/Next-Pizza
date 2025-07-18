import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/prisma/prisma-client';
import { CartItemWithIngredients } from '@/src/lib/mails/types';
import { sendEmail } from '@/src/lib/mails/send-email';
import { mapLiqpayStatus } from '@/src/constants/order-status-liqpay';

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

    const orderStatus = mapLiqpayStatus(jsonData.status);

    if (jsonData.order_id && orderStatus) {
      const orderToken = jsonData.order_id;

      if (typeof orderToken !== 'string') {
        console.error('❌ Невалидный order_token');
        return NextResponse.json(
          { error: 'Invalid order_token' },
          { status: 400 },
        );
      }

      const order = await prisma.order
        .update({
          where: { token: orderToken },
          data: { status: orderStatus, paymentID: String(jsonData.payment_id) },
        })
        .catch(() => null);

      if (!order) {
        console.error(
          `❌ Заказ с токеном ${orderToken} не найден или не обновлен`,
        );
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      console.log(`✅ Заказ ${orderToken} обновлён:`, order);

      if (typeof order.items !== 'string') {
        throw new Error('order.items is not a string');
      }

      const parsed = JSON.parse(order.items);
      const items = parsed.items as CartItemWithIngredients[];

      await sendEmail({
        type: 'payment-success',
        to: order.email,
        props: {
          fullName: order.fullName,
          items,
          totalAmount: order.totalAmount,
          address: order.address,
          orderId: orderToken,
          paymentDate: new Date().toLocaleString('uk-UA'),
          paymentId: order.paymentID!,
        },
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
