import { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'

export default function Footer() {
  const { t } = useContext(AppContext)

  return (
    <footer className="border-t border-slate-800/80 bg-main/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <span>© {new Date().getFullYear()} NEXARA Studio. All rights reserved.</span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span>{t.dashboard.client.online}</span>
        </span>
      </div>
    </footer>
  )
}

