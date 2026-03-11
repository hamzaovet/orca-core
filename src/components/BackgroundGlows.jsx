import { motion } from 'framer-motion'

export default function BackgroundGlows() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-900/20 blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2], y: [0, 100, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-cyan-900/20 blur-[120px]"
      />
    </div>
  )
}

