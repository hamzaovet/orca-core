"use client";

import { motion } from "framer-motion";
import { ArrowUpLeft, Store, Briefcase } from "lucide-react";

export default function CaseStudies() {
  const cases = [
    {
      title: "متجر ألمظ",
      subtitle: "E-commerce & Business Solution",
      description: "تحول رقمي شامل يعزز تجربة التجارة الإلكترونية بنظام إدارة مبيعات قوي ومستقر.",
      icon: Store,
      bgGradient: "from-blue-900/40 via-blue-950/20 to-black",
      accentBorder: "group-hover:border-blue-500/30",
      accentGlow: "rgba(59,130,246,0.15)",
    },
    {
      title: "FMW",
      subtitle: "Premium Brand Identity",
      description: "صناعة هوية بصرية متكاملة وواجهات مستخدم تعكس الفخامة وتليق بالكيانات الكبرى.",
      icon: Briefcase,
      bgGradient: "from-purple-900/40 via-purple-950/20 to-black",
      accentBorder: "group-hover:border-purple-500/30",
      accentGlow: "rgba(168,85,247,0.15)",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-500/50 font-bold mb-4">Case Studies</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              شركاء <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">النجاح</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl">
              تجارب واقعية لمؤسسات اعتمدت على البنية التحتية لنكسارا لتحقيق قفزات نوعية في الأداء.
            </p>
          </div>
          
          <button className="text-sm font-bold text-white uppercase tracking-widest border-b border-white/20 pb-1 hover:border-white hover:text-cyan-400 transition-all w-max">
            عرض كل القصص
          </button>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.2, ease: "easeOut" }}
              className={`group relative aspect-[4/3] md:aspect-[16/9] rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/5 transition-all duration-500 ${item.accentBorder}`}
              style={{ boxShadow: `0 0 40px rgba(0,0,0,0.5)` }}
            >
              
              {/* 1. Background Magic (Radial Gradient + Scale) */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} transition-transform duration-1000 ease-out group-hover:scale-110`} 
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* 2. Dark Overlay */}
              <div className="absolute inset-0 bg-[#050505]/60 group-hover:bg-[#050505]/40 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />

              {/* 3. Content Area */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                
                {/* Top Row: Icon + Arrow */}
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-500 group-hover:scale-110">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Hover Arrow (Diagonal Translation) */}
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 -translate-x-6 translate-y-6 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <ArrowUpLeft className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                {/* Bottom Row: Text content */}
                <div className="transform transition-transform duration-500">
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-cyan-500/80 tracking-[0.2em] uppercase">{item.subtitle}</p>
                    <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                      {item.title}
                    </h3>
                    
                    {/* Story Content Injection */}
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* 4. Interactive Glow Border */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ boxShadow: `inset 0 0 30px ${item.accentGlow}` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
