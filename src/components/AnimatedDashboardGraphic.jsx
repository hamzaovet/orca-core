import { motion } from 'framer-motion'

export default function AnimatedDashboardGraphic() {
  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
      <motion.div
        initial={{ rotateX: 18, rotateY: -18, opacity: 0, y: 40 }}
        animate={{ rotateX: 18, rotateY: -18, opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative bg-slate-900/80 border border-slate-700/70 rounded-2xl p-5 shadow-2xl shadow-blue-500/20"
      >
        <div className="flex items-center justify-between mb-4 text-xs text-slate-400">
          <span className="font-semibold tracking-[0.2em] uppercase">
            NEXARA OS
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            Live
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="col-span-2 h-24 rounded-xl bg-gradient-to-br from-blue-500/40 via-indigo-500/40 to-cyan-400/20 border border-blue-400/30" />
          <div className="h-24 rounded-xl bg-slate-900/70 border border-slate-700/80" />
        </div>
        <div className="grid grid-cols-4 gap-2 text-[10px] text-slate-400">
          <div className="h-10 rounded-lg bg-slate-900/80 border border-slate-700/80" />
          <div className="h-10 rounded-lg bg-slate-900/80 border border-slate-700/80" />
          <div className="h-10 rounded-lg bg-slate-900/80 border border-slate-700/80" />
          <div className="h-10 rounded-lg bg-slate-900/80 border border-slate-700/80" />
        </div>
      </motion.div>
    </div>
  )
}

