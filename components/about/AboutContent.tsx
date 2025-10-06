const highlights = [
  {
    year: '2025',
    title: 'MS, Healthcare Analytics — Carnegie Mellon University',
    description:
      'Practiced with CMU Heinz College faculty on applied ML, simulation modeling, and policy analytics while leading the Healthcare Analytics Club.',
  },
  {
    year: '2024',
    title: 'Residency Evaluation Platform (EMMA)',
    description:
      'Boosted ACGME compliance 296%, preventing accreditation risk and saving $2.4M in penalties across Allegheny Health Network.',
  },
  {
    year: '2023',
    title: 'UPMC Sepsis Command Center',
    description:
      'Directed build of real-time surveillance that cut sepsis mortality 14% while automating CMS SEP-1 documentation.',
  },
]

export default function AboutContent() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-500">About Siva</p>
        <h1 className="text-5xl font-semibold tracking-tight text-gray-900">Healthcare analytics with human stakes</h1>
        <p className="text-lg leading-8 text-gray-700">
          I build analytics platforms that help physicians, nurses, and administrators make better decisions in the
          moments that matter. My work spans clinical quality, value-based care, hospital operations, and AI safety. The
          constant through-line: make complex data understandable, actionable, and accountable.
        </p>
        <p className="text-lg leading-8 text-gray-700">
          Early in my career I realized that hospitals do not fail because they lack dashboards—they fail when teams
          cannot agree on what the data means. I partner with clinicians to co-design products, translate models into
          workflows, and prove ROI with measurable impact.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {highlights.map(item => (
          <div key={item.year} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">{item.year}</p>
            <h3 className="mt-3 text-xl font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 space-y-8 text-gray-700">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">Why healthcare analytics?</h2>
          <p className="mt-4 text-lg leading-8">
            Healthcare systems sit on terabytes of unused data while clinicians fight burnout, compliance risk, and
            margin compression. I focus on translating data into interdisciplinary action—coaching physicians on
            analytics, designing decision support, and ensuring compliance teams are in the loop from day one.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-900">Focus areas</h3>
          <ul className="mt-4 space-y-2 text-sm leading-7">
            <li>• Clinical quality & accreditation analytics</li>
            <li>• Operational throughput and staffing optimization</li>
            <li>• AI-assisted documentation and clinical decision support</li>
            <li>• Healthcare financial modeling for value-based care</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-900">Work authorization</h3>
          <p className="mt-4 text-lg leading-8">
            Authorized to work in the United States through F-1 OPT with STEM extension eligibility, providing 36 months
            of work authorization through May 2028. Healthcare employers—hospitals, academic medical centers,
            nonprofits—are often H-1B cap-exempt, creating long-term pathways after OPT.
          </p>
        </div>
      </div>
    </section>
  )
}
