import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai'
import { campusEvents, lastChecked, societies } from '@/lib/kiit-data'

export const maxDuration = 30

const maxMessages = 12
const maxMessageLength = 1800
const maxConversationLength = 10000

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function validateMessages(value: unknown): UIMessage[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > 20) {
    throw new Error('Invalid conversation')
  }

  let conversationLength = 0
  const messages = value.slice(-maxMessages).map((entry) => {
    if (!isRecord(entry) || typeof entry.id !== 'string' || entry.id.length > 128) {
      throw new Error('Invalid message')
    }
    if (entry.role !== 'user' && entry.role !== 'assistant') {
      throw new Error('Invalid message role')
    }
    if (!Array.isArray(entry.parts)) throw new Error('Invalid message content')

    const text = entry.parts
      .filter((part): part is Record<string, unknown> => isRecord(part) && part.type === 'text' && typeof part.text === 'string')
      .map((part) => part.text as string)
      .join('\n')
      .trim()

    if (!text || text.length > maxMessageLength) throw new Error('Invalid message length')
    conversationLength += text.length
    if (conversationLength > maxConversationLength) throw new Error('Conversation is too long')

    return {
      id: entry.id,
      role: entry.role,
      parts: [{ type: 'text' as const, text }],
    } as UIMessage
  })

  if (messages[messages.length - 1]?.role !== 'user') throw new Error('A user message is required')
  return messages
}

const campusContext = JSON.stringify({
  societies: societies.map(({ name, category, description }) => ({ name, category, description })),
  events: campusEvents.map(({ title, subtitle, date, category, host, venue, status, statusText, summary, sourceUrl, registrationUrl }) => ({
    title,
    subtitle,
    date,
    category,
    host,
    venue,
    status,
    statusText,
    summary,
    sourceUrl,
    registrationUrl: status === 'open' ? registrationUrl : undefined,
  })),
  officialSources: {
    ksac: 'https://ksac.kiit.ac.in/',
    notices: 'https://ksac.kiit.ac.in/notice/',
    kiitEvents: 'https://kiit.ac.in/events/',
  },
})

const instructions = `You are Pulse, a friendly and concise guide to KIIT campus life. Use only the campus directory and event snapshot provided below for factual claims. The snapshot was last checked ${lastChecked}; it is not live. Never invent an event, date, venue, society fact, recruitment window, or registration URL. A registration is open only when the event status is "open" and an official registration URL is present. If no confirmed registration is open, say so and link the official KSAC notices page. When useful, recommend a society based on its listed category and description. Be transparent when information is missing, and point students to an official source. Keep replies warm, practical, and under 120 words. Include relevant official URLs as plain text so they can be opened.\n\nCampus snapshot:\n${campusContext}`

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  const requestHost = request.headers.get('host')
  if (origin) {
    try {
      if (new URL(origin).host !== requestHost) {
        return Response.json({ error: 'Cross-origin requests are not allowed.' }, { status: 403 })
      }
    } catch {
      return Response.json({ error: 'Invalid request origin.' }, { status: 403 })
    }
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > 24000) {
    return Response.json({ error: 'The conversation is too large.' }, { status: 413 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  try {
    const messages = validateMessages(isRecord(body) ? body.messages : undefined)
    const result = streamText({
      model: 'google/gemini-3.8-flash',
      instructions,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 420,
    })

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    })
  } catch {
    return Response.json({ error: 'The conversation could not be processed.' }, { status: 400 })
  }
}
