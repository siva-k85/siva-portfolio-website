import Plausible from 'plausible-tracker'

const plausible = Plausible({
  domain: 'sivakomaragiri.com',
  apiHost: 'https://plausible.io',
  trackLocalhost: true,
})

export const trackEvent = plausible.trackEvent
export const trackPageview = plausible.trackPageview