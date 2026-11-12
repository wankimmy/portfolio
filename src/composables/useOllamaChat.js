/**
 * Streaming chat against Ollama Cloud through the site proxy (/api/ollama/chat).
 * The API key never reaches the browser — Vite dev proxy / nginx injects it server-side.
 */

import { SYSTEM_PROMPT } from '../lib/chatPrompt.js'

const CHAT_ENDPOINT = '/api/ollama/chat'
// Picked on 2026-11-12 from a test of eight Ollama Cloud models on visitor questions: the most
// grounded (no invented facts), plain text, about a second to answer.
const DEFAULT_MODEL = import.meta.env.VITE_OLLAMA_MODEL || 'deepseek-v4.1-flash'

/** Keep request payloads small: only the most recent turns are sent. */
const MAX_HISTORY_MESSAGES = 12

/**
 * @param {Array<{ role: string, content: string }>} history conversation turns (no system message)
 * @param {(token: string) => void} onToken called per streamed content chunk
 * @param {AbortSignal} [signal]
 * @returns {Promise<string>} full assistant reply
 */
export async function streamChatReply(history, onToken, signal) {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.slice(-MAX_HISTORY_MESSAGES).map(({ role, content }) => ({ role, content })),
  ]

  // think: false skips the model's hidden reasoning, so the first words arrive sooner
  const send = () =>
    fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: DEFAULT_MODEL, messages, stream: true, think: false }),
      signal,
    })
  let response = await send()
  // 429: the account allows only a few requests at once; one short wait usually clears it
  if (response.status === 429) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    signal?.throwIfAborted?.()
    response = await send()
  }

  if (!response.ok || !response.body) {
    throw new Error(`Chat request failed (${response.status})`)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffered = ''
  let fullReply = ''

  const consumeLine = (line) => {
    const trimmed = line.trim()
    if (!trimmed) {
      return
    }
    let payload
    try {
      payload = JSON.parse(trimmed)
    } catch {
      return
    }
    if (payload.error) {
      throw new Error(payload.error)
    }
    const token = payload.message?.content
    if (token) {
      fullReply += token
      onToken(token)
    }
  }

  for (;;) {
    const { done, value } = await reader.read()
    if (done) {
      break
    }
    buffered += decoder.decode(value, { stream: true })
    const lines = buffered.split('\n')
    buffered = lines.pop() ?? ''
    lines.forEach(consumeLine)
  }
  consumeLine(buffered)

  return fullReply
}
