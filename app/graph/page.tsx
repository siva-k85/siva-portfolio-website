import { buildGraph } from '@/lib/graph'
import GraphRenderer from '@/components/graph/GraphRenderer'

export const dynamic = 'force-static'

export default async function GraphPage({
  searchParams,
}: {
  searchParams: Promise<{ focus?: string }>
}) {
  const data = await buildGraph()
  const { focus } = await searchParams
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-4">Knowledge Graph</h1>
      <GraphRenderer data={data} focusId={focus || null} />
    </main>
  )
}
