import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { PageWrapper, FadeUpSection } from '../components/PageWrapper.jsx'
import { Clock, Shield } from 'lucide-react'

const tierKeys = ['landing', 'business', 'advanced', 'ecommerce', 'accounting']
const highlighted = 'advanced'

const FeatureCheck = ({ text }) => (
  <li className="flex items-start gap-2 text-sm text-slate-300">
    <span className="text-green-400 font-bold flex-shrink-0 mt-0.5">✓</span>
    <span>{text}</span>
  </li>
)

export default function Pricing() {
  const { t, navigate } = useContext(AppContext)
  const p = t.pricing

  return (
    <PageWrapper className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs uppercase tracking-widest font-semibold">
          {p.badge}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white">{p.title}</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">{p.subtitle}</p>
      </div>

      {/* Pricing grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tierKeys.map((key) => {
          const tier = p.tiers[key]
          const isHighlighted = key === highlighted
          return (
            <FadeUpSection
              key={key}
              className={`glass-card flex flex-col gap-6 p-8 rounded-2xl border transition-all relative ${
                isHighlighted
                  ? 'border-blue-500 ring-1 ring-blue-500/30 bg-blue-900/10'
                  : 'border-slate-800 hover:border-slate-600'
              }`}
            >
              {isHighlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  {p.popular}
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-white mb-1">{tier.name}</h2>
                <p className="text-slate-400 text-sm leading-relaxed">{tier.desc}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className={`text-3xl font-extrabold ${isHighlighted ? 'text-blue-400' : 'text-white'}`}>
                  {tier.price}
                </span>
                <span className="text-slate-500 text-sm">{p.currency}</span>
              </div>

              {/* Meta */}
              <div className="flex flex-col gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {tier.delivery}</span>
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> {tier.support}</span>
              </div>

              {/* Features */}
              <ul className="space-y-2 flex-1">
                {tier.features.map((f) => <FeatureCheck key={f} text={f} />)}
              </ul>

              <button
                type="button"
                onClick={() => navigate('/contact')}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition ${
                  isHighlighted
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {p.getStarted}
              </button>
            </FadeUpSection>
          )
        })}
      </div>

      {/* Footer note */}
      <div className="text-center space-y-3">
        <p className="text-slate-400 text-sm">{p.note}</p>
        <button
          type="button"
          onClick={() => navigate('/contact')}
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition"
        >
          {p.customLink}
        </button>
      </div>

    </PageWrapper>
  )
}