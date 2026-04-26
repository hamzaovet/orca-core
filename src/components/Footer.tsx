"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  X, 
  Globe, 
  Cpu, 
  ExternalLink,
  Mail,
  MapPin,
  Phone
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "المنتجات",
      links: [
        { name: "ORCA ERP", href: "/products/orca-erp" },
        { name: "ORCA FOOD", href: "/products/orca-food" },
        { name: "ORCA FLOW", href: "/products/orca-flow" },
      ]
    },
    {
      title: "بوابة الموزعين",
      links: [
        { name: "تسجيل الدخول", href: "/portal" },
        { name: "طلب انضمام", href: "/portal/register" },
        { name: "مركز المساعدة", href: "#" },
      ]
    },
    {
      title: "الشركة",
      links: [
        { name: "من نحن", href: "#" },
        { name: "قصص النجاح", href: "#" },
        { name: "اتصل بنا", href: "#consultation" },
      ]
    }
  ];

  return (
    <footer className="relative bg-[#030303] pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Background Orbs */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <Image 
                src="/assets/nexara_logo.png" 
                alt="Nexara Logo" 
                width={140} 
                height={40}
                className="opacity-90 hover:opacity-100 transition-opacity"
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              نحن نبني البنية التحتية الرقمية التي تمكن المؤسسات والكيانات الكبرى من السيطرة والتوسع في العصر الرقمي من خلال حلول ORCA المبتكرة.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                <X className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                <Globe className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                <Cpu className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h4 className="text-white font-bold text-sm tracking-widest uppercase">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      href={link.href} 
                      className="text-gray-500 text-sm hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/5 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-xs text-gray-600 font-medium">
            <span>© {currentYear} Nexara Platform. جميع الحقوق محفوظة.</span>
            <Link href="#" className="hover:text-gray-400 transition-colors">سياسة الخصوصية</Link>
            <Link href="#" className="hover:text-gray-400 transition-colors">الشروط والأحكام</Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Mail className="w-3.5 h-3.5 text-cyan-500/50" />
              <span>nexus@nexara.tech</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-purple-500/50" />
              <span>Smart Village, Cairo</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
