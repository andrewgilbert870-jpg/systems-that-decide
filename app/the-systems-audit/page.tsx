import type { Metadata } from 'next'
import Link from 'next/link'
import FadeUp from '@/components/FadeUp'
import MandateBlock from '@/components/MandateBlock'

export const metadata: Metadata = {
  title: 'The Systems Audit — Systems That Decide',
  description:
    'A full-scope, independent assessment of your paid media ecosystem. For brands and large direct advertisers in ANZ.',
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

const frameworks = [
  {
    num: '01',
    name: 'Supply Chain Map',
    description:
      'Maps the full path from budget to publisher impression. Identifies where fees are extracted, where inventory quality degrades, and where supply path decisions have created fee structures or inventory outcomes that do not serve the advertiser\'s interest.',
  },
  {
    num: '02',
    name: 'Agency Commercial Audit',
    description:
      'A review of the commercial architecture of the agency relationship. How the agency earns, what is contractually disclosed, how principal media arrangements are structured, and where commercial incentives and client interests are not fully aligned.',
  },
  {
    num: '03',
    name: 'Measurement Integrity Assessment',
    description:
      'An assessment of the measurement framework in use. What is being measured, how the methodology is constructed, whether it is fit for purpose, and where measurement design or attribution methodology may not reflect true performance.',
  },
  {
    num: '04',
    name: 'Brand Safety Coverage Map',
    description:
      'A systematic review of brand safety infrastructure across the media programme. Where coverage applies, where it does not, and whether the current configuration reflects the brand\'s actual risk tolerance or the vendor\'s default settings.',
  },
  {
    num: '05',
    name: 'Technology Stack Assessment',
    description:
      'A review of the technology stack supporting the paid media programme. What is in it, what it costs, who controls the vendor relationships, where the contracts sit, and where the stack is working against the brand\'s independence.',
  },
  {
    num: '06',
    name: 'Agentic Systems Assessment',
    description:
      'An assessment of what AI is currently doing in the media programme. Platform AI exposure (PMax, Advantage+, algorithmic DSP systems), agency AI tooling, and whether independent governance exists over systems making decisions on the brand\'s behalf.',
  },
]

const scoreDimensions = [
  { label: 'Dimension 01', name: 'Supply Chain Transparency' },
  { label: 'Dimension 02', name: 'Commercial Transparency' },
  { label: 'Dimension 03', name: 'Measurement Integrity' },
  { label: 'Dimension 04', name: 'Brand Safety Coverage' },
  { label: 'Dimension 05', name: 'Technology Independence' },
  { label: 'Dimension 06', name: 'Agentic Governance' },
]

const scoreTable = [
  { score: '100–120', assessment: 'Strong. The programme is well-configured and the principal risks are understood. Maintain and monitor.' },
  { score: '75–99', assessment: 'Functional but exposed. Structural gaps exist. Where they appear, they tend to be resolved in favour of intermediaries rather than the advertiser. Prioritise the lowest-scoring dimensions.' },
  { score: '50–74', assessment: 'Significant exposure. The programme is likely producing results that benefit intermediaries more than the advertiser. Structural change is warranted.' },
  { score: 'Below 50', assessment: 'Critical. The programme has fundamental integrity problems. Independent review and likely renegotiation of key relationships is recommended.' },
]

const phases = [
  {
    num: '01',
    name: 'Expose',
    duration: 'Weeks 1–2',
    description:
      'Structured intake questionnaire completed before the first session. Kick-off session (2 hours) with key stakeholders. Document review: current and prior-year media plans, agency scopes of work, vendor contracts, measurement frameworks. Platform access (read-only) provisioned. Up to four stakeholder interviews. Goal: map what the client believes is true and gather the evidence to test it.',
  },
  {
    num: '02',
    name: 'Interrogate',
    duration: 'Weeks 2–4',
    description:
      'Six frameworks applied systematically. Hypotheses formed in Expose are tested against the evidence. Platform AI exposure reviewed across PMax, Advantage+, and DSP automated systems. Agency AI tooling and governance assessed. Supply path analysis and fee verification completed.',
  },
  {
    num: '03',
    name: 'Clarify',
    duration: 'Weeks 4–6',
    description:
      'Output production. Findings structured as a board-ready briefing: situation, complication, answer, supporting evidence. Recommendations prioritised by urgency and effort. Report delivered. Live readout session held.',
  },
]

const deliverables = [
  {
    num: '01',
    name: 'Systems Map',
    description:
      'A hand-built map of your media ecosystem showing the supply chain, technology stack, and data flows as they actually exist — independent of any single stakeholder\'s account of them.',
  },
  {
    num: '02',
    name: 'Media Systems Health Score',
    description:
      'A scored assessment across six dimensions out of 120. Identifies where the programme is exposed and where the most urgent structural work sits.',
  },
  {
    num: '03',
    name: 'Written Report',
    description:
      'A board-ready written report structured as: situation, complication, findings, recommendations. Built to be taken to leadership without translation.',
  },
  {
    num: '04',
    name: 'Independence Declaration',
    description:
      'A signed declaration confirming the absence of vendor relationships, referral arrangements, or platform incentives affecting the assessment.',
  },
  {
    num: '05',
    name: 'Live Readout Session',
    description:
      'A 90-minute live session presenting findings and recommendations with key stakeholders. Session notes provided within 48 hours.',
  },
  {
    num: '06',
    name: '30-Day Check-In',
    description:
      'A call 30 days after delivery to address questions arising from the report and review progress on immediate recommendations. Included in every engagement.',
  },
]

const independencePoints = [
  'No equity in any vendor, platform, or data provider relevant to this assessment',
  'No referral fees or introductory commissions from any recommendation',
  'No formal platform partnerships or certification obligations',
  'Full prior involvement disclosure provided in writing at commencement',
]

export default function TheSystemsAuditPage() {
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
            <p style={{ ...S.label, marginBottom: '20px' }}>The Systems Audit</p>
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
                maxWidth: '800px',
              }}
            >
              Independent analysis of your paid media ecosystem.
            </h1>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p style={{ ...S.body, maxWidth: '620px', marginBottom: '40px' }}>
              A full-scope, six-week audit for brands and large direct advertisers in ANZ. Six
              proprietary frameworks. A Media Systems Health Score out of 120. A board-ready written
              report you own.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <a href="#frameworks" className="btn-primary">
                View Frameworks
              </a>
              <Link href="/enquire" className="btn-secondary">
                Enquire
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Section 2: What It Is */}
      <section style={{ background: '#0D0D0D', padding: 'clamp(64px, 8vw, 96px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: '64px',
              alignItems: 'start',
            }}
          >
            {/* Left column */}
            <div>
              <FadeUp>
                <p style={{ ...S.label, marginBottom: '20px' }}>What It Is</p>
              </FadeUp>
              <FadeUp delay={0.08}>
                <h2
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 400,
                    fontSize: 'clamp(26px, 4vw, 36px)',
                    color: '#F0EDE8',
                    marginBottom: '24px',
                    lineHeight: 1.25,
                    maxWidth: '520px',
                  }}
                >
                  Built to give you an independent view of how your programme is actually configured.
                </h2>
              </FadeUp>
              <FadeUp delay={0.14}>
                <p style={{ ...S.body, marginBottom: '20px' }}>
                  The Systems Audit is a structured, independent review of how your paid media
                  ecosystem is configured, who controls it, and whether it is working in your
                  interest. It covers your programmatic supply chain, agency commercial architecture,
                  measurement framework, brand safety infrastructure, technology stack, and agentic
                  systems governance.
                </p>
                <p style={{ ...S.body }}>
                  The work is conducted entirely by Andrew Gilbert. Not delegated. 16 years of
                  operator experience across every layer of the paid media ecosystem — agency media
                  buying, brand-side management at scale, brand safety and verification (IAS ANZ),
                  audience data infrastructure (Eyeota), programmatic DSP and SSP operations (Yahoo
                  APAC), and retail media network design and leadership (Block / Afterpay). He did
                  not read about these systems. He built them.
                </p>
              </FadeUp>
            </div>

            {/* Right column: callout */}
            <FadeUp delay={0.1}>
              <div
                style={{
                  background: '#141414',
                  borderLeft: '4px solid #9A8B47',
                  padding: '40px',
                }}
              >
                <blockquote
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: '20px',
                    color: '#9A8B47',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  &ldquo;The analysis is the product. I am not incentivised by what you buy next,
                  but by how well you understand what you already have.&rdquo;
                </blockquote>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Section 3: Six Frameworks */}
      <section
        id="frameworks"
        style={{
          background: '#0D0D0D',
          padding: 'clamp(64px, 8vw, 96px) 0',
          borderTop: '1px solid #2A2825',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '20px' }}>The Six Frameworks</p>
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
              Six structured frameworks. One complete picture.
            </h2>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p style={{ ...S.body, maxWidth: '640px', marginBottom: '48px' }}>
              Each framework is applied systematically across the engagement. Findings feed into the
              Media Systems Health Score and the written report.
            </p>
          </FadeUp>

          {frameworks.map((fw, i) => (
            <FadeUp key={fw.num} delay={i * 0.05}>
              <div
                style={{
                  borderTop: i === 0 ? '2px solid #9A8B47' : '1px solid #2A2825',
                  padding: '32px 0',
                  display: 'grid',
                  gridTemplateColumns: '25% 75%',
                  gap: '32px',
                }}
                className="framework-row"
              >
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 700,
                      fontSize: '11px',
                      color: '#9A8B47',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    {fw.num}
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
                    {fw.name}
                  </h3>
                </div>
                <p style={{ ...S.body, fontSize: '17px' }}>{fw.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Section 4: Media Systems Health Score */}
      <section
        style={{
          background: '#0F0F0F',
          padding: 'clamp(64px, 8vw, 96px) 0',
          borderTop: '1px solid #2A2825',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '20px' }}>Media Systems Health Score</p>
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
              Six dimensions. Scored out of 120.
            </h2>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p style={{ ...S.body, maxWidth: '640px', marginBottom: '48px' }}>
              The audit produces a Media Systems Health Score across six dimensions, each scored out
              of 20. The score is not a ranking — it is a diagnostic. It shows where the programme
              is exposed and where the most urgent work sits.
            </p>
          </FadeUp>

          {/* Score grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '16px',
              marginBottom: '40px',
            }}
          >
            {scoreDimensions.map((dim, i) => (
              <FadeUp key={dim.name} delay={i * 0.05}>
                <div
                  style={{
                    background: '#141414',
                    border: '1px solid #2A2825',
                    padding: '28px 32px',
                  }}
                >
                  <p style={{ ...S.label, marginBottom: '10px' }}>{dim.label}</p>
                  <p
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 500,
                      fontSize: '18px',
                      color: '#F0EDE8',
                      marginBottom: '16px',
                      lineHeight: 1.25,
                    }}
                  >
                    {dim.name}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 700,
                      fontSize: '36px',
                      color: '#9A8B47',
                      lineHeight: 1,
                    }}
                  >
                    /20
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Score interpretation table */}
          <FadeUp>
            <div
              style={{
                background: '#141414',
                border: '1px solid #2A2825',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  background: '#1C1B1B',
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr',
                  padding: '14px 24px',
                  gap: '24px',
                }}
              >
                <p style={{ ...S.label }}>Score</p>
                <p style={{ ...S.label }}>Assessment</p>
              </div>
              {scoreTable.map((row, i) => (
                <div
                  key={row.score}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '160px 1fr',
                    padding: '18px 24px',
                    gap: '24px',
                    background: i % 2 === 0 ? '#141414' : '#0F0F0F',
                    borderTop: '1px solid #2A2825',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 700,
                      fontSize: '15px',
                      color: '#F0EDE8',
                    }}
                  >
                    {row.score}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '15px',
                      color: '#B8B2AE',
                      lineHeight: 1.6,
                    }}
                  >
                    {row.assessment}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Section 5: Three Phases */}
      <section
        style={{
          background: '#0D0D0D',
          padding: 'clamp(64px, 8vw, 96px) 0',
          borderTop: '1px solid #2A2825',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '20px' }}>How It Works</p>
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
              Three phases. Six weeks.
            </h2>
          </FadeUp>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '0',
            }}
          >
            {phases.map((phase, i) => (
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
                      textTransform: 'uppercase',
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

      {/* Section 6: Deliverables */}
      <section
        style={{
          background: '#0F0F0F',
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
                marginBottom: '48px',
              }}
            >
              Every engagement includes.
            </h2>
          </FadeUp>

          {deliverables.map((d, i) => (
            <FadeUp key={d.num} delay={i * 0.05}>
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
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    {d.num}
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
                    {d.name}
                  </h3>
                </div>
                <p style={{ ...S.body, fontSize: '17px' }}>{d.description}</p>
              </div>
            </FadeUp>
          ))}
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
            {/* Left */}
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
                  No vendor relationships. No platform incentives.
                </h2>
              </FadeUp>
              <FadeUp delay={0.14}>
                <p style={{ ...S.body, marginBottom: '20px' }}>
                  Andrew Gilbert does not hold equity in, receive referral fees from, or maintain
                  commercial relationships with any adtech vendor, platform, or data provider.
                  Every finding is based on what the evidence shows. Every recommendation is based
                  on what is right for the client.
                </p>
                <p style={{ ...S.body, marginBottom: '20px' }}>
                  This is disclosed in writing in every engagement, alongside a full declaration of
                  any prior employment or commercial involvement with vendors or platforms relevant
                  to the assessment.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '16px',
                    color: '#6B6560',
                    fontStyle: 'italic',
                    lineHeight: 1.7,
                  }}
                >
                  Note: Andrew Gilbert holds equity in Block, Inc. as a result of prior employment
                  with Block / Afterpay. This is disclosed in all engagements and does not affect
                  assessments that do not involve Block&apos;s retail media or payment infrastructure.
                </p>
              </FadeUp>
            </div>

            {/* Right: independence points */}
            <FadeUp delay={0.1}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {independencePoints.map((point) => (
                  <li
                    key={point}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                    }}
                  >
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

      {/* Section 8: CTA */}
      <section
        style={{
          background: '#0D0D0D',
          padding: 'clamp(64px, 8vw, 96px) 0',
          borderTop: '1px solid #2A2825',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <div
              style={{
                background: '#141414',
                border: '1px solid #2A2825',
                padding: '40px',
                maxWidth: '560px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontStyle: 'italic',
                  fontSize: '22px',
                  color: '#F0EDE8',
                  lineHeight: 1.5,
                  marginBottom: '28px',
                }}
              >
                The first conversation is a scoping call. No commitment required.
              </p>
              <Link href="/enquire" className="btn-primary">
                Start a Conversation
              </Link>
            </div>
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
