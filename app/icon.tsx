import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0D0D0D',
        }}
      >
        <svg viewBox="0 0 100 100" width="30" height="30">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#9A8B47" strokeWidth="4" />
          <polygon
            points="50,6 94,50 50,94 6,50"
            fill="none"
            stroke="#9A8B47"
            strokeWidth="2"
          />
          <circle cx="50" cy="6" r="4" fill="#9A8B47" />
          <circle cx="94" cy="50" r="4" fill="#9A8B47" />
          <circle cx="50" cy="94" r="4" fill="#9A8B47" />
          <circle cx="6" cy="50" r="4" fill="#9A8B47" />
        </svg>
      </div>
    ),
    { width: 32, height: 32 }
  )
}
