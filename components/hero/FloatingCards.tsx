'use client'
import { motion } from 'framer-motion'

const cards = [
  {
    title: 'ACGME compliance 296% ↑',
    description: 'Automated evaluation workflows for residency leadership.',
  },
  {
    title: 'Sepsis bundle < 60 min',
    description: 'Real-time command center alerts to bedside teams.',
  },
  {
    title: '$6.7M shared savings',
    description: 'Risk modeling aligned payor contracts with clinical action.',
  },
]

export default function FloatingCards() {
  return (
    <div className="relative h-80 w-full">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          className="absolute w-64 rounded-3xl border-2 border-gray-300 bg-white p-6 shadow-xl"
          style={{
            left: `${index * 30 + 5}%`,
            top: `${index * 40}px`,
            zIndex: 10 - index,
          }}
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.4, ease: 'easeInOut' }}
        >
          <p className="text-base font-bold text-gray-900 leading-snug">{card.title}</p>
          <p className="mt-3 text-sm text-gray-700 leading-relaxed">{card.description}</p>
        </motion.div>
      ))}
    </div>
  )
}
