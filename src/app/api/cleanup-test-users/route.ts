import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";

// DELETE /api/cleanup-test-users
// Removes all non-admin distributor users so you can start fresh
export async function GET() {
  try {
    await connectToDatabase();

    const result = await User.deleteMany({ role: "distributor" });

    return NextResponse.json({
      message: `✅ تم حذف ${result.deletedCount} مستخدم تجريبي. يمكنك التسجيل من جديد الآن.`,
      deletedCount: result.deletedCount,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
