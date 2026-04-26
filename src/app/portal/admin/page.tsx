import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";
import { License } from "@/models/License";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/portal");
  }

  await connectToDatabase();

  const [pendingUsers, approvedUsers, allLicenses] = await Promise.all([
    User.find({ status: "Pending" }).sort({ createdAt: -1 }).lean(),
    User.find({ role: "distributor", status: "Approved" }).sort({ createdAt: -1 }).lean(),
    License.find({}).sort({ createdAt: -1 }).lean(),
  ]);

  const serializeUser = (user: any) => ({
    _id: user._id.toString(),
    name: user.name || "-",
    username: user.username,
    email: user.email || "-",
    company: user.company || "-",
    createdAt: user.createdAt.toISOString(),
  });

  const serializedLicenses = allLicenses.map((doc: any) => ({
    _id: doc._id.toString(),
    customerName: doc.customerName,
    softwareType: doc.softwareType,
    serialKey: doc.serialKey,
    generatedBy: doc.generatedBy,
    createdAt: doc.createdAt.toISOString(),
  }));

  return (
    <AdminDashboardClient
      pendingUsers={pendingUsers.map(serializeUser)}
      approvedUsers={approvedUsers.map(serializeUser)}
      allLicenses={serializedLicenses}
      adminName={session.user.name || "Maestro"}
    />
  );
}
