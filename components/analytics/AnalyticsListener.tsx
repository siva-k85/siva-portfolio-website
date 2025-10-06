'use client'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackEvent, trackPageview } from '@/lib/analytics'

export default function AnalyticsListener() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
    trackPageview({ url })
  }, [pathname, searchParams])

  useEffect(() => {
    if (typeof window === 'undefined') return

    let isMounted = true

    import('web-vitals').then(({ onCLS, onINP, onLCP }) => {
      if (!isMounted) return

      const sendMetric = ({ name, value, rating }: { name: string; value: number; rating: string }) => {
        const roundedValue = Number(value.toFixed(2))
        trackEvent('core-web-vitals', {
          props: {
            metric: name,
            value: roundedValue,
            rating,
          },
        })

        window.dispatchEvent(
          new CustomEvent('web-vitals:metric', {
            detail: { name, value: roundedValue, rating },
          })
        )
      }

      onCLS(sendMetric)
      onINP(sendMetric)
      onLCP(sendMetric)
    })

    return () => {
      isMounted = false
    }
  }, [])

  return null
}
