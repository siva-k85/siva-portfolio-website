'use client'
import { useState } from 'react'
import EnhancedProjectCard from './EnhancedProjectCard'
import { projects, Project } from '@/data/projects'

type Category = 'all' | Project['category']

export default function EnhancedProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')

  const categories: { value: Category; label: string }[] = [
    { value: 'all', label: 'All Projects' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'ai', label: 'AI & ML' },
    { value: 'systems', label: 'Systems' },
  ]

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat.value
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.label}
            <span className="ml-2 text-xs opacity-70">
              ({cat.value === 'all' ? projects.length : projects.filter(p => p.category === cat.value).length})
            </span>
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map(project => (
          <EnhancedProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found in this category.</p>
        </div>
      )}
    </div>
  )
}