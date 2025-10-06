import { listProjects } from '@/lib/content'

export const dynamic = 'force-static'

export default async function ProjectsPage() {
  const items = await listProjects()
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-semibold mb-6">Projects</h1>
      <ul className="grid gap-6 md:grid-cols-2">
        {items.map(p=>(
          <li key={p.slug} className="rounded-2xl border p-5">
            <a href={`/projects/${p.slug}`} className="text-2xl font-medium">{p.title}</a>
            <p className="opacity-80 mt-2">{p.summary}</p>
            <div className="mt-3 text-sm opacity-70">{(p.tech||[]).join(' · ')}</div>
          </li>
        ))}
      </ul>
    </main>
  )
}