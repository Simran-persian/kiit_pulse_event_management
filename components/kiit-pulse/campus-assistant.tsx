'use client'

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { ArrowUpRight, LoaderCircle, MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { getOfflineCampusAnswer } from '@/lib/campus-assistant'
import { lastChecked } from '@/lib/kiit-data'

const starterQuestions = [
  'What registrations are open?',
  'Help me pick a society',
  'Show me hackathons',
]

function linkifyOfficialSources(text: string): ReactNode[] {
  return text.split(/(https:\/\/[^\s<>]+)/g).map((chunk, index) => {
    if (!chunk.startsWith('https://')) return chunk

    const trailingPunctuation = chunk.match(/[),.!?:;]+$/)?.[0] ?? ''
    const candidate = trailingPunctuation ? chunk.slice(0, -trailingPunctuation.length) : chunk

    try {
      const url = new URL(candidate)
      const host = url.hostname.toLowerCase()
      const isOfficial = host === 'kiit.ac.in' || host.endsWith('.kiit.ac.in')

      if (isOfficial) {
        return (
          <span key={`${index}-${candidate}`}>
            <a href={url.toString()} target="_blank" rel="noreferrer">
              {candidate}
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            {trailingPunctuation}
          </span>
        )
      }
    } catch {
      return chunk
    }

    return chunk
  })
}

export function CampusAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const launcherRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const { messages, sendMessage, setMessages, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })
  const isBusy = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    if (!isOpen) return

    inputRef.current?.focus()
    function closeOnEscape(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        launcherRef.current?.focus()
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: 'smooth' })
  }, [isOpen, messages, status])

  function askQuestion(text: string) {
    if (isBusy) return

    const offlineAnswer = getOfflineCampusAnswer(text)
    if (offlineAnswer) {
      setMessages([
        ...messages,
        { id: crypto.randomUUID(), role: 'user', parts: [{ type: 'text', text }] },
        { id: crypto.randomUUID(), role: 'assistant', parts: [{ type: 'text', text: offlineAnswer }] },
      ])
      return
    }

    sendMessage({ text })
  }

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = input.trim()
    if (!text || isBusy) return
    askQuestion(text)
    setInput('')
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229)) {
      event.preventDefault()
    }
  }

  function askStarterQuestion(question: string) {
    askQuestion(question)
  }

  return (
    <div className="campus-assistant">
      {isOpen && (
        <section className="assistant-panel" role="dialog" aria-modal="false" aria-labelledby="assistant-title">
          <header className="assistant-header">
            <span className="assistant-avatar" aria-hidden="true"><Sparkles size={17} /></span>
            <div className="assistant-heading-copy">
              <h2 id="assistant-title">Ask Pulse</h2>
              <p><span className="assistant-online-dot" aria-hidden="true" /> Your KIIT campus guide</p>
            </div>
            <button className="assistant-close" type="button" onClick={() => setIsOpen(false)} aria-label="Close campus assistant">
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div className="assistant-transcript" ref={transcriptRef} aria-live="polite" aria-relevant="additions text">
            {messages.length === 0 ? (
              <div className="assistant-welcome">
                <span className="assistant-greeting-mark" aria-hidden="true">k</span>
                <h3>Hey, what are you curious about?</h3>
                <p>Ask me about KIIT societies, campus events, and where to find official updates.</p>
                <div className="assistant-suggestions">
                  {starterQuestions.map((question) => (
                    <button type="button" key={question} onClick={() => askStarterQuestion(question)}>
                      {question}<ArrowUpRight size={13} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="assistant-messages">
                {messages.map((message) => (
                  <article className={`assistant-message ${message.role === 'user' ? 'from-user' : 'from-assistant'}`} key={message.id}>
                    <span className="assistant-message-label">{message.role === 'user' ? 'YOU' : 'PULSE'}</span>
                    <div className="assistant-message-bubble">
                      {message.parts.map((part, index) => part.type === 'text' ? (
                        <span className="assistant-message-text" key={`${message.id}-${index}`}>
                          {linkifyOfficialSources(part.text)}
                        </span>
                      ) : null)}
                    </div>
                  </article>
                ))}
                {isBusy && (
                  <div className="assistant-typing" role="status" aria-label="Pulse is typing">
                    <span /><span /><span />
                  </div>
                )}
                <div ref={transcriptEndRef => transcriptEndRef?.scrollIntoView({ block: 'end' })} aria-hidden="true" />
              </div>
            )}
            {error && (
              <div className="assistant-error" role="alert">
                Pulse&apos;s AI service isn&apos;t active in this preview. I can still answer from this campus snapshot. For the latest updates, visit{' '}
                <a href="https://ksac.kiit.ac.in/notice/" target="_blank" rel="noreferrer">KSAC notices</a>.
              </div>
            )}
          </div>

          <div className="assistant-data-note">Campus snapshot checked {lastChecked}. Confirm time-sensitive details with KSAC.</div>
          <form className="assistant-form" onSubmit={submitMessage}>
            <label className="sr-only" htmlFor="assistant-input">Ask about KIIT campus life</label>
            <input
              id="assistant-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Ask about societies or events…"
              maxLength={1800}
              autoComplete="off"
              disabled={isBusy}
            />
            <button type="submit" aria-label="Send message" disabled={!input.trim() || isBusy}>
              {isBusy ? <LoaderCircle size={17} className="assistant-spinner" aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
            </button>
          </form>
          <p className="assistant-powered-note">Helpful answers, grounded in the KIIT Pulse directory.</p>
        </section>
      )}

      <button
        className="assistant-launcher"
        type="button"
        ref={launcherRef}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="assistant-panel"
        aria-label={isOpen ? 'Close KIIT Pulse assistant' : 'Open KIIT Pulse assistant'}
      >
        {isOpen ? <X size={19} aria-hidden="true" /> : <MessageCircle size={19} aria-hidden="true" />}
        <span>{isOpen ? 'Close' : 'Ask Pulse'}</span>
        {!isOpen && <span className="assistant-launcher-sparkle" aria-hidden="true"><Sparkles size={12} /></span>}
      </button>
    </div>
  )
}
