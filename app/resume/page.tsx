import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ATSResumeBlock from '@/components/about/ATSResumeBlock'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume - Siva Komaragiri',
  description: 'Download my resume and see my credentials.',
}

export default function Resume() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Résumé' },
        ]}
      />
      <section className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-semibold text-gray-900">Résumé & Credential Library</h1>
        <p className="text-lg leading-8 text-gray-700">
          Three tailored résumés optimized for analytics leadership, product strategy, and research roles. Each version
          is ATS-compliant, mirrors the case studies showcased on this site, and includes quantified outcomes.
        </p>
      </section>
      <ATSResumeBlock />
    </main>
  )
}
