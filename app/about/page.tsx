import type { Metadata } from 'next'
import Link from 'next/link'
import FadeUp from '@/components/FadeUp'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Sixteen years inside the infrastructure of advertising decisions. Across brand, agency, adtech, payments, and retail media.',
}

const S = {
  label: {
    fontFamily: 'var(--font-inter)',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: '#9A8B47',
  },
}

const roles = [
  {
    role: 'Vice President, Advertising',
    company: 'Afterpay — Block',
    body: "Built Block\u2019s (Afterpay, Cash App & Square) first global media network out of ANZ. Responsible for commercial, product, audience, integrations, and supply strategy. The network became the model for Block\u2019s global advertising expansion.",
  },
  {
    role: 'Director of Commercial & Solutions',
    company: 'Yahoo',
    body: "Led commercial and platform solutions across Yahoo\u2019s technology in ANZ and SEA. Developed the go-to-market, sales enablement, and product strategy for the region alongside global counterparts. Delivered 2,550% revenue growth from 2019 to 2025.",
  },
  {
    role: 'Director of Sales',
    company: 'Integral Ad Science',
    body: 'Key member of the original leadership team that grew IAS from limited ANZ presence to approximately 60% market share. Primary driver of new and existing business and client strategy, bringing measurement and verification to every major agency holding group and leading direct advertisers including Westpac Group.',
  },
]

const ecosystemCells = [
  { icon: 'domain', label: 'Brand' },
  { icon: 'groups', label: 'Agency' },
  { icon: 'article', label: 'Publisher' },
  { icon: 'memory', label: 'Adtech' },
  { icon: 'payments', label: 'Payments' },
  { icon: 'storefront', label: 'Retail Media' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: '#0D0D0D',
          padding: 'clamp(80px, 10vw, 120px) 0 clamp(60px, 8vw, 96px)',
          borderBottom: '1px solid rgba(154,139,71,0.2)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: 'clamp(40px, 6vw, 80px)',
              alignItems: 'start',
            }}
          >
            {/* Left: text */}
            <div>
              <FadeUp>
                <h1
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 700,
                    fontSize: 'clamp(40px, 7vw, 72px)',
                    color: '#9A8B47',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    marginBottom: '24px',
                  }}
                >
                  The Practitioner&apos;s Perspective.
                </h1>
              </FadeUp>
              <FadeUp delay={0.08}>
                <p
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 400,
                    fontSize: 'clamp(18px, 2.5vw, 24px)',
                    color: '#B8B2AE',
                    lineHeight: 1.45,
                    marginBottom: '20px',
                  }}
                >
                  Sixteen years inside the infrastructure of advertising decisions. Across brand, agency,
                  adtech, payments, and retail media.
                </p>
              </FadeUp>
              <FadeUp delay={0.14}>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '18px',
                    color: '#B8B2AE',
                    lineHeight: 1.7,
                  }}
                >
                  Andrew Gilbert has spent 16 years working inside the infrastructure of advertising decisions. Not advising from the outside. Building, running, and selling these systems from inside the major operators across ANZ and APAC.
                </p>
              </FadeUp>
            </div>

            {/* Right: photo + profile link */}
            <FadeUp delay={0.1}>
              <div>
                <div
                  style={{
                    borderTop: '2px solid #9A8B47',
                    overflow: 'hidden',
                    background: '#141414',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/andrew-gilbert.png"
                    alt="Andrew Gilbert"
                    style={{
                      width: '100%',
                      display: 'block',
                      filter: 'grayscale(10%) contrast(1.05)',
                    }}
                  />
                </div>
                <div
                  style={{
                    paddingTop: '20px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Link
                    href="/profile"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#9A8B47',
                      textDecoration: 'none',
                    }}
                  >
                    Full career profile →
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* The 16-Year Record */}
      <section style={{ background: '#0D0D0D', padding: 'clamp(64px, 8vw, 96px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '40px' }}>The 16-Year Record</p>
          </FadeUp>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '24px',
              marginBottom: '40px',
            }}
          >
            {roles.map((r, i) => (
              <FadeUp key={r.company} delay={i * 0.06}>
                <div
                  style={{
                    background: '#141414',
                    border: '1px solid #2A2825',
                    borderTop: '2px solid #9A8B47',
                    padding: '32px',
                    height: '100%',
                  }}
                >
                  <p style={{ ...S.label, marginBottom: '10px' }}>{r.role}</p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 500,
                      fontSize: '22px',
                      color: '#F0EDE8',
                      marginBottom: '16px',
                      lineHeight: 1.2,
                    }}
                  >
                    {r.company}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '16px',
                      color: '#B8B2AE',
                      lineHeight: 1.7,
                    }}
                  >
                    {r.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <div
              style={{
                paddingTop: '24px',
                borderTop: '1px solid #2A2825',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '14px',
                  color: '#B8B2AE',
                  letterSpacing: '0.04em',
                  textAlign: 'center',
                }}
              >
                Previously: Vodafone (first ANZ DMP deployment, Krux/Salesforce) · Ikon
                Communications
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 360° Ecosystem */}
      <section style={{ background: '#141414', padding: 'clamp(64px, 8vw, 96px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '40px' }}>360° Ecosystem Experience</p>
          </FadeUp>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '16px',
            }}
          >
            {ecosystemCells.map((cell, i) => (
              <FadeUp key={cell.label} delay={i * 0.05}>
                <div className="eco-cell">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '32px', color: '#9A8B47' }}
                  >
                    {cell.icon}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#B8B2AE',
                    }}
                  >
                    {cell.label}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
