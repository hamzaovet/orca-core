"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Mail, MapPin } from "lucide-react";

// ── Inline brand SVGs (lucide-react version lacks social icons) ──
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "المنتجات",
      links: [
        { name: "ORCA ERP", href: "https://orca-erp.vercel.app/", external: true },
        { name: "ORCA FOOD", href: "https://orcafood-erp-master.vercel.app/", external: true },
        { name: "ORCA FLOW", href: "https://orcaflow-nine.vercel.app/", external: true },
      ],
    },
    {
      title: "بوابة الموزعين",
      links: [
        { name: "تسجيل الدخول", href: "/portal", external: false },
        { name: "طلب انضمام", href: "/portal/register", external: false },
        { name: "مركز المساعدة", href: "#", external: false },
      ],
    },
    {
      title: "الشركة",
      links: [
        { name: "من نحن", href: "#", external: false },
        { name: "قصص النجاح", href: "#", external: false },
        { name: "اتصل بنا", href: "#consultation", external: false },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: FacebookIcon,
      href: "https://www.facebook.com/OrcaErp",
      label: "Facebook",
      hoverColor: "hover:text-blue-400 hover:border-blue-500/30",
    },
    {
      icon: InstagramIcon,
      href: "https://www.instagram.com/erporca/?hl=ar",
      label: "Instagram",
      hoverColor: "hover:text-pink-400 hover:border-pink-500/30",
    },
    {
      icon: YoutubeIcon,
      href: "https://www.youtube.com/channel/UCy0moW96EZUYgKJDEMv_Q-g",
      label: "YouTube",
      hoverColor: "hover:text-red-400 hover:border-red-500/30",
    },
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
                src="/assets/orcacore-logo.png"
                alt="Orca Core Logo"
                width={180}
                height={48}
                className="h-11 w-auto object-contain invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              نحن نبني البنية التحتية الرقمية التي تمكن المؤسسات والكيانات الكبرى من السيطرة والتوسع في العصر الرقمي من خلال حلول ORCA المبتكرة.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label, hoverColor }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 ${hoverColor} transition-all duration-300`}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h4 className="text-white font-bold text-sm tracking-widest uppercase">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 text-sm hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                      >
                        <span>{link.name}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-500 text-sm hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                      >
                        <span>{link.name}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/5 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600 font-medium">
            <span>© {currentYear} Orca Core Platform. جميع الحقوق محفوظة.</span>
            <Link href="#" className="hover:text-gray-400 transition-colors">سياسة الخصوصية</Link>
            <Link href="#" className="hover:text-gray-400 transition-colors">الشروط والأحكام</Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Mail className="w-3.5 h-3.5 text-cyan-500/50" />
              <span>info@orcacore.tech</span>
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
