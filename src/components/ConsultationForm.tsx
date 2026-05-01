"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Building2, Mail, BarChart3, FileText, ArrowLeft, CheckCircle } from "lucide-react";

const inputBase =
  "w-full bg-white/[0.04] border border-white/10 rounded-xl py-4 px-5 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/30 transition-all duration-300";

export default function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    company: "", email: "", scale: "", details: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      // Simulate network delay — wire to an email API (e.g. Resend) later
      await new Promise((r) => setTimeout(r, 1200));
      setSubmitted(true);
    });
  };

  const fieldVariant = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 + 0.3 } }),
  };

  return (
    <section id="consultation" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-950/20 via-[#050505] to-[#050505]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-purple-400/60 font-semibold mb-4">VIP Consultation</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5">
            ابدأ التحول الرقمي{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              لمؤسستك
            </span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            أخبرنا عن مشروعك وسيتواصل معك أحد مهندسي المنظومة خلال 24 ساعة.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="relative p-6 sm:p-8 md:p-12 rounded-3xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/[0.08] overflow-hidden"
            style={{ boxShadow: "0 0 80px rgba(168,85,247,0.08), 0 0 0 1px rgba(255,255,255,0.05)" }}
          >
            {/* Glow orb inside card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

            {submitted ? (
              // ── Success State ────────────────────────────────────────────
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex flex-col items-center text-center py-10 gap-5"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">تم استلام طلبك!</h3>
                <p className="text-gray-400 max-w-sm leading-relaxed">
                  سيتواصل معك أحد مهندسي Orca Core خلال 24 ساعة لمناقشة تفاصيل مشروعك.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ company: "", email: "", scale: "", details: "" }); }}
                  className="mt-4 text-sm text-gray-600 hover:text-gray-400 transition-colors"
                >
                  إرسال طلب آخر
                </button>
              </motion.div>
            ) : (
              // ── Form ─────────────────────────────────────────────────────
              <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                {/* Row 1: Company + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <motion.div custom={0} variants={fieldVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      <Building2 className="w-3.5 h-3.5" />
                      اسم المؤسسة / العميل
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={form.company}
                      onChange={handleChange}
                      disabled={isPending}
                      placeholder="مثال: مجموعة الألماز"
                      className={inputBase}
                    />
                  </motion.div>

                  <motion.div custom={1} variants={fieldVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      <Mail className="w-3.5 h-3.5" />
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      disabled={isPending}
                      placeholder="business@company.com"
                      className={`${inputBase} text-left`}
                      dir="ltr"
                    />
                  </motion.div>
                </div>

                {/* Row 2: Scale */}
                <motion.div custom={2} variants={fieldVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <BarChart3 className="w-3.5 h-3.5" />
                    حجم العمل الحالي
                  </label>
                  <div className="relative">
                    <select
                      name="scale"
                      required
                      value={form.scale}
                      onChange={handleChange}
                      disabled={isPending}
                      className={`${inputBase} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled className="bg-[#0a0a0a]">اختر حجم مؤسستك</option>
                      <option value="ناشئ" className="bg-[#0a0a0a]">ناشئ — محل أو مشروع صغير</option>
                      <option value="متوسط" className="bg-[#0a0a0a]">متوسط — شركة أو سلسلة فروع</option>
                      <option value="كيان ضخم" className="bg-[#0a0a0a]">كيان ضخم — مجموعة أو مصنع</option>
                    </select>
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-500">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                  </div>
                </motion.div>

                {/* Row 3: Details */}
                <motion.div custom={3} variants={fieldVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5" />
                    تفاصيل المشروع
                  </label>
                  <textarea
                    name="details"
                    required
                    rows={5}
                    value={form.details}
                    onChange={handleChange}
                    disabled={isPending}
                    placeholder="صِف مشروعك: ماذا تريد أن يفعل النظام، ما التحديات الحالية، وما توقعاتك من التحول الرقمي؟"
                    className={`${inputBase} resize-none leading-relaxed`}
                  />
                </motion.div>

                {/* CTA */}
                <motion.div custom={4} variants={fieldVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="group relative w-full py-4 px-8 rounded-xl overflow-hidden font-bold text-white text-sm tracking-wide flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)" }}
                  >
                    {/* Glow layer */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(135deg, #0891b2, #6d28d9)", filter: "blur(16px)" }}
                    />
                    {/* Shine sweep */}
                    <div className="absolute inset-0 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />

                    {isPending ? (
                      <div className="relative z-10 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span className="relative z-10">اطلب استشارة برمجية</span>
                        <ArrowLeft className="relative z-10 w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
