import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center bg-gray-50 px-6 py-24 text-center">
      <div className="max-w-2xl rounded-3xl border border-gray-200 bg-white p-12 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">404 Error</p>
        <h1 className="mt-4 text-4xl font-semibold text-gray-900">This page is off the clinical pathway</h1>
        <p className="mt-4 text-base text-gray-600">
          The resource you’re looking for has been moved, renamed, or never existed. Let’s route you back to the
          portfolio so you can review case studies, notes, and credentials.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center rounded-2xl border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Go home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center rounded-2xl border border-gray-300 px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-gray-900 transition hover:-translate-y-0.5 hover:border-gray-500"
          >
            View projects
          </Link>
        </div>
      </div>
    </main>
  )
}
