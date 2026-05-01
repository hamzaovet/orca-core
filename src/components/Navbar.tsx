"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

const internalLinks = [
  { name: "الرئيسية", href: "/" },
  { name: "بوابة الموزعين", href: "/portal" },
];

const productLinks = [
  { name: "Orca ERP", href: "https://orca-erp.vercel.app/" },
  { name: "Orca Food", href: "https://orcafood-erp-master.vercel.app/" },
  { name: "Orca Flow", href: "https://orcaflow-nine.vercel.app/" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#products-menu")) setProductsOpen(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
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
        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-2 group">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500 rounded-full" />
          <Image
            src="/assets/orcacore-logo.png"
            alt="Orca Core Logo"
            width={180}
            height={48}
            priority
            style={{ height: "44px", width: "auto" }}
            className="relative z-10 object-contain drop-shadow-lg"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {/* Home */}
          <Link
            href="/"
            className="text-sm font-semibold tracking-wide text-gray-300 hover:text-white transition-colors relative group"
          >
            الرئيسية
            <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300 ease-out" />
          </Link>

          {/* Products Dropdown */}
          <div id="products-menu" className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setProductsOpen((v) => !v); }}
              className="flex items-center gap-1.5 text-sm font-semibold tracking-wide text-gray-300 hover:text-white transition-colors relative group"
            >
              المنتجات
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${productsOpen ? "rotate-180" : ""}`}
              />
              <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300 ease-out" />
            </button>

            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full mt-3 right-0 min-w-[200px] bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
                >
                  {productLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all group"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400/50 group-hover:text-cyan-400 transition-colors" />
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Distributor Portal */}
          <Link
            href="/portal"
            className="text-sm font-semibold tracking-wide text-gray-300 hover:text-white transition-colors relative group"
          >
            بوابة الموزعين
            <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300 ease-out" />
          </Link>

          {/* العروض التقديمية — PRESERVED, DO NOT TOUCH LOGIC */}
          <Link
            href="/products"
            className="text-sm font-semibold tracking-wide text-gray-300 hover:text-white transition-colors relative group"
          >
            العروض التقديمية
            <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300 ease-out" />
          </Link>
        </div>

        {/* CTA Button */}
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
