import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { CreateCartItemValues } from "@/src/services/dto/cart.dto";
import { findOrCreateCart, updateCartTotalAmount } from "@/src/lib";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, cartItems: [] });
    }

    const cart = await prisma.cart.findFirst({
      where: {
        OR: [{ token }],
      },
      include: {
        cartItems: {
          orderBy: { createdAt: "desc" },
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
    console.log("[CART_GET] Server Error", error);
    return NextResponse.json(
      { message: "Не удалось получить корзину" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;
    if (!token) {
      token = crypto.randomUUID();
    }
    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        cartItemExcludedIngredients: {
          every: {
            ingredientId: {
              in: data.excludedIngredients,
            },
          },
        },
        cartItemExtraIngredients: {
          every: {
            ingredientId: {
              in: data.extraIngredients,
            },
          },
        },
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    }

    const updatedCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.log("[CART_POST] Server Error", error);
    return NextResponse.json(
      { message: "Не удалось создать корзину" },
      { status: 500 }
    );
  }
}
