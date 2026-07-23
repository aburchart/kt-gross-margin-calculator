export type LeadSource =
  | 'contact-page'
  | 'salons-page'
  | 'profit-margin-tool'
  | 'door-crasher-tool'

export interface SubmitLeadPayload {
  source?: LeadSource
  type?: string
  name?: string
  email: string
  phone?: string
  businessType?: string
  message?: string
  [key: string]: unknown
}

export type SubmitLeadFn = (
  payload: SubmitLeadPayload
) => Promise<{ success: boolean; error?: string }>

/** Default lead submitter — posts to the host app's `/api/submit-lead`. */
export const submitLead: SubmitLeadFn = async (payload) => {
  const res = await fetch('/api/submit-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string }
    return { success: false, error: data.error ?? 'Submission failed' }
  }

  return { success: true }
}
