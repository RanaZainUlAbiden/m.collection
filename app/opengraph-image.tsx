import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Marjaan Collection - Premium Footwear & Organic Care';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#2C1A1D',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: '#FDFCF8',
          borderTop: '20px solid #D4AFA0',
        }}
      >
        {/* The SB Monogram */}
        <div style={{ display: 'flex', position: 'relative', width: 200, height: 200, marginBottom: 50, alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ position: 'absolute', top: 5, left: 5, width: 190, height: 190, borderRadius: 40, background: 'rgba(212, 175, 160, 0.2)' }} />
           <div style={{ position: 'absolute', top: 15, left: 15, width: 170, height: 170, borderRadius: 30, border: '8px solid #D4AFA0' }} />
           <div style={{ fontSize: 96, fontWeight: 'bold', color: '#D4AFA0', letterSpacing: '-6px', fontFamily: 'serif', marginTop: 10 }}>MC</div>
        </div>

        <h1
          style={{
            fontSize: 90,
            fontWeight: 800,
            letterSpacing: '-3px',
            marginBottom: 20,
            textAlign: 'center',
            fontFamily: 'serif',
          }}
        >
          Marjaan Collection
        </h1>
        <p
          style={{
            fontSize: 42,
            color: '#D4AFA0',
            textAlign: 'center',
            maxWidth: '85%',
            lineHeight: 1.4,
          }}
        >
          Premium Footwear & Holistic Organic Care
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
