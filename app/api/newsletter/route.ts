import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { withRateLimit } from '@/lib/rate-limit'

const Subscription = z.object({
  email: z.string().email(),
  source: z.string().optional(),
})

export async function POST(request: Request) {
  return withRateLimit(request, async req => {
    const body = await req.json().catch(() => null)
    const parsed = Subscription.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
    }

    const { email, source } = parsed.data

    try {
      await prisma.newsletterSubscriber.upsert({
        where: { email },
        update: { source },
        create: { email, source },
      })

      return NextResponse.json({ ok: true })
    } catch (error) {
      console.error('Newsletter subscription failed', error)
      return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
    }
  }, 5, 60000)
}
