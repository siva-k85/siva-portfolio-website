import { listNotes } from '@/lib/content'
import NotesExplorer from '@/components/notes/NotesExplorer'

export const dynamic = 'force-static'

export default async function NotesPage() {
  const items = await listNotes()
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold text-gray-900">Healthcare Analytics Notes</h1>
        <p className="mt-3 text-base text-gray-600">
          Field-tested frameworks for closing care gaps, governing AI, and scaling value-based care.
        </p>
      </div>
      <NotesExplorer notes={items} />
    </main>
  )
}
