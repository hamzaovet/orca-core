"use server";

import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  company: string;
  password: string;
}

export async function registerDistributorAction(payload: RegisterPayload) {
  const { name, username, email, password, company } = payload;

  if (!name || !username || !password) {
    throw new Error("يرجى تعبئة جميع الحقول المطلوبة");
  }

  await connectToDatabase();

  const existingUser = await User.findOne({ username: username.trim().toLowerCase() });
  if (existingUser) {
    throw new Error("اسم المستخدم محجوز مسبقاً، الرجاء اختيار اسم آخر");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name: name.trim(),
    username: username.trim().toLowerCase(),
    email: email?.trim().toLowerCase(),
    password: hashedPassword,
    company: company?.trim(),
    role: "distributor",
    status: "Pending",
  });

  return { success: true };
}
