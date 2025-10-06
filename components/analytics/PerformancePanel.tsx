'use client'
import { useEffect, useState } from 'react'

type MetricRecord = {
  name: string
  value: number
  rating: string
}

const shouldShow = process.env.NEXT_PUBLIC_PERFORMANCE_PANEL === 'true'

export default function PerformancePanel() {
  const [metrics, setMetrics] = useState<Record<string, MetricRecord>>({})

  useEffect(() => {
    if (!shouldShow) return

    const handler = (event: Event) => {
      const custom = event as CustomEvent<MetricRecord>
      if (!custom.detail) return
      const { name, value, rating } = custom.detail
      setMetrics(prev => ({
        ...prev,
        [name]: { name, value, rating },
      }))
    }

    window.addEventListener('web-vitals:metric', handler as EventListener)
    return () => window.removeEventListener('web-vitals:metric', handler as EventListener)
  }, [])

  if (!shouldShow || Object.keys(metrics).length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 w-64 rounded-2xl border border-gray-300 bg-white/90 p-4 shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">Core Web Vitals</p>
      <ul className="mt-3 space-y-2 text-sm">
        {Object.values(metrics).map(metric => (
          <li key={metric.name} className="flex items-center justify-between">
            <span className="text-gray-600">{metric.name}</span>
            <span className="font-medium text-gray-900">{metric.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
