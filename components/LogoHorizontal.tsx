import LogoMark from './LogoMark'

export default function LogoHorizontal({ markSize = 28 }: { markSize?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <LogoMark size={markSize} />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <span
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 700,
            fontSize: '15px',
            letterSpacing: '0.01em',
            color: '#F0EDE8',
          }}
        >
          Systems
        </span>
        <span
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 500,
            fontSize: '15px',
            letterSpacing: '0.01em',
            color: '#F0EDE8',
          }}
        >
          That Decide
        </span>
      </div>
    </div>
  )
}
