import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { randomBytes } from 'crypto'

const CreateKeySchema = z.object({
  name: z.string().min(2),
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = CreateKeySchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  const apiKey = `sk_${randomBytes(16).toString('hex')}`

  try {
    const newKey = await prisma.apiKey.create({
      data: {
        name: parsed.data.name,
        key: apiKey,
      },
    })
    return NextResponse.json(newKey)
  } catch (error) {
    console.error('Failed to create API key:', error)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
