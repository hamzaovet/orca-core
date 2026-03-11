import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext.jsx'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export function LandingPage() {
  const { t } = useLanguage()

  return (
    <div className="nx-landing">
      <motion.section
        className="nx-hero"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="nx-hero-text" variants={itemVariants}>
          <p className="nx-eyebrow">NEXARA</p>
          <h1 className="nx-hero-title">{t('heroTitle')}</h1>
          <p className="nx-hero-subtitle">{t('heroSubtitle')}</p>
          <div className="nx-hero-actions">
            <button type="button" className="nx-btn nx-btn-primary">
              {t('getStarted')}
            </button>
            <button type="button" className="nx-btn nx-btn-ghost">
              {t('viewDashboard')}
            </button>
          </div>
        </motion.div>

        <motion.div
          className="nx-hero-visual"
          variants={itemVariants}
          transition={{ delay: 0.15 }}
        >
          <div className="nx-hero-grid">
            <div className="nx-hero-card nx-hero-card--primary">
              <span className="nx-dot nx-dot--green" />
              <span className="nx-dot nx-dot--purple" />
              <span className="nx-dot nx-dot--blue" />
            </div>
            <div className="nx-hero-card nx-hero-card--secondary" />
            <div className="nx-hero-card nx-hero-card--accent" />
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className="nx-section nx-features"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="nx-section-header">
          <h2>{t('featuresTitle')}</h2>
        </div>
        <div className="nx-features-grid">
          <motion.div
            className="nx-feature-card"
            whileHover={{ y: -6, scale: 1.01 }}
          >
            <h3>{t('feature1Title')}</h3>
            <p>{t('feature1Body')}</p>
          </motion.div>
          <motion.div
            className="nx-feature-card"
            whileHover={{ y: -6, scale: 1.01 }}
          >
            <h3>{t('feature2Title')}</h3>
            <p>{t('feature2Body')}</p>
          </motion.div>
          <motion.div
            className="nx-feature-card"
            whileHover={{ y: -6, scale: 1.01 }}
          >
            <h3>{t('feature3Title')}</h3>
            <p>{t('feature3Body')}</p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

