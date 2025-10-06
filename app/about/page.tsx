import type { Metadata } from 'next'
import AboutContent from '@/components/about/AboutContent'
import SkillsMatrix from '@/components/about/SkillsMatrix'
import TestimonialsSection from '@/components/about/TestimonialsSection'
import ATSResumeBlock from '@/components/about/ATSResumeBlock'

export const metadata: Metadata = {
  title: 'About — Siva Komaragiri',
  description:
    'Full biography of Siva Komaragiri covering healthcare analytics leadership, core capabilities, testimonials, and resume strategy.',
}

export default function AboutPage() {
  return (
    <main className="bg-gray-50">
      <AboutContent />
      <SkillsMatrix />
      <TestimonialsSection />
      <ATSResumeBlock />
    </main>
  )
}
