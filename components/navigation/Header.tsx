'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/notes', label: 'Notes' },
  { href: '/graph', label: 'Graph' },
  { href: '/about', label: 'About' },
  { href: '/search', label: 'Search' },
  { href: '/resume', label: 'Résumé' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-900">
          Siva Komaragiri
        </Link>
        <nav className="hidden gap-6 text-sm font-medium uppercase tracking-[0.2em] text-gray-600 md:flex">
          {navItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-4 py-2 transition ${
                  isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <Link
          href="https://calendly.com/siva-komaragiri"
          className="hidden rounded-2xl border border-gray-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-900 transition hover:-translate-y-0.5 hover:bg-gray-900 hover:text-white md:inline-flex"
        >
          Book Intro
        </Link>
      </div>
    </header>
  )
}
