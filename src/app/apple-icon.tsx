import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#0e0e0e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 40,
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: '-2px',
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
