import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import fg from 'fast-glob'

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content/notes')
  const files = await fg('*.mdx', { cwd: dir })
  return files.map(f=>({ slug: f.replace(/\.mdx$/,'') }))
}

export default async function NotePage({ params }:{ params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const file = path.join(process.cwd(),'content/notes', `${slug}.mdx`)
  if (!fs.existsSync(file)) return notFound()
  const raw = fs.readFileSync(file,'utf8')
  const { content, data } = matter(raw)
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 prose prose-neutral">
      <h1 className="text-4xl font-semibold">{data.title}</h1>
      <p className="opacity-80">{data.summary}</p>
      <MDXRemote source={content} />
    </main>
  )
}