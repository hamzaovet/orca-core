import { motion } from 'framer-motion'
import { MessageSquare } from './icons.jsx'

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/201118540111"
      target="_blank"
      rel="noopener noreferrer"
      animate={{
        scale: [1, 1.05, 1],
        boxShadow: [
          '0 0 0 0 rgba(37, 211, 102, 0)',
          '0 0 0 15px rgba(37, 211, 102, 0.2)',
          '0 0 0 0 rgba(37, 211, 102, 0)',
        ],
      }}
      transition={{ repeat: Infinity, duration: 2.5 }}
      whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center justify-center group"
    >
      <MessageSquare className="w-6 h-6" />
      <span className="absolute right-full mr-4 bg-[#0F172A] text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
        Chat with us
      </span>
    </motion.a>
  )
}

