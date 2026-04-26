import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectToDatabase();

    // Guard: Check if maestro already exists
    const existing = await User.findOne({ username: "maestro" });
    if (existing) {
      return NextResponse.json(
        { message: "Godfather already exists in the system." },
        { status: 200 }
      );
    }

    // Inject the Godfather master account
    const hashedPassword = await bcrypt.hash("admin123456", 12);

    await User.create({
      name: "The Godfather",
      username: "maestro",
      password: hashedPassword,
      role: "admin",
      status: "Approved",
    });

    return NextResponse.json(
      { message: "Godfather account successfully injected into the database." },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[godfather-setup]", error);
    return NextResponse.json(
      { message: "Internal server error.", error: error.message },
      { status: 500 }
    );
  }
}
