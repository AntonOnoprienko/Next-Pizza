import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/src/lib";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Токен не найден" }, { status: 401 });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ message: "Товар не найден" }, { status: 404 });
    }

    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: data.quantity,
      },
    });

    const updatedCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.log("[CART_PATCH] Server Error", error);
    return NextResponse.json(
      { message: "Не удалось обновить корзину" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Токен не найден" }, { status: 401 });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ message: "Товар не найден" }, { status: 404 });
    }

    await prisma.cartItem.update({
      where: { id },
      data: {
        cartItemExcludedIngredients: { deleteMany: {} },
        cartItemExtraIngredients: { deleteMany: {} },
      },
    });

    await prisma.cartItem.delete({
      where: { id },
    });

    console.time("cart-recalc");
    const updatedCart = await updateCartTotalAmount(token);
    console.timeEnd("cart-recalc");

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.log("[CART_DELETE] Server Error", error);
    return NextResponse.json(
      { message: "Не удалось удалить товар" },
      { status: 500 }
    );
  }
}
