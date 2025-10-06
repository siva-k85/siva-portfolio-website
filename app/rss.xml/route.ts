import { NextResponse } from 'next/server'
import { listNotes } from '@/lib/content'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sivakomaragiri.com'
  const notes = await listNotes()

  const items = notes
    .map(note => {
      const url = `${baseUrl}/notes/${note.slug}`
      return `
        <item>
          <title><![CDATA[${note.title}]]></title>
          <link>${url}</link>
          <guid>${url}</guid>
          <description><![CDATA[${note.summary}]]></description>
          <pubDate>${new Date(note.date || Date.now()).toUTCString()}</pubDate>
        </item>
      `
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Siva Komaragiri — Healthcare Analytics Notes</title>
      <link>${baseUrl}</link>
      <description>Healthcare analytics case studies, research notes, and strategy updates.</description>
      ${items}
    </channel>
  </rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
