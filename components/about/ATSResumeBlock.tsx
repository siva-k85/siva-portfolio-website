const resumeLinks = [
  {
    href: '/resume/sivak-ai-architect.pdf',
    label: 'Healthcare Analytics Leader Resume',
    description: 'Optimized for data science, informatics, and analytics executive roles.',
    badge: 'Primary',
  },
  {
    href: '/resume/sivak-product-manager.pdf',
    label: 'Product Strategy Resume',
    description: 'Focuses on cross-functional leadership, roadmap delivery, and GTM wins.',
    badge: 'Secondary',
  },
  {
    href: '/resume/sivak-healthcare-research.pdf',
    label: 'Healthcare Research Resume',
    description: 'Highlights academic publications, clinical trials, and research methods.',
    badge: 'Research',
  },
]

export default function ATSResumeBlock() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Resume Ops</p>
            <h2 className="mt-4 text-3xl font-semibold text-gray-900">ATS-Optimized Resume Strategy</h2>
            <p className="mt-4 text-base text-gray-600">
              75% of healthcare analytics resumes are rejected by applicant tracking systems before a human review.
              Every PDF here is single-column, keyword-optimized, and mirrors the case studies on this site.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-gray-600">
              <li>• Single-column PDFs with accessible, selectable text</li>
              <li>• ATS-friendly fonts (Arial, Calibri) and standardized headings</li>
              <li>• Keywords for SQL, Python, Tableau, Epic, HIPAA, value-based care</li>
              <li>• Consistent achievements across portfolio, LinkedIn, and resume</li>
            </ul>
          </div>
          <div className="space-y-6">
            <div className="grid gap-4">
              {resumeLinks.map(link => (
                <TrackedLink
                  key={link.href}
                  href={link.href}
                  event="resume_download"
                  props={{ variant: link.badge }}
                  download
                  className="group flex flex-col rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 transition hover:-translate-y-1 hover:border-gray-300"
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-gray-500">{link.badge}</span>
                  <span className="mt-3 text-lg font-semibold text-gray-900">{link.label}</span>
                  <span className="mt-2 text-sm text-gray-600">{link.description}</span>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-gray-900 group-hover:translate-x-1">
                    Download PDF →
                  </span>
                </TrackedLink>
              ))}
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-inner">
              <h3 className="text-lg font-semibold text-gray-900">Work Authorization</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Authorized to work in the United States through F-1 OPT with STEM extension eligibility
                (36 months total through May 2028). Healthcare employers—hospitals, academic medical centers,
                nonprofits—are often H-1B cap-exempt, enabling long-term sponsorship pathways beyond OPT.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
import TrackedLink from '@/components/analytics/TrackedLink'
