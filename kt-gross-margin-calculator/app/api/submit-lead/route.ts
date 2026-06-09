import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

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

  return NextResponse.json({ success: true })
}
