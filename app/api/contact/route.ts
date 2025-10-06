import { NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { sendEmail } from '@/lib/email'
import { prisma } from '@/lib/prisma'
import { withRateLimit } from '@/lib/rate-limit'

const Contact = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(req: Request) {
  // Apply rate limiting: 5 requests per minute
  return withRateLimit(req, async (req) => {
    const body = await req.json().catch(() => null)
    const parsed = Contact.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })
    }

    const token = req.headers.get('x-recaptcha-token') || ''
    const recaptchaOk = await verifyRecaptcha(token)

    if (!recaptchaOk) {
      return NextResponse.json({ ok: false, error: 'captcha' }, { status: 429 })
    }

    // Use a try/catch block for database and email operations
    try {
      await Promise.all([
        sendEmail(parsed.data),
        prisma.contactMessage.create({
          data: {
            name: parsed.data.name,
            email: parsed.data.email,
            message: parsed.data.message,
            userAgent: req.headers.get('user-agent'),
            sourcePage: req.headers.get('referer'),
            // ip: req.headers.get('x-forwarded-for'), // Be mindful of privacy regulations
          },
        }),
      ])
      return NextResponse.json({ ok: true })
    } catch (error) {
      console.error('Failed to send email or save message:', error)
      return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
    }
  }, 5, 60000) // 5 requests per minute
}
