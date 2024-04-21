import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.tbl_user.findMany();
    return NextResponse.json({
      data: users,
      status: 200,
    });
  } catch (error) {
    console.log("error fetching users =>", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
