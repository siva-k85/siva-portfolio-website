import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const ViewSchema = z.object({
  slug: z.string().min(1),
  type: z.enum(['project', 'note']),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = ViewSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { slug, type } = parsed.data

    // Upsert view count (create if not exists, increment if exists)
    const viewCount = await prisma.viewCount.upsert({
      where: { slug },
      update: { count: { increment: 1 } },
      create: { slug, type, count: 1 },
    })

    return NextResponse.json({ ok: true, count: viewCount.count })
  } catch (error) {
    console.error('View count error:', error)
    return NextResponse.json(
      { ok: false, error: 'Failed to update view count' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    const type = searchParams.get('type')

    if (!slug) {
      // Return all view counts
      const viewCounts = await prisma.viewCount.findMany({
        orderBy: { count: 'desc' },
      })
      return NextResponse.json({ ok: true, data: viewCounts })
    }

    // Return specific view count
    const viewCount = await prisma.viewCount.findUnique({
      where: { slug },
    })

    return NextResponse.json({
      ok: true,
      count: viewCount?.count || 0,
    })
  } catch (error) {
    console.error('View count fetch error:', error)
    return NextResponse.json(
      { ok: false, error: 'Failed to fetch view count' },
      { status: 500 }
    )
  }
}