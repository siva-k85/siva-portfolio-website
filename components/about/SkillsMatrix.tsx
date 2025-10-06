const skillCategories = [
  {
    title: 'Healthcare Analytics',
    description: 'Evidence-based insights that change physician behavior and patient outcomes.',
    items: [
      {
        label: 'Clinical Quality & Compliance',
        level: 'Expert',
        impact: 'Boosted ACGME compliance 296% and automated CMS SEP-1 reporting across four hospitals.',
      },
      {
        label: 'Population Health Modeling',
        level: 'Expert',
        impact: 'Closed 18K preventive care gaps while reducing ED visits 12% for uncontrolled diabetes.',
      },
      {
        label: 'Operational Efficiency',
        level: 'Advanced',
        impact: 'Scaled hospital-at-home census 3x with route optimization and remote monitoring.',
      },
    ],
  },
  {
    title: 'AI Systems & Engineering',
    description: 'Production-grade data platforms balancing cutting-edge research with regulatory rigor.',
    items: [
      {
        label: 'Clinical AI & Decision Support',
        level: 'Advanced',
        impact: 'Delivered explainable models that cut sepsis mortality 14% and slashed alert fatigue.',
      },
      {
        label: 'Knowledge Graphs & RAG',
        level: 'Advanced',
        impact: 'Connected genomic variants, NCCN pathways, and payer policies for tumor boards.',
      },
      {
        label: 'Cloud Data Architecture',
        level: 'Advanced',
        impact: 'Designed Snowflake, Synapse, and Supabase pipelines with dbt, Dagster, and Airflow orchestration.',
      },
    ],
  },
  {
    title: 'Leadership & Strategy',
    description: 'Executive-ready storytelling backed by quantitative rigor and cross-functional facilitation.',
    items: [
      {
        label: 'Stakeholder Alignment',
        level: 'Expert',
        impact: 'Led 6 design sprints with clinicians, earned 82% weekly adoption of new analytics tools.',
      },
      {
        label: 'Product Strategy',
        level: 'Advanced',
        impact: 'Shipped decision-support products from discovery to adoption across multi-hospital systems.',
      },
      {
        label: 'Change Management',
        level: 'Advanced',
        impact: 'Built governance councils that cut KPI disputes 63% and passed HIPAA/SOC2 audits.',
      },
    ],
  },
]

export default function SkillsMatrix() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Core Capabilities</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900">Skills Matrix</h2>
        <p className="mt-4 max-w-3xl mx-auto text-base text-gray-600">
          Years in healthcare taught me that analytics only matters when it changes decisions.
          This matrix shows where I create impact—from model design to executive storytelling.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {skillCategories.map(category => (
          <div key={category.title} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900">{category.title}</h3>
            <p className="mt-3 text-sm text-gray-600">{category.description}</p>
            <ul className="mt-6 space-y-5">
              {category.items.map(item => (
                <li key={item.label} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-center justify-between text-sm uppercase tracking-wide text-gray-500">
                    <span>{item.label}</span>
                    <span className="text-xs rounded-full bg-gray-900 px-2 py-1 text-white">{item.level}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700">{item.impact}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
