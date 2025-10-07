import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/data/projects'

interface EnhancedProjectCardProps {
  project: Project
}

export default function EnhancedProjectCard({ project }: EnhancedProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
          Featured
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {project.logo ? (
          <div className="flex h-full items-center justify-center p-8">
            <Image
              src={project.logo}
              alt={project.title}
              width={120}
              height={60}
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-6xl font-bold text-gray-300">
              {project.title.charAt(0)}
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6">
        {/* Category & Duration */}
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {project.category.toUpperCase()}
          </span>
          <span className="text-xs text-gray-500">{project.duration}</span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="mb-3 text-sm font-medium text-gray-600">{project.subtitle}</p>

        {/* Description */}
        <p className="mb-4 line-clamp-3 text-sm text-gray-600 leading-relaxed">
          {project.description}
        </p>

        {/* Key Metrics */}
        <div className="mt-auto grid grid-cols-2 gap-2">
          {project.metrics.slice(0, 2).map((metric, index) => (
            <div key={index} className="rounded-xl bg-gray-50 p-3">
              <p className="text-lg font-bold text-gray-900">{metric.value}</p>
              <p className="text-xs text-gray-500 line-clamp-1">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  )
}