import connectToDatabase from "@/lib/mongodb";
import { License } from "@/models/License";
import DashboardClient, { ILicenseData } from "./DashboardClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/portal");
  }

  await connectToDatabase();
  
  const rawLicenses = await License.find({}).sort({ createdAt: -1 }).limit(50).lean();
  
  const initialLicenses: ILicenseData[] = rawLicenses.map((doc: any) => ({
    _id: doc._id.toString(),
    customerName: doc.customerName,
    softwareType: doc.softwareType,
    serialKey: doc.serialKey,
    createdAt: doc.createdAt.toISOString(),
  }));

  return <DashboardClient initialLicenses={initialLicenses} username={session.user?.name || "Distributor"} />;
}
