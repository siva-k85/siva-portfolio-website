'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import ErrorBoundary from '@/components/ui/ErrorBoundary'

const SimpleHeroBackground = dynamic(() => import('./SimpleHeroBackground'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-100 animate-pulse" aria-hidden="true" />
  )
})

const Hero3D = dynamic(() => import('./Hero3D').catch(() => {
  // If Hero3D fails to load, return null
  return { default: () => null }
}), {
  ssr: false,
  loading: () => null
})

type RenderMode = 'loading' | '3d-high' | '3d-low' | 'static'

function detectWebGLSupport() {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!gl
  } catch {
    return false
  }
}

export default function HeroCanvas() {
  const prefersReducedMotion = useReducedMotion()
  const [mode, setMode] = useState<RenderMode>('loading')

  useEffect(() => {
    if (prefersReducedMotion) {
      setMode('static')
      return
    }

    if (!detectWebGLSupport()) {
      setMode('static')
      return
    }

    let isActive = true
    let frames = 0
    const start = performance.now()

    const measure = (timestamp: number) => {
      if (!isActive) return
      frames += 1
      if (timestamp - start < 1000) {
        requestAnimationFrame(measure)
      } else {
        const fps = frames
        setMode(fps < 30 ? '3d-low' : '3d-high')
      }
    }

    requestAnimationFrame(measure)

    return () => {
      isActive = false
    }
  }, [prefersReducedMotion])

  if (mode === 'static') {
    return (
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-100" aria-hidden="true" />
    )
  }

  if (mode === 'loading') {
    return (
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-100 animate-pulse" aria-hidden="true" />
    )
  }

  return (
    <ErrorBoundary
      fallback={
        <SimpleHeroBackground />
      }
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Hero3D quality={mode === '3d-low' ? 'low' : 'high'} />
        {/* If Hero3D doesn't render, show SimpleHeroBackground */}
        <SimpleHeroBackground />
      </div>
    </ErrorBoundary>
  )
}
