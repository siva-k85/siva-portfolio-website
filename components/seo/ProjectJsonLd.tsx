import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export default async function ProjectJsonLd({ slug }: { slug: string }) {
  const file = path.join(process.cwd(),'content/projects', `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file,'utf8')
  const { data } = matter(raw)

  const personSchema = {
    '@type': 'Person',
    name: 'Siva Komaragiri',
    url: 'https://sivakomaragiri.com',
  }

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: data.title,
    author: personSchema,
    datePublished: data.date,
    description: data.summary,
    keywords: data.skills?.join(', '),
    inLanguage: 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sivakomaragiri.com/projects/${slug}`,
    },
    publisher: personSchema,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
    />
  )
}
