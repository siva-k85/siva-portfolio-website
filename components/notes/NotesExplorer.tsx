'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Front } from '@/lib/content'

interface NotesExplorerProps {
  notes: Front[]
}

function formatDate(date?: string) {
  if (!date) return ''
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return ''
  return parsed.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function NotesExplorer({ notes }: NotesExplorerProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const tags = useMemo(() => {
    const values = new Set<string>()
    notes.forEach(note => (note.tags || []).forEach(tag => values.add(tag)))
    return Array.from(values).sort()
  }, [notes])

  const filtered = selectedTag ? notes.filter(note => (note.tags || []).includes(selectedTag)) : notes

  return (
    <div className="mt-8">
      {tags.length > 0 && (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Filter by tag</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map(tag => {
              const active = selectedTag === tag
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(active ? null : tag)}
                  className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide transition ${
                    active ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tag}
                </button>
              )
            })}
            {selectedTag && (
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className="rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-700 hover:border-gray-400"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
      <p className="mt-6 text-sm text-gray-500">
        Showing {filtered.length} of {notes.length} articles {selectedTag ? `· Tag: ${selectedTag}` : ''}
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {filtered.map(note => (
          <Link
            key={note.slug}
            href={`/notes/${note.slug}`}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{formatDate(note.date)}</p>
            <h2 className="mt-3 text-2xl font-semibold text-gray-900">{note.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">{note.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(note.tags || []).slice(0, 4).map(tag => (
                <span key={tag} className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-700">
                  {tag}
                </span>
              ))}
            </div>
            <span className="mt-6 inline-block text-sm font-medium text-gray-900">Read article →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
