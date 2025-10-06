'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import type { ForceGraphMethods } from 'react-force-graph-3d'
import type { GraphData } from '@/lib/graph'

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false })

interface Graph3DProps {
  data: GraphData
  focusId?: string | null
}

export default function Graph3D({ data, focusId }: Graph3DProps) {
  type ForceGraphInstance = ForceGraphMethods & {
    graphData: () => GraphData
    centerAt?: (x: number, y: number, ms?: number) => void
    zoom?: (scale: number, ms?: number) => void
  }
  const graphRef = useRef<ForceGraphInstance | undefined>(undefined)

  useEffect(() => {
    if (!focusId || !graphRef.current) return
    const graphData = graphRef.current.graphData()
    const node = graphData.nodes.find(item => item.id === focusId)
    if (node) {
      const { centerAt, zoom } = graphRef.current
      const position = node as unknown as { x?: number; y?: number }
      if (position.x !== undefined && position.y !== undefined) {
        centerAt?.(position.x, position.y, 1000)
      }
      zoom?.(4, 1000)
    }
  }, [focusId])

  return (
    <ForceGraph3D
      ref={graphRef}
      graphData={data}
      nodeLabel={node => {
        const cast = node as { id?: string | number }
        return cast.id?.toString() ?? ''
      }}
      nodeAutoColorBy={node => {
        const cast = node as { kind?: string }
        return cast.kind ?? 'tech'
      }}
      linkOpacity={0.35}
      onNodeClick={node => {
        const cast = node as { kind?: string; slug?: string }
        if (cast.kind === 'project' && cast.slug) window.location.assign(`/projects/${cast.slug}`)
      }}
    />
  )
}
