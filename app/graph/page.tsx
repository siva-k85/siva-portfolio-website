import { buildGraph } from '@/lib/graph'
import GraphRenderer from '@/components/graph/GraphRenderer'

export const dynamic = 'force-static'

export default async function GraphPage() {
  const data = await buildGraph()
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-4">Knowledge Graph</h1>
      <GraphRenderer data={data} />
    </main>
  )
}