"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const links = [
  { name: "الرئيسية", href: "/" },
  { name: "ORCA ERP", href: "#" },
  { name: "ORCA FOOD", href: "#" },
  { name: "ORCA FLOW", href: "#" },
  { name: "بوابة الموزعين", href: "/portal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/5 ${
        scrolled ? "bg-[#050505]/70 backdrop-blur-2xl py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="relative flex items-center gap-2 group">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500 rounded-full" />
          <Image
            src="/assets/nexara_logo.png"
            alt="Nexara Logo"
            width={160}
            height={40}
            priority
            style={{ width: 'auto', height: 'auto' }}
            className="relative z-10 object-contain drop-shadow-lg"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="text-sm font-semibold tracking-wide text-gray-300 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300 ease-out" />
            </Link>
          ))}
        </div>

        <div className="flex items-center">
          <Link href="/portal" className="relative overflow-hidden group px-8 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(128,0,255,0.2)] hover:border-purple-500/30">
            <span className="relative z-10 text-sm font-bold text-white tracking-wide">تسجيل الدخول</span>
            <div className="absolute inset-0 bg-gradient-to-l from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
