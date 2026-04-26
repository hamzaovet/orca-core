"use client";

import { motion } from "framer-motion";
import { LogOut, Key, Search, Copy, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { generateLicenseAction } from "./actions";
import { signOut } from "next-auth/react";

export interface ILicenseData {
  _id: string;
  customerName: string;
  softwareType: string;
  serialKey: string;
  createdAt: string;
}

export default function DashboardClient({ initialLicenses, username }: { initialLicenses: ILicenseData[], username: string }) {
  const [customerName, setCustomerName] = useState("");
  const [version, setVersion] = useState("ORCA ERP Pro");
  const [copiedSerial, setCopiedSerial] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData();
      formData.append("customerName", customerName);
      formData.append("softwareType", version);
      
      try {
        await generateLicenseAction(formData);
        setCustomerName(""); // Reset input on success
      } catch (error) {
        alert("Failed to generate license.");
      }
    });
  };

  const handleCopy = (serial: string) => {
    navigator.clipboard.writeText(serial);
    setCopiedSerial(serial);
    setTimeout(() => setCopiedSerial(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
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
            <h1 className="text-lg font-bold tracking-wide hidden md:block text-gray-200">
              مرحباً بك في مركز التحكم
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-300">الوكيل المتصل: {username}</span>
            </div>
            
            <button
              onClick={() => signOut({ callbackUrl: "/portal" })}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
            >
              <span>تسجيل خروج</span>
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 space-y-10">
        
        {/* Top Section: The Generator */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Key className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">توليد ترخيص جديد</h2>
          </div>

          <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
            
            <form onSubmit={handleGenerate} className="relative z-10 flex flex-col lg:flex-row gap-6 items-end">
              <div className="w-full lg:w-2/5 space-y-3">
                <label className="text-sm font-medium text-gray-300">اسم العميل أو المحل</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  disabled={isPending}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50"
                  placeholder="مثال: أسواق عبدلله العثيم"
                />
              </div>

              <div className="w-full lg:w-2/5 space-y-3">
                <label className="text-sm font-medium text-gray-300">نسخة النظام</label>
                <div className="relative">
                  <select
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    disabled={isPending}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <option value="ORCA ERP Pro" className="bg-[#0a0a0a]">ORCA ERP Pro</option>
                    <option value="ORCA ERP Lite" className="bg-[#0a0a0a]">ORCA ERP Lite</option>
                    <option value="ORCA FOOD" className="bg-[#0a0a0a]">ORCA FOOD</option>
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full lg:w-1/5 py-3.5 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] disabled:opacity-50 flex justify-center items-center"
              >
                {isPending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "توليد سيريال جديد"}
              </button>
            </form>
          </div>
        </motion.section>

        {/* Bottom Section: Recent Activity Table */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <Search className="w-5 h-5 text-purple-400" />
              أحدث التراخيص المصدرة
            </h2>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">اسم العميل</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">النسخة</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">مفتاح الترخيص (Serial)</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400">التاريخ</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-400 text-center">إجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {initialLicenses.map((license) => (
                    <tr key={license._id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="py-4 px-6 font-medium text-gray-200">{license.customerName}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-gray-300">
                          {license.softwareType}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <code className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/5 font-mono text-sm text-cyan-400 tracking-wider inline-block min-w-[260px] text-left dir-ltr">
                          {license.serialKey}
                        </code>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {new Date(license.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleCopy(license.serialKey)}
                          className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all focus:outline-none"
                          title="نسخ الترخيص"
                        >
                          {copiedSerial === license.serialKey ? (
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {initialLicenses.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-gray-500">
                        لا توجد تراخيص مصدرة حتى الآن.
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
