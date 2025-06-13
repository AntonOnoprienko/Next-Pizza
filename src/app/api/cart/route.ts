import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({totalAmount: 0, cartItems: [] });
    }

    const cart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        cartItems: {
          orderBy: { createdAt: "desc" },
          include: {
            productItem: {
              include: {
                product: true,
                extraIngredients: {
                  include: {
                    ingredient: true,
                  },
                },
              },
            },
            ingredients: true,
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ totalAmount: 0, cartItems: [] });
    }

    return NextResponse.json(cart);
  } catch (err) {
    console.log(err);
  }
}
