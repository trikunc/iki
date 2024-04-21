import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const nextIdQuery =
      await prisma.$queryRaw`SELECT CAST(MAX(id) + 1 AS UNSIGNED) AS next_id FROM tbl_karyawan;`;
    console.log("nextIdQuery => ", nextIdQuery[0].next_id);
    if (nextIdQuery[0].next_id === null) {
      return NextResponse.json({
        data: 1,
        status: 200,
      });
    }
    const nextId = parseInt(nextIdQuery[0].next_id);
    console.log("ID berikutnya yang akan digunakan adalah:", nextId);
    return NextResponse.json({
      data: nextId,
      status: 200,
    });
  } catch (error) {
    console.log("error fetching users =>", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
