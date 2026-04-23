import Link from 'next/link'

export default function MandateBlock() {
  return (
    <div
      style={{
        background: '#141414',
        borderLeft: '4px solid #9A8B47',
        padding: 'clamp(40px, 6vw, 80px) clamp(32px, 6vw, 80px)',
      }}
    >
      <blockquote
        style={{
          fontFamily: 'var(--font-playfair)',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          color: '#9A8B47',
          lineHeight: 1.6,
          maxWidth: '800px',
          margin: '0 0 32px 0',
        }}
      >
        "The analysis is the product. I am not incentivised by what you buy next, but by how well you understand what you already have."
      </blockquote>
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '18px',
          color: '#B8B2AE',
          lineHeight: 1.7,
          maxWidth: '640px',
          marginBottom: '32px',
        }}
      >
        Operating on a strict &lsquo;no implementation, no vendor conflict&rsquo; model. Structural independence means no incentive to push a particular platform or vendor outcome. Recommendations are grounded in how these systems actually work. Not in what a vendor has to sell, or what a platform wants you to believe about its own performance.
      </p>
      <Link href="/advisory" className="enquire-btn">
        Work With Me
        <span className="material-symbols-outlined" style={{ fontSize: '16px', marginLeft: '8px' }}>
          arrow_forward
        </span>
      </Link>
    </div>
  )
}
