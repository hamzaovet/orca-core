"use server";

import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function approveUserAction(userId: string) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await connectToDatabase();
  await User.findByIdAndUpdate(userId, { status: "Approved" });
  revalidatePath("/portal/admin");
}

export async function rejectUserAction(userId: string) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await connectToDatabase();
  await User.findByIdAndUpdate(userId, { status: "Rejected" });
  revalidatePath("/portal/admin");
}
