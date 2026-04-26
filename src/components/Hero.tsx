"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/trailer.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/70 to-[#050505]/95 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050505]/50 to-[#050505] z-10" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs md:text-sm font-medium text-gray-300 tracking-wider">
            مستقبل الحلول المؤسسية
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-500 mb-8 max-w-4xl leading-[1.1] tracking-tight"
        >
          نبني البنية التحتية الرقمية للمؤسسات
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-gray-400 mb-12 max-w-3xl font-medium leading-relaxed"
        >
          أنظمة ERP متطورة، منصات تجارة إلكترونية، وحلول سحابية متكاملة مصممة للحيتان.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
        >
          <button className="group relative px-8 py-4 w-full sm:w-auto rounded-full bg-white text-[#050505] font-bold text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(0,255,255,0.3)]">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-3">
              استكشف ORCA ERP
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            </span>
          </button>

          <Link href="/portal" className="group px-8 py-4 w-full sm:w-auto rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-white font-bold text-lg transition-all hover:bg-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(128,0,255,0.2)] text-center">
            بوابة الموزعين
          </Link>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-20" />
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] pointer-events-none z-20" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] pointer-events-none z-20" />
    </section>
  );
}
