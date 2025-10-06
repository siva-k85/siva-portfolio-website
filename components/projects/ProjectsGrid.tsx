import { listProjects } from '@/lib/content'
import ProjectCard from '@/components/projects/ProjectCard'

interface ProjectsGridProps {
  limit?: number
  projects?: Awaited<ReturnType<typeof listProjects>>
  emptyMessage?: string
}

export default async function ProjectsGrid({ limit, projects, emptyMessage = 'Projects coming soon.' }: ProjectsGridProps) {
  const data = projects ?? (await listProjects())
  const items = limit ? data.slice(0, limit) : data

  if (items.length === 0) {
    return <p className="mt-8 text-center text-sm text-gray-500">{emptyMessage}</p>
  }

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(project => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
