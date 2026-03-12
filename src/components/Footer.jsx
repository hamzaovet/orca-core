import { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'

export default function Footer() {
  const { t, navigate } = useContext(AppContext)
  const f = t.footer

  const links = [
    { key: 'services',  path: '/services' },
    { key: 'portfolio', path: '/portfolio' },
    { key: 'pricing',   path: '/pricing' },
    { key: 'contact',   path: '/contact' },
    { key: 'terms',     path: '/terms' },
    { key: 'privacy',   path: '/privacy' },
  ]

  return (
    <footer className="border-t border-slate-800/80 bg-main/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 via-cyan-400 to-indigo-500" />
            <span className="text-sm font-semibold text-slate-300">{f.brand}</span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            {links.map((link) => (
              <button key={link.key} onClick={() => navigate(link.path)} className="hover:text-slate-300 transition">
                {f.links[link.key]}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-xs text-slate-600">
            © {new Date().getFullYear()} {f.copy}
          </div>

        </div>
      </div>
    </footer>
  )
}
