'use client'
import { Person, WebSite, Article, CreativeWork, WithContext } from 'schema-dts'
import { usePathname } from 'next/navigation'

export default function JsonLd() {
  const pathname = usePathname()

  // Base Person Schema
  const personSchema: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Siva Komaragiri',
    url: 'https://sivakomaragiri.com',
    image: 'https://sivakomaragiri.com/images/siva-profile.jpg',
    sameAs: [
      'https://www.linkedin.com/in/k-siva',
      'https://github.com/Siva-K85',
      'https://twitter.com/SivaK',
    ],
    jobTitle: 'AI Systems Architect & Healthcare Analytics Leader',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Carnegie Mellon University',
    },
    knowsAbout: [
      'Healthcare Analytics',
      'Machine Learning',
      'Data Engineering',
      'Product Management',
      'Cloud Architecture',
      'Clinical Informatics',
      'HIPAA Compliance',
      'Epic EHR',
      'Python',
      'SQL',
      'TypeScript'
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Healthcare Analytics Innovation',
    },
  }

  // Website Schema
  const websiteSchema: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Siva Komaragiri Portfolio',
    url: 'https://sivakomaragiri.com',
    author: personSchema,
    description: 'Portfolio showcasing healthcare analytics projects, AI systems, and data engineering work.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://sivakomaragiri.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  // Article Schema for blog posts
  const articleSchema: WithContext<Article> | null = pathname?.startsWith('/notes/') ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Healthcare Analytics Insights',
    author: personSchema,
    publisher: personSchema,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sivakomaragiri.com${pathname}`
    }
  } : null

  // Project/Portfolio Schema
  const portfolioSchema: WithContext<CreativeWork> | null = pathname?.startsWith('/projects/') ? {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Healthcare Analytics Project',
    author: personSchema,
    url: `https://sivakomaragiri.com${pathname}`,
    datePublished: new Date().toISOString(),
    description: 'Healthcare analytics and AI system implementation'
  } : null

  // Combine schemas
  const schemas = [
    personSchema,
    websiteSchema,
    articleSchema,
    portfolioSchema
  ].filter(Boolean)

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}