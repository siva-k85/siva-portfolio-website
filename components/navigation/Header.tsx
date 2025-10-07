'use client'
import Link from 'next/link'
import type { Route } from 'next'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/ui/ThemeToggle'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/notes', label: 'Notes' },
  { href: '/graph', label: 'Graph' },
  { href: '/about', label: 'About' },
  { href: '/search', label: 'Search' },
  { href: '/resume', label: 'Résumé' },
] satisfies { href: Route; label: string }[]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Siva Komaragiri
        </Link>
        <nav className="hidden gap-6 text-sm font-medium uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 md:flex">
          {navItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href as any}
                className={`rounded-2xl px-4 py-2 transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="https://calendly.com/siva-komaragiri"
            className="hidden rounded-2xl border border-gray-900 dark:border-gray-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-900 dark:text-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900 hover:shadow-lg md:inline-flex"
          >
            Book Intro
          </Link>
        </div>
      </div>
    </header>
  )
}