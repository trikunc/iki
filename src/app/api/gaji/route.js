import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const {
    Tanggal,
    Id_Karyawan,
    BPJS,
    PPh,
    Total_Pendapatan,
    Total_Potongan,
    Gaji_Bersih,
    Id_User,
  } = await request.json();

  try {
    const gaji = await prisma.tbl_gaji.create({
      data: {
        Tanggal,
        Id_Karyawan,
        BPJS,
        PPh,
        Total_Pendapatan,
        Total_Potongan,
        Gaji_Bersih,
        Id_User,
      },
    });
    return NextResponse.json(
      { message: "Success", data: gaji, status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.log("error fetching users =>", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
