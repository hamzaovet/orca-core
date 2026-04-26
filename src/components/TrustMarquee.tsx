"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Building2, Utensils, Smartphone, Factory,
  ShoppingBag, Truck, Globe, Coffee, Layers, Cpu,
} from "lucide-react";

const clients = [
  { icon: Building2,   name: "Almaz Group" },
  { icon: Smartphone,  name: "Full Mark Work" },
  { icon: Factory,     name: "Industrial Corp" },
  { icon: Utensils,    name: "Food Giants" },
  { icon: Globe,       name: "Global Tech" },
  { icon: ShoppingBag, name: "Retail Hub" },
  { icon: Truck,       name: "Logistics Pro" },
  { icon: Coffee,      name: "Café Empire" },
  { icon: Layers,      name: "Multi-Layer Co" },
  { icon: Cpu,         name: "Tech Nexus" },
];

// Duplicate to ensure seamless loop
const items = [...clients, ...clients, ...clients];

export default function TrustMarquee() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 mb-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold tracking-[0.3em] text-gray-300 uppercase"
        >
          كيانات تثق في بنيتنا التحتية
        </motion.p>
      </div>

      {/* Marquee track */}
      <div className="flex overflow-hidden">
        <motion.div
          className="flex gap-10 shrink-0"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            duration: 28,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {items.map((client, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.08] border border-white/15 shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-default"
            >
              <client.icon className="w-5 h-5 text-gray-200 shrink-0" />
              <span className="text-sm font-semibold text-gray-200 whitespace-nowrap">{client.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
