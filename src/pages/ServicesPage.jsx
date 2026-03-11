import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { PageWrapper, FadeUpSection } from '../components/PageWrapper.jsx'

export default function ServicesPage() {
  const { t } = useContext(AppContext)

  return (
    <PageWrapper className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          {t.services.sectionTitle}
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          We design complete digital experiences that connect your website, data,
          and accounting systems.
        </p>
      </div>

      <FadeUpSection className="grid md:grid-cols-2 gap-6">
        <article className="glass-card border border-slate-700/60 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-white">
            {t.services.web.title}
          </h2>
          <ul className="space-y-2 text-sm text-slate-300">
            {t.services.web.features.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="glass-card border border-slate-700/60 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-white">
            {t.services.acc.title}
          </h2>
          <ul className="space-y-2 text-sm text-slate-300">
            {t.services.acc.features.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </FadeUpSection>
    </PageWrapper>
  )
}

