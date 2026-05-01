"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex flex-col min-h-screen overflow-hidden bg-[#050505]">

      {/* ══════════════════════════════════════════
          ZONE 1 — Video Showcase (top ~58vh)
          Orca Core branding lives here, fully visible
      ══════════════════════════════════════════ */}
      <div className="relative w-full" style={{ height: "58vh" }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/trailer.mp4" type="video/mp4" />
        </video>

        {/* Only fade the very top edge (navbar protection) */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#050505]/80 to-transparent z-10" />

        {/* Fade OUT at the bottom into the dark text zone */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10" />

        {/* Subtle side vignettes */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050505]/50 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050505]/50 to-transparent z-10" />

        {/* Badge — floats over video at top */}
        <div className="absolute top-24 inset-x-0 flex justify-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-gray-300 tracking-wider">
              مستقبل الحلول المؤسسية
            </span>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ZONE 2 — Text Content (bottom, solid dark)
          Nothing overlaps the video here
      ══════════════════════════════════════════ */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 md:px-12 pt-4 pb-20 flex-1">

        {/* Glow orbs behind text only */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-cyan-500/8 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-0 -left-32 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 -right-32 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-500 mb-6 max-w-4xl leading-[1.15] tracking-tight"
        >
          نبني البنية التحتية الرقمية للمؤسسات
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl font-medium leading-relaxed"
        >
          أنظمة ERP متطورة، منصات تجارة إلكترونية، وحلول سحابية متكاملة مصممة للحيتان.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
        >
          <a
            href="https://orca-erp.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 w-full sm:w-auto rounded-full bg-white text-[#050505] font-bold text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(0,255,255,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-3">
              استكشف ORCA ERP
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            </span>
          </a>

          <Link
            href="/portal"
            className="group px-8 py-4 w-full sm:w-auto rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-white font-bold text-lg transition-all hover:bg-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(128,0,255,0.2)] text-center"
          >
            بوابة الموزعين
          </Link>
        </motion.div>
      </div>

      {/* Bottom separator line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-20" />
    </section>
  );
}
