import type { Metadata } from 'next'
import Link from 'next/link'
import { listProjects, listNotes } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Search — Siva Komaragiri',
  description: 'Search projects, healthcare analytics notes, and content across the portfolio.',
}

function matchesQuery(value: string | string[] | undefined, query: string) {
  if (!query || !value) return false
  const haystack = Array.isArray(value) ? value.join(' ') : value
  return haystack.toLowerCase().includes(query.toLowerCase())
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q = '' } = await searchParams
  const query = q.trim()

  const [projects, notes] = await Promise.all([listProjects(), listNotes()])

  const projectMatches = query
    ? projects.filter(project =>
        matchesQuery(project.title, query) ||
        matchesQuery(project.summary, query) ||
        matchesQuery(project.tech, query) ||
        matchesQuery(project.skills, query)
      )
    : []

  const noteMatches = query
    ? notes.filter(note =>
        matchesQuery(note.title, query) ||
        matchesQuery(note.summary, query) ||
        matchesQuery((note as any).tags, query)
      )
    : []

  const hasResults = projectMatches.length > 0 || noteMatches.length > 0

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold text-gray-900">Search</h1>
      <p className="mt-2 text-base text-gray-600">Find case studies, notes, and insights across the portfolio.</p>

      <form className="mt-8" method="get" action="/search">
        <label htmlFor="query" className="sr-only">
          Search term
        </label>
        <div className="flex max-w-xl overflow-hidden rounded-3xl border border-gray-300 bg-white shadow-sm">
          <input
            id="query"
            name="q"
            defaultValue={query}
            placeholder="Search for EMMA, sepsis, value-based care…"
            className="w-full bg-transparent px-5 py-4 text-base text-gray-900 outline-none"
          />
          <button
            type="submit"
            className="rounded-none border-l border-gray-200 bg-gray-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white"
          >
            Search
          </button>
        </div>
      </form>

      {query && (
        <p className="mt-6 text-sm text-gray-500">
          Showing results for <span className="font-semibold text-gray-900">“{query}”</span>
        </p>
      )}

      {query && !hasResults && (
        <div className="mt-12 rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-900">No results found</p>
          <p className="mt-2 text-sm text-gray-600">
            Try searching for a project name, clinical problem, or technology (e.g., “sepsis”, “dbt”).
          </p>
        </div>
      )}

      {projectMatches.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900">Projects</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {projectMatches.map(project => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Project</p>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(project.tech || []).slice(0, 3).map(tag => (
                    <span key={tag} className="rounded-full bg-gray-900/90 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {noteMatches.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900">Notes</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {noteMatches.map(note => (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}`}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Insight</p>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">{note.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{note.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(note.tags || []).slice(0, 3).map(tag => (
                    <span key={tag} className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
