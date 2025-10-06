'use client'
import dynamic from 'next/dynamic'
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false })

export default function Graph3D({ data }: { data: any }) {
  return (
    <ForceGraph3D
      graphData={data}
      nodeLabel={(n:any)=>n.id}
      nodeAutoColorBy={(n:any)=>n.kind}
      linkOpacity={0.35}
      onNodeClick={(n:any)=>{
        if (n.kind==='project' && n.slug) window.location.assign(`/projects/${n.slug}`)
      }}
    />
  )
}