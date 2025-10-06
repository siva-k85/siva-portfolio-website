/** @jest-environment node */
import { POST } from '@/app/api/newsletter/route'

const upsertMock = jest.fn().mockResolvedValue(undefined)

jest.mock('@/lib/prisma', () => ({
  prisma: {
    newsletterSubscriber: {
      upsert: (...args: unknown[]) => upsertMock(...args),
    },
  },
}))

describe('POST /api/newsletter', () => {
  beforeEach(() => {
    upsertMock.mockClear()
  })

  it('creates or updates a subscriber', async () => {
    const request = new Request('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'subscriber@example.com', source: 'footer' }),
    })

    const response = await POST(request)
    expect(response.status).toBe(200)

    expect(upsertMock).toHaveBeenCalledWith({
      where: { email: 'subscriber@example.com' },
      update: { source: 'footer' },
      create: { email: 'subscriber@example.com', source: 'footer' },
    })
  })

  it('rejects invalid email addresses', async () => {
    const request = new Request('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'not-an-email' }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    expect(upsertMock).not.toHaveBeenCalled()
  })
})