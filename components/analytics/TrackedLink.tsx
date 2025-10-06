'use client'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { trackEvent } from '@/lib/analytics'

interface TrackedLinkProps {
  href: string
  children: ReactNode
  event: string
  props?: Record<string, unknown>
  className?: string
  target?: string
  rel?: string
  download?: boolean
}

export default function TrackedLink({ href, children, event, props, className, target, rel, download }: TrackedLinkProps) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:')

  const handleClick = () => {
    trackEvent(event, { props: { href, ...props } })
  }

  if (isExternal || download) {
    return (
      <a
        href={href}
        target={target ?? '_blank'}
        rel={rel ?? 'noreferrer'}
        download={download}
        onClick={handleClick}
        className={className}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
