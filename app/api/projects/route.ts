import { NextResponse } from 'next/server'
import { getProjects } from '@/lib/mdx'
import { withRateLimit } from '@/lib/rate-limit'

export async function GET(req: Request) {
  return withRateLimit(req, async () => {
    try {
      const projects = await getProjects()
      return NextResponse.json(projects)
    } catch (error) {
      console.error('Error fetching projects:', error)
      return NextResponse.json([])
    }
  }, 20, 60000) // 20 requests per minute
}