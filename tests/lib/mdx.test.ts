import { getProjects, getNotes } from '@/lib/mdx'

describe('MDX content loaders', () => {
  it('returns projects sorted by date with summaries', async () => {
    const projects = await getProjects()

    expect(projects.length).toBeGreaterThanOrEqual(5)

    for (let i = 1; i < projects.length; i += 1) {
      const prev = new Date(projects[i - 1].date).getTime()
      const current = new Date(projects[i].date).getTime()
      expect(prev).toBeGreaterThanOrEqual(current)
    }

    projects.forEach(project => {
      expect(project.summary).toBeDefined()
      expect(project.summary).not.toEqual('')
    })
  })

  it('returns notes with titles and summaries', async () => {
    const notes = await getNotes()

    expect(notes.length).toBeGreaterThanOrEqual(5)
    notes.forEach(note => {
      expect(note.title).toBeTruthy()
      expect(note.summary).toBeTruthy()
    })
  })
})
