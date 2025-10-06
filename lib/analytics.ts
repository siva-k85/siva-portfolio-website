import Plausible from 'plausible-tracker'

type TrackEventOptions = Parameters<ReturnType<typeof Plausible>['trackEvent']>[1]
type TrackPageviewOptions = Parameters<ReturnType<typeof Plausible>['trackPageview']>[0]

let plausibleClient: ReturnType<typeof Plausible> | null = null

function getPlausible() {
  if (typeof window === 'undefined') {
    return null
  }

  if (!plausibleClient) {
    const domain =
      process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ||
      process.env.PLAUSIBLE_DOMAIN ||
      'sivakomaragiri.com'

    plausibleClient = Plausible({
      domain,
      apiHost: 'https://plausible.io',
      trackLocalhost: process.env.NODE_ENV !== 'production',
    })
  }

  return plausibleClient
}

export function trackEvent(event: string, options?: TrackEventOptions) {
  const instance = getPlausible()
  if (!instance) return
  instance.trackEvent(event, options)
}

export function trackPageview(options?: TrackPageviewOptions) {
  const instance = getPlausible()
  if (!instance) return
  instance.trackPageview(options)
}
