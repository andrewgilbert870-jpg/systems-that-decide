import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchPosts } from '@/lib/rss'
import FadeUp from '@/components/FadeUp'
import StatCounter from '@/components/StatCounter'
import PostCard from '@/components/PostCard'
import MandateBlock from '@/components/MandateBlock'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Systems That Decide — Independent Advisory',
  description:
    'Independent analysis of structural shifts in advertising, retail media, commerce, and platforms.',
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
  h1: {
    fontFamily: 'var(--font-playfair)',
    fontWeight: 700,
    fontSize: 'clamp(48px, 8vw, 88px)',
    lineHeight: 1.05,
    letterSpacing: '-0.02em',
    color: '#F0EDE8',
  },
  subhead: {
    fontFamily: 'var(--font-playfair)',
    fontWeight: 400,
    fontSize: 'clamp(18px, 2.5vw, 24px)',
    color: '#B8B2AE',
    lineHeight: 1.45,
  },
  body: {
    fontFamily: 'var(--font-inter)',
    fontSize: '18px',
    color: '#B8B2AE',
    lineHeight: 1.7,
  },
  sectionHead: {
    fontFamily: 'var(--font-playfair)',
    fontWeight: 400,
    fontSize: 'clamp(28px, 4vw, 40px)',
    color: '#F0EDE8',
    lineHeight: 1.25,
  },
}

const engagements = [
  {
    name: 'The Systems Audit',
    format: 'For Brands · Single Engagement · 6 Weeks',
    description:
      'A full-scope, independent assessment of your paid media ecosystem. Six frameworks. A Media Systems Health Score out of 120. A board-ready written report.',
  },
  {
    name: 'The Agency Stack',
    format: 'For Agencies · Stack Review + Monthly Retainer',
    description:
      'A technology audit and monthly advisory for independent agencies in ANZ. Builds a structured view of the stack, then keeps it current.',
  },
  {
    name: 'Executive Advisory',
    format: 'Ongoing · Quarterly or Monthly Retainer',
    description:
      'A standing relationship for leadership teams that want an unconflicted outside view. Regular briefings, pressure-testing of strategy, and access to analysis as the market moves.',
  },
  {
    name: 'Market Entry & Expansion',
    format: 'Project-Based · 4–8 Weeks',
    description:
      'For technology companies outside ANZ looking to enter the ANZ market, and for those who have launched and want to sense-check their strategy before committing further.',
  },
  {
    name: 'Team Education',
    format: 'Workshop · Half Day or Full Day',
    description:
      'Structured education for commercial and marketing teams on how the systems they buy from actually work. Built from the inside of those systems, not from vendor documentation.',
  },
  {
    name: 'Transaction Advisory',
    format: 'Project-Based',
    description:
      'Independent assessment for investors, acquirers, and boards evaluating assets in the programmatic, marketing technology, or measurement spaces.',
  },
]

