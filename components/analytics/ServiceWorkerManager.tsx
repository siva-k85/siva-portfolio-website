'use client'
import { useEffect } from 'react'

const shouldRegister =
  process.env.NODE_ENV === 'production' &&
  (process.env.NEXT_PUBLIC_ENABLE_SERVICE_WORKER ?? 'true') !== 'false'

export default function ServiceWorkerManager() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    if (shouldRegister) {
      navigator.serviceWorker.register('/sw.js').catch(error => console.error('Service worker registration failed', error))
      return
    }

    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister().catch(error => console.error('Service worker unregistration failed', error))
      })
    })
  }, [])

  return null
}
