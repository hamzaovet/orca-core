import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { PageWrapper, FadeUpSection } from '../components/PageWrapper.jsx'
import { ExternalLink, Clock } from 'lucide-react'

/* ─────────────────────────────────────────────────
   Project data — copy keys match the locale JSON
───────────────────────────────────────────────── */
const projects = [
  {
    key: 'fullmark',
    url: 'https://fullmarkwork-portfolio.vercel.app/',
    image: 'https://i.postimg.cc/kDrPnTvX/Me.png',
    color: 'blue',
    live: true,
  },
  {
    key: 'lomda',
    url: 'https://lomda-website.vercel.app/',
    image: 'https://i.postimg.cc/T3L5N1pc/logo.jpg',
    color: 'cyan',
    live: true,
  },
  {
    key: 'tamer',
    url: 'https://tamer-hosny-ai-documentary.vercel.app/',
    image: 'https://i.postimg.cc/brcmrWWg/TAMER-HOSNY-The-Legacy.png',
    color: 'purple',
    live: true,
  },
  {
    key: 'ashraf',
    url: 'https://ashraf-tech-site.vercel.app/',
    image: 'https://i.postimg.cc/2SVnpTX1/logo.png',
    color: 'indigo',
    live: true,
  },
  {
    key: 'islam',
    url: 'https://islam-fawzy-website.vercel.app/',
    image: 'https://i.postimg.cc/XqkkJJwJ/logo.jpg',
    color: 'emerald',
    live: true,
  },
  {
    key: 'aboutrika',
    url: 'https://aboutrika-legend.vercel.app/',
    image: 'https://i.postimg.cc/FHmwDdWH/trykt.jpg',
    color: 'amber',
    live: true,
  },
  {
    key: 'accounting',
    url: null,
    image: null,
    color: 'slate',
    live: false,
  },
]

const colorMap = {
  blue:    { badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',       overlay: 'from-blue-900/60 to-blue-800/30',    card: 'hover:border-blue-500/40' },
  cyan:    { badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',        overlay: 'from-cyan-900/60 to-cyan-800/30',    card: 'hover:border-cyan-500/40' },
  purple:  { badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',  overlay: 'from-purple-900/60 to-purple-800/30', card: 'hover:border-purple-500/40' },
  indigo:  { badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',  overlay: 'from-indigo-900/60 to-indigo-800/30', card: 'hover:border-indigo-500/40' },
  emerald: { badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',overlay:'from-emerald-900/60 to-emerald-800/30',card:'hover:border-emerald-500/40' },
  amber:   { badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',     overlay: 'from-amber-900/60 to-amber-800/30',   card: 'hover:border-amber-500/40' },
  slate:   { badge: 'bg-slate-500/10 text-slate-400 border-slate-500/20',     overlay: 'from-slate-900/60 to-slate-800/30',   card: 'hover:border-slate-500/40' },
}

function ProjectCard({ project, p }) {
  const c = colorMap[project.color]
  const isComingSoon = !project.live

  return (
    <FadeUpSection className={`glass-card border border-slate-700/60 overflow-hidden flex flex-col transition-all duration-300 group ${c.card}`}>

      {/* ── Preview image area ── */}
      <div className="relative h-48 overflow-hidden bg-slate-900/80">
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={p.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
            />
            {/* Fallback shown if image fails */}
            <div className={`hidden w-full h-full bg-gradient-to-br ${c.overlay} items-center justify-center`}>
              <span className="text-slate-400 text-xs uppercase tracking-widest">{p.title}</span>
            </div>
          </>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${c.overlay} flex items-center justify-center`}>
            <span className="text-slate-400 text-xs uppercase tracking-widest">{p.title}</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

        {/* Status badge */}
        {isComingSoon ? (
          <div className="absolute top-3 end-3 flex items-center gap-1.5 bg-slate-800/90 border border-slate-600/50 text-slate-300 text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            <Clock className="w-3 h-3" /> Coming Soon
          </div>
        ) : (
          <div className="absolute top-3 end-3 flex items-center gap-1.5 bg-green-900/80 border border-green-500/40 text-green-300 text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live
          </div>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        <div>
          <span className={`inline-block text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full border ${c.badge} mb-2`}>
            {p.category}
          </span>
          <h2 className="text-lg font-bold text-white">{p.title}</h2>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed flex-1">{p.desc}</p>

        {project.live ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition mt-2"
          >
            <ExternalLink className="w-4 h-4" />
            View Live Demo
          </a>
        ) : (
          <div className="inline-flex items-center gap-2 bg-white/5 text-slate-500 text-sm font-medium py-2.5 px-4 rounded-lg mt-2 cursor-default select-none">
            <Clock className="w-4 h-4" /> In Development
          </div>
        )}
      </div>
    </FadeUpSection>
  )
}

export default function PortfolioPage() {
  const { t, navigate } = useContext(AppContext)
  const po = t.portfolio

  return (
    <PageWrapper className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs uppercase tracking-widest font-semibold">
          {po.badge}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{po.title}</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">{po.subtitle}</p>
      </div>

      {/* Project grid — 2 columns on md+, 3 on xl */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.key}
            project={project}
            p={po.projects[project.key]}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center space-y-3">
        <p className="text-slate-400">{po.ctaText}</p>
        <button
          type="button"
          onClick={() => navigate('/contact')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-xl transition"
        >
          {po.ctaBtn}
        </button>
      </div>

    </PageWrapper>
  )
}
