import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();

    const allUsers = await User.find({}).lean();
    const pendingUsers = await User.find({ status: "Pending" }).lean();

    return NextResponse.json({
      totalUsers: allUsers.length,
      pendingCount: pendingUsers.length,
      users: allUsers.map((u: any) => ({
        _id: u._id.toString(),
        username: u.username,
        name: u.name,
        status: u.status,
        role: u.role,
        createdAt: u.createdAt,
      })),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
