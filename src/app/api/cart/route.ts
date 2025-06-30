import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { CreateCartItemValues } from '@/src/services/dto/cart.dto';
import {
  findOrCreateCart,
  generateCustomizationHash,
  updateCartTotalAmount,
} from '@/src/lib';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, cartItems: [] });
    }

    const cart = await prisma.cart.findFirst({
      where: {
        OR: [{ token }],
      },
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
                ingredient: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            cartItemExtraIngredients: {
              include: {
                ingredient: {
                  select: {
                    name: true,
                    price: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ totalAmount: 0, cartItems: [] });
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.log('[CART_GET] Server Error', error);

    return NextResponse.json(
      { message: 'Не удалось получить корзину' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const data = (await req.json()) as CreateCartItemValues;

    if (
      !data.productItemId ||
      typeof data.productItemId !== 'number' ||
      (data.excludedIngredients && !Array.isArray(data.excludedIngredients)) ||
      (data.extraIngredients && !Array.isArray(data.extraIngredients))
    ) {
      return NextResponse.json(
        { message: 'Невалидные данные' },
        { status: 400 },
      );
    }

    const productItemExists = await prisma.productItem.findUnique({
      where: { id: data.productItemId },
    });

    if (!productItemExists) {
      return NextResponse.json({ message: 'Товар не найден' }, { status: 404 });
    }

    const userCart = await findOrCreateCart(token);

    const customizationHash = generateCustomizationHash(data);

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        customizationHash,
      },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + 1,
        },
      });
    } else {
      const excluded =
        data.excludedIngredients?.map((id) => ({ ingredientId: id })) ?? [];
      const extra =
        data.extraIngredients?.map((id) => ({ ingredientId: id })) ?? [];

      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          customizationHash,
          cartItemExcludedIngredients: { create: excluded },
          cartItemExtraIngredients: { create: extra },
        },
      });
    }

    const updatedCart = await updateCartTotalAmount(token);

    const response = NextResponse.json(updatedCart);

    response.cookies.set('cartToken', token);

    return response;
  } catch (error) {
    console.log('[CART_POST_HASH] Server Error', error);

    return NextResponse.json(
      { message: 'Не удалось обновить корзину' },
      { status: 500 },
    );
  }
}
