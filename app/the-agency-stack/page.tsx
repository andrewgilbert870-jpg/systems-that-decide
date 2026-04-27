import type { Metadata } from 'next'
import Link from 'next/link'
import FadeUp from '@/components/FadeUp'
import MandateBlock from '@/components/MandateBlock'

export const metadata: Metadata = {
  title: 'The Agency Stack — Systems That Decide',
  description:
    'Senior adtech expertise. Fractional access. For independent agencies in ANZ.',
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

const domains = [
  {
    num: '01',
    name: 'Programmatic Infrastructure',
    description:
      'DSP and SSP configuration. Supply path transparency. Fee verification. Inventory quality and brand safety protocols. What is actually happening between the brief and the impression.',
  },
  {
    num: '02',
    name: 'Data & Measurement',
    description:
      'Identity and audience data strategy. Measurement framework design. Attribution methodology. First-party data infrastructure. Clean room readiness.',
  },
  {
    num: '03',
    name: 'AI & Automation',
    description:
      'Platform AI exposure across PMax, Advantage+, and algorithmic social. Agency AI tooling and governance. Agentic decision accountability — what the AI is doing and who knows.',
  },
  {
    num: '04',
    name: 'Vendor & Commercial',
    description:
      'Technology contracts and renewal terms. Vendor relationships and potential conflicts. Platform partnership obligations. Lock-in risk and exit conditions.',
  },
]

const reviewPhases = [
  {
    num: '01',
    name: 'Discover',
    duration: 'Weeks 1–2',
    description:
      'Intake questionnaire. Kick-off session. Platform access provisioned. Document review: technology contracts, vendor agreements, media plans, measurement frameworks.',
  },
  {
    num: '02',
    name: 'Assess',
    duration: 'Weeks 2–4',
    description:
      'Four domains assessed systematically. Platform AI exposure reviewed. Supply path and fee analysis completed. Agency tooling and governance assessed.',
  },
  {
    num: '03',
    name: 'Design',
    duration: 'Weeks 4–6',
    description:
      'Output production. Technology Architecture Report drafted. Recommendations prioritised. Live presentation session delivered.',
  },
]

const reportElements = [
  {
    num: '01',
    name: 'Stack Inventory',
    description:
      'Every tool, its purpose, its cost, and who owns the vendor relationship. The foundation for everything that follows.',
  },
  {
    num: '02',
    name: 'Integration Map',
    description:
      'How platforms connect, where data flows, and where it does not. Gaps and broken connections identified explicitly.',
  },
  {
    num: '03',
    name: 'Gap Analysis',
    description:
      'What is missing, duplicated, or working against the agency\'s interests. Tool overlap, redundant spend, and infrastructure decisions that cost more than they return.',
  },
  {
    num: '04',
    name: 'Risk Register',
    description:
      'Vendor lock-in, data governance exposure, contract risks, and commercial conflicts — prioritised by severity with a recommended response for each.',
  },
  {
    num: '05',
    name: 'AI Exposure Report',
    description:
      'What platform AI and agency AI tooling is currently doing in the stack. Accountability gaps identified. Who is responsible for what the AI decides.',
  },
  {
    num: '06',
    name: 'Recommendations',
    description:
      'Prioritised, scoped, and buildable. Structured by urgency and effort. A document you can take to a board or brief a developer with.',
  },
]

const retainerInclusions = [
  {
    name: 'Monthly Tech Review',
    description:
      'A structured monthly review covering platform changes, new tools worth evaluating, and emerging risks. Delivered as a written summary with session notes.',
  },
  {
    name: 'Brief Response',
    description:
      'When a brief lands with a technology component or a platform makes a change mid-campaign, that is handled within the retainer. Responses delivered in writing.',
  },
  {
    name: 'Vendor Evaluation',
    description:
      'Before committing to a new platform or signing a vendor contract, an independent assessment of whether it is the right tool, whether the terms are fair, and what the exit looks like.',
  },
  {
    name: 'Quarterly Direction',
    description:
      'A structured quarterly session reviewing stack direction against agency growth, client mix, and commercial priorities.',
  },
]

const independencePoints = [
  'No equity in any vendor, platform, or data provider',
  'No referral fees or introductory commissions from any recommendation',
  'No formal platform partnerships or reseller arrangements',
  'Full disclosure of any prior employment or commercial involvement with vendors assessed',
]

export default function TheAgencyStackPage() {
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
            <p style={{ ...S.label, marginBottom: '20px' }}>The Agency Stack</p>
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
              Senior adtech expertise. Fractional access.
            </h1>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p style={{ ...S.body, maxWidth: '620px', marginBottom: '40px' }}>
              For independent agencies in ANZ. Two products that work together: a one-time
              assessment of your technology stack, and an ongoing monthly advisory to keep it
              current.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <a href="#products" className="btn-primary">
                View Products
              </a>
              <Link href="/enquire" className="btn-secondary">
                Enquire
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Section 2: Why This Exists */}
      <section
        id="products"
        style={{
          background: '#0D0D0D',
          padding: 'clamp(64px, 8vw, 96px) 0',
          borderTop: '1px solid #2A2825',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '20px' }}>Why This Exists</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 40px)',
                color: '#F0EDE8',
                marginBottom: '24px',
                maxWidth: '720px',
                lineHeight: 1.25,
              }}
            >
              Holding companies built infrastructure for scale. Independent agencies need it for one
              client at a time.
            </h2>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p style={{ ...S.body, maxWidth: '680px', marginBottom: '20px' }}>
              Independent agencies are managing increasingly complex media technology stacks without
              the structural oversight capability that holding companies have built for scale.
              Platform AI is making buying decisions autonomously. Programmatic supply paths are
              longer and harder to audit. Clients are asking questions that require technical depth
              most independent agencies were not built with.
            </p>
            <p style={{ ...S.body, maxWidth: '680px' }}>
              The Agency Stack fills that gap. Not as a consultant recommending tools. As an
              operator who built these systems from the inside — and can tell you what is working,
              what is not, and what to do about it.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Section 3: Two Products */}
      <section
        style={{
          background: '#0D0D0D',
          padding: 'clamp(64px, 8vw, 96px) 0',
          borderTop: '1px solid #2A2825',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '20px' }}>Two Products</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 40px)',
                color: '#F0EDE8',
                marginBottom: '48px',
              }}
            >
              One builds the map. One keeps it current.
            </h2>
          </FadeUp>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
              gap: '24px',
            }}
          >
            {/* Card 1: The Stack Review */}
            <FadeUp delay={0.1}>
              <div
                style={{
                  background: '#141414',
                  border: '1px solid #2A2825',
                  borderTop: '3px solid #9A8B47',
                  padding: '48px',
                }}
              >
                <p style={{ ...S.label, marginBottom: '16px' }}>The Stack Review</p>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 700,
                    fontSize: '32px',
                    color: '#F0EDE8',
                    marginBottom: '20px',
                    lineHeight: 1.2,
                  }}
                >
                  A full assessment of your current technology architecture.
                </h3>
                <p style={{ ...S.body, marginBottom: '28px' }}>
                  One-time engagement. Six weeks. Four domains assessed systematically. Delivered as
                  a Technology Architecture Report and a live presentation session.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '13px',
                    color: '#9A8B47',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    marginBottom: '32px',
                  }}
                >
                  Programmatic Infrastructure · Data & Measurement · AI & Automation · Vendor & Commercial
                </p>
                <div
                  style={{
                    borderTop: '1px solid #2A2825',
                    paddingTop: '28px',
                    marginTop: '4px',
                  }}
                >
                  <p style={{ ...S.label, marginBottom: '10px' }}>Investment</p>
                  <p
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 700,
                      fontSize: '36px',
                      color: '#F0EDE8',
                      marginBottom: '10px',
                    }}
                  >
                    AUD $12,000 – $15,000
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '14px',
                      color: '#6B6560',
                    }}
                  >
                    Founding Agency Rate available. Enquire for details.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Card 2: The Technology Retainer */}
            <FadeUp delay={0.16}>
              <div
                style={{
                  background: '#0F0F0F',
                  border: '2px solid #9A8B47',
                  padding: '48px',
                }}
              >
                <p style={{ ...S.label, marginBottom: '16px' }}>The Technology Retainer</p>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 700,
                    fontSize: '32px',
                    color: '#F0EDE8',
                    marginBottom: '20px',
                    lineHeight: 1.2,
                  }}
                >
                  Senior adtech expertise available every month.
                </h3>
                <p style={{ ...S.body, marginBottom: '28px' }}>
                  Ongoing monthly engagement. Monthly tech review, brief response, vendor
                  evaluation, and quarterly direction session. The stack review builds the
                  foundation. The retainer keeps it current.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '13px',
                    color: '#9A8B47',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    marginBottom: '32px',
                  }}
                >
                  Monthly Review · Brief Response · Vendor Evaluation · Quarterly Direction
                </p>
                <div
                  style={{
                    borderTop: '1px solid #2A2825',
                    paddingTop: '28px',
                    marginTop: '4px',
                  }}
                >
                  <p style={{ ...S.label, marginBottom: '10px' }}>Investment</p>
                  <p
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 700,
                      fontSize: '36px',
                      color: '#F0EDE8',
                      marginBottom: '10px',
                    }}
                  >
                    AUD $3,500 – $4,500{' '}
                    <span
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 400,
                        fontSize: '20px',
                        color: '#B8B2AE',
                      }}
                    >
                      / month
                    </span>
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '14px',
                      color: '#6B6560',
                    }}
                  >
                    Minimum three-month initial term.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Section 4: Stack Review Scope */}
      <section
        style={{
          background: '#0F0F0F',
          padding: 'clamp(64px, 8vw, 96px) 0',
          borderTop: '1px solid #2A2825',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '20px' }}>The Stack Review</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 40px)',
                color: '#F0EDE8',
                marginBottom: '48px',
              }}
            >
              Four domains. Three phases. Six weeks.
            </h2>
          </FadeUp>

          {/* Domain grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '16px',
              marginBottom: '64px',
            }}
          >
            {domains.map((d, i) => (
              <FadeUp key={d.num} delay={i * 0.06}>
                <div
                  style={{
                    background: '#141414',
                    border: '1px solid #2A2825',
                    padding: '32px',
                    height: '100%',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 700,
                      fontSize: '11px',
                      color: '#9A8B47',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase' as const,
                      marginBottom: '12px',
                    }}
                  >
                    {d.num}
                  </p>
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
                    {d.name}
                  </h3>
                  <p style={{ ...S.body, fontSize: '15px' }}>{d.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Phase blocks */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '0',
            }}
          >
            {reviewPhases.map((phase, i) => (
              <FadeUp key={phase.num} delay={i * 0.08}>
                <div
                  style={{
                    borderLeft: i === 0 ? '2px solid #9A8B47' : '2px solid #2A2825',
                    padding: '28px 32px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 700,
                      fontSize: '11px',
                      color: '#9A8B47',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase' as const,
                      marginBottom: '6px',
                    }}
                  >
                    {phase.num} {phase.name}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '13px',
                      color: '#B8B2AE',
                      letterSpacing: '0.06em',
                      marginBottom: '16px',
                    }}
                  >
                    {phase.duration}
                  </p>
                  <p style={{ ...S.body, fontSize: '16px' }}>{phase.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Deliverables */}
      <section
        style={{
          background: '#0D0D0D',
          padding: 'clamp(64px, 8vw, 96px) 0',
          borderTop: '1px solid #2A2825',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '20px' }}>Deliverables</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 40px)',
                color: '#F0EDE8',
                marginBottom: '20px',
              }}
            >
              Technology Architecture Report.
            </h2>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p style={{ ...S.body, maxWidth: '640px', marginBottom: '48px' }}>
              The primary deliverable is a Technology Architecture Report structured across six
              elements. It is accompanied by a live presentation session and a 30-day check-in call
              included in every engagement.
            </p>
          </FadeUp>

          {reportElements.map((el, i) => (
            <FadeUp key={el.num} delay={i * 0.05}>
              <div
                style={{
                  borderTop: i === 0 ? '2px solid #9A8B47' : '1px solid #2A2825',
                  padding: '32px 0',
                  display: 'grid',
                  gridTemplateColumns: '25% 75%',
                  gap: '32px',
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 700,
                      fontSize: '11px',
                      color: '#9A8B47',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase' as const,
                      marginBottom: '8px',
                    }}
                  >
                    {el.num}
                  </p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 500,
                      fontSize: '22px',
                      color: '#F0EDE8',
                      lineHeight: 1.25,
                    }}
                  >
                    {el.name}
                  </h3>
                </div>
                <p style={{ ...S.body, fontSize: '17px' }}>{el.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Section 6: Technology Retainer */}
      <section
        style={{
          background: '#0F0F0F',
          padding: 'clamp(64px, 8vw, 96px) 0',
          borderTop: '1px solid #2A2825',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '20px' }}>The Technology Retainer</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 40px)',
                color: '#F0EDE8',
                marginBottom: '20px',
              }}
            >
              Build the map once. Keep it current every month.
            </h2>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p style={{ ...S.body, maxWidth: '640px', marginBottom: '48px' }}>
              Most agencies that commission the Stack Review continue with the retainer — because
              the questions do not stop after the report is delivered. Platform changes, new briefs,
              vendor decisions, and stack questions are handled in real time, not at the start of
              the next audit cycle.
            </p>
          </FadeUp>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '16px',
            }}
          >
            {retainerInclusions.map((item, i) => (
              <FadeUp key={item.name} delay={i * 0.06}>
                <div
                  style={{
                    background: '#141414',
                    border: '1px solid #2A2825',
                    padding: '32px',
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
                    {item.name}
                  </h3>
                  <p style={{ ...S.body, fontSize: '15px' }}>{item.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Independence */}
      <section
        style={{
          background: '#141414',
          padding: 'clamp(64px, 8vw, 96px) 0',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
              gap: '64px',
              alignItems: 'start',
            }}
          >
            <div>
              <FadeUp>
                <p style={{ ...S.label, marginBottom: '20px' }}>Independence</p>
              </FadeUp>
              <FadeUp delay={0.08}>
                <h2
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 700,
                    fontSize: 'clamp(28px, 4vw, 40px)',
                    color: '#F0EDE8',
                    marginBottom: '24px',
                    maxWidth: '520px',
                    lineHeight: 1.25,
                  }}
                >
                  No vendor relationships. No referral fees.
                </h2>
              </FadeUp>
              <FadeUp delay={0.14}>
                <p style={{ ...S.body, marginBottom: '20px' }}>
                  Andrew Gilbert does not hold equity in, receive referral fees from, or maintain
                  commercial relationships with any adtech vendor, platform, or data provider. The
                  Stack Review is not a technology sales process. It does not end with a vendor
                  referral.
                </p>
                <p style={{ ...S.body }}>
                  Every recommendation is based on what is right for the agency and its clients.
                  This is disclosed in writing in every engagement.
                </p>
              </FadeUp>
            </div>

            <FadeUp delay={0.1}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {independencePoints.map((point) => (
                  <li key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#9A8B47',
                        flexShrink: 0,
                        marginTop: '8px',
                      }}
                    />
                    <p style={{ ...S.body, fontSize: '17px', margin: 0 }}>{point}</p>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Section 8: Investment */}
      <section
        style={{
          background: '#0D0D0D',
          padding: 'clamp(64px, 8vw, 96px) 0',
          borderTop: '1px solid #2A2825',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '20px' }}>Investment</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 40px)',
                color: '#F0EDE8',
                marginBottom: '48px',
              }}
            >
              Pricing.
            </h2>
          </FadeUp>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: '24px',
              marginBottom: '40px',
            }}
          >
            {/* Stack Review pricing */}
            <FadeUp delay={0.1}>
              <div
                style={{
                  background: '#141414',
                  border: '1px solid #2A2825',
                  borderTop: '3px solid #9A8B47',
                  padding: '36px',
                }}
              >
                <p style={{ ...S.label, marginBottom: '20px' }}>The Stack Review</p>
                <div style={{ display: 'flex', gap: '32px', marginBottom: '8px' }}>
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '15px',
                        color: '#B8B2AE',
                        marginBottom: '4px',
                      }}
                    >
                      Standard
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-playfair)',
                        fontWeight: 700,
                        fontSize: '28px',
                        color: '#F0EDE8',
                      }}
                    >
                      AUD $12,000
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '15px',
                        color: '#B8B2AE',
                        marginBottom: '4px',
                      }}
                    >
                      Complex
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-playfair)',
                        fontWeight: 700,
                        fontSize: '28px',
                        color: '#F0EDE8',
                      }}
                    >
                      AUD $15,000
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '15px',
                    color: '#6B6560',
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                    marginTop: '20px',
                    marginBottom: '20px',
                  }}
                >
                  Standard for agencies up to approximately $5M in managed media spend. Complex for
                  larger or multi-platform programmatic operations.
                </p>
                <div
                  style={{
                    background: 'rgba(154,139,71,0.08)',
                    borderLeft: '3px solid #9A8B47',
                    padding: '16px 20px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '16px',
                      color: '#9A8B47',
                      lineHeight: 1.5,
                    }}
                  >
                    Founding Agency Rate: AUD $8,000 — available to the first three agencies to
                    engage.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Retainer pricing */}
            <FadeUp delay={0.16}>
              <div
                style={{
                  background: '#141414',
                  border: '1px solid #2A2825',
                  borderTop: '3px solid #9A8B47',
                  padding: '36px',
                }}
              >
                <p style={{ ...S.label, marginBottom: '20px' }}>The Technology Retainer</p>
                <p
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 700,
                    fontSize: '28px',
                    color: '#F0EDE8',
                    marginBottom: '8px',
                  }}
                >
                  AUD $3,500 – $4,500{' '}
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 400,
                      fontSize: '18px',
                      color: '#B8B2AE',
                    }}
                  >
                    / month
                  </span>
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '15px',
                    color: '#6B6560',
                    lineHeight: 1.6,
                    marginTop: '12px',
                  }}
                >
                  Minimum three-month initial term. Monthly in advance.
                </p>
              </div>
            </FadeUp>
          </div>

          <FadeUp>
            <Link href="/enquire" className="btn-primary">
              Enquire About The Agency Stack
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Section 9: Mandate */}
      <FadeUp>
        <MandateBlock />
      </FadeUp>
    </>
  )
}
