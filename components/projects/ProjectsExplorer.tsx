'use client'
import { useMemo, useState } from 'react'
import type { Front } from '@/lib/content'
import ProjectCard from '@/components/projects/ProjectCard'

interface ProjectsExplorerProps {
  projects: Front[]
}

export default function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  const techOptions = useMemo(() => {
    const values = new Set<string>()
    projects.forEach(project => (project.tech || []).forEach(tech => values.add(tech)))
    return Array.from(values).sort()
  }, [projects])

  const skillOptions = useMemo(() => {
    const values = new Set<string>()
    projects.forEach(project => (project.skills || []).forEach(skill => values.add(skill)))
    return Array.from(values).sort()
  }, [projects])

  const filtered = projects.filter(project => {
    const matchesTech = selectedTech ? (project.tech || []).includes(selectedTech) : true
    const matchesSkill = selectedSkill ? (project.skills || []).includes(selectedSkill) : true
    return matchesTech && matchesSkill
  })

  const resetFilters = () => {
    setSelectedTech(null)
    setSelectedSkill(null)
  }

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="min-w-[200px]">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Filter by tech</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {techOptions.map(option => {
              const active = selectedTech === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedTech(active ? null : option)}
                  className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide transition ${
                    active ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
        <div className="min-w-[200px]">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Filter by skill</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {skillOptions.map(option => {
              const active = selectedSkill === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedSkill(active ? null : option)}
                  className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide transition ${
                    active ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
        {(selectedTech || selectedSkill) && (
          <button
            type="button"
            onClick={resetFilters}
            className="self-start rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-700 hover:border-gray-400"
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Showing {filtered.length} of {projects.length} case studies
        {selectedTech && ` · Tech: ${selectedTech}`}
        {selectedSkill && ` · Skill: ${selectedSkill}`}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
