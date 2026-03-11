import { useLanguage } from '../context/LanguageContext.jsx'
import { motion } from 'framer-motion'

export function Layout({ children, activePage, onChangePage }) {
  const { t, lang, toggleLanguage, dir } = useLanguage()

  return (
    <div className="app-root" data-dir={dir}>
      <motion.header
        className="nx-header"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nx-header-inner">
          <div
            className="nx-logo"
            onClick={() => onChangePage('landing')}
            role="button"
          >
            <span className="nx-logo-mark" />
            <span className="nx-logo-text">{t('brand')}</span>
          </div>

          <nav className="nx-nav">
            <button
              type="button"
              className={`nx-nav-link ${
                activePage === 'landing' ? 'nx-nav-link--active' : ''
              }`}
              onClick={() => onChangePage('landing')}
            >
              Home
            </button>
            <button
              type="button"
              className={`nx-nav-link ${
                activePage === 'admin' ? 'nx-nav-link--active' : ''
              }`}
              onClick={() => onChangePage('admin')}
            >
              Dashboard
            </button>
          </nav>

          <div className="nx-header-actions">
            <button
              type="button"
              className="nx-lang-toggle"
              onClick={toggleLanguage}
            >
              {t('languageLabel')}
            </button>
          </div>
        </div>
      </motion.header>

      <main className="nx-main">{children}</main>

      <footer className="nx-footer">
        <span>{t('tagline')}</span>
        <span className="nx-footer-meta">© {new Date().getFullYear()} NEXARA</span>
      </footer>
    </div>
  )
}

