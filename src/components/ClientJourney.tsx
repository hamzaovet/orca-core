"use client";

import { motion } from "framer-motion";
import { Search, Cpu, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "الاستكشاف والتحليل",
    subtitle: "Discovery & Analysis",
    desc: "نجلس معك لنفهم أدق تفاصيل وتعقيدات عملك، ونرسم خريطة التحول الرقمي المثالية لمؤسستك.",
    accent: "cyan",
    gradFrom: "from-cyan-500/20",
    gradTo: "to-cyan-500/0",
    border: "border-cyan-500/20",
    glow: "rgba(0,255,255,0.12)",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    iconText: "text-cyan-400",
    numText: "text-cyan-500/20",
    connectorColor: "from-cyan-500/40 to-purple-500/40",
  },
  {
    num: "02",
    icon: Cpu,
    title: "الهندسة المعمارية",
    subtitle: "Architecture & Build",
    desc: "نكتب الكود ونبني نظامك الخاص بأسس قوية تتحمل ضغط الكيانات الكبرى وتتمدد مع نموك.",
    accent: "purple",
    gradFrom: "from-purple-500/20",
    gradTo: "to-purple-500/0",
    border: "border-purple-500/20",
    glow: "rgba(168,85,247,0.12)",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    iconText: "text-purple-400",
    numText: "text-purple-500/20",
    connectorColor: "from-purple-500/40 to-emerald-500/40",
  },
  {
    num: "03",
    icon: Rocket,
    title: "الإطلاق والسيطرة",
    subtitle: "Launch & Dominate",
    desc: "نسلمك مفاتيح غرفة العمليات لتبدأ السيطرة التامة على السوق — مع دعم كامل في كل مرحلة.",
    accent: "emerald",
    gradFrom: "from-emerald-500/20",
    gradTo: "to-emerald-500/0",
    border: "border-emerald-500/20",
    glow: "rgba(16,185,129,0.12)",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconText: "text-emerald-400",
    numText: "text-emerald-500/20",
    connectorColor: "",
  },
];

export default function ClientJourney() {
  return (
    <section className="py-12 relative overflow-hidden">
      {/* Subtle bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-950/10 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-500/50 font-semibold mb-4">
            Client Journey
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white">
            كيف نبني{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              إمبراطوريتك؟
            </span>
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px z-0">
            <div className="h-full bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-emerald-500/30" />
            {/* Glowing pulse dot */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.8)]"
              animate={{ left: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <div
                className={`relative h-full p-6 sm:p-8 rounded-3xl bg-[#0a0a0a] border ${step.border} overflow-hidden
                  transition-all duration-500 
                  hover:shadow-[0_0_50px_var(--glow)] hover:-translate-y-1`}
                style={{ "--glow": step.glow } as React.CSSProperties}
              >
                {/* Gradient glow bg */}
                <div className={`absolute inset-0 bg-gradient-to-b ${step.gradFrom} ${step.gradTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Step number */}
                <span className={`absolute top-6 left-6 text-6xl font-black leading-none ${step.numText} select-none`}>
                  {step.num}
                </span>

                {/* Icon */}
                <div className={`relative z-10 w-14 h-14 rounded-2xl ${step.iconBg} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <step.icon className={`w-6 h-6 ${step.iconText}`} />
                </div>

                {/* Text */}
                <div className="relative z-10">
                  <p className={`text-xs font-semibold uppercase tracking-widest ${step.iconText} mb-2 opacity-70`}>
                    {step.subtitle}
                  </p>
                  <h3 className="text-xl font-bold text-white mb-4 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${step.gradFrom} ${step.gradTo} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
