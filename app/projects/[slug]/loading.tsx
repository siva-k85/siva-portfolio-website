export default function ProjectLoading() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-3/4 rounded-full bg-gray-200" />
        <div className="h-6 w-full rounded-full bg-gray-200" />
        <div className="space-y-4 pt-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-4 w-full rounded-full bg-gray-200" />
          ))}
        </div>
      </div>
    </main>
  )
}
