interface ProjectsGridSkeletonProps {
  count?: number
}

export default function ProjectsGridSkeleton({ count = 6 }: ProjectsGridSkeletonProps) {
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="h-4 w-24 rounded-full bg-gray-200" />
          <div className="mt-4 h-6 w-3/4 rounded-full bg-gray-200" />
          <div className="mt-2 h-6 w-2/3 rounded-full bg-gray-200" />
          <div className="mt-6 flex gap-2">
            <span className="h-7 w-20 rounded-full bg-gray-200" />
            <span className="h-7 w-16 rounded-full bg-gray-200" />
            <span className="h-7 w-14 rounded-full bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  )
}
