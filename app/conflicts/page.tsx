import type { Metadata } from 'next'
import FadeUp from '@/components/FadeUp'

export const metadata: Metadata = {
  title: 'Conflicts of Interest',
  description:
    'A full disclosure of financial interests, relationships, and arrangements that could influence the analysis published by Systems That Decide.',
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
  h2: {
    fontFamily: 'var(--font-playfair)',
    fontWeight: 500,
    fontSize: '22px',
    color: '#F0EDE8',
    lineHeight: 1.3,
    marginBottom: '16px',
  },
  body: {
    fontFamily: 'var(--font-inter)',
    fontSize: '17px',
    color: '#B8B2AE',
    lineHeight: 1.75,
  },
}

export default function ConflictsPage() {
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
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '20px' }}>Conflicts of Interest</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700,
                fontSize: 'clamp(36px, 6vw, 60px)',
                color: '#F0EDE8',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: '24px',
                maxWidth: '760px',
              }}
            >
              What you should know before reading the analysis.
            </h1>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p
              style={{
                ...S.body,
                maxWidth: '620px',
              }}
            >
              Independence is the product. This page exists to substantiate that claim with specifics. Every financial interest, prior relationship, or arrangement that could influence this analysis is disclosed here. It will be updated if circumstances change.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Disclosures */}
      <section style={{ background: '#0D0D0D', padding: 'clamp(64px, 8vw, 96px) 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

          {/* Equity */}
          <FadeUp>
            <div
              style={{
                background: '#141414',
                border: '1px solid #2A2825',
                borderTop: '2px solid #9A8B47',
                padding: '40px',
                marginBottom: '24px',
              }}
            >
              <p style={{ ...S.label, marginBottom: '16px' }}>Equity Holdings</p>
              <h2 style={S.h2}>Block, Inc. (NYSE: SQ)</h2>
              <p style={{ ...S.body, marginBottom: '20px' }}>
                I hold vested equity in Block, Inc., the parent company of Afterpay, Cash App, and Square. This equity was received as compensation during my tenure as Vice President, Advertising at Block, where I built the company&apos;s first global media network out of ANZ. I still hold this equity.
              </p>
              <p style={{ ...S.body }}>
                Any analysis that touches Block, Afterpay, retail media networks built on commerce infrastructure, or the buy-now-pay-later ecosystem should be read with this in mind. I will disclose this relationship explicitly whenever it is directly relevant to a piece.
              </p>
            </div>
          </FadeUp>

          {/* No other equity */}
          <FadeUp delay={0.06}>
            <div
              style={{
                background: '#141414',
                border: '1px solid #2A2825',
                borderTop: '2px solid rgba(154,139,71,0.3)',
                padding: '40px',
                marginBottom: '24px',
              }}
            >
              <p style={{ ...S.label, marginBottom: '16px' }}>All Other Equity</p>
              <p style={S.body}>
                I do not hold equity, shares, or options in any other adtech, martech, retail media, measurement, or advertising technology company.
              </p>
            </div>
          </FadeUp>

          {/* Board and advisory */}
          <FadeUp delay={0.08}>
            <div
              style={{
                background: '#141414',
                border: '1px solid #2A2825',
                borderTop: '2px solid rgba(154,139,71,0.3)',
                padding: '40px',
                marginBottom: '24px',
              }}
            >
              <p style={{ ...S.label, marginBottom: '16px' }}>Board Seats & Advisory Roles</p>
              <p style={S.body}>
                I hold no board seats and no formal advisory or paid consulting arrangements with any company operating in adtech, martech, retail media, or commerce infrastructure.
              </p>
            </div>
          </FadeUp>

          {/* Referrals */}
          <FadeUp delay={0.1}>
            <div
              style={{
                background: '#141414',
                border: '1px solid #2A2825',
                borderTop: '2px solid rgba(154,139,71,0.3)',
                padding: '40px',
                marginBottom: '24px',
              }}
            >
              <p style={{ ...S.label, marginBottom: '16px' }}>Referral & Reseller Arrangements</p>
              <p style={S.body}>
                I have no referral fees, reseller agreements, or revenue-sharing arrangements with any vendor, platform, or technology company. I do not receive payment for directing clients toward particular products or services.
              </p>
            </div>
          </FadeUp>

          {/* Sponsored content */}
          <FadeUp delay={0.12}>
            <div
              style={{
                background: '#141414',
                border: '1px solid #2A2825',
                borderTop: '2px solid rgba(154,139,71,0.3)',
                padding: '40px',
                marginBottom: '48px',
              }}
            >
              <p style={{ ...S.label, marginBottom: '16px' }}>Sponsored Content</p>
              <p style={S.body}>
                Systems That Decide does not accept sponsored content, paid posts, or undisclosed commercial arrangements of any kind. The Substack publication is funded entirely by reader subscriptions and advisory fees. The analysis is never paid for by a third party.
              </p>
            </div>
          </FadeUp>

          {/* Footer note */}
          <FadeUp delay={0.14}>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '14px',
                color: '#B8B2AE',
                lineHeight: 1.7,
                paddingTop: '32px',
                borderTop: '1px solid #2A2825',
                letterSpacing: '0.02em',
              }}
            >
              This disclosure was last reviewed April 2025. If you believe a relevant interest has not been disclosed, contact me directly.
            </p>
          </FadeUp>

        </div>
      </section>
    </>
  )
}
