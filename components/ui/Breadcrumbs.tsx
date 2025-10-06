import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items.length) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="text-gray-600 transition hover:text-gray-900">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-400">{item.label}</span>
              )}
              {!isLast && <span className="text-gray-300">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
