import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const listKaryawan = await prisma.tbl_karyawan.findMany();
    return NextResponse.json(
      { message: "Success", data: listKaryawan, status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.log("error fetching users =>", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}

export async function POST(request) {
  const { Nama, Id_Jabatan, Status, Jumlah_Anak, Tunjangan_Anak } =
    await request.json();

  try {
    const karyawan = await prisma.tbl_karyawan.create({
      data: {
        Nama,
        Id_Jabatan,
        Status,
        Jumlah_Anak,
        Tunjangan_Anak,
      },
    });
    return NextResponse.json(
      { message: "Success", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.log("error fetching users =>", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}

export async function PUT(request) {
  const { id, Nama, Id_Jabatan, Status, Jumlah_Anak, Tunjangan_Anak } =
    await request.json();

  try {
    const updateKaryawan = await prisma.tbl_karyawan.update({
      where: { id },
      data: {
        Nama,
        Id_Jabatan,
        Status,
        Jumlah_Anak,
        Tunjangan_Anak,
      },
    });
    return NextResponse.json(
      { message: "Success", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.log("error fetching users =>", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}

export async function DELETE(request) {
  const { id } = await request.json();

  try {
    const deleteKaryawan = await prisma.tbl_karyawan.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "Success", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.log("error fetching users =>", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
