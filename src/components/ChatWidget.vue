<template>
  <div class="chat-widget">
    <transition name="chat-hint">
      <button
        v-if="showHint && !isOpen"
        type="button"
        class="chat-widget__hint"
        @click="openChat"
      >
        Talk with my AI
      </button>
    </transition>

    <button
      ref="launcherRef"
      type="button"
      class="chat-widget__launcher"
      :class="{ 'chat-widget__launcher--open': isOpen }"
      :aria-expanded="isOpen"
      aria-haspopup="dialog"
      aria-label="Chat with Safwan's AI assistant"
      @click="toggleChat"
    >
      <svg v-if="!isOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8 10.5h8M8 14h5M21 12a9 9 0 1 1-4.6-7.87L21 3l-1.13 4.6A8.96 8.96 0 0 1 21 12z"
        />
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>

    <div
      v-show="isOpen"
      ref="panelRef"
      class="chat-panel"
      role="dialog"
      aria-label="AI assistant chat"
      @keydown.esc="closeChat"
    >
      <header class="chat-panel__header">
        <span class="chat-panel__avatar" aria-hidden="true">SH</span>
        <div class="chat-panel__heading">
          <p class="chat-panel__title">Safwan AI</p>
          <p class="chat-panel__status">
            <span class="chat-panel__dot" aria-hidden="true"></span>
            AI tech advisor · powered by DeepSeek
          </p>
        </div>
        <button type="button" class="chat-panel__close" aria-label="Close chat" @click="closeChat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </header>

      <div ref="messagesRef" class="chat-panel__messages" aria-live="polite">
        <div
          v-for="message in messages"
          :key="message.id"
          class="chat-message"
          :class="`chat-message--${message.role}`"
        >
          <p class="chat-message__bubble">{{ message.content }}</p>
        </div>

        <div v-if="isWaitingFirstToken" class="chat-message chat-message--assistant">
          <p class="chat-message__bubble chat-message__bubble--typing" aria-label="Assistant is typing">
            <span></span><span></span><span></span>
          </p>
        </div>

        <div v-if="showSuggestions" class="chat-panel__suggestions">
          <button
            v-for="suggestion in suggestions"
            :key="suggestion"
            type="button"
            class="chat-panel__suggestion"
            @click="sendMessage(suggestion)"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>

      <form class="chat-panel__composer" @submit.prevent="submitDraft">
        <textarea
          ref="inputRef"
          v-model="draft"
          class="chat-panel__input"
          rows="1"
          placeholder="Ask about skills, AI, pricing, project idea..."
          :disabled="isStreaming"
          @keydown.enter.exact.prevent="submitDraft"
        ></textarea>
        <button
          type="submit"
          class="chat-panel__send"
          :disabled="isStreaming || !draft.trim()"
          aria-label="Send message"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h13M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

import { streamChatReply } from '../composables/useOllamaChat.js'

const GREETING = {
  id: 'greeting',
  role: 'assistant',
  content:
    "Hi, I’m Safwan AI. Ask me about Safwan’s experience, stack, services, pricing, AI ideas, or whether your project idea can build or not lah.",
}

const FALLBACK_REPLY =
  "Aiyo, I can't reach my brain right now. You can WhatsApp Safwan directly at wa.me/60177786836, easier to discuss there."

const suggestions = [
  'What is Safwan good at?',
  'Can advise my AI idea?',
  'How much for web app?',
]

const isOpen = ref(false)
const showHint = ref(false)
const draft = ref('')
const messages = ref([GREETING])
const isStreaming = ref(false)
const isWaitingFirstToken = ref(false)

const panelRef = ref(null)
const messagesRef = ref(null)
const inputRef = ref(null)
const launcherRef = ref(null)

let abortController = null
let hintTimer
let messageId = 0
let reduceMotion = false

const showSuggestions = computed(
  () => !isStreaming.value && messages.value.length === 1,
)

const scrollToLatest = async () => {
  await nextTick()
  const el = messagesRef.value
  if (el) {
    el.scrollTop = el.scrollHeight
  }
}

const animatePanel = (open) => {
  const panel = panelRef.value
  if (!panel || reduceMotion) {
    return
  }
  gsap.killTweensOf(panel)
  if (open) {
    gsap.fromTo(
      panel,
      { autoAlpha: 0, y: 26, scale: 0.94, transformOrigin: '100% 100%' },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' },
    )
  }
}

const openChat = async () => {
  showHint.value = false
  isOpen.value = true
  await nextTick()
  animatePanel(true)
  inputRef.value?.focus()
  void scrollToLatest()
}

const closeChat = () => {
  const panel = panelRef.value
  if (!panel || reduceMotion) {
    isOpen.value = false
    showHint.value = true
    return
  }
  gsap.killTweensOf(panel)
  gsap.to(panel, {
    autoAlpha: 0,
    y: 22,
    scale: 0.95,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      isOpen.value = false
      showHint.value = true
      gsap.set(panel, { clearProps: 'all' })
    },
  })
}

const toggleChat = () => {
  if (isOpen.value) {
    closeChat()
  } else {
    void openChat()
  }
}

const sendMessage = async (text) => {
  const content = text.trim()
  if (!content || isStreaming.value) {
    return
  }

  messages.value.push({ id: `u-${messageId += 1}`, role: 'user', content })
  draft.value = ''
  isStreaming.value = true
  isWaitingFirstToken.value = true
  void scrollToLatest()

  const history = messages.value
    .filter((message) => message.id !== 'greeting')
    .map(({ role, content: messageContent }) => ({ role, content: messageContent }))

  const reply = ref(null)
  abortController = new AbortController()

  try {
    await streamChatReply(
      history,
      (token) => {
        if (!reply.value) {
          isWaitingFirstToken.value = false
          reply.value = { id: `a-${messageId += 1}`, role: 'assistant', content: '' }
          messages.value.push(reply.value)
        }
        reply.value.content += token
        void scrollToLatest()
      },
      abortController.signal,
    )
    if (!reply.value) {
      throw new Error('empty reply')
    }
  } catch (error) {
    if (error?.name !== 'AbortError') {
      if (reply.value) {
        reply.value.content = reply.value.content || FALLBACK_REPLY
      } else {
        messages.value.push({
          id: `a-${messageId += 1}`,
          role: 'assistant',
          content: FALLBACK_REPLY,
        })
      }
    }
  } finally {
    abortController = null
    isStreaming.value = false
    isWaitingFirstToken.value = false
    void scrollToLatest()
    if (isOpen.value) {
      await nextTick()
      inputRef.value?.focus()
    }
  }
}

const submitDraft = () => {
  void sendMessage(draft.value)
}

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  hintTimer = window.setTimeout(() => {
    if (!isOpen.value) {
      showHint.value = true
    }
  }, 1800)

  if (!reduceMotion && launcherRef.value) {
    gsap.fromTo(
      launcherRef.value,
      { autoAlpha: 0, scale: 0.6, y: 18 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.65, ease: 'back.out(1.8)', delay: 1.4 },
    )
  }
})

onUnmounted(() => {
  window.clearTimeout(hintTimer)
  abortController?.abort()
  if (launcherRef.value) {
    gsap.killTweensOf(launcherRef.value)
  }
  if (panelRef.value) {
    gsap.killTweensOf(panelRef.value)
  }
})
</script>
