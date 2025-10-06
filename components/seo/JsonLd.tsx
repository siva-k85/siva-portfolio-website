import { Person, WithContext } from 'schema-dts'

export default function JsonLd() {
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
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Healthcare Analytics Innovation',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  )
}