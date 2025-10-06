'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ProjectsGrid({ limit }: { limit?: number }) {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(console.error)
  }, [])

  const displayProjects = limit ? projects.slice(0, limit) : projects

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {displayProjects.map(project => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="group rounded-2xl border p-6 transition-all hover:shadow-lg"
        >
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="mt-2 text-sm opacity-70">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies?.slice(0, 3).map((tech: string) => (
              <span key={tech} className="text-xs rounded-full bg-gray-100 px-2 py-1">
                {tech}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  )
}