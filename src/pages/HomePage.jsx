import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { PageWrapper, FadeUpSection } from '../components/PageWrapper.jsx'
import AnimatedDashboardGraphic from '../components/AnimatedDashboardGraphic.jsx'

export default function HomePage() {
  const { t, navigate } = useContext(AppContext)

  return (
    <PageWrapper className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      <section className="grid lg:grid-cols-[1.1fr_minmax(0,0.9fr)] gap-12 pt-6 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/60 text-xs text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="uppercase tracking-[0.25em] text-[10px]">
              NEXARA PLATFORM
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {t.hero.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl">
            {t.hero.sub}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/request')}
              className="btn-primary text-sm"
            >
              {t.hero.quoteBtn}
            </button>
            <button
              type="button"
              onClick={() =>
                window.open('https://wa.me/201118540111', '_blank', 'noreferrer')
              }
              className="btn-secondary text-sm"
            >
              {t.hero.waBtn}
            </button>
          </div>
        </div>
        <AnimatedDashboardGraphic />
      </section>

      <FadeUpSection className="space-y-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            {t.services.sectionTitle}
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl">
            We combine modern web engineering with robust financial systems to
            power your entire operation.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <article className="glass-card p-6 border border-slate-700/60">
            <h3 className="text-lg font-semibold text-white mb-2">
              {t.services.web.title}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {t.services.web.features.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="glass-card p-6 border border-slate-700/60">
            <h3 className="text-lg font-semibold text-white mb-2">
              {t.services.acc.title}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {t.services.acc.features.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </FadeUpSection>

      <FadeUpSection className="glass-card border border-slate-700/60 p-8 space-y-4">
        <h2 className="text-xl font-semibold text-white">
          {t.integrated.title}
        </h2>
        <p className="text-sm text-slate-300 max-w-3xl">{t.integrated.desc}</p>
      </FadeUpSection>
    </PageWrapper>
  )
}

