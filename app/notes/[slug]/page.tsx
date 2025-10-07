import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import fg from 'fast-glob'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ShareButtons from '@/components/ui/ShareButtons'

import NoteJsonLd from '@/components/seo/NoteJsonLd'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content/notes')
  const files = await fg('*.mdx', { cwd: dir })
  return files.map(f=>({ slug: f.replace(/\.mdx$/,'') }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const file = path.join(process.cwd(),'content/notes', `${slug}.mdx`)
  if (!fs.existsSync(file)) return {}
  const raw = fs.readFileSync(file,'utf8')
  const { data } = matter(raw)

  return {
    title: `${data.title} - Siva Komaragiri`,
    description: data.summary,
    openGraph: {
      title: data.title,
      description: data.summary,
      url: `https://sivakomaragiri.com/notes/${slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.summary,
    },
  }
}

// @ts-ignore Next.js typed routes Promise mismatch
export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const file = path.join(process.cwd(),'content/notes', `${slug}.mdx`)
  if (!fs.existsSync(file)) return notFound()
  const raw = fs.readFileSync(file,'utf8')
  const { content, data } = matter(raw)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sivakomaragiri.com'
  const canonicalUrl = `${baseUrl}/notes/${slug}`
  return (
    <>
      <NoteJsonLd slug={slug} />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Notes', href: '/notes' },
            { label: data.title },
          ]}
        />
        <article className="prose prose-neutral">
          <h1 className="text-4xl font-semibold">{data.title}</h1>
          <p className="opacity-80">{data.summary}</p>
          {Array.isArray(data.tags) && data.tags.length > 0 && (
            <p className="not-prose mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-gray-500">
              {data.tags.map((tag: string) => (
                <span key={tag} className="rounded-full bg-gray-200 px-3 py-1 text-gray-700">
                  {tag}
                </span>
              ))}
            </p>
          )}
          <div className="not-prose mt-4">
            <ShareButtons title={data.title} url={canonicalUrl} />
          </div>
          <MDXRemote source={content} />
        </article>
      </main>
    </>
  )
}
