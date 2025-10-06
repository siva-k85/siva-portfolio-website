import NewsletterForm from '@/components/forms/NewsletterForm'

const socials = [
  {
    label: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/k-siva',
  },
  {
    label: 'GitHub',
    href: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/Siva-K85',
  },
  {
    label: 'X (Twitter)',
    href: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/SivaK',
  },
  {
    label: 'Email',
    href: 'mailto:siva@sivakomaragiri.com',
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Healthcare Analytics</p>
            <p className="mt-2 text-base text-gray-700">
              Data-driven, clinician-approved systems for better care, compliance, and growth.
            </p>
            <nav className="mt-6 flex flex-wrap gap-4 text-sm font-medium uppercase tracking-[0.2em] text-gray-600">
              {socials.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-gray-200 px-4 py-2 transition hover:-translate-y-0.5 hover:border-gray-400 hover:text-gray-900"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-gray-200 py-6 text-center text-xs uppercase tracking-[0.3em] text-gray-400">
        © {new Date().getFullYear()} Siva Komaragiri. All rights reserved.
      </div>
    </footer>
  )
}
import NewsletterForm from '@/components/forms/NewsletterForm'
