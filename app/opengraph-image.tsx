import { ImageResponse } from 'next/og'
import { site } from './content'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#f4f1ea',
          backgroundImage:
            'linear-gradient(to right, #e3dfd1 1px, transparent 1px), linear-gradient(to bottom, #e3dfd1 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: '50%',
            backgroundColor: '#7A725F',
            color: '#F0EDE6',
            fontSize: 24,
            letterSpacing: '-0.5px',
            marginBottom: 48,
          }}
        >
          RO
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.25,
            color: '#1a1a17',
            letterSpacing: '-0.01em',
          }}
        >
          <span>{site.name},</span>
          <span style={{ color: '#c2410c' }}>a Sr. Product Designer.</span>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 40,
            fontSize: 22,
            color: '#6b675e',
          }}
        >
          {site.experienceYears}+ years · design systems, product UX &amp; interaction design
        </div>
      </div>
    ),
    size,
  )
}
