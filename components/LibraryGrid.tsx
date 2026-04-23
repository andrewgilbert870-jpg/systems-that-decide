'use client'
import { useState, useMemo } from 'react'
import PostCard from './PostCard'
import type { RSSItem } from '@/lib/rss'

const CATEGORIES = [
  'All',
  'Retail Media',
  'Payments-led Ads',
  'Programmatic Strategy',
  'APAC Market Trends',
]
const PAGE_SIZE = 10

export default function LibraryGrid({ posts }: { posts: RSSItem[] }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [showCount, setShowCount] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return posts
    return posts.filter((p) =>
      p.categories.some((c) =>
        c.toLowerCase().includes(activeCategory.toLowerCase())
      )
    )
  }, [posts, activeCategory])

  const visible = filtered.slice(0, showCount)

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '48px',
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat)
              setShowCount(PAGE_SIZE)
            }}
            className={`filter-pill${activeCategory === cat ? ' active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            color: '#B8B2AE',
            fontSize: '18px',
            padding: '40px 0',
          }}
        >
          No posts in this category yet.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {visible.map((post, i) => (
            <PostCard key={`${post.link}-${i}`} post={post} />
          ))}
        </div>
      )}

      {showCount < filtered.length && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => setShowCount((c) => c + PAGE_SIZE)}
            className="enquire-btn"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
