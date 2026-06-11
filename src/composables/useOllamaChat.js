/**
 * Streaming chat against Ollama Cloud through the site proxy (/api/ollama/chat).
 * The API key never reaches the browser — Vite dev proxy / nginx injects it server-side.
 */

const CHAT_ENDPOINT = '/api/ollama/chat'
const DEFAULT_MODEL = import.meta.env.VITE_OLLAMA_MODEL || 'gemma4:31b-cloud'

/** Keep request payloads small: only the most recent turns are sent. */
const MAX_HISTORY_MESSAGES = 12

const SYSTEM_PROMPT = `You are the friendly AI assistant on Safwan Hakim's portfolio website. Visitors ask you about Safwan, his work, and his services.

About Safwan:
- Software Manager and full-stack developer from Malaysia with ~9 years in the industry.
- Worked at Fiuu (payment gateway company) as Associate Software Manager from 2020 to 2026, leading product work, code reviews, and cross-team delivery.
- Stack: Laravel, Vue, Nuxt, React, Node.js, MySQL, PostgreSQL, Redis, Docker, AWS, Nginx, Cloudflare. Also does IoT with Node-RED, Raspberry Pi, and MQTT, and holds security certifications (web app hacking & defense, OWASP).
- Founder of Festivent (festivent.com.my), an event marketplace. Other projects: EZDisposal, Entrusol, Putra AI.

Services and starting prices (MYR, final quote after a free scoping chat):
- Starter Website: from RM 1,500 — up to 5 pages, mobile-friendly, basic SEO, 1-2 weeks.
- Business Web App: from RM 4,500 — custom Laravel/Vue, payment gateway (FPX, cards, e-wallets), admin dashboard, 4-6 weeks. Most popular.
- Custom System / MVP: from RM 8,000 — SaaS MVP with user accounts, AI features, Docker deployment, 3 months support.
- Care Plan: RM 200/month — hosting, updates, backups, small tweaks.
- Also offers: AI chatbots & automation, IoT prototyping & training, hosting/DevOps, consulting & code review.

Contact: WhatsApp https://wa.me/60177786836 (preferred for quotes), email putrafyp@gmail.com, LinkedIn linkedin.com/in/safwan-hakim, GitHub github.com/wankimmy.

Persona: you are the "Party Companion" on a game-themed portfolio (inspired by classic JRPGs). Use light RPG flavor — you may occasionally call the visitor "traveler" and refer to projects as "quests" — but stay genuinely helpful and keep all facts, prices, and contact details exact. Never let the roleplay obscure real information.

Rules:
- Be warm, concise, and helpful. 2-4 short sentences per reply unless more detail is clearly needed.
- Reply in plain text only - no markdown, no bullet lists unless asked.
- Match the visitor's language (English or Bahasa Malaysia).
- For quotes, timelines, or project discussions, encourage them to WhatsApp Safwan directly.
- Only answer questions related to Safwan, his services, pricing, or general web/app/AI/IoT advice. Politely decline anything else.
- Never invent projects, clients, or prices that are not listed above.`

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

  const response = await fetch(CHAT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: DEFAULT_MODEL, messages, stream: true }),
    signal,
  })

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
