import type { Metadata } from 'next'
import Link from 'next/link'
import FadeUp from '@/components/FadeUp'

export const metadata: Metadata = {
  title: 'Ethics',
  description:
    'The operating principles behind Systems That Decide: independence, confidentiality, corrections, and how analysis is separated from commercial interest.',
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

const principles = [
  {
    label: 'Independence',
    heading: 'The analysis is not for sale.',
    body: [
      'Systems That Decide operates on a strict no-implementation, no-vendor-conflict model. I do not implement the solutions I recommend. I do not take referral fees. I do not accept sponsored content. The advisory fees paid by clients and subscriptions paid by readers are the only revenue sources.',
      'This structure is not incidental. It is the business model. An advisor who profits from implementation has a financial interest in complexity. An analyst who takes sponsored content has a financial interest in the sponsor\'s preferred narrative. I have neither.',
    ],
  },
  {
    label: 'Sponsored Content',
    heading: 'No paid posts. No undisclosed arrangements.',
    body: [
      'Every piece published through Systems That Decide represents my independent analysis. No piece is written on behalf of, funded by, or reviewed by a third party prior to publication. No exceptions.',
      'If this policy ever changes, it will be stated plainly and in advance. It will not change quietly.',
    ],
  },
  {
    label: 'Client Confidentiality',
    heading: 'Client relationships are private.',
    body: [
      'I do not disclose the identity of advisory clients without their consent. I do not use proprietary information shared during an engagement in public analysis. The fact of an engagement is itself confidential unless the client chooses otherwise.',
      'Public analysis draws on first-hand experience building and operating these systems across many organisations over 16 years. It does not draw on confidential information from current or past advisory relationships.',
    ],
  },
  {
    label: 'Client and Subject Overlap',
    heading: 'When an advisory client is also a subject of analysis.',
    body: [
      'This situation has not arisen. When it does, my policy is as follows: I will not publish analysis about a company I am currently advising without their explicit consent. If consent is given, the advisory relationship will be disclosed in the piece. If consent is not given, I will not publish.',
      'This is a constraint on the publication, not a negotiation. Clients do not purchase editorial influence.',
    ],
  },
  {
    label: 'Corrections',
    heading: 'When I get something wrong.',
    body: [
      'Analysis built on incomplete information, faulty inference, or data that subsequently changes will be corrected. Corrections are issued prominently on the original piece, with a clear note of what changed and why.',
      'I do not quietly edit published work to remove errors. If it was wrong, the correction is visible. The original claim and the correction both stand in the record.',
    ],
  },
  {
    label: 'Conflicts of Interest',
    heading: 'Financial interests are disclosed.',
    body: [
      'All material financial interests are disclosed on the Conflicts of Interest page and within individual pieces where directly relevant. This includes equity positions from prior employment that I continue to hold.',
      'If you believe a relevant interest has not been disclosed, I want to know.',
    ],
  },
]

export default function EthicsPage() {
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
            <p style={{ ...S.label, marginBottom: '20px' }}>Ethics</p>
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
              How this practice operates.
            </h1>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p style={{ ...S.body, maxWidth: '620px' }}>
              The value of independent analysis depends entirely on its actual independence. These are the principles that govern how Systems That Decide operates, how analysis is produced, and how conflicts and errors are handled.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Principles */}
      <section style={{ background: '#0D0D0D', padding: 'clamp(64px, 8vw, 96px) 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {principles.map((p, i) => (
              <FadeUp key={p.label} delay={i * 0.06}>
                <div
                  style={{
                    background: '#141414',
                    border: '1px solid #2A2825',
                    borderTop: i === 0 ? '2px solid #9A8B47' : '2px solid rgba(154,139,71,0.3)',
                    padding: '40px',
                  }}
                >
                  <p style={{ ...S.label, marginBottom: '16px' }}>{p.label}</p>
                  <h2 style={S.h2}>{p.heading}</h2>
                  {p.body.map((para, j) => (
                    <p
                      key={j}
                      style={{
                        ...S.body,
                        marginBottom: j < p.body.length - 1 ? '16px' : 0,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.1}>
            <div
              style={{
                marginTop: '48px',
                paddingTop: '32px',
                borderTop: '1px solid #2A2825',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                alignItems: 'center',
              }}
            >
              <Link href="/conflicts" className="enquire-btn">
                View Conflicts of Interest
              </Link>
              <Link href="/methodology" className="enquire-btn">
                View Methodology
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
