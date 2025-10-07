'use client'
import { motion } from 'framer-motion'

const cards = [
  {
    title: 'ACGME compliance 296% ↑',
    description: 'Automated evaluation workflows for residency leadership.',
    icon: '📊',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Sepsis bundle < 60 min',
    description: 'Real-time command center alerts to bedside teams.',
    icon: '⚡',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    title: '$6.7M shared savings',
    description: 'Risk modeling aligned payor contracts with clinical action.',
    icon: '💰',
    gradient: 'from-green-500 to-green-600',
  },
]

const floatingAnimation = {
  y: [-2, 2, -2],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
}

export default function FloatingCards() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 lg:justify-between">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          className="flex-1 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 shadow-lg hover:shadow-2xl dark:shadow-blue-500/10 transition-all duration-300 backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            ...floatingAnimation
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            y: {
              ...floatingAnimation.transition,
              delay: index * 0.3
            }
          }}
          whileHover={{
            y: -8,
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <motion.div
            className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} mb-4 shadow-lg`}
            whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
          >
            <span className="text-2xl">{card.icon}</span>
          </motion.div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
            {card.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {card.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}