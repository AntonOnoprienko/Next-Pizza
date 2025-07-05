'use server';

import { prisma } from '@/prisma/prisma-client';
import { CheckoutFormSchema } from '@/src/constants/schemas/checkout-form-schema';
import { OrderStatus } from '@prisma/client';

const cartToken = '123';
const userId = 1;

export async function createOrder(data: CheckoutFormSchema) {
  console.log(data);
  await prisma.order.create({
    data: {
      token: cartToken,
      fullName: data.firstName + ' ' + data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.city + ', ' + data.street + ', ' + data.house,
      comment: data.comment,
      totalAmount: 1500,
      status: OrderStatus.PENDING,
      items: [],
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
