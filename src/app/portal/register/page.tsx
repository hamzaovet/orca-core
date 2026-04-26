"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User, Lock, Mail, Building2, BadgeCheck } from "lucide-react";
import { useState, useTransition } from "react";
import { registerDistributorAction } from "./actions";

export default function Register() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Extract values BEFORE startTransition — e.currentTarget becomes null inside async boundaries
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const password = formData.get("password") as string;

    startTransition(async () => {
      try {
        await registerDistributorAction({ name, username, email, company, password });
        setSuccess(true);
      } catch (err: any) {
        setError(err.message || "حدث خطأ غير متوقع");
      }
    });
  };

  if (success) {
    return (
      <main className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-[#050505] to-[#050505]" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md px-6 text-center"
        >
          <div className="p-10 rounded-3xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-green-500/20 shadow-[0_0_50px_rgba(0,255,0,0.1)] flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
              <BadgeCheck className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">تم استلام طلبك بنجاح</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              يرجى انتظار موافقة الإدارة. سيتم تفعيل حسابك فور التحقق من البيانات.
            </p>
            <Link href="/portal" className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
              العودة لتسجيل الدخول
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#050505] py-12">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#050505] to-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-cyan-500/5 rounded-[100%] blur-[150px] pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg px-6"
      >
        <div className="p-8 md:p-10 rounded-3xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="mb-6 relative group">
              <Image
                src="/assets/nexara_logo.png"
                alt="Nexara Logo"
                width={140}
                height={32}
                priority
                style={{ width: 'auto', height: 'auto' }}
                className="relative z-10 object-contain drop-shadow-lg"
              />
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2 text-center tracking-wide">
              طلب انضمام كموزع
            </h1>
            <p className="text-sm text-gray-400 text-center">
              قم بتعبئة البيانات أدناه لتقديم طلب الانضمام
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 block">الاسم الكامل</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input type="text" name="name" required disabled={isPending} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 block">اسم المستخدم (للدخول)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input type="text" name="username" required disabled={isPending} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 dir-ltr text-left" dir="ltr" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 block">البريد الإلكتروني</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input type="email" name="email" required disabled={isPending} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 dir-ltr text-left" dir="ltr" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 block">اسم الشركة / المحل</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                  <Building2 className="w-4 h-4" />
                </div>
                <input type="text" name="company" disabled={isPending} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 block">كلمة المرور</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input type="password" name="password" required disabled={isPending} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 dir-ltr text-left" dir="ltr" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="group relative w-full px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(0,255,255,0.2)] mt-6 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isPending ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10" />
              ) : (
                <>
                  <span className="relative z-10">تقديم الطلب</span>
                  <ArrowLeft className="w-4 h-4 relative z-10 group-hover:-translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              لديك حساب بالفعل؟{" "}
              <Link href="/portal" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                سجل الدخول
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
