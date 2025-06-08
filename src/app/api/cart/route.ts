import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = 1;
    const token = req.cookies.get("cartToken")?.value;

    if(!token){
        return NextResponse.json({ cartItems: [] });
    }

    const cart = await prisma.cart.findFirst({
      where: {
        OR: [
            {
                userId
            },
            {
                token
            }
        ]
      },
      include: {
        cartItems: {
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                productItem: {
                    include: {
                        product: true
                    }
                },
                ingredients: true,
            }
        }
      }
    });

      if (!cart) {
      return NextResponse.json({ cartItems: [] });
    }

    return NextResponse.json({ cartItems: cart.cartItems });
  } catch (err) {
    console.log(err);
  }
}
