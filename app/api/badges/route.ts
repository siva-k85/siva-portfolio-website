import { withRateLimit } from '@/lib/rate-limit'

export async function GET(req: Request) {
  return withRateLimit(req, async () => {
    return Response.json({ ok: true, data: {} })
  }, 20, 60000) // 20 requests per minute
}