import { listNotes } from '@/lib/content'

export const dynamic = 'force-static'

export default async function NotesPage() {
  const items = await listNotes()
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-semibold mb-6">Notes</h1>
      <ul className="grid gap-6 md:grid-cols-2">
        {items.map(n=>(
          <li key={n.slug} className="rounded-2xl border p-5">
            <a href={`/notes/${n.slug}`} className="text-2xl font-medium">{n.title}</a>
            <p className="opacity-80 mt-2">{n.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}