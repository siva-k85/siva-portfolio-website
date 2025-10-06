'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Graph3D = dynamic(() => import('./Graph3D'), { ssr: false })
const Graph2D = dynamic(() => import('./Graph2D'), { ssr: false })

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

interface GraphRendererProps {
  data: any
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] rounded-2xl border">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading graph...</p>
        </div>
      </div>
    )
  }

  return render3D ? <Graph3D data={data} focusId={focusId} /> : <Graph2D data={data} focusId={focusId} />
}
