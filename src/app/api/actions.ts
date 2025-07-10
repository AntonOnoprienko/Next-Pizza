'use server';

import { prisma } from '@/prisma/prisma-client';
import type { CheckoutFormSchema } from '@/src/constants/schemas/checkout-form-schema';
import { getCartDetails, getMailDetails } from '@/src/lib';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';
import { checkoutFormSchema } from '@/src/constants/schemas/checkout-form-schema';
import { generateLiqPayData, generateLiqPaySignature } from '@/src/lib/liqpay';
import { sendEmail } from '@/src/lib/mails/send-email';
import { randomBytes } from 'crypto';

export async function createOrder(
  data: CheckoutFormSchema,
): Promise<string | undefined> {
  const parsed = checkoutFormSchema.safeParse(data);
  if (!parsed.success) {
    console.error('❌ Invalid checkout data:', parsed.error);
    throw new Error('Invalid checkout data');
  }

  const safeData = parsed.data;
  try {
    const cookiesStore = cookies();
    const cartToken = cookiesStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found!');
    }

    const userCart = await prisma.cart.findFirst({
      where: { token: cartToken },
      include: {
        cartItems: {
          orderBy: { createdAt: 'desc' },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            cartItemExcludedIngredients: {
              include: {
                ingredient: { select: { name: true } },
              },
            },
            cartItemExtraIngredients: {
              include: {
                ingredient: { select: { name: true, price: true } },
              },
            },
          },
        },
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!userCart) {
      throw new Error('Cart not found!');
    }

    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty!');
    }

    const cartData = getCartDetails(userCart);
    const orderToken = randomBytes(16).toString('hex');
    const [order] = await prisma.$transaction([
      prisma.order.create({
        data: {
          token: orderToken,
          fullName: `${safeData.firstName} ${safeData.lastName}`,
          email: safeData.email,
          phone: safeData.phone,
          address: `${safeData.city}, ${safeData.street}, ${safeData.house}`,
          comment: safeData.comment,
          totalAmount: cartData.totalAmount,
          status: OrderStatus.PENDING,
          items: JSON.stringify(cartData),
          ...(userCart.user?.id ? { userId: userCart.user.id } : {}),
        },
      }),

      prisma.cartItem.deleteMany({
        where: { cartId: userCart.id },
      }),

      prisma.cart.update({
        where: { id: userCart.id },
        data: { totalAmount: 0 },
      }),
    ]);

    const liqpayParams = {
      public_key: process.env.LIQPAY_PUBLIC_KEY!,
      action: 'pay',
      amount: cartData.totalAmount.toFixed(2),
      currency: 'UAH',
      description: `Оплата заказа №${order.id}`,
      order_id: order.id,
      version: '3',
      sandbox: '1',
      email: safeData.email,
      phone: safeData.phone,
      result_url: `${process.env.FRONTEND_URL}/checkout/paid?token=${orderToken}`,
      server_url: `${process.env.FRONTEND_URL}/api/payment/liqpay-callback`,
    };

    const data = generateLiqPayData(liqpayParams);
    const signature = generateLiqPaySignature(
      data,
      process.env.LIQPAY_PRIVATE_KEY!,
    );

    const baseUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
    const url = `${baseUrl}/checkout/liqpay-redirect?data=${encodeURIComponent(data)}&signature=${encodeURIComponent(signature)}`;

    const mailItems = getMailDetails(cartData.items);
    await sendEmail({
      type: 'order-confirmation',
      to: safeData.email,
      props: {
        fullName: `${safeData.firstName} ${safeData.lastName}`,
        address: `${safeData.city}, ${safeData.street}, ${safeData.house}`,
        items: mailItems,
        paymentUrl: url,
        totalAmount: cartData.totalAmount,
      },
    });

    return url;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
