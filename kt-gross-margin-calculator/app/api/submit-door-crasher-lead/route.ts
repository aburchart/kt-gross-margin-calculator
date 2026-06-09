import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log('[Door Crasher Lead]', JSON.stringify(body, null, 2))
  // TODO: POST to GHL_WEBHOOK_URL when ready
  return NextResponse.json({ success: true })
}
