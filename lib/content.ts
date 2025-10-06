import { promises as fs } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import fg from 'fast-glob'

export type Front = {
  slug: string
  title: string
  summary?: string
  role?: string[]
  tech?: string[]
  skills?: string[]
  cover?: string
  date?: string
  featured?: boolean
}

export async function listProjects(): Promise<Front[]> {
  const dir = path.join(process.cwd(), 'content/projects')
  const files = await fg('*.mdx', { cwd: dir })

  const projects = await Promise.all(
    files.map(async (f) => {
      const p = path.join(dir, f)
      const raw = await fs.readFile(p, 'utf8')
      const { data } = matter(raw)
      return { slug: f.replace(/\.mdx$/, ''), ...(data as any) } as Front
    })
  )

  return projects.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
}

export async function listNotes(): Promise<Front[]> {
  const dir = path.join(process.cwd(), 'content/notes')
  const files = await fg('*.mdx', { cwd: dir })

  const notes = await Promise.all(
    files.map(async (f) => {
      const p = path.join(dir, f)
      const raw = await fs.readFile(p, 'utf8')
      const { data } = matter(raw)
      return { slug: f.replace(/\.mdx$/, ''), ...(data as any) } as Front
    })
  )

  return notes
}