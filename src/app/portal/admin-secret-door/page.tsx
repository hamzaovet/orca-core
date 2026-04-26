"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Lock, User, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminSecretDoor() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("بيانات الدخول غير صحيحة أو الحساب غير مصرّح له هنا.");
      setIsLoading(false);
    } else {
      // Only admins should be using this door — route directly to the control room
      router.push("/portal/admin");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background — distinct red/crimson tone to signal this is a restricted area */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/40 via-[#050505] to-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="p-8 md:p-10 rounded-3xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-red-500/20 shadow-[0_0_60px_rgba(220,38,38,0.15)]">
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
              <ShieldAlert className="w-8 h-8 text-red-400" />
            </div>
            <Image
              src="/assets/nexara_logo.png"
              alt="Nexara Logo"
              width={120}
              height={32}
              priority
              style={{ width: 'auto', height: 'auto' }}
              className="object-contain drop-shadow-lg mb-5 opacity-60"
            />
            <h1 className="text-xl font-bold text-white mb-1 text-center tracking-wide">
              دخول مقيّد
            </h1>
            <p className="text-xs text-red-400/80 text-center font-medium tracking-widest uppercase">
              Authorized Personnel Only
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block">المستخدم</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-600">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-4 pr-11 text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/30 transition-all text-left disabled:opacity-40"
                  placeholder="maestro"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block">المرور</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-600">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-4 pr-11 text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/30 transition-all text-left disabled:opacity-40"
                  placeholder="••••••••"
                  dir="ltr"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full px-6 py-4 rounded-xl bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 text-white font-bold overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] flex items-center justify-center gap-3 mt-6 disabled:opacity-40"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-red-200/30 border-t-red-100 rounded-full animate-spin relative z-10" />
              ) : (
                <>
                  <span className="relative z-10 tracking-wide">دخول</span>
                  <ArrowLeft className="w-4 h-4 relative z-10 group-hover:-translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {/* Subtle back link — very understated so it stays hidden */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/portal")}
              className="text-xs text-gray-700 hover:text-gray-500 transition-colors"
            >
              ← العودة
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
