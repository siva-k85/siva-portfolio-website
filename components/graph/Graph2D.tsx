'use client'
import cytoscape from 'cytoscape'
import elk from 'cytoscape-elk'
import { useEffect, useRef } from 'react'
import type { GraphData } from '@/lib/graph'

cytoscape.use(elk as any)

interface Graph2DProps {
  data: GraphData
  focusId?: string | null
}

export default function Graph2D({ data, focusId }: Graph2DProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const cyRef = useRef<cytoscape.Core | null>(null)
  useEffect(()=>{
    if(!ref.current) return
    const elements = [
      ...data.nodes.map(node => ({ data: { id: node.id, label: node.id, kind: node.kind } })),
      ...data.links.map(link => ({ data: { id: `${link.source}->${link.target}`, source: link.source, target: link.target } }))
    ]
    const cy = cytoscape({
      container: ref.current,
      elements,
      layout: { name:'elk', algorithm:'layered' } as any,
      style: [
        { selector: 'node', style: { 'label':'data(label)','text-margin-y':-6,'width':24,'height':24,'background-color':'#999' } },
        { selector: 'edge', style: { 'opacity':0.35,'curve-style':'bezier','target-arrow-shape':'triangle' } }
      ]
    })
    cyRef.current = cy
    return ()=>cy.destroy()
  },[data])
  useEffect(() => {
    if (!focusId || !cyRef.current) return
    const node = cyRef.current.$id(focusId)
    if (node.nonempty()) {
      node.select()
      cyRef.current.center(node)
      cyRef.current.animate({ zoom: 1.4, center: { eles: node } }, { duration: 600 })
    }
  }, [focusId])
  return <div ref={ref} className="w-full h-[70vh] rounded-2xl border" />
}
