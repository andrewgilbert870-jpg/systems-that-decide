interface ServiceRowProps {
  name: string
  format: string
  who: string
  description: string
  isFirst?: boolean
}

export default function ServiceRow({ name, format, who, description, isFirst }: ServiceRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '36px 0',
        borderTop: isFirst ? '2px solid #9A8B47' : '1px solid #2A2825',
      }}
      className="md:flex-row md:gap-12"
    >
      <div style={{ flexShrink: 0 }} className="md:w-[30%]">
        <h3
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 500,
            fontSize: '24px',
            color: '#F0EDE8',
            marginBottom: '10px',
            lineHeight: 1.2,
          }}
        >
          {name}
        </h3>
        <p className="label-caps" style={{ marginBottom: '8px' }}>{format}</p>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#9A8B47',
          }}
        >
          {who}
        </p>
      </div>
      <div className="md:w-[70%]">
        {description.split('\n\n').map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '18px',
              color: '#B8B2AE',
              lineHeight: 1.7,
              marginBottom: i < description.split('\n\n').length - 1 ? '20px' : 0,
            }}
          >
            {para}
          </p>
        ))}
      </div>
    </div>
  )
}
