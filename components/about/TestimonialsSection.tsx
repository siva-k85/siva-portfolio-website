'use client'
import { useState } from 'react'

const testimonials = [
  {
    quote: 'Siva transformed our residency evaluation compliance from 19% to 75% in four months. We avoided accreditation risk and gave physicians a process they trust.',
    author: 'Dr. Amanda Lee',
    role: 'Program Director, Allegheny General Hospital',
  },
  {
    quote: "Their analytics dashboard uncovered $2.4M in reimbursement risk we didn't know about. The leadership team finally has line of sight into contract performance.",
    author: 'Michael Grant',
    role: 'VP of Operations, UPMC Mercy',
  },
  {
    quote: 'Rare combination of deep technical skill and healthcare domain fluency. Siva brings stakeholders together and keeps projects moving.',
    author: 'Sarah Chen',
    role: 'Principal, Healthcare Analytics Partners',
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Healthcare Impact</p>
          <h2 className="mt-4 text-4xl font-semibold text-gray-900">Trusted by clinical and operations leaders</h2>
          <p className="mt-4 text-base text-gray-600">
            Testimonials from the physicians and executives who experienced measurable outcomes from our work together.
          </p>
          <div className="mt-8 space-y-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.author}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                  activeIndex === index
                    ? 'border-gray-900 bg-white shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <p className="text-lg text-gray-900">“{testimonial.quote}”</p>
                <p className="mt-3 text-sm text-gray-600">
                  {testimonial.author} · {testimonial.role}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full rounded-3xl border border-gray-200 bg-white p-10 shadow-lg lg:w-1/2">
          <span className="absolute -top-8 left-10 text-7xl font-serif text-gray-200">“</span>
          <p className="text-2xl leading-relaxed text-gray-900">{testimonials[activeIndex].quote}</p>
          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-lg font-semibold text-gray-900">{testimonials[activeIndex].author}</p>
            <p className="mt-1 text-sm text-gray-600">{testimonials[activeIndex].role}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
