import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDirectory = path.join(process.cwd(), 'content/projects')
const notesDirectory = path.join(process.cwd(), 'content/notes')

export interface Project {
  slug: string
  title: string
  description: string
  date: string
  technologies?: string[]
  metrics?: any
  content?: string
}

export interface Note {
  slug: string
  title: string
  description: string
  date: string
  tags?: string[]
  content?: string
}

export async function getProjects(): Promise<Project[]> {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const files = fs.readdirSync(projectsDirectory)
  const projects = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace(/\.mdx$/, '')
      const filePath = path.join(projectsDirectory, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        technologies: data.technologies || [],
        metrics: data.metrics || {}
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return projects
}

export async function getProject(slug: string): Promise<Project | null> {
  const filePath = path.join(projectsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    technologies: data.technologies || [],
    metrics: data.metrics || {},
    content
  }
}

export async function getNotes(): Promise<Note[]> {
  if (!fs.existsSync(notesDirectory)) {
    return []
  }

  const files = fs.readdirSync(notesDirectory)
  const notes = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace(/\.mdx$/, '')
      const filePath = path.join(notesDirectory, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        tags: data.tags || []
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return notes
}

export async function getNote(slug: string): Promise<Note | null> {
  const filePath = path.join(notesDirectory, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    tags: data.tags || [],
    content
  }
}