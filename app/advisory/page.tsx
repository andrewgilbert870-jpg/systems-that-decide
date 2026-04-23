import type { Metadata } from 'next'
import Link from 'next/link'
import FadeUp from '@/components/FadeUp'
import ServiceRow from '@/components/ServiceRow'
import MandateBlock from '@/components/MandateBlock'

export const metadata: Metadata = {
  title: 'Advisory & Leadership',
  description:
    'Independent advisory engagements for organisations facing structural change in advertising, retail media, and commerce.',
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

const engagements = [
  {
    name: 'Strategic Audit',
    format: 'Single Engagement · 2–4 Weeks',
    who: 'Independent Agencies · Brands Direct',
    description:
      'A structured diagnostic of your current position in the algorithmic ecosystem. Where your decisions are made, where they should be made, and where the system is working against you.\n\nTypically triggered by a market shift: AI disruption, regulatory change, or research surfacing inefficiencies. Or by an agency that wants to scale but lacks the technology strategy to do it transparently and efficiently. The audit produces a clear assessment of where you are, where the gaps are, and what to prioritise first.',
  },
  {
    name: 'Executive Advisory',
    format: 'Ongoing · Quarterly or Monthly Retainer',
    who: 'Independent Agencies · Tech Platforms · Brands in Transformation',
    description:
      'A standing relationship for leadership teams that want an unconflicted outside view. Regular briefings, pressure-testing of strategy, and access to analysis as the market moves.\n\nWhen you are inside the business it is difficult to see the full picture. Biases develop. Teams operate under assumptions about what their product delivers or what their clients actually want that go untested. This engagement provides the independent challenge that internal teams cannot give each other.',
  },
  {
    name: 'Market Entry & Expansion',
    format: 'Project-Based · 4–8 Weeks',
    who: 'Tech Companies Entering ANZ · APAC Market',
    description:
      'For technology companies outside ANZ looking to enter the market, and for those who have launched and want to sense-check their strategy before committing further.\n\nThis engagement is built on understanding what the market actually responds to, not what looks right from the outside. That judgment comes from having sat on both sides: winning the Afterpay business while at Yahoo, then moving to Afterpay and redirecting their entire channel strategy.',
  },
  {
    name: 'Team Education',
    format: 'Workshop · Half Day or Full Day',
    who: 'Agencies · Brands · Tech Companies',
    description:
      'Structured education for commercial and marketing teams on how the systems they buy from actually work. Built from the inside of those systems, not from vendor documentation.\n\nMost teams do not operate from a shared understanding of why things happen, what the strategy is, or how to move forward when the market shifts. These sessions break down how the systems work and what to do when they don\'t. The same approach that explained programmatic supply chain fraud by comparing it to the beef industry: where the value disappears, who benefits, and what to do about it.',
  },
  {
    name: 'Transaction Advisory',
    format: 'Project-Based',
    who: 'Investors · Acquirers · Boards',
    description:
      'Independent assessment for investors, acquirers, and boards evaluating assets in the programmatic, marketing technology, or measurement spaces.\n\nSixteen years operating inside these businesses, not analysing them from the outside. The assessment is grounded in how these companies actually function, where the value is real, and where it is not. Engaged on the buy side, sell side, or as an independent expert for boards requiring specialist knowledge.',
  },
]

export default function AdvisoryPage() {
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
            <p style={{ ...S.label, marginBottom: '20px' }}>Advisory & Leadership</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700,
                fontSize: 'clamp(40px, 7vw, 64px)',
                color: '#F0EDE8',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: '24px',
                maxWidth: '760px',
              }}
            >
              Clarity on the systems shaping your business.
            </h1>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '18px',
                color: '#B8B2AE',
                lineHeight: 1.7,
                maxWidth: '620px',
                marginBottom: '40px',
              }}
            >
              Independent advisory engagements for organisations facing structural change in
              advertising, retail media, and commerce.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <a href="#engagements" className="btn-primary">
                View Engagements
              </a>
              <Link href="/enquire" className="btn-secondary">
                Enquire
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Engagements */}
      <section
        id="engagements"
        style={{ background: '#0D0D0D', padding: 'clamp(64px, 8vw, 96px) 0' }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '40px' }}>Engagements</p>
          </FadeUp>
          {engagements.map((e, i) => (
            <FadeUp key={e.name} delay={i * 0.06}>
              <ServiceRow {...e} isFirst={i === 0} />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Senior Leadership */}
      <section
        style={{
          background: '#1C1B1B',
          padding: 'clamp(64px, 8vw, 96px) 0',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '20px' }}>Senior Leadership</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 400,
                fontSize: 'clamp(26px, 4vw, 36px)',
                color: '#F0EDE8',
                marginBottom: '20px',
                lineHeight: 1.25,
                maxWidth: '640px',
              }}
            >
              Open to senior leadership conversations.
            </h2>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '18px',
                color: '#B8B2AE',
                lineHeight: 1.7,
                maxWidth: '640px',
                marginBottom: '36px',
              }}
            >
              Alongside advisory work, I am open to senior leadership and fractional executive
              roles in adtech, martech, retail media, and commerce infrastructure across ANZ and
              APAC. If you are building something in this space and need an operator who has done
              it before, get in touch.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <Link href="/enquire" className="btn-secondary">
              Start a Conversation
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Mandate */}
      <FadeUp>
        <MandateBlock />
      </FadeUp>
    </>
  )
}
