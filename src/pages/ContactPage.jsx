import { useContext } from 'react'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext.jsx'
import { PageWrapper, FadeUpSection } from '../components/PageWrapper.jsx'
import { MessageCircle } from 'lucide-react'

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Nexara Team 👋\n\nI'm interested in building a website or digital system for my business.\n\nCould you please tell me:\n• Pricing\n• Estimated delivery time\n• What information you need to start\n\nThank you."
)
export const WHATSAPP_URL = `https://wa.me/201118540111?text=${WHATSAPP_MESSAGE}`

const highlights = [
  { emoji: '🚀', label: 'Fast Delivery' },
  { emoji: '💎', label: 'Premium Quality' },
  { emoji: '🔒', label: 'Secure & Reliable' },
  { emoji: '🌍', label: 'Served Globally' },
]

export default function ContactPage() {
  const { t } = useContext(AppContext)
  const c = t.contact

  return (
    <PageWrapper className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

      {/* Header */}
      <div className="text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs uppercase tracking-widest font-semibold">
          {c.badge}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{c.title}</h1>
        <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">{c.desc}</p>
      </div>

      {/* Main WhatsApp CTA card */}
      <FadeUpSection>
        <div className="glass-card border border-green-500/20 bg-green-500/5 p-10 md:p-14 flex flex-col items-center gap-8 text-center rounded-3xl">

          {/* Icon */}
          <div className="w-24 h-24 rounded-3xl bg-[#25D366] flex items-center justify-center shadow-2xl shadow-green-900/50">
            <MessageCircle className="w-12 h-12 text-white" />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">Start a conversation on WhatsApp</h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Send us a message and we'll respond within a few hours. A pre-filled message is ready for you.
            </p>
          </div>

          {/* WhatsApp button */}
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bc5a] text-white font-bold py-5 px-12 rounded-2xl transition-colors shadow-xl shadow-green-900/40 text-xl"
          >
            <MessageCircle className="w-7 h-7" />
            {c.whatsappBtn}
          </motion.a>

          <p className="text-slate-500 text-sm">Tap the button — a message will open automatically in WhatsApp.</p>
        </div>
      </FadeUpSection>

      {/* Trust highlights */}
      <FadeUpSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map(({ emoji, label }) => (
            <div key={label} className="glass-card border border-slate-700/60 p-5 rounded-2xl flex flex-col items-center gap-2 text-center hover:border-slate-500/80 transition-colors">
              <span className="text-3xl">{emoji}</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
      </FadeUpSection>

    </PageWrapper>
  )
}
