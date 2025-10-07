'use client'
import { motion } from 'framer-motion'

const cards = [
  {
    title: 'ACGME compliance 296% ↑',
    description: 'Automated evaluation workflows for residency leadership.',
    color: 'from-blue-50 to-blue-100',
    borderColor: 'border-blue-200',
  },
  {
    title: 'Sepsis bundle < 60 min',
    description: 'Real-time command center alerts to bedside teams.',
    color: 'from-purple-50 to-purple-100',
    borderColor: 'border-purple-200',
  },
  {
    title: '$6.7M shared savings',
    description: 'Risk modeling aligned payor contracts with clinical action.',
    color: 'from-green-50 to-green-100',
    borderColor: 'border-green-200',
  },
]

export default function FloatingCards() {
  return (
    <div className="relative h-96 w-full">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          className={`absolute w-72 rounded-3xl border-2 ${card.borderColor} bg-gradient-to-br ${card.color} p-6 shadow-xl`}
          initial={{
            left: `${5 + index * 35}%`,
            top: `${20 + index * 80}px`,
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [-1, 1, -1],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4 + index * 0.5,
            repeat: Infinity,
            delay: index * 0.3,
            ease: 'easeInOut'
          }}
          style={{
            zIndex: 30 - index * 10,
            position: 'absolute',
            left: `${5 + index * 35}%`,
            top: `${20 + index * 80}px`,
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
        >
          <p className="text-lg font-bold text-gray-900 leading-tight">{card.title}</p>
          <p className="mt-3 text-sm text-gray-800 leading-relaxed font-medium">{card.description}</p>
        </motion.div>
      ))}
    </div>
  )
}
