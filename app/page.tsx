import { Suspense } from 'react'
import EnhancedProjectsGrid from '@/components/projects/EnhancedProjectsGrid'
import ProjectsGridSkeleton from '@/components/projects/ProjectsGridSkeleton'
import ContactForm from '@/components/contact/ContactForm'
import TrackedLink from '@/components/analytics/TrackedLink'
import FloatingCards from '@/components/hero/FloatingCards'
import HeroCanvas from '@/components/hero/HeroCanvas'
import ProfilePhoto from '@/components/hero/ProfilePhoto'

const heroMetrics = [
  { value: '296%', label: 'Accreditation compliance lift' },
  { value: '$2.4M', label: 'Risk avoided for residency program' },
  { value: '40%', label: 'Physician admin time saved' },
  { value: '4', label: 'Hospitals deployed' },
]

export default function HomePage() {
  return (
    <>
      <section className="relative mx-auto grid min-h-[80vh] max-w-6xl grid-cols-1 gap-12 overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 px-6 py-24 shadow-sm backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
        <HeroCanvas />
        <div className="space-y-8">
          <ProfilePhoto />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">Healthcare Analytics Leader</p>
            <h1 className="mt-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-5xl font-semibold tracking-tight text-transparent lg:text-6xl">
              Siva Komaragiri
            </h1>
            <p className="mt-4 text-xl leading-relaxed text-gray-700 dark:text-gray-300">
              Transforming complex clinical, financial, and operational data into decisions that protect patients,
              accreditation, and revenue.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 shadow-sm backdrop-blur">
            {heroMetrics.map(metric => (
              <div key={metric.label} className="group rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-4 hover:shadow-md transition-all duration-200">
                <p className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{metric.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">{metric.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <TrackedLink
              href="https://calendly.com/siva-komaragiri"
              event="cta_click"
              props={{ id: 'hero_book_intro' }}
              className="inline-flex items-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Book an intro call
            </TrackedLink>
            <TrackedLink
              href="/projects"
              event="cta_click"
              props={{ id: 'hero_view_projects' }}
              className="inline-flex items-center rounded-2xl border border-gray-300 dark:border-gray-600 px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-gray-900 dark:text-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-500 dark:hover:border-gray-400 hover:shadow-md"
            >
              View projects
            </TrackedLink>
            <TrackedLink
              href="/resume"
              event="cta_click"
              props={{ id: 'hero_download_resume' }}
              className="inline-flex items-center rounded-2xl border border-gray-300 dark:border-gray-600 px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-gray-900 dark:text-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-500 dark:hover:border-gray-400 hover:shadow-md"
            >
              Download resume
            </TrackedLink>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              36 months US work authorization
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              Python · SQL · Tableau · Epic EHR
            </span>
          </div>
        </div>
        <div className="space-y-6">
          <FloatingCards />
          <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-8 shadow-lg backdrop-blur hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Recent wins</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Rebuilt value-based care modeling delivering $6.7M in shared savings.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                <span>Designed sepsis command center that automated CMS SEP-1 reporting.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-500">•</span>
                <span>Delivered precision oncology workflow cutting time-to-treatment 36%.</span>
              </li>
            </ul>
            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">Currently</p>
            <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
              Graduating MS Healthcare Analytics — Carnegie Mellon University (May 2025). Open to analytics, AI, and
              product leadership roles at mission-driven healthcare organizations.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">Case Studies</p>
          <h2 className="mt-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-4xl font-semibold text-transparent">
            Healthcare AI systems engineered for scale
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
            Each project pairs measurable outcomes with transparent methodology—so clinicians, executives, and product
            teams understand what it takes to deliver.
          </p>
        </div>
        <Suspense fallback={<ProjectsGridSkeleton count={6} />}>
          <EnhancedProjectsGrid />
        </Suspense>
      </section>

      <section id="contact" className="mx-auto max-w-4xl px-6 py-24">
        <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-12 shadow-sm backdrop-blur hover:shadow-lg transition-shadow duration-300">
          <h2 className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-3xl font-semibold text-transparent">
            Ready to build your next healthcare analytics initiative?
          </h2>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
            Let's discuss how we can accelerate performance, compliance, and experience for clinicians and patients.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  )
}