export default async function HomePage() {
  const posts = await fetchPosts()
  const latestPosts = posts.slice(0, 3)

  return (
    <>
      {/* ── Section 1: Hero ── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: '#0D0D0D',
          overflow: 'hidden',
        }}
      >
        {/* Radial glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            right: '0',
            transform: 'translateY(-50%)',
            width: '80vw',
            height: '80vw',
            background: 'radial-gradient(ellipse at center, rgba(154,139,71,0.07) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        {/* Watermark */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            right: '-10%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
        >
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '70vw', height: '70vw', opacity: 0.04 }}
          >
            <circle cx="50" cy="50" r="44" fill="none" stroke="#9A8B47" strokeWidth="0.8" />
            <polygon
              points="50,6 94,50 50,94 6,50"
              fill="none"
              stroke="#9A8B47"
              strokeWidth="0.4"
            />
            <circle cx="50" cy="6" r="1.5" fill="#9A8B47" />
            <circle cx="94" cy="50" r="1.5" fill="#9A8B47" />
            <circle cx="50" cy="94" r="1.5" fill="#9A8B47" />
            <circle cx="6" cy="50" r="1.5" fill="#9A8B47" />
          </svg>
        </div>

        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: 'clamp(80px, 10vw, 120px) 24px clamp(80px, 10vw, 120px)',
            position: 'relative',
            zIndex: 1,
            width: '100%',
          }}
        >
          <FadeUp delay={0.08}>
            <h1 style={{ ...S.h1, marginBottom: '24px', maxWidth: '720px' }}>
              Who Controls the Systems That Decide.
            </h1>
          </FadeUp>

          <FadeUp delay={0.14}>
            <p style={{ ...S.subhead, marginBottom: '24px', maxWidth: '620px' }}>
              Structural clarity for organisations inside the systems that shape advertising, retail media, and commerce.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p style={{ ...S.body, marginBottom: '44px', maxWidth: '560px' }}>
              Not how media works. Who controls the systems that shape it. Independent analysis of
              structural shifts in advertising, retail media, commerce, and platforms, and what they
              mean for how your business decides.
            </p>
          </FadeUp>

          <FadeUp delay={0.26}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <Link href="/advisory" className="btn-primary">
                View Strategic Advisory
              </Link>
              <a
                href="https://systemsthatdecide.substack.com/subscribe"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Subscribe to the Practitioner&apos;s View
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden
          className="scroll-indicator"
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#9A8B47',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
            expand_more
          </span>
        </div>
      </section>

      {/* ── Section 2: The Thesis ── */}
      <section
        style={{
          background: '#141414',
          padding: 'clamp(80px, 10vw, 120px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Offset watermark */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            left: '-20%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
        >
          <svg
            viewBox="0 0 100 100"
            style={{ width: '60vw', height: '60vw', opacity: 0.03 }}
          >
            <circle cx="50" cy="50" r="44" fill="none" stroke="#9A8B47" strokeWidth="0.8" />
            <polygon
              points="50,6 94,50 50,94 6,50"
              fill="none"
              stroke="#9A8B47"
              strokeWidth="0.4"
            />
          </svg>
        </div>

        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '16px' }}>The Practitioner&apos;s Thesis</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700,
                fontSize: 'clamp(32px, 5vw, 48px)',
                color: '#F0EDE8',
                marginBottom: '56px',
                lineHeight: 1.15,
              }}
            >
              Most advice in this space follows the money.
            </h2>
          </FadeUp>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
              gap: '48px',
            }}
          >
            {[
              {
                head: 'The system benefits from your confusion.',
                body: "The vendor needs you to believe the measurement is clean. The agency needs the complexity to justify the fee. The platform needs you to accept its attribution as neutral. None of them have a financial interest in your clarity. They have a financial interest in your continued dependence on their version of events. That is not a conspiracy. It is just how commercial incentives work.",
              },
              {
                head: 'Sixteen years inside changes what you can see.',
                body: "Building the supply chains, running the commercial models, making the product decisions. That produces analysis not available from someone reading about the same systems from the outside. Not because the experience is infallible. Because it changes what questions you know to ask. The analyst who has never sat at the table where these decisions are made will describe the architecture correctly and miss what actually drives it.",
              },
            ].map((col, i) => (
              <FadeUp key={col.head} delay={i * 0.08}>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 500,
                      fontSize: '22px',
                      color: '#F0EDE8',
                      marginBottom: '16px',
                      lineHeight: 1.3,
                    }}
                  >
                    {col.head}
                  </h3>
                  <p style={{ ...S.body, fontSize: '16px' }}>{col.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: The Scale Record ── */}
      <section style={{ background: '#0D0D0D', padding: 'clamp(80px, 10vw, 120px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '16px' }}>The Scale Record</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 style={{ ...S.sectionHead, marginBottom: '64px', maxWidth: '640px' }}>
              Sixteen years inside the infrastructure of advertising decisions.
            </h2>
          </FadeUp>

          {/* Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '48px',
              marginBottom: '64px',
              paddingBottom: '64px',
              borderBottom: '1px solid #2A2825',
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

          {/* Role cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                role: 'Vice President, Advertising',
                company: 'Afterpay — Block',
                body: "Built Block\u2019s first global media network out of ANZ. Responsible for commercial, product, audience, integrations, and supply strategy. The network became the model for Block\u2019s global advertising expansion.",
              },
              {
                role: 'Director of Commercial & Solutions',
                company: 'Yahoo',
                body: "Led commercial and platform solutions across Yahoo\u2019s technology in ANZ and SEA. Developed the go-to-market, sales enablement, and product strategy for the region alongside global counterparts. Delivered 2,550% revenue growth from 2019 to 2025.",
              },
            ].map((card) => (
              <FadeUp key={card.company}>
                <div
                  style={{
                    background: '#141414',
                    border: '1px solid #2A2825',
                    borderTop: '2px solid #9A8B47',
                    padding: '32px',
                  }}
                >
                  <p style={{ ...S.label, marginBottom: '10px' }}>{card.role}</p>
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
                    {card.company}
                  </h3>
                  <p style={{ ...S.body, fontSize: '16px' }}>{card.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: How to Work Together ── */}
      <section style={{ background: '#141414', padding: 'clamp(80px, 10vw, 120px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '16px' }}>How to Work Together</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 style={{ ...S.sectionHead, marginBottom: '56px', maxWidth: '640px' }}>
              Five ways to engage.
            </h2>
          </FadeUp>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '24px',
              marginBottom: '48px',
            }}
          >
            {engagements.map((e, i) => (
              <FadeUp key={e.name} delay={i * 0.06}>
                <div
                  style={{
                    background: '#0D0D0D',
                    border: '1px solid #2A2825',
                    borderTop: '2px solid #9A8B47',
                    padding: '32px',
                    height: '100%',
                  }}
                >
                  <p style={{ ...S.label, marginBottom: '12px' }}>{e.format}</p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 500,
                      fontSize: '20px',
                      color: '#F0EDE8',
                      marginBottom: '16px',
                      lineHeight: 1.3,
                    }}
                  >
                    {e.name}
                  </h3>
                  <p style={{ ...S.body, fontSize: '15px' }}>{e.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <Link href="/advisory" className="enquire-btn">
              View Advisory
              <span className="material-symbols-outlined" style={{ fontSize: '16px', marginLeft: '8px' }}>
                arrow_forward
              </span>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── Section 5: Latest from The Library ── */}
      <section style={{ background: '#0D0D0D', padding: 'clamp(80px, 10vw, 120px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <FadeUp>
            <p style={{ ...S.label, marginBottom: '16px' }}>Latest Analysis</p>
          </FadeUp>
          <FadeUp delay={0.06}>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '16px',
                color: '#B8B2AE',
                lineHeight: 1.7,
                maxWidth: '600px',
                marginBottom: '48px',
              }}
            >
              Published through The Practitioner&apos;s View. Independent from vendor relationships,
              platform incentives, and implementation revenue. The analysis is the product.
            </p>
          </FadeUp>

          {latestPosts.length > 0 ? (
            <>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                  gap: '24px',
                  marginBottom: '40px',
                }}
              >
                {latestPosts.map((post, i) => (
                  <FadeUp key={post.link} delay={i * 0.06}>
                    <PostCard post={post} />
                  </FadeUp>
                ))}
              </div>
              <FadeUp>
                <Link
                  href="/library"
                  className="enquire-btn"
                >
                  View The Library
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '16px', marginLeft: '8px' }}
                  >
                    arrow_forward
                  </span>
                </Link>
              </FadeUp>
            </>
          ) : (
            <FadeUp>
              <a
                href="https://systemsthatdecide.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="enquire-btn"
              >
                View on Substack
              </a>
            </FadeUp>
          )}
        </div>
      </section>

      {/* ── Section 6: The Independent Mandate ── */}
      <FadeUp>
        <MandateBlock />
      </FadeUp>
    </>
  )
}
