import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

async function GET(){
    const users = await prisma.user.findMany()

    return NextResponse.json(users)
}