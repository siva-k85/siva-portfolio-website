export default function NoteLoading() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-2/3 rounded-full bg-gray-200" />
        <div className="h-5 w-full rounded-full bg-gray-200" />
        <div className="space-y-4 pt-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-3.5 w-full rounded-full bg-gray-200" />
          ))}
        </div>
      </div>
    </main>
  )
}
