import type { Metadata } from 'next'
import Link from 'next/link'
import FadeUp from '@/components/FadeUp'

export const metadata: Metadata = {
  title: 'Senior Leadership — Systems That Decide',
  description:
    'Open to senior leadership and fractional executive conversations in adtech, martech, retail media, and commerce infrastructure across ANZ.',
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
  body: {
    fontFamily: 'var(--font-inter)',
    fontSize: '18px',
    color: '#B8B2AE',
    lineHeight: 1.7,
  },
}

const roles = [
  {
    role: 'Vice President, Advertising',
    company: 'Afterpay / Block',
    format: '2025–2026 · Retail Media · Payments-Led Advertising',
    body: "Built Block’s first global media network out of ANZ. Responsible for commercial, product, audience, integrations, and supply strategy across Afterpay, Cash App, and Square. The network became the model for Block’s global advertising expansion. Started from zero. Built to a market-leading retail media operation.",
  },
  {
    role: 'Director of Commercial & Solutions',
    company: 'Yahoo',
    format: '2019–2025 · Programmatic · Platform Operations',
    body: "Led commercial and platform solutions across Yahoo’s DSP and SSP technology in ANZ and SEA. Go-to-market, sales enablement, and product strategy developed alongside global counterparts. Delivered 2,550% revenue growth from the time of joining through to 2025.",
  },
  {
    role: 'Director of Sales',
    company: 'Integral Ad Science',
    format: '2016–2019 · Verification · Brand Safety',
    body: 'Key member of the original ANZ leadership team. Grew IAS from limited ANZ presence to approximately 60% market share. Primary driver of new business across every major agency holding group and leading direct advertisers.',
  },
]

const roleTypes = [
  {
    name: 'Senior Leadership',
    description:
      'Senior roles in adtech, martech, retail media, commerce platforms, or measurement businesses operating in ANZ. Preference for operators building in a space I know well. Not for titles in adjacent categories.',
  },
  {
    name: 'Fractional Executive',
    description:
      'Senior commercial, revenue, or product leadership on a fractional basis for technology businesses in the programmatic, retail media, or measurement space. Particularly suited to ANZ market entry or scale phases where a full-time hire is premature.',
  },
  {
    name: 'Board Advisory',
    description:
      'Independent director or advisory board roles for technology companies in programmatic infrastructure, retail media, measurement, or commerce. Specifically where operator knowledge of how these systems actually function is the value. Not general commercial governance.',
  },
  {
    name: 'Special Projects',
    description:
      'Significant commercial, product, or transformation projects where an experienced operator is needed for a defined period. Examples: retail media network launch, commercial model redesign, major platform migration.',
  },
]

