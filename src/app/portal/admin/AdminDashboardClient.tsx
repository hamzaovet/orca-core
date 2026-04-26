"use client";

import { motion } from "framer-motion";
import { LogOut, ShieldAlert, CheckCircle, XCircle, Database, UserPlus, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useTransition } from "react";
import { approveUserAction, rejectUserAction } from "./actions";

interface UserRow {
  _id: string;
  name: string;
  username: string;
  email: string;
  company: string;
  createdAt: string;
}

export default function AdminDashboardClient({
  pendingUsers,
  approvedUsers,
  allLicenses,
  adminName,
}: {
  pendingUsers: UserRow[];
  approvedUsers: UserRow[];
  allLicenses: any[];
  adminName: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleApprove = (userId: string) => {
    startTransition(async () => {
      await approveUserAction(userId);
    });
  };

  const handleReject = (userId: string) => {
    if (confirm("هل أنت متأكد من رفض هذا الطلب؟")) {
      startTransition(async () => {
        await rejectUserAction(userId);
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 bg-red-950/20 backdrop-blur-xl border-b border-red-500/20">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="relative group flex items-center">
              <Image
                src="/assets/nexara_logo.png"
                alt="Nexara Logo"
                width={120}
                height={32}
                priority
                style={{ width: 'auto', height: 'auto' }}
                className="object-contain drop-shadow-md opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <div className="h-6 w-px bg-white/10 hidden md:block" />
            <h1 className="text-lg font-bold tracking-wide hidden md:block text-red-400 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 inline ml-2" />
              غرفة التحكم الإدارية
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-300">المايسترو: {adminName}</span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/portal" })}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <span>تسجيل خروج</span>
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 space-y-14">

        {/* ── Section A: Pending Requests ───────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400">
                <UserPlus className="w-5 h-5" />
              </span>
              طلبات الانضمام قيد الانتظار
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm border ${pendingUsers.length > 0 ? "bg-orange-500/10 border-orange-500/20 text-orange-400" : "bg-white/5 border-white/10 text-gray-500"}`}>
              {pendingUsers.length} طلب
            </span>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">الاسم</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">الشركة / المحل</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">اسم المستخدم</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">البريد</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">تاريخ الطلب</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400 text-center">إجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pendingUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-200">{user.name}</td>
                      <td className="py-4 px-6 text-gray-400">{user.company}</td>
                      <td className="py-4 px-6 text-cyan-400 font-mono text-sm" dir="ltr">{user.username}</td>
                      <td className="py-4 px-6 text-gray-500 text-sm" dir="ltr">{user.email}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleApprove(user._id)}
                            disabled={isPending}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-500 hover:text-white hover:border-transparent transition-all duration-300 disabled:opacity-40"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>موافقة</span>
                          </button>
                          <button
                            onClick={() => handleReject(user._id)}
                            disabled={isPending}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-600 hover:text-white hover:border-transparent transition-all duration-300 disabled:opacity-40"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>رفض</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {pendingUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-14 text-center">
                        <div className="flex flex-col items-center gap-3 text-gray-600">
                          <UserPlus className="w-10 h-10 opacity-30" />
                          <span className="text-sm">لا توجد طلبات معلقة حالياً</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* ── Section B: Approved Distributors ─────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Users className="w-5 h-5" />
              </span>
              الموزعون النشطون
            </h2>
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-sm">
              {approvedUsers.length} موزع
            </span>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">الاسم</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">الشركة / المحل</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">اسم المستخدم</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">البريد</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">تاريخ الانضمام</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400 text-center">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {approvedUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-200">{user.name}</td>
                      <td className="py-4 px-6 text-gray-400">{user.company}</td>
                      <td className="py-4 px-6 text-cyan-400 font-mono text-sm" dir="ltr">{user.username}</td>
                      <td className="py-4 px-6 text-gray-500 text-sm" dir="ltr">{user.email}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          مفعّل
                        </span>
                      </td>
                    </tr>
                  ))}
                  {approvedUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-14 text-center">
                        <div className="flex flex-col items-center gap-3 text-gray-600">
                          <Users className="w-10 h-10 opacity-30" />
                          <span className="text-sm">لا يوجد موزعون معتمدون بعد</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* ── Section C: All Generated Licenses ────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Database className="w-5 h-5" />
              </span>
              كل التراخيص المصدرة — سجل النظام
            </h2>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400">
              {allLicenses.length} ترخيص
            </span>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">اسم العميل</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">النسخة</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">مفتاح الترخيص</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">بواسطة</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">التاريخ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {allLicenses.map((license) => (
                    <tr key={license._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-200">{license.customerName}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-gray-300">
                          {license.softwareType}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <code className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/5 font-mono text-sm text-cyan-400 tracking-wider inline-block text-left" dir="ltr">
                          {license.serialKey}
                        </code>
                      </td>
                      <td className="py-4 px-6 text-sm text-purple-400 font-medium">{license.generatedBy}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {new Date(license.createdAt).toLocaleDateString("en-GB")}
                      </td>
                    </tr>
                  ))}
                  {allLicenses.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-14 text-center">
                        <div className="flex flex-col items-center gap-3 text-gray-600">
                          <Database className="w-10 h-10 opacity-30" />
                          <span className="text-sm">لم يتم إصدار أي تراخيص بعد</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
