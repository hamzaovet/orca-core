"use server";

import connectToDatabase from "@/lib/mongodb";
import { License } from "@/models/License";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

function generateSerialKey() {
  const segment = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${segment()}-${segment()}-${segment()}-${segment()}`;
}

export async function generateLicenseAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const customerName = formData.get("customerName") as string;
  const softwareType = formData.get("softwareType") as string;

  if (!customerName || !softwareType) {
    throw new Error("Missing required fields");
  }

  await connectToDatabase();

  const serialKey = generateSerialKey();

  // Create new license in DB
  await License.create({
    customerName,
    softwareType,
    serialKey,
    generatedBy: session.user?.name || "Distributor",
  });

  // Revalidate the dashboard path to instantly update the table
  revalidatePath("/portal/dashboard");

  return { success: true, serialKey };
}
