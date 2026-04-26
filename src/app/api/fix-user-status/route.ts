import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();

    // Fix all users missing the status field
    const fixDistributors = await User.updateMany(
      { role: "distributor", status: { $exists: false } },
      { $set: { status: "Pending" } }
    );

    const fixAdmins = await User.updateMany(
      { role: "admin", status: { $exists: false } },
      { $set: { status: "Approved" } }
    );

    // Show current state
    const allUsers = await User.find({}).lean();

    return NextResponse.json({
      fixed: {
        distributors: fixDistributors.modifiedCount,
        admins: fixAdmins.modifiedCount,
      },
      currentState: allUsers.map((u: any) => ({
        username: u.username,
        role: u.role,
        status: u.status ?? "⚠️ MISSING",
      })),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
