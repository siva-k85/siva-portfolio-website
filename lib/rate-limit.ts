import { LRUCache } from 'lru-cache'
import { NextResponse } from 'next/server'

type Options = {
  uniqueTokenPerInterval?: number
  interval?: number
}

export default function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000, // 60 seconds default
  })

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0]
        if (tokenCount[0] === 0) {
          tokenCache.set(token, [1])
        }
        tokenCount[0] += 1

        const currentUsage = tokenCount[0]
        const isRateLimited = currentUsage > limit

        if (isRateLimited) {
          reject(new Error('Rate limit exceeded'))
        } else {
          tokenCache.set(token, tokenCount)
          resolve()
        }
      }),
  }
}

// Helper function to get client identifier
export function getClientId(req: Request): string {
  // Try to get real IP from various headers
  const forwarded = req.headers.get('x-forwarded-for')
  const realIp = req.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIp || 'unknown'

  // Combine with user agent for better uniqueness
  const userAgent = req.headers.get('user-agent') || 'unknown'

  return `${ip}-${userAgent.substring(0, 50)}`
}

export async function withRateLimit(
  req: Request,
  handler: (req: Request) => Promise<Response>,
  limit = 10,
  interval = 60000
) {
  const limiter = rateLimit({
    interval,
    uniqueTokenPerInterval: 500,
  })

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*' as const,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' as const,
    'Access-Control-Allow-Headers': 'Content-Type, Authorization' as const,
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const clientId = getClientId(req)
    await limiter.check(limit, clientId)
    const response = await handler(req)
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    return response
  } catch {
    const response = NextResponse.json(
      { error: 'Too many requests, please try again later.' },
      { status: 429 }
    )
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    return response
  }
}