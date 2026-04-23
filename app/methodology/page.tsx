import type { Metadata } from 'next'
import Link from 'next/link'
import FadeUp from '@/components/FadeUp'

export const metadata: Metadata = {
  title: 'Methodology',
  description:
    'How the analysis at Systems That Decide is produced: the sources, the reasoning, the distinction between first-hand knowledge and inference, and the corrections policy.',
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

export default function MethodologyPage() {
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
            <p style={{ ...S.label, marginBottom: '20px' }}>Methodology</p>
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
              Where the analysis comes from.
            </h1>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p style={{ ...S.body, maxWidth: '620px' }}>
              The practitioner&apos;s credibility only holds if the basis for each claim is clear. This page sets out how analysis is produced, what sources it draws on, and how first-hand knowledge is distinguished from inference.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Body */}
      <section style={{ background: '#0D0D0D', padding: 'clamp(64px, 8vw, 96px) 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

          {/* First-hand experience */}
          <FadeUp>
            <div
              style={{
                background: '#141414',
                border: '1px solid #2A2825',
                borderTop: '2px solid #9A8B47',
                padding: '40px',
                marginBottom: '2px',
              }}
            >
              <p style={{ ...S.label, marginBottom: '16px' }}>Source 1 — First-Hand Experience</p>
              <h2 style={S.h2}>Sixteen years operating inside these systems.</h2>
              <p style={{ ...S.body, marginBottom: '16px' }}>
                The primary source for this analysis is direct operational experience. I have held senior roles at Integral Ad Science, Yahoo, and Block (Afterpay), building and running the systems this publication analyses. I have been inside the commercial architecture of media measurement, programmatic supply chains, demand-side platforms, first-party data infrastructure, and retail media networks. Not as an observer. As an operator.
              </p>
              <p style={S.body}>
                When analysis draws on this experience, it will say so. Claims grounded in first-hand knowledge carry a different weight than claims grounded in published research. I treat them differently and so should you.
              </p>
            </div>
          </FadeUp>

          {/* Public filings */}
          <FadeUp delay={0.06}>
            <div
              style={{
                background: '#141414',
                border: '1px solid #2A2825',
                borderTop: '2px solid rgba(154,139,71,0.3)',
                padding: '40px',
                marginBottom: '2px',
              }}
            >
              <p style={{ ...S.label, marginBottom: '16px' }}>Source 2 — Public Company Filings</p>
              <h2 style={S.h2}>What companies say to investors and regulators.</h2>
              <p style={{ ...S.body, marginBottom: '16px' }}>
                Earnings calls, 10-K and 20-F filings, investor day presentations, and regulatory submissions are a primary source for claims about revenue, market position, product strategy, and business model. These documents are legal disclosures. They carry a standard of accuracy that press releases and marketing materials do not.
              </p>
              <p style={S.body}>
                Where analysis references a company&apos;s own filings, the source will be identified. The gap between what companies say to investors and what they say in the market is often where the most useful analysis lives.
              </p>
            </div>
          </FadeUp>

          {/* Industry research */}
          <FadeUp delay={0.08}>
            <div
              style={{
                background: '#141414',
                border: '1px solid #2A2825',
                borderTop: '2px solid rgba(154,139,71,0.3)',
                padding: '40px',
                marginBottom: '2px',
              }}
            >
              <p style={{ ...S.label, marginBottom: '16px' }}>Source 3 — Industry Research</p>
              <h2 style={S.h2}>Published research, with scepticism applied.</h2>
              <p style={{ ...S.body, marginBottom: '16px' }}>
                Analyst reports, trade press, and industry research inform the analysis but are not taken at face value. Much of the research produced in adtech and retail media is commissioned by vendors with a financial interest in particular findings. I note this where it is relevant and apply it accordingly.
              </p>
              <p style={S.body}>
                Where published research is cited, the source is identified. Where a claim depends on research I consider unreliable, I will say so rather than present the number as settled fact.
              </p>
            </div>
          </FadeUp>

          {/* Inference */}
          <FadeUp delay={0.1}>
            <div
              style={{
                background: '#141414',
                border: '1px solid #2A2825',
                borderTop: '2px solid rgba(154,139,71,0.3)',
                padding: '40px',
                marginBottom: '2px',
              }}
            >
              <p style={{ ...S.label, marginBottom: '16px' }}>Inference & Interpretation</p>
              <h2 style={S.h2}>Analysis is not always certain.</h2>
              <p style={{ ...S.body, marginBottom: '16px' }}>
                Structural analysis of markets and systems involves inference. Not every claim can be grounded in a document or a direct observation. When I am reasoning from available evidence rather than stating known fact, the analysis will reflect that distinction. &ldquo;This is what I observed&rdquo; and &ldquo;this is what the evidence suggests&rdquo; are different claims, and they are treated as such.
              </p>
              <p style={S.body}>
                I do not manufacture certainty to strengthen an argument. Where the picture is incomplete, that incompleteness is part of the analysis.
              </p>
            </div>
          </FadeUp>

          {/* Corrections */}
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
              <p style={{ ...S.label, marginBottom: '16px' }}>Corrections Policy</p>
              <h2 style={S.h2}>Errors are corrected visibly.</h2>
              <p style={{ ...S.body, marginBottom: '16px' }}>
                When analysis is wrong, the correction is published prominently on the original piece. The correction notes what the original claim was, what the correct information is, and where the error came from if that is known.
              </p>
              <p style={S.body}>
                Published work is not quietly edited to remove errors after the fact. The correction and the original claim both remain in the record. If you have identified an error, contact me directly.
              </p>
            </div>
          </FadeUp>

          {/* Footer links */}
          <FadeUp delay={0.14}>
            <div
              style={{
                paddingTop: '32px',
                borderTop: '1px solid #2A2825',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                alignItems: 'center',
              }}
            >
              <Link href="/ethics" className="enquire-btn">
                View Ethics
              </Link>
              <Link href="/conflicts" className="enquire-btn">
                View Conflicts of Interest
              </Link>
            </div>
          </FadeUp>

        </div>
      </section>
    </>
  )
}
