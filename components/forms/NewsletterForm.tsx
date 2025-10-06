'use client'
import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email) return

    setStatus('loading')

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'newsletter-form' }),
    })

    if (res.ok) {
      setStatus('success')
      setEmail('')
      trackEvent('newsletter_subscribed', { props: { emailDomain: email.split('@')[1] || 'unknown' } })
    } else {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">Healthcare analytics newsletter</h3>
      <p className="mt-2 text-sm text-gray-600">
        Monthly insights on compliance, operational performance, and AI safety in healthcare systems.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="you@healthsystem.org"
          className="flex-1 rounded-2xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-500"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-2xl bg-gray-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === 'loading' ? 'Joining…' : 'Subscribe'}
        </button>
      </div>
      {status === 'success' && <p className="mt-3 text-sm text-green-600">Thanks! Check your inbox for confirmation.</p>}
      {status === 'error' && <p className="mt-3 text-sm text-red-600">Something went wrong. Please try again.</p>}
    </form>
  )
}
