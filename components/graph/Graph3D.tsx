'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false })

interface Graph3DProps {
  data: any
  focusId?: string | null
}

export default function Graph3D({ data, focusId }: Graph3DProps) {
  const graphRef = useRef<any>(null)

  useEffect(() => {
    if (!focusId || !graphRef.current) return
    const node = graphRef.current.graphData().nodes.find((n: any) => n.id === focusId)
    if (node) {
      graphRef.current.centerAt(node.x, node.y, 1000)
      graphRef.current.zoom(4, 1000)
    }
  }, [focusId])

  return (
    <ForceGraph3D
      ref={graphRef}
      graphData={data}
      nodeLabel={(n: any) => n.id}
      nodeAutoColorBy={(n: any) => n.kind}
      linkOpacity={0.35}
      onNodeClick={(n: any) => {
        if (n.kind === 'project' && n.slug) window.location.assign(`/projects/${n.slug}`)
      }}
    />
  )
}
