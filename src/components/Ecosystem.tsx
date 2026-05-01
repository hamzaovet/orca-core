"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Server, UtensilsCrossed, Factory } from "lucide-react";
import Link from "next/link";

const cards = [
  {
    title: "ORCA ERP",
    href: "/products/orca-erp",
    description: "نظام إدارة نقاط البيع يعمل بدون إنترنت (Offline-First)، يدعم الفروع المتعددة والمزامنة السحابية اللحظية.",
    icon: Server,
    accentClasses: "hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(0,255,255,0.15)]",
    glowClasses: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
    iconClasses: "text-cyan-400",
    textClasses: "text-cyan-400",
  },
  {
    title: "ORCA FOOD",
    href: "/products/orca-food",
    description: "حل متكامل لإدارة المطاعم، يشمل شاشات المطبخ (KDS)، الطاولات الذكية، وإدارة الطلبات المتقدمة.",
    icon: UtensilsCrossed,
    accentClasses: "hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(128,0,255,0.15)]",
    glowClasses: "bg-purple-500/10 group-hover:bg-purple-500/20",
    iconClasses: "text-purple-400",
    textClasses: "text-purple-400",
  },
  {
    title: "ORCA FLOW",
    href: "/products/orca-flow",
    description: "نظام الإدارة الصناعية المتطور. مصمم خصيصاً للمصانع والمعارض الكبرى، يشمل إدارة سلاسل الإمداد، خطوط الإنتاج، والمخازن المعقدة.",
    icon: Factory,
    accentClasses: "hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
    glowClasses: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
    iconClasses: "text-emerald-400",
    textClasses: "text-emerald-400",
  },
];

export default function Ecosystem() {
  return (
    <section id="products" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            منظومة <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">أوركا</span> المتكاملة
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            المنتجات الأساسية المصممة لتمكين أعمالك وتوسيع قدراتها من خلال بنية تحتية رقمية لا تقهر.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
              className={`group relative p-6 sm:p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 overflow-hidden transition-all duration-500 ${card.accentClasses}`}
            >
              <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-colors duration-500 ${card.glowClasses}`} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <card.icon className={`w-7 h-7 ${card.iconClasses}`} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-8 flex-1">{card.description}</p>

                <Link
                  href={card.href}
                  className={`flex items-center gap-2 text-sm font-semibold group/btn ${card.textClasses} w-fit`}
                >
                  <span>اكتشف المزيد</span>
                  <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
