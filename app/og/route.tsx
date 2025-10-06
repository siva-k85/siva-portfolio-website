import { ImageResponse } from 'next/og'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'Siva Komaragiri'
  return new ImageResponse(
    (
      <div style={{ display:'flex', width:'100%', height:'100%', alignItems:'center', justifyContent:'center', background:'#f6f6f7', color:'#17171a' }}>
        <div style={{ fontSize: 64, fontWeight: 700, padding: 40, borderRadius: 24, border: '4px solid #17171a' }}>{title}</div>
      </div>
    ), { width: 1200, height: 630 }
  )
}