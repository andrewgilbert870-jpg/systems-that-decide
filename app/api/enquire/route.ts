import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, organisation, email, message, source } = body

    if (!name || !organisation || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Systems That Decide <onboarding@resend.dev>',
      to: 'andrew.gilbert870@gmail.com',
      replyTo: email,
      subject: `New Enquiry from ${name} — ${organisation}`,
      text: `
Name: ${name}
Organisation: ${organisation}
Email: ${email}

What are you working on?
${message}

${source ? `How they found Systems That Decide:\n${source}` : ''}
      `.trim(),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Enquire API]', err)
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 })
  }
}
