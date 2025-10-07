'use client'
import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import type { GraphData } from '@/lib/graph'

const Graph3D = dynamic(() => import('./Graph3D'), { ssr: false })
const Graph2D = dynamic(() => import('./Graph2D'), { ssr: false })

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

interface GraphRendererProps {
  data: GraphData
  focusId?: string | null
}

export default function GraphRenderer({ data, focusId }: GraphRendererProps) {
  const [render3D, setRender3D] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const isMobile = window.innerWidth < 768

    if (supportsWebGL() && !prefersReducedMotion && !isMobile) {
      setRender3D(true)
    }
    setLoading(false)
  }, [])

  const containerClasses = useMemo(
    () =>
      [
        'relative h-[70vh] w-full overflow-hidden rounded-3xl border border-slate-800/60',
        'bg-slate-950/80 shadow-[0_40px_120px_-60px_rgba(56,189,248,0.5)]',
        'transition-all duration-700 ease-out backdrop-blur-sm'
      ].join(' '),
    []
  )

  if (loading) {
    return (
      <div className={containerClasses}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_rgba(15,23,42,0.9))]" />
        <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(120deg,rgba(59,130,246,0.18)_0%,rgba(14,165,233,0.12)_45%,rgba(59,130,246,0.15)_100%)]" />
        <div className="relative flex h-full flex-col items-center justify-center gap-6 text-slate-200">
          <div className="h-16 w-16 animate-spin rounded-full border-2 border-slate-700 border-b-sky-400" />
          <div className="text-center">
            <p className="text-lg font-semibold tracking-wide">Mapping knowledge universe</p>
            <p className="mt-1 text-sm text-slate-400">
              Activating interactive graph experience…
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={containerClasses}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-40 [background-image:linear-gradient(135deg,rgba(56,189,248,0.35),rgba(129,140,248,0.3))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(14,165,233,0.22),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.2),rgba(2,6,23,0.65))]" />
      <div className="pointer-events-none absolute inset-x-8 top-6 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-10 w-px bg-gradient-to-b from-transparent via-slate-700/60 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-10 w-px bg-gradient-to-b from-transparent via-slate-700/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.18),_rgba(15,23,42,0.82)_55%,_rgba(15,23,42,0.95)_80%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[length:56px] opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[length:56px] opacity-30" />
      <div className="relative h-full w-full">
        {render3D ? (
          <Graph3D data={data} focusId={focusId} />
        ) : (
          <Graph2D data={data} focusId={focusId} />
        )}
      </div>
    </div>
  )
}
