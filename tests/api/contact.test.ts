/** @jest-environment node */
import { POST } from '@/app/api/contact/route'

jest.mock('@/lib/email', () => ({
  sendEmail: jest.fn().mockResolvedValue(undefined),
}))

jest.mock('@/lib/prisma', () => ({
  prisma: {
    contactMessage: {
      create: jest.fn().mockResolvedValue(undefined),
    },
  },
}))

describe('POST /api/contact', () => {
  const payload = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    message: 'Interested in your healthcare analytics services.',
  }

  it('returns 200 when the payload is valid', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-recaptcha-token': 'test-token',
      },
      body: JSON.stringify(payload),
    })

    const response = await POST(request)
    expect(response.status).toBe(200)

    const json = await response.json()
    expect(json).toEqual({ ok: true })
  })

  it('returns 400 when the payload is invalid', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-recaptcha-token': 'test-token',
      },
      body: JSON.stringify({ name: 'A', email: 'not-email', message: 'hi' }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })
})