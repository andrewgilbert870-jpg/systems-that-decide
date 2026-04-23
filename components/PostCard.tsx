import type { RSSItem } from '@/lib/rss'

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export default function PostCard({ post }: { post: RSSItem }) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="post-card"
      style={{ padding: '28px' }}
    >
      <p className="label-caps" style={{ marginBottom: '12px' }}>
        {formatDate(post.pubDate)}
      </p>
      <h3
        className="post-title"
        style={{
          fontFamily: 'var(--font-playfair)',
          fontWeight: 500,
          fontSize: '22px',
          color: '#F0EDE8',
          lineHeight: 1.35,
          marginBottom: '12px',
          transition: 'color 300ms ease',
        }}
      >
        {post.title}
      </h3>
      {post.contentSnippet && (
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '16px',
            color: '#B8B2AE',
            lineHeight: 1.6,
            marginBottom: '20px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden',
          }}
        >
          {post.contentSnippet}
        </p>
      )}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontFamily: 'var(--font-inter)',
          fontSize: '13px',
          fontWeight: 600,
          color: '#9A8B47',
          letterSpacing: '0.06em',
        }}
      >
        Read on Substack
        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
          arrow_forward
        </span>
      </span>
    </a>
  )
}
