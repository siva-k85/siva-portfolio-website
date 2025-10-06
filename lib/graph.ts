import { promises as fs } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import fg from 'fast-glob'
import YAML from 'yaml'

export async function buildGraph() {
  const projDir = path.join(process.cwd(), 'content/projects')
  const files = await fg('*.mdx', { cwd: projDir })
  const nodes: any[] = []
  const links: any[] = []

  await Promise.all(
    files.map(async (f) => {
      const slug = f.replace(/\.mdx$/, '')
      const raw = await fs.readFile(path.join(projDir, f), 'utf8')
      const { data } = matter(raw)
      nodes.push({ id: data.title, kind: 'project', slug })
      for (const t of data.tech || []) nodes.push({ id: t, kind: 'tech' })
      for (const s of data.skills || []) nodes.push({ id: s, kind: 'skill' })
      for (const t of data.tech || []) links.push({ source: t, target: data.title })
      for (const s of data.skills || []) links.push({ source: s, target: data.title })
      if (data.graph?.nodes) data.graph.nodes.forEach((id: string) => nodes.push({ id, kind: 'tech' }))
      if (data.graph?.links) data.graph.links.forEach(([a, b]: [string, string]) => links.push({ source: a, target: b }))
    })
  )

  // merge with global graph.yaml
  const gy = await fs.readFile(path.join(process.cwd(), 'content/graph.yaml'), 'utf8')
  const gobj = YAML.parse(gy) || {}
  ;(gobj.nodes || []).forEach((n: any) => nodes.push(n))
  ;(gobj.links || []).forEach((l: any) => links.push({ source: l[0], target: l[1] }))

  // de-dup
  const uniq = new Map(nodes.map(n => [n.id + ':' + n.kind, n]))
  const n2 = Array.from(uniq.values())
  const seen = new Set<string>()
  const l2 = links.filter(l => {
    const k = l.source + '->' + l.target
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
  return { nodes: n2, links: l2 }
}