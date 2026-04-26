import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Check if maestro exists
    const maestroExists = await User.findOne({ username: "maestro" });
    if (maestroExists) {
      return NextResponse.json({ message: "The Godfather (maestro) already exists." }, { status: 400 });
    }
    
    // Create the Godfather admin account
    const hashedPassword = await bcrypt.hash("password123", 10);
    
    await User.create({
      name: "The Godfather",
      username: "maestro",
      password: hashedPassword,
      role: "admin",
      status: "Approved",
    });
    
    return NextResponse.json({ 
      message: "The Godfather admin created successfully!", 
      credentials: { username: "maestro", password: "password123" } 
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
