import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const { Email, Password } = await request.json();

  try {
    const user = await prisma.tbl_user.findUnique({
      where: {
        Email,
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: "User and Password not match", status: 401 },
        { status: 401 }
      );
    }
    console.log("user => ", user);
    if (user.Password !== Password) {
      // console.log(user.Password, Password);
      return NextResponse.json(
        { message: "User and Password not match", status: 401 },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: "Authenticated", data: user, status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.log("error fetching users =>", error);
    return NextResponse.error("Internal Server Error", 500);
  }
  // return NextResponse.json({ id: 100, name: "Jay" });
}
