import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import fg from 'fast-glob'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ShareButtons from '@/components/ui/ShareButtons'
import { listProjects } from '@/lib/content'
import ProjectJsonLd from '@/components/seo/ProjectJsonLd'

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content/projects')
  const files = await fg('*.mdx', { cwd: dir })
  return files.map(f=>({ slug: f.replace(/\.mdx$/,'') }))
}

// @ts-ignore Next.js typed routes Promise mismatch
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const file = path.join(process.cwd(),'content/projects', `${slug}.mdx`)
  if (!fs.existsSync(file)) return notFound()
  const raw = fs.readFileSync(file,'utf8')
  const { content, data } = matter(raw)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sivakomaragiri.com'
  const canonicalUrl = `${baseUrl}/projects/${slug}`
  const relatedSource = await listProjects()
  const related = relatedSource
    .filter(project => project.slug !== slug)
    .sort((a, b) => {
      const overlapA = (a.tech || []).filter((tech: string) => (data.tech || []).includes(tech)).length
      const overlapB = (b.tech || []).filter((tech: string) => (data.tech || []).includes(tech)).length
      return overlapB - overlapA
    })
    .slice(0, 3)
  return (
    <>
      <ProjectJsonLd slug={slug} />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: data.title },
          ]}
        />
        <article className="prose prose-neutral">
          <h1 className="text-4xl font-semibold">{data.title}</h1>
          <p className="opacity-80">{data.summary}</p>
          <div className="not-prose mt-4 flex flex-wrap items-center gap-3">
            {(data.tech || []).slice(0, 4).map((tech: string) => (
              <span key={tech} className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-700">
                {tech}
              </span>
            ))}
            <ShareButtons title={data.title} url={canonicalUrl} />
          </div>
          <MDXRemote source={content} />
        </article>
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900">Related Projects</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map(project => (
                <a
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="rounded-2xl border border-gray-200 bg-white p-4 text-sm shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{project.tech?.[0] ?? 'Project'}</p>
                  <p className="mt-2 font-semibold text-gray-900">{project.title}</p>
                  <p className="mt-2 text-xs text-gray-600">{project.summary}</p>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  )
}
