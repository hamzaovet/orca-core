"use client";

import { motion } from "framer-motion";
import { Network, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CloudPortal() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0a0a]/50 border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content (Right side in RTL, so it's first in DOM or we use flex order) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Network className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wider">البنية التحتية</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              شبكة التوزيع <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-blue-500">السحابية</span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              نظام متطور لإدارة التراخيص والموزعين. تحكم كامل، توليد سيريالات لحظي، ومراقبة المبيعات من لوحة تحكم واحدة مصممة خصيصاً للتحكم المركزي.
            </p>
            
            <Link href="/portal" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold transition-all hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] group">
              دخول بوابة الموزعين
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300 text-cyan-400" />
            </Link>
          </motion.div>

          {/* Graphic / Mockup (Left side in RTL) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 overflow-hidden flex items-center justify-center backdrop-blur-sm shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
              
              {/* Abstract Nodes Graphic */}
              <div className="relative w-64 h-64">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-2xl rotate-45 shadow-[0_0_40px_rgba(0,255,255,0.4)] flex items-center justify-center">
                  <Network className="w-8 h-8 text-white -rotate-45" />
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 right-10 w-10 h-10 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md"
                />
                <motion.div 
                  animate={{ y: [0, 20, 0] }} 
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-10 left-4 w-12 h-12 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
                />
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-20 left-10 w-4 h-4 bg-purple-500/50 rounded-full blur-sm"
                />
              </div>
            </div>
            
            {/* Glow Behind Graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/5 rounded-full blur-[100px] -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
