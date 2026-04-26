import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

// Note: In production, you would want to remove this or secure it with an env variable
export async function GET() {
  try {
    await connectToDatabase();
    
    // Check if any user exists
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return NextResponse.json({ message: "Admin already exists. Setup ignored." }, { status: 400 });
    }
    
    // Create the master admin account
    const hashedPassword = await bcrypt.hash("password123", 10);
    
    await User.create({
      username: "admin",
      password: hashedPassword,
      role: "admin",
    });
    
    return NextResponse.json({ message: "Master admin created successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
