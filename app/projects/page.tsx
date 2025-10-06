import { listProjects } from '@/lib/content'
import ProjectsExplorer from '@/components/projects/ProjectsExplorer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Siva Komaragiri',
  description: 'Detailed case studies covering clinical quality, value-based care, operational transformation, and AI safety.',
}

export const dynamic = 'force-static'

export default async function ProjectsPage() {
  const items = await listProjects()
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold text-gray-900">Projects</h1>
        <p className="mt-3 text-base text-gray-600">
          Detailed case studies covering clinical quality, value-based care, operational transformation, and AI safety.
        </p>
      </div>
      <ProjectsExplorer projects={items} />
    </main>
  )
}
