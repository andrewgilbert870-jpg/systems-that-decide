import type { Metadata } from 'next'
import { fetchPosts } from '@/lib/rss'
import FadeUp from '@/components/FadeUp'
import LibraryGrid from '@/components/LibraryGrid'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'The Library',
  description:
    'Structural analysis. No vendor agenda. Weekly coverage of shifts in advertising, retail media, commerce, and platforms.',
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

export default async function LibraryPage() {
  const posts = await fetchPosts()

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
            <p style={{ ...S.label, marginBottom: '20px' }}>The Library</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700,
                fontSize: 'clamp(36px, 6vw, 56px)',
                color: '#F0EDE8',
                lineHeight: 1.1,
                marginBottom: '20px',
                maxWidth: '720px',
              }}
            >
              Structural analysis. No vendor agenda.
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
                marginBottom: '36px',
              }}
            >
              Weekly coverage of shifts in advertising, retail media, commerce, and platforms.
              Grounded in ANZ. Written from inside the machine.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <a
              href="https://systemsthatdecide.substack.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Subscribe on Substack
            </a>
          </FadeUp>
        </div>
      </section>

      {/* Posts */}
      <section style={{ background: '#0D0D0D', padding: 'clamp(64px, 8vw, 96px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <LibraryGrid posts={posts} />
        </div>
      </section>
    </>
  )
}
