import { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config.js'

export default function Navbar({ isMenuOpen, setIsMenuOpen, toggleLang }) {

  const { t, dir, navigate, lang, user } = useContext(AppContext)

  const links = [
    { key: 'home', path: '/' },
    { key: 'services', path: '/services' },
    { key: 'portfolio', path: '/portfolio' },
    { key: 'contact', path: '/contact' }
  ]

  const isAdmin = user?.role === 'admin'

  const logout = async () => {
    await signOut(auth)
    navigate('/')
  }

  const handleLoginClick = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-slate-800/80 bg-main/80 backdrop-blur-xl">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-400 to-indigo-500 shadow-lg shadow-blue-500/40" />

          <div className="flex flex-col">
            <span className="text-xs tracking-[0.25em] uppercase text-slate-400">
              NEXARA
            </span>
            <span className="text-sm font-semibold text-slate-100">
              Digital Systems Studio
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">

          <div className="flex items-center gap-1 text-sm">
            {links.map((link) => (
              <button
                key={link.key}
                type="button"
                onClick={() => navigate(link.path)}
                className="px-3 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {t.nav[link.key]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={toggleLang}
              className="text-xs font-semibold tracking-[0.22em] uppercase border border-slate-700/80 rounded-full px-3 py-1 text-slate-200 hover:bg-white/5"
            >
              {lang === 'en' ? t.common.ar : t.common.en}
            </button>

            {!user && (
              <>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-xs px-3 py-1.5 rounded-full border border-slate-700 text-slate-200 hover:bg-white/5"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-xs px-3 py-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </>
            )}

            {user && !isAdmin && (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-xs px-3 py-1.5 rounded-full bg-blue-600 text-white"
                >
                  Dashboard
                </button>

                <button
                  onClick={logout}
                  className="text-xs px-3 py-1.5 rounded-full border border-red-500 text-red-400"
                >
                  Logout
                </button>
              </>
            )}

            {user && isAdmin && (
              <>
                <button
                  onClick={() => navigate('/admin')}
                  className="text-xs px-3 py-1.5 rounded-full bg-purple-600 text-white"
                >
                  Admin Panel
                </button>

                <button
                  onClick={logout}
                  className="text-xs px-3 py-1.5 rounded-full border border-red-500 text-red-400"
                >
                  Logout
                </button>
              </>
            )}

          </div>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-700/80 text-slate-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Toggle navigation</span>

          <span className="w-4 h-[1.5px] bg-slate-200 relative">
            <span className="absolute inset-x-0 -top-1.5 h-[1.5px] bg-slate-200" />
            <span className="absolute inset-x-0 top-1.5 h-[1.5px] bg-slate-200" />
          </span>
        </button>

      </nav>

      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-800/80 bg-main/95 backdrop-blur-xl">

          <div className="max-w-6xl mx-auto px-4 py-4 space-y-1">

            {links.map((link) => (
              <button
                key={link.key}
                type="button"
                onClick={() => navigate(link.path)}
                className="block w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 text-sm"
              >
                {t.nav[link.key]}
              </button>
            ))}

            {!user && (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="block w-full text-left px-3 py-2 text-sm"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate('/signup')}
                  className="block w-full text-left px-3 py-2 text-sm"
                >
                  Sign Up
                </button>
              </>
            )}

            {user && (
              <>
                <button
                  onClick={() => navigate(isAdmin ? '/admin' : '/dashboard')}
                  className="block w-full text-left px-3 py-2 text-sm"
                >
                  {isAdmin ? 'Admin Panel' : 'Dashboard'}
                </button>

                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 text-sm text-red-400"
                >
                  Logout
                </button>
              </>
            )}

          </div>

        </div>
      )}
    </header>
  )
}