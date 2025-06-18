import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";


export async function GET() {
  const ingredients = await prisma.ingredient.findMany({
    select: {
      id: true,
      name: true,
    },
  });

    return new NextResponse(JSON.stringify(ingredients), {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });

}