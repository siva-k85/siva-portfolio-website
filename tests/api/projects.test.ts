/** @jest-environment node */
import { GET } from '@/app/api/projects/route'

describe('GET /api/projects', () => {
  it('returns project data with required fields', async () => {
    const response = await GET()
    expect(response.status).toBe(200)

    const payload = await response.json()
    expect(Array.isArray(payload)).toBe(true)
    expect(payload.length).toBeGreaterThan(0)

    const project = payload[0]
    expect(project).toMatchObject({
      slug: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
    })
  })
})
