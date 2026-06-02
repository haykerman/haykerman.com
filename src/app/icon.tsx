import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#0e0e0e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '-0.5px',
            color: '#e8e4dc',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          hb
          <span style={{ color: '#d4a843' }}>.</span>
        </span>
      </div>
    ),
    { ...size }
  );
}
