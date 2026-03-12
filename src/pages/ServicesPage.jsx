import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { PageWrapper, FadeUpSection } from '../components/PageWrapper.jsx'
import { Globe, FileText, Calculator, ArrowRight } from 'lucide-react'

const serviceKeys = ['web', 'landing', 'accounting']
const serviceIcons = { web: Globe, landing: FileText, accounting: Calculator }
const serviceColors = {
  web:        { color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    dot: 'bg-blue-400',    btn: 'bg-blue-600 hover:bg-blue-500' },
  landing:    { color: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/20',    dot: 'bg-cyan-400',    btn: 'bg-cyan-600 hover:bg-cyan-500' },
  accounting: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-400', btn: 'bg-emerald-600 hover:bg-emerald-500' },
}

export default function ServicesPage() {
  const { t, navigate } = useContext(AppContext)
  const s = t.services

  return (
    <PageWrapper className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs uppercase tracking-widest font-semibold">
          {s.badge}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{s.title}</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">{s.subtitle}</p>
      </div>

      {/* Service Cards */}
      <div className="grid lg:grid-cols-3 gap-8">
        {serviceKeys.map((key) => {
          const Icon = serviceIcons[key]
          const c    = serviceColors[key]
          const svc  = s[key]
          return (
            <FadeUpSection key={key} className="glass-card border border-slate-700/60 p-8 flex flex-col gap-6 hover:border-slate-600/80 transition-colors">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border ${c.bg} ${c.border}`}>
                <Icon className={`w-6 h-6 ${c.color}`} />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white">{svc.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed">{svc.desc}</p>
              </div>
              <ul className="space-y-2 flex-1">
                {svc.features.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className={`w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0 mt-1.5`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => navigate('/contact')} className={`w-full py-3 rounded-xl text-white font-semibold text-sm transition ${c.btn}`}>
                {svc.cta}
              </button>
            </FadeUpSection>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <FadeUpSection className="glass-card border border-slate-700/60 p-10 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">{s.ctaTitle}</h2>
        <p className="text-slate-400 max-w-xl mx-auto">{s.ctaDesc}</p>
        <button type="button" onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-semibold py-3 px-8 rounded-xl transition">
          {s.ctaBtn}
        </button>
      </FadeUpSection>

    </PageWrapper>
  )
}
