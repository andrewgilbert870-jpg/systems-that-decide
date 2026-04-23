import Link from 'next/link'
import LogoStacked from './LogoStacked'

const footerLinks = [
  { href: '/ethics', label: 'Ethics' },
  { href: '/conflicts', label: 'Conflicts of Interest' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/enquire', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0D0D0D',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '64px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
        }}
      >
        <LogoStacked markSize={40} />

        <nav
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          {footerLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="footer-link">
              {label}
            </Link>
          ))}
        </nav>

        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '10px',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.2)',
            textAlign: 'center',
          }}
        >
          © 2025 SYSTEMS THAT DECIDE. INDEPENDENT ADVISORY MODEL.
        </p>
      </div>
    </footer>
  )
}
