import LogoMark from './LogoMark'

export default function LogoStacked({ markSize = 40 }: { markSize?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <LogoMark size={markSize} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.2 }}>
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
