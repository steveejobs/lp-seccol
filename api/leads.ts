import { createHmac, randomUUID } from 'node:crypto'
import type { IncomingMessage, ServerResponse } from 'node:http'

const MAX_BODY_BYTES = 32 * 1024
const CRM_TIMEOUT_MS = 8_000

type RequestWithBody = IncomingMessage & { body?: unknown }

type LeadInput = {
  name?: unknown
  company?: unknown
  phone?: unknown
  email?: unknown
  location?: unknown
  need?: unknown
  details?: unknown
  consent?: unknown
  website?: unknown
  formStartedAt?: unknown
  source?: unknown
}

type SourceInput = {
  page?: unknown
  referrer?: unknown
  utm?: unknown
}

function sendJson(response: ServerResponse, status: number, payload: object) {
  const body = JSON.stringify(payload)
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')
  response.setHeader('Content-Length', Buffer.byteLength(body))
  response.end(body)
}

function requestHasSameOrigin(request: IncomingMessage) {
  const origin = request.headers.origin
  const forwardedHost = request.headers['x-forwarded-host']
  const host = (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost)
    ?.split(',', 1)[0]
    .trim() || request.headers.host
  if (!origin || Array.isArray(origin) || !host) return false
  try {
    return new URL(origin).host.toLowerCase() === host.toLowerCase()
  } catch {
    return false
  }
}

async function readJson(request: RequestWithBody): Promise<LeadInput> {
  if (request.body !== undefined) {
    let parsed: unknown
    try {
      parsed = typeof request.body === 'string' ? JSON.parse(request.body) : request.body
    } catch {
      throw new Error('invalid_body')
    }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('invalid_body')
    if (Buffer.byteLength(JSON.stringify(parsed)) > MAX_BODY_BYTES) throw new Error('body_too_large')
    return parsed as LeadInput
  }
  const chunks: Buffer[] = []
  let size = 0
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    size += buffer.length
    if (size > MAX_BODY_BYTES) throw new Error('body_too_large')
    chunks.push(buffer)
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(Buffer.concat(chunks).toString('utf-8'))
  } catch {
    throw new Error('invalid_body')
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('invalid_body')
  return parsed as LeadInput
}

function cleanText(value: unknown, minimum: number, maximum: number) {
  const text = typeof value === 'string' ? value.trim() : ''
  if (text.length < minimum || text.length > maximum) throw new Error('invalid_lead')
  return text
}

function optionalText(value: unknown, maximum: number) {
  const text = typeof value === 'string' ? value.trim() : ''
  if (text.length > maximum) throw new Error('invalid_lead')
  return text
}

function cleanSource(value: unknown) {
  const source = value && typeof value === 'object' && !Array.isArray(value)
    ? value as SourceInput
    : {}
  const rawUtm = source.utm && typeof source.utm === 'object' && !Array.isArray(source.utm)
    ? source.utm as Record<string, unknown>
    : {}
  const utm: Record<string, string> = {}
  for (const key of ['source', 'medium', 'campaign', 'term', 'content']) {
    const item = optionalText(rawUtm[key], 160)
    if (item) utm[key] = item
  }
  return {
    page: optionalText(source.page, 500),
    referrer: optionalText(source.referrer, 500),
    utm,
  }
}

function validateLead(input: LeadInput) {
  if (input.website) throw new Error('spam_detected')
  const startedAt = Number(input.formStartedAt)
  const elapsed = Date.now() - startedAt
  if (!Number.isFinite(startedAt) || elapsed < 1_500 || elapsed > 24 * 60 * 60 * 1_000) {
    throw new Error('invalid_form_timing')
  }
  const phone = cleanText(input.phone, 8, 40)
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 8 || digits.length > 15) throw new Error('invalid_lead')
  const email = optionalText(input.email, 160)
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('invalid_lead')
  if (input.consent !== true) throw new Error('consent_required')
  return {
    name: cleanText(input.name, 2, 120),
    company: optionalText(input.company, 160),
    phone,
    email,
    location: cleanText(input.location, 2, 120),
    need: cleanText(input.need, 2, 160),
    details: cleanText(input.details, 10, 3_000),
    consent: true,
  }
}

function crmConfiguration() {
  const baseUrl = process.env.SIVS_CRM_BASE_URL?.trim().replace(/\/$/, '')
  const secret = process.env.SIVS_WEBSITE_LEADS_SECRET?.trim()
  if (!baseUrl || !secret || secret.length < 32) return null
  try {
    const url = new URL('/api/integrations/website/leads', baseUrl)
    const local = ['localhost', '127.0.0.1'].includes(url.hostname)
    if (url.protocol !== 'https:' && !local) return null
    return { url, secret }
  } catch {
    return null
  }
}

async function sendToCrm(url: URL, secret: string, body: string) {
  const timestamp = Math.floor(Date.now() / 1_000).toString()
  const signature = createHmac('sha256', secret)
    .update(`${timestamp}.${body}`)
    .digest('hex')
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Seccol-Site/1.0',
      'X-Seccol-Timestamp': timestamp,
      'X-Seccol-Signature': `sha256=${signature}`,
    },
    body,
    signal: AbortSignal.timeout(CRM_TIMEOUT_MS),
  })
}

export default async function handler(request: RequestWithBody, response: ServerResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return sendJson(response, 405, { ok: false, error: 'method_not_allowed' })
  }
  if (!request.headers['content-type']?.toLowerCase().startsWith('application/json')) {
    return sendJson(response, 415, { ok: false, error: 'unsupported_media_type' })
  }
  if (!requestHasSameOrigin(request)) {
    return sendJson(response, 403, { ok: false, error: 'forbidden_origin' })
  }
  try {
    const input = await readJson(request)
    const lead = validateLead(input)
    const config = crmConfiguration()
    if (!config) {
      return sendJson(response, 503, { ok: false, error: 'integration_not_configured' })
    }
    const event = {
      version: '1.0',
      event: 'lead.created',
      id: randomUUID(),
      occurredAt: new Date().toISOString(),
      source: cleanSource(input.source),
      lead,
    }
    const body = JSON.stringify(event)
    let crmResponse: Response | undefined
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        crmResponse = await sendToCrm(config.url, config.secret, body)
        if (crmResponse.status < 500) break
      } catch {
        if (attempt === 1) throw new Error('crm_unavailable')
      }
    }
    if (!crmResponse) throw new Error('crm_unavailable')
    const result = await crmResponse.json().catch(() => null) as {
      ok?: boolean
      protocol?: string
    } | null
    if (!crmResponse.ok || !result?.ok || !result.protocol) {
      return sendJson(response, 502, { ok: false, error: 'crm_unavailable' })
    }
    return sendJson(response, 201, { ok: true, protocol: result.protocol })
  } catch (error) {
    const code = error instanceof Error ? error.message : 'invalid_lead'
    if (['spam_detected', 'invalid_form_timing'].includes(code)) {
      return sendJson(response, 202, { ok: true })
    }
    if (['invalid_lead', 'consent_required', 'invalid_body', 'body_too_large'].includes(code)) {
      return sendJson(response, 400, { ok: false, error: code })
    }
    return sendJson(response, 502, { ok: false, error: 'crm_unavailable' })
  }
}
