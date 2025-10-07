'use client'

import dynamic from 'next/dynamic'

const HeroBackground = dynamic(() => import('./Hero3D'), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 -z-10 animate-pulse bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"
      aria-hidden="true"
    />
  )
})

export default function HeroCanvas() {
  return <HeroBackground />
}
