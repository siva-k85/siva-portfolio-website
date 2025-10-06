'use client'
import Link from 'next/link'
import type { Front } from '@/lib/content'
import { trackEvent } from '@/lib/analytics'

interface ProjectCardProps {
  project: Front
}

function formatDate(date?: string) {
  if (!date) return ''
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return ''
  return parsed.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      onClick={() =>
        trackEvent('project_card_click', {
          props: {
            slug: project.slug,
            title: project.title,
          },
        })
      }
      className="group relative flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-gray-400">
        <span>{project.role?.[0] ?? 'Healthcare Analytics'}</span>
        <span>{formatDate(project.date)}</span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-gray-900">{project.title}</h3>
      <p className="mt-3 text-sm leading-6 text-gray-600">{project.summary || project.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {(project.tech || []).slice(0, 3).map(tech => (
          <span
            key={tech}
            className="rounded-full bg-gray-900/90 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white"
          >
            {tech}
          </span>
        ))}
      </div>
      <span className="mt-auto pt-6 text-sm font-medium text-gray-900">Read case study →</span>
    </Link>
  )
}
