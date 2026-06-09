import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (!body.email || typeof body.email !== 'string') {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  // Log for now — replace with GHL webhook or email notification later
  console.log('[Lead Submission]', JSON.stringify(body, null, 2))

  // TODO: POST to GoHighLevel webhook
  // const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL
  // if (ghlWebhookUrl) {
  //   await fetch(ghlWebhookUrl, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(body),
  //   })
  // }

  // TODO: Send results email via Resend, SendGrid, or GHL automation

  return NextResponse.json({ success: true })
}
