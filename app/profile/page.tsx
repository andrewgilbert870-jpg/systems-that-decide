import type { Metadata } from 'next'
import Link from 'next/link'
import FadeUp from '@/components/FadeUp'
import StatCounter from '@/components/StatCounter'

export const metadata: Metadata = {
  title: 'Andrew Gilbert — Senior Leadership Profile',
  description:
    'Sixteen years building the commercial infrastructure of advertising decisions across ANZ and APAC. Open to senior leadership roles in adtech, retail media, commerce, and measurement.',
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
    fontSize: '17px',
    color: '#B8B2AE',
    lineHeight: 1.75,
  },
}

const roles = [
  {
    role: 'Vice President, Advertising',
    company: 'Afterpay — Block',
    period: '2022 – 2024',
    body: "Built Block's first global media network out of ANZ. Responsible for commercial, product, audience, integrations, and supply strategy across Afterpay, Cash App, and Square. The network became the model for Block's global advertising expansion.",
  },
  {
    role: 'Director of Commercial & Solutions',
    company: 'Yahoo',
    period: '2019 – 2022',
    body: "Led commercial and platform solutions across Yahoo's technology in ANZ and SEA. Developed the go-to-market, sales enablement, and product strategy for the region alongside global counterparts. Delivered 2,550% revenue growth from 2019 to 2025.",
  },
  {
    role: 'Director of Sales',
    company: 'Integral Ad Science',
    period: '2015 – 2019',
    body: 'Key member of the original leadership team that grew IAS from limited ANZ presence to approximately 60% market share. Primary driver of new and existing business and client strategy, bringing measurement and verification to every major agency holding group and leading direct advertisers including Westpac Group.',
  },
  {
    role: 'Head of Digital Audience',
    company: 'Vodafone',
    period: '2013 – 2015',
    body: 'Led the first ANZ deployment of a DMP (Krux, later acquired by Salesforce). Built Vodafone\'s first-party data infrastructure and audience strategy, establishing the commercial framework for data-driven media activation.',
  },
  {
    role: 'Senior Digital Strategist',
    company: 'Ikon Communications',
    period: '2010 – 2013',
    body: 'Agency-side digital strategy and media planning across major brand clients. Foundation in how agency commercial models work and how media decisions are made at the holding group level.',
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

const openTo = [
  {
    label: 'Agency & Holding Groups',
    body: 'Senior commercial leadership at independent agencies or global holding groups. P&L ownership, technology strategy, and the kind of cross-market role that benefits from having operated on every side of the agency relationship.',
  },
  {
    label: 'Commerce & Retail Media',
    body: 'VP or GM-level roles at commerce platforms, retail media networks, or technology companies building in the commerce infrastructure space. Having built a retail media network from the ground up at Block, this is where the record is most directly applicable.',
  },
  {
    label: 'Measurement & Verification',
    body: 'Senior commercial or regional leadership at measurement, verification, or data intelligence companies. The IAS background and the relationships built across every major agency holding group and brand direct advertiser in ANZ are the relevant credential here.',
  },
  {
    label: 'Consultancy & Advisory',
    body: 'Practice leadership or senior advisory roles at management consultancies with adtech, retail media, or marketing technology practices. The practitioner perspective — built from inside these businesses, not from frameworks — is what distinguishes the contribution.',
  },
]

export default function ProfilePage() {
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
            <p style={{ ...S.label, marginBottom: '20px' }}>Andrew Gilbert</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700,
                fontSize: 'clamp(40px, 7vw, 72px)',
                color: '#F0EDE8',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: '24px',
                maxWidth: '820px',
              }}
            >
              The Operator&apos;s Record.
            </h1>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p style={{ ...S.body, maxWidth: '620px', marginBottom: '20px' }}>
              Sixteen years building, running, and selling the commercial infrastructure of advertising decisions across ANZ and APAC. Across brand, agency, adtech, payments, and retail media.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '17px',
                color: '#9A8B47',
                lineHeight: 1.7,
                maxWidth: '580px',
                fontWeight: 600,
              }}
            >
              Currently open to senior leadership conversations across agencies, commerce and retail media platforms, measurement companies, and management consultancies.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#141414', padding: 'clamp(48px, 6vw, 80px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '48px',
            }}
          >
            <StatCounter value="2,550%" label="Revenue Growth" context="Yahoo ANZ, 2019–2025" />
            <StatCounter value="~60%" label="Market Share" context="Integral Ad Science ANZ" />
            <StatCounter
              value="16"
              label="Years"
              context="Brand · Agency · Publisher · Adtech · Payments · Retail Media"
            />
          </div>
        </div>
      </section>

      {/* Career Record */}
      <section style={{ background: '#0D0D0D', padding: 'clamp(64px, 8vw, 96px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '40px' }}>Career Record</p>
          </FadeUp>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {roles.map((r, i) => (
              <FadeUp key={r.company} delay={i * 0.05}>
                <div
                  style={{
                    background: '#141414',
                    border: '1px solid #2A2825',
                    borderTop: i === 0 ? '2px solid #9A8B47' : '2px solid rgba(154,139,71,0.3)',
                    padding: '32px 40px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                    gap: '24px',
                    alignItems: 'start',
                  }}
                >
                  <div>
                    <p style={{ ...S.label, marginBottom: '8px' }}>{r.role}</p>
                    <h3
                      style={{
                        fontFamily: 'var(--font-playfair)',
                        fontWeight: 500,
                        fontSize: '22px',
                        color: '#F0EDE8',
                        lineHeight: 1.2,
                        marginBottom: '6px',
                      }}
                    >
                      {r.company}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '13px',
                        color: '#B8B2AE',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {r.period}
                    </p>
                  </div>
                  <p style={S.body}>{r.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section style={{ background: '#141414', padding: 'clamp(64px, 8vw, 96px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '12px' }}>360° Ecosystem Experience</p>
            <p style={{ ...S.body, fontSize: '15px', marginBottom: '40px', maxWidth: '560px' }}>
              The record spans every side of the advertising and commerce system. Not sequential roles in one discipline — simultaneous fluency across all of them.
            </p>
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

      {/* Open To */}
      <section style={{ background: '#0D0D0D', padding: 'clamp(64px, 8vw, 96px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '16px' }}>Open To</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 400,
                fontSize: 'clamp(26px, 4vw, 38px)',
                color: '#F0EDE8',
                lineHeight: 1.25,
                marginBottom: '48px',
                maxWidth: '640px',
              }}
            >
              Senior leadership and executive roles across four categories.
            </h2>
          </FadeUp>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '24px',
              marginBottom: '56px',
            }}
          >
            {openTo.map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.06}>
                <div
                  style={{
                    background: '#141414',
                    border: '1px solid #2A2825',
                    borderTop: '2px solid rgba(154,139,71,0.4)',
                    padding: '32px',
                    height: '100%',
                  }}
                >
                  <p style={{ ...S.label, marginBottom: '16px' }}>{item.label}</p>
                  <p style={S.body}>{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <div
              style={{
                background: '#141414',
                borderLeft: '4px solid #9A8B47',
                padding: '32px 40px',
                maxWidth: '700px',
                marginBottom: '40px',
              }}
            >
              <p style={{ ...S.body, color: '#F0EDE8' }}>
                Based in Sydney. Open to ANZ-based roles, APAC regional leadership, and remote or hybrid arrangements with the right organisation.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <Link href="/enquire" className="btn-primary">
                Start a Conversation
              </Link>
              <a
                href="https://www.linkedin.com/in/andrewgilbert"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                LinkedIn
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
