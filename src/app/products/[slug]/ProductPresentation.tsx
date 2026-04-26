"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronLeft, Home,
  CheckCircle, XCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { SlideData, AccentColor } from "@/lib/productSlides";
import { accentMap, products } from "@/lib/productSlides";

// ─── Slide Renderers ──────────────────────────────────────────────────────────

function TitleSlide({ slide, accent }: { slide: Extract<SlideData, { type: "title" }>; accent: AccentColor }) {
  const colors = accentMap[accent];
  return (
    <div className="flex flex-col items-center justify-center text-center h-full gap-8 px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`px-4 py-1.5 rounded-full border text-xs tracking-[0.2em] uppercase font-semibold ${colors.badge}`}
      >
        {slide.tagline}
      </motion.div>

      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-br ${colors.gradient} max-w-4xl`}
      >
        {slide.title}
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed"
      >
        {slide.subtitle}
      </motion.p>

      {/* Decorative orbs */}
      <div className={`absolute top-1/4 right-1/4 w-72 h-72 rounded-full blur-[120px] opacity-20 bg-gradient-to-br ${colors.gradient} pointer-events-none`} />
      <div className={`absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full blur-[120px] opacity-10 bg-gradient-to-br ${colors.gradient} pointer-events-none`} />
    </div>
  );
}

function RoadmapSlide({ slide, accent }: { slide: Extract<SlideData, { type: "roadmap" }>; accent: AccentColor }) {
  const colors = accentMap[accent];
  return (
    <div className="flex flex-col items-center gap-10 px-6 h-full justify-center">
      <div className="text-center">
        <h2 className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${colors.gradient} mb-3`}>
          {slide.title}
        </h2>
        <p className="text-gray-400 text-base">{slide.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
        {slide.stages.map((stage, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
            className={`relative p-6 rounded-2xl bg-white/[0.03] border ${colors.border} flex flex-col items-center text-center gap-3`}
          >
            <span className={`text-4xl font-black opacity-20 ${colors.text}`}>{stage.number}</span>
            <span className={`text-sm font-bold ${stage.color}`}>{stage.label}</span>
            <span className="text-xs text-gray-500 font-medium">{stage.title}</span>
            {i < slide.stages.length - 1 && (
              <ChevronLeft className="absolute -left-3 top-1/2 -translate-y-1/2 text-gray-700 w-5 h-5 hidden md:block" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FeaturesSlide({ slide, accent }: { slide: Extract<SlideData, { type: "features" }>; accent: AccentColor }) {
  const colors = accentMap[accent];
  return (
    <div className="flex flex-col gap-8 px-6 h-full justify-center">
      <div className="text-center">
        <h2 className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${colors.gradient} mb-3`}>
          {slide.title}
        </h2>
        {slide.subtitle && <p className="text-gray-400 text-base">{slide.subtitle}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full">
        {slide.features.map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
            className={`flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border ${colors.border} hover:bg-white/[0.05] transition-colors`}
          >
            <div className={`p-3 rounded-xl ${colors.bg} border ${colors.border} shrink-0`}>
              <feat.icon className={`w-5 h-5 ${colors.text}`} />
            </div>
            <div>
              <p className="font-bold text-white mb-1">{feat.title}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StageSlide({ slide, accent }: { slide: Extract<SlideData, { type: "stage" }>; accent: AccentColor }) {
  const colors = accentMap[accent];
  return (
    <div className="flex flex-col gap-8 px-6 h-full justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className={`text-6xl font-black opacity-10 ${colors.text} leading-none`}>{slide.stageNum}</span>
          <div className={`px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase ${colors.badge}`}>
            {slide.stageLabel}
          </div>
        </div>
        <h2 className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${colors.gradient} mb-3`}>
          {slide.title}
        </h2>
        <p className="text-gray-400 text-base max-w-xl mx-auto">{slide.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full">
        {slide.features.map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
            className={`flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border ${colors.border}`}
          >
            <div className={`p-3 rounded-xl ${colors.bg} border ${colors.border} shrink-0`}>
              <feat.icon className={`w-5 h-5 ${colors.text}`} />
            </div>
            <div>
              <p className="font-bold text-white mb-1">{feat.title}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ComparisonSlide({ slide, accent }: { slide: Extract<SlideData, { type: "comparison" }>; accent: AccentColor }) {
  const colors = accentMap[accent];
  return (
    <div className="flex flex-col gap-6 px-4 h-full justify-center">
      <div className="text-center">
        <h2 className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${colors.gradient} mb-3`}>
          {slide.title}
        </h2>
        {slide.subtitle && <p className="text-gray-400 text-base">{slide.subtitle}</p>}
      </div>

      <div className="max-w-3xl mx-auto w-full">
        <div className={`rounded-2xl bg-white/[0.03] border ${colors.border} overflow-hidden`}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-6 text-gray-400 font-semibold text-sm">الميزة</th>
                <th className={`py-4 px-6 font-bold text-sm text-center ${colors.text}`}>ORCA Lite</th>
                <th className="py-4 px-6 font-bold text-sm text-center text-purple-400">ORCA Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {slide.rows.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 + 0.2 }}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-3 px-6 text-gray-300 text-sm">{row.feature}</td>
                  <td className="py-3 px-6 text-center">
                    {row.lite === true ? (
                      <CheckCircle className={`w-5 h-5 ${colors.text} mx-auto`} />
                    ) : row.lite === false ? (
                      <XCircle className="w-5 h-5 text-gray-700 mx-auto" />
                    ) : (
                      <span className="text-xs text-gray-400">{row.lite}</span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {row.enterprise === true ? (
                      <CheckCircle className="w-5 h-5 text-purple-400 mx-auto" />
                    ) : row.enterprise === false ? (
                      <XCircle className="w-5 h-5 text-gray-700 mx-auto" />
                    ) : (
                      <span className="text-xs text-gray-400">{row.enterprise}</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Slide dispatcher ─────────────────────────────────────────────────────────

function Slide({ data, accent }: { data: SlideData; accent: AccentColor }) {
  switch (data.type) {
    case "title": return <TitleSlide slide={data} accent={accent} />;
    case "roadmap": return <RoadmapSlide slide={data} accent={accent} />;
    case "features": return <FeaturesSlide slide={data} accent={accent} />;
    case "stage": return <StageSlide slide={data} accent={accent} />;
    case "comparison": return <ComparisonSlide slide={data} accent={accent} />;
  }
}

// ─── Main Presentation ────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "40%" : "-40%", opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? "40%" : "-40%", opacity: 0, scale: 0.97 }),
};

export default function ProductPresentation({ slug }: { slug: string }) {
  const product = products[slug];
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const colors = accentMap[product.accent];
  const total = product.slides.length;

  const go = useCallback((delta: number) => {
    const next = current + delta;
    if (next < 0 || next >= total) return;
    setDirection(delta);
    setCurrent(next);
  }, [current, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(1);
      if (e.key === "ArrowRight") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const progress = ((current + 1) / total) * 100;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col overflow-hidden" dir="rtl">

      {/* ── Progress bar ── */}
      <div className="fixed top-0 inset-x-0 h-1 bg-white/5 z-50">
        <motion.div
          className={`h-full bg-gradient-to-r ${colors.progress} shadow-[0_0_10px_rgba(0,255,255,0.5)]`}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* ── Header ── */}
      <header className="fixed top-1 inset-x-0 z-40 flex items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group">
          <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          <span className="text-sm font-medium hidden sm:block">الرئيسية</span>
        </Link>

        <div className="flex items-center gap-3">
          <Image
            src="/assets/nexara_logo.png"
            alt="Nexara"
            width={100}
            height={28}
            priority
            style={{ width: "auto", height: "auto" }}
            className="object-contain opacity-60"
          />
          <div className={`h-5 w-px bg-white/10`} />
          <span className={`text-sm font-bold ${colors.text}`}>{product.name}</span>
        </div>

        <div className="flex items-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? `w-6 h-2 ${colors.text} bg-current`
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </header>

      {/* ── Slide Area ── */}
      <main className="flex-1 flex items-center justify-center pt-20 pb-28 relative overflow-hidden">
        {/* glassmorphism container */}
        <div className={`relative w-full max-w-5xl mx-6 min-h-[500px] rounded-3xl bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-hidden flex items-center`}
          style={{ boxShadow: `0 0 80px ${colors.glow}, 0 0 0 1px rgba(255,255,255,0.05)` }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              className="w-full py-12 px-4 relative"
            >
              <Slide data={product.slides[current]} accent={product.accent} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* ── Navigation Bar ── */}
      <footer className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-between px-8 h-20 bg-[#050505]/80 backdrop-blur-xl border-t border-white/5">

        {/* Prev */}
        <button
          onClick={() => go(-1)}
          disabled={current === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
          <span>السابق</span>
        </button>

        {/* Counter */}
        <div className="text-center">
          <p className="text-sm text-gray-500 font-medium">
            <span className={`font-bold text-lg ${colors.text}`}>{current + 1}</span>
            <span className="mx-1 text-gray-700">/</span>
            <span>{total}</span>
          </p>
          <p className="text-xs text-gray-700 mt-0.5">← → للتنقل بلوحة المفاتيح</p>
        </div>

        {/* Next */}
        <button
          onClick={() => go(1)}
          disabled={current === total - 1}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-bold transition-all disabled:opacity-20 disabled:cursor-not-allowed ${
            current < total - 1
              ? `${colors.bg} ${colors.border} ${colors.text} hover:opacity-80`
              : "bg-white/5 border-white/10 text-gray-600"
          }`}
        >
          <span>التالي</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}