export default function LeadershipPage() {
  return (
    <>
      {/* Section 1: Hero */}
      <section
        style={{
          background: '#0D0D0D',
          padding: 'clamp(80px, 10vw, 120px) 0 clamp(60px, 8vw, 96px)',
          borderBottom: '1px solid rgba(154,139,71,0.2)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '20px' }}>Senior Leadership</p>
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
              Open to senior leadership conversations.
            </h1>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p style={{ ...S.body, maxWidth: '620px', marginBottom: '40px' }}>
              Alongside advisory work, I am open to senior leadership and fractional executive roles
              in adtech, martech, retail media, and commerce infrastructure across ANZ. If you are
              building something in this space and need an operator who has done it before, get in
              touch.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <Link href="/enquire" className="btn-primary">
              Start a Conversation
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Section 2: The Record */}
      <section
        style={{
          background: '#0D0D0D',
          padding: 'clamp(64px, 8vw, 96px) 0',
          borderTop: '1px solid #2A2825',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '20px' }}>The Record</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 40px)',
                color: '#F0EDE8',
                marginBottom: '20px',
                maxWidth: '640px',
                lineHeight: 1.25,
              }}
            >
              Sixteen years building and running the systems, not advising from the outside.
            </h2>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p style={{ ...S.body, maxWidth: '680px', marginBottom: '48px' }}>
              The value of this experience is not the seniority. It is the specific set of decisions
              made, systems built, and transitions managed across every structural layer of the
              modern media stack: agency trading through adtech operations, verification, data,
              and retail media at significant scale.
            </p>
          </FadeUp>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {roles.map((r, i) => (
              <FadeUp key={r.company} delay={i * 0.06}>
                <div
                  style={{
                    borderTop: i === 0 ? '2px solid #9A8B47' : '1px solid #2A2825',
                    padding: '36px 0',
                  }}
                >
                  <p style={{ ...S.label, marginBottom: '8px' }}>{r.role}</p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 500,
                      fontSize: '24px',
                      color: '#F0EDE8',
                      marginBottom: '8px',
                      lineHeight: 1.2,
                    }}
                  >
                    {r.company}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '13px',
                      color: '#9A8B47',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase' as const,
                      marginBottom: '16px',
                    }}
                  >
                    {r.format}
                  </p>
                  <p style={{ ...S.body, maxWidth: '680px' }}>{r.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: What I'm Open To */}
      <section
        style={{
          background: '#0F0F0F',
          padding: 'clamp(64px, 8vw, 96px) 0',
          borderTop: '1px solid #2A2825',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '20px' }}>What I&apos;m Open To</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 40px)',
                color: '#F0EDE8',
                marginBottom: '48px',
                maxWidth: '640px',
              }}
            >
              The roles that make sense.
            </h2>
          </FadeUp>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '20px',
            }}
          >
            {roleTypes.map((rt, i) => (
              <FadeUp key={rt.name} delay={i * 0.06}>
                <div
                  style={{
                    background: '#141414',
                    border: '1px solid #2A2825',
                    borderTop: '2px solid #9A8B47',
                    padding: '32px 36px',
                    height: '100%',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 500,
                      fontSize: '20px',
                      color: '#F0EDE8',
                      marginBottom: '16px',
                      lineHeight: 1.25,
                    }}
                  >
                    {rt.name}
                  </h3>
                  <p style={{ ...S.body, fontSize: '16px' }}>{rt.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: A Note on Advisory */}
      <section
        style={{
          background: '#0D0D0D',
          padding: 'clamp(64px, 8vw, 96px) 0',
          borderTop: '1px solid #2A2825',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '20px' }}>A Note on Advisory</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 400,
                fontSize: 'clamp(22px, 3vw, 30px)',
                color: '#F0EDE8',
                marginBottom: '24px',
                maxWidth: '640px',
                lineHeight: 1.35,
              }}
            >
              Advisory work and a leadership role are not mutually exclusive.
            </h2>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p style={{ ...S.body, maxWidth: '640px', marginBottom: '20px' }}>
              Both are available simultaneously. Advisory clients are organisations that are not in
              a competitive or conflicted position with a leadership employer. This is assessed at
              engagement and disclosed where relevant.
            </p>
            <p style={{ ...S.body, maxWidth: '640px', marginBottom: '36px' }}>
              Where a leadership appointment creates a conflict with an existing advisory client,
              that client relationship would be managed down or closed. This has not been required
              to date. The advisory practice is structured to avoid conflicts precisely so that
              leadership conversations can proceed without complications.
            </p>
            <Link href="/advisory" className="btn-secondary">
              View Advisory
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section
        style={{
          background: '#141414',
          padding: 'clamp(64px, 8vw, 96px) 0',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <div
              style={{
                borderLeft: '4px solid #9A8B47',
                paddingLeft: '40px',
                maxWidth: '640px',
              }}
            >
              <blockquote
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '22px',
                  color: '#9A8B47',
                  lineHeight: 1.6,
                  margin: '0 0 24px 0',
                }}
              >
                &ldquo;If you are building something in this space and need an operator who has done
                it before, get in touch.&rdquo;
              </blockquote>
              <p style={{ ...S.body, marginBottom: '32px' }}>
                Conversations are taken selectively. The more specific you are about the role, the
                business, and the problem you need solved, the better I can assess whether it is
                the right fit.
              </p>
              <Link href="/enquire" className="btn-primary">
                Start a Conversation
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
