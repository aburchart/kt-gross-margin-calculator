import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  // body.source distinguishes: "contact-page" | "salons-page" | "profit-margin-tool" | "door-crasher-tool"
  console.log('[Lead Submission]', JSON.stringify(body, null, 2))

  // TODO: POST to GoHighLevel webhook once GHL_WEBHOOK_URL is set
  // const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL
  // if (ghlWebhookUrl) { await fetch(ghlWebhookUrl, { method: 'POST', body: JSON.stringify(body) }) }

  return NextResponse.json({ success: true })
}
