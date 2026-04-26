"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MaestroPitch() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Subtle parallax: content drifts upward as you scroll through
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={ref} className="relative py-16 pt-24 overflow-hidden">

      {/* ── Dark glowing grid background ── */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/30 via-[#050505] to-[#050505]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-purple-500/5 blur-[80px]" />
      </div>

      {/* ── Content ── */}
      <motion.div
        style={{ y }}
        className="relative z-10 container mx-auto px-6 md:px-12 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-500/60 font-semibold mb-8">
            The Maestro Architecture
          </p>

          {/* Main headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-white to-purple-400 max-w-6xl mx-auto">
            أنت تتخيل.. ونحن نبني البنية التحتية لحلمك.
          </h2>

          {/* Sub-headline */}
          <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-light mb-12">
            أنظمة متفصلة بالمللي. من الفكرة إلى التشغيل، نصمم برمجيات تتحمل أعباء الإمبراطوريات التجارية.
          </p>

          {/* Seduction Bridge (Scroll Indicator) */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 relative overflow-hidden">
              <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
              />
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-500/40 font-bold">Explore Journey</span>
          </div>

          {/* Decorative line - Removed or reduced to tighten space */}
          <div className="mt-12 flex items-center justify-center gap-4 opacity-30">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/40" />
            <div className="w-1 h-1 rounded-full bg-cyan-500/60" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/40" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
