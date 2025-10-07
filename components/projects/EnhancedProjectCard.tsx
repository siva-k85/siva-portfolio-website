import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/data/projects'
import { ArrowRight, BarChart3, Clock, Building2 } from 'lucide-react'

interface EnhancedProjectCardProps {
  project: Project
}

export default function EnhancedProjectCard({ project }: EnhancedProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10"
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          Featured
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
        {project.logo ? (
          <div className="flex h-full items-center justify-center p-8">
            <Image
              src={project.logo}
              alt={project.title}
              width={120}
              height={60}
              className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={200}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-6xl font-bold text-gray-300 dark:text-gray-600">
              {project.title.charAt(0)}
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6">
        {/* Category & Duration */}
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-flex rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-200">
            {project.category.toUpperCase()}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-3 w-3" />
            {project.duration}
          </span>
        </div>

        {/* Title & Company */}
        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        {project.company && (
          <div className="mb-3 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Building2 className="h-4 w-4" />
            <span>{project.company}</span>
          </div>
        )}

        {/* Subtitle */}
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {project.subtitle}
        </p>

        {/* Metrics */}
        {project.metrics.length > 0 && (
          <div className="mb-4 grid grid-cols-2 gap-3">
            {project.metrics.slice(0, 2).map((metric, index) => (
              <div key={index} className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-3">
                <div className="flex items-center gap-1 mb-1">
                  <BarChart3 className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {metric.value}
                  </p>
                </div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs text-blue-700 dark:text-blue-300"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="rounded-full bg-gray-50 dark:bg-gray-700 px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>

        {/* View Project Link */}
        <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
          View Project
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  )
}