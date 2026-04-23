'use client'
import { useState } from 'react'
import FadeUp from '@/components/FadeUp'

interface FormState {
  name: string
  organisation: string
  email: string
  message: string
  source: string
}

export default function EnquirePage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    organisation: '',
    email: '',
    message: '',
    source: '',
  })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function validate(): boolean {
    const e: Partial<FormState> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.organisation.trim()) e.organisation = 'Organisation is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address'
    if (!form.message.trim()) e.message = 'Please describe what you are working on'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Send failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  function Field({
    id,
    label,
    required,
    children,
  }: {
    id: keyof FormState
    label: string
    required?: boolean
    children: React.ReactNode
  }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label
          htmlFor={id}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: errors[id] ? '#C0392B' : '#9A8B47',
          }}
        >
          {label}
          {required && ' *'}
        </label>
        {children}
        {errors[id] && (
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '13px',
              color: '#C0392B',
            }}
          >
            {errors[id]}
          </p>
        )}
      </div>
    )
  }

  return (
    <section style={{ background: '#0D0D0D', minHeight: '100vh', padding: 'clamp(80px, 10vw, 120px) 0' }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 'clamp(48px, 8vw, 96px)',
          alignItems: 'start',
        }}
      >
        {/* Left column */}
        <div>
          <FadeUp>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#9A8B47',
                marginBottom: '20px',
              }}
            >
              Enquire
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700,
                fontSize: 'clamp(32px, 5vw, 48px)',
                color: '#F0EDE8',
                lineHeight: 1.1,
                marginBottom: '20px',
                letterSpacing: '-0.02em',
              }}
            >
              Tell me about the problem.
            </h1>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '18px',
                color: '#B8B2AE',
                lineHeight: 1.7,
                marginBottom: '40px',
              }}
            >
              Engagements are taken selectively. The more specific you are about the challenge, the
              better I can assess whether it&apos;s a fit.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <blockquote
              style={{
                fontFamily: 'var(--font-playfair)',
                fontStyle: 'italic',
                fontSize: '20px',
                color: '#9A8B47',
                lineHeight: 1.55,
                borderLeft: '3px solid #9A8B47',
                paddingLeft: '20px',
                margin: 0,
              }}
            >
              "The analysis is the product. I am not incentivised by what you buy next, but by how
              well you understand what you already have."
            </blockquote>
          </FadeUp>
        </div>

        {/* Right column — form */}
        <FadeUp delay={0.1}>
          {status === 'success' ? (
            <div
              style={{
                padding: '48px',
                background: '#141414',
                border: '1px solid #2A2825',
                borderTop: '2px solid #9A8B47',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontWeight: 400,
                  fontSize: '28px',
                  color: '#F0EDE8',
                  lineHeight: 1.3,
                }}
              >
                Thank you. I&apos;ll be in touch.
              </h2>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              <Field id="name" label="Name" required>
                <input
                  id="name"
                  type="text"
                  className="form-field"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Field>

              <Field id="organisation" label="Organisation" required>
                <input
                  id="organisation"
                  type="text"
                  className="form-field"
                  placeholder="Company or organisation"
                  value={form.organisation}
                  onChange={(e) => setForm({ ...form, organisation: e.target.value })}
                />
              </Field>

              <Field id="email" label="Email" required>
                <input
                  id="email"
                  type="email"
                  className="form-field"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Field>

              <Field id="message" label="What are you working on?" required>
                <textarea
                  id="message"
                  rows={5}
                  className="form-field"
                  placeholder="Describe the challenge or problem you're facing..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ resize: 'vertical' }}
                />
              </Field>

              <Field id="source" label="How did you find Systems That Decide?">
                <input
                  id="source"
                  type="text"
                  className="form-field"
                  placeholder="Optional"
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                />
              </Field>

              {status === 'error' && (
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '14px',
                    color: '#C0392B',
                  }}
                >
                  Something went wrong. Please try again or email andrew.gilbert870@gmail.com directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary"
                style={{
                  justifyContent: 'center',
                  opacity: status === 'sending' ? 0.7 : 1,
                  cursor: status === 'sending' ? 'wait' : 'pointer',
                  border: 'none',
                }}
              >
                {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
              </button>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  )
}
