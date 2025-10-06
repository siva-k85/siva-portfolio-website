import { ImageResponse } from 'next/og'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'Siva Komaragiri'
  const subtitle = searchParams.get('subtitle') || 'Healthcare Analytics Leader & AI Systems Architect'
  const type = searchParams.get('type') || 'default'

  // Color schemes based on type
  const colorSchemes = {
    default: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: '#ffffff' },
    project: { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', text: '#ffffff' },
    note: { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', text: '#ffffff' },
    tech: { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', text: '#1a1a1a' },
  }

  const scheme = colorSchemes[type as keyof typeof colorSchemes] || colorSchemes.default

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: scheme.bg,
          color: scheme.text,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: '90%',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 32,
                fontWeight: 400,
                opacity: 0.9,
                maxWidth: '80%',
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', gap: '40px', opacity: 0.8 }}>
            <div style={{ fontSize: 24 }}>CMU Healthcare Analytics</div>
            <div style={{ fontSize: 24 }}>Pittsburgh, PA</div>
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            sivakomaragiri.com
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}