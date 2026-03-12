import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { PageWrapper, FadeUpSection } from '../components/PageWrapper.jsx'
import AnimatedDashboardGraphic from '../components/AnimatedDashboardGraphic.jsx'
import { Globe, FileText, Calculator, ArrowRight } from 'lucide-react'

const serviceKeys   = ['web', 'landing', 'accounting']
const serviceIcons  = { web: Globe, landing: FileText, accounting: Calculator }
const serviceColors = {
  web:        { color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    dot: 'bg-blue-400' },
  landing:    { color: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/20',    dot: 'bg-cyan-400' },
  accounting: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
}

export default function HomePage() {
  const { t, navigate } = useContext(AppContext)
  const h = t.home
  const s = t.services

  return (
    <PageWrapper className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

      {/* ── Hero ── */}
      <section className="grid lg:grid-cols-[1.1fr_minmax(0,0.9fr)] gap-12 pt-6 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/60 text-xs text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="uppercase tracking-[0.25em] text-[10px]">{h.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">{h.title}</h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl">{h.subtitle}</p>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => navigate('/contact')} className="btn-primary text-sm">{h.quoteBtn}</button>
            <button type="button" onClick={() => window.open('https://wa.me/201118540111', '_blank', 'noreferrer')} className="btn-secondary text-sm">{h.whatsappBtn}</button>
          </div>
        </div>
        <AnimatedDashboardGraphic />
      </section>

      {/* ── Services overview ── */}
      <FadeUpSection className="space-y-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{h.servicesTitle}</h2>
          <p className="text-sm text-slate-400 max-w-2xl">{h.servicesSubtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {serviceKeys.map((key) => {
            const Icon = serviceIcons[key]
            const c    = serviceColors[key]
            const svc  = s[key]
            return (
              <article key={key} className="glass-card p-6 border border-slate-700/60 flex flex-col gap-4 hover:border-slate-500/80 transition-colors">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${c.bg} ${c.border}`}>
                  <Icon className={`w-5 h-5 ${c.color}`} />
                </div>
                <h3 className="text-base font-semibold text-white">{svc.title}</h3>
                <ul className="space-y-1.5">
                  {svc.features.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0`} />{item}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
        <button type="button" onClick={() => navigate('/services')} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition">
          {h.servicesLink} <ArrowRight className="w-4 h-4" />
        </button>
      </FadeUpSection>

      {/* ── Portfolio teaser ── */}
      <FadeUpSection className="glass-card border border-slate-700/60 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">{h.portfolioTeaser}</h2>
          <p className="text-sm text-slate-400 max-w-lg">{h.portfolioDesc}</p>
        </div>
        <button type="button" onClick={() => navigate('/portfolio')} className="flex-shrink-0 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition">
          {h.portfolioBtn} <ArrowRight className="w-4 h-4" />
        </button>
      </FadeUpSection>

      {/* ── Integrated systems ── */}
      <FadeUpSection className="glass-card border border-slate-700/60 p-8 space-y-4 pb-10">
        <h2 className="text-xl font-semibold text-white">{h.integratedTitle}</h2>
        <p className="text-sm text-slate-300 max-w-3xl">{h.integratedDesc}</p>
      </FadeUpSection>

    </PageWrapper>
  )
}
