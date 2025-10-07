'use client'
import dynamic from 'next/dynamic'

const SimpleHeroBackground = dynamic(() => import('./SimpleHeroBackground'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-100 animate-pulse" aria-hidden="true" />
  )
})

export default function HeroCanvas() {
  return <SimpleHeroBackground />
}