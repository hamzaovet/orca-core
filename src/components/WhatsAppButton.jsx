import { useLanguage } from '../context/LanguageContext.jsx'
import { motion } from 'framer-motion'

export function WhatsAppButton({ phoneNumber }) {
  const { t, dir } = useLanguage()

  const href = `https://wa.me/${phoneNumber}`

  const isRtl = dir === 'rtl'

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`nx-whatsapp-btn ${isRtl ? 'nx-whatsapp-btn--rtl' : ''}`}
      initial={{ y: 80, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
    >
      <span className="nx-whatsapp-icon" aria-hidden="true" />
      <span>{t('contactWhatsApp')}</span>
    </motion.a>
  )
}

