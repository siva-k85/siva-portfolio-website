export default function ProjectsListingLoading() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-48 rounded-full bg-gray-200" />
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="h-6 w-2/3 rounded-full bg-gray-200" />
              <div className="mt-4 h-4 w-full rounded-full bg-gray-200" />
              <div className="mt-2 h-4 w-3/4 rounded-full bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
