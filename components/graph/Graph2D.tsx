'use client'
import cytoscape from 'cytoscape'
import elk from 'cytoscape-elk'
import { useEffect, useRef } from 'react'
cytoscape.use(elk as any)

export default function Graph2D({ data }:{data:any}) {
  const ref = useRef<HTMLDivElement|null>(null)
  useEffect(()=>{
    if(!ref.current) return
    const elements = [
      ...data.nodes.map((n:any)=>({ data:{ id:n.id, label:n.id, kind:n.kind } })),
      ...data.links.map((l:any)=>({ data:{ id:`${l.source}->${l.target}`, source:l.source, target:l.target } }))
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
    return ()=>cy.destroy()
  },[data])
  return <div ref={ref} className="w-full h-[70vh] rounded-2xl border" />
}