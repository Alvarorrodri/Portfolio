import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { useChat } from '../hooks/useChat'

function TypingIndicator() {
  return (
    <div className="chat-bubble-bot flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: '#7C3AED',
            animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const { messages, input, setInput, sendMessage, loading, messagesLeft, limitReached } = useChat()
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading, open])

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              width: '340px',
              height: '460px',
              background: 'rgba(10,10,26,0.95)',
              border: '1px solid rgba(124,58,237,0.3)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 0 40px rgba(124,58,237,0.15), 0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{
                borderColor: 'rgba(255,255,255,0.06)',
                background: 'rgba(124,58,237,0.08)',
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}
                >
                  🤖
                </div>
                <div>
                  <div className="text-xs font-medium" style={{ color: '#F8FAFC' }}>
                    Asistente IA
                  </div>
                  <div className="text-xs" style={{ color: '#4ADE80' }}>
                    ● En línea
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono" style={{ color: '#94A3B8' }}>
                  {messagesLeft}/20
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-md transition-colors"
                  style={{ color: '#94A3B8' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}
                  style={{ fontSize: '0.8rem' }}
                >
                  {msg.content}
                </div>
              ))}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-3 border-t flex gap-2"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={limitReached ? 'Límite alcanzado' : 'Pregunta algo...'}
                disabled={limitReached || loading}
                className="flex-1 px-3 py-2 text-xs rounded-lg outline-none"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#F8FAFC',
                  opacity: limitReached ? 0.5 : 1,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(124,58,237,0.5)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading || limitReached}
                className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
                style={{
                  background:
                    !input.trim() || loading || limitReached
                      ? 'rgba(124,58,237,0.2)'
                      : 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                  color: 'white',
                  cursor:
                    !input.trim() || loading || limitReached ? 'default' : 'pointer',
                }}
              >
                →
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl relative"
        style={{
          background: open
            ? 'rgba(124,58,237,0.3)'
            : 'linear-gradient(135deg, #7C3AED, #3B82F6)',
          boxShadow: '0 0 24px rgba(124,58,237,0.5)',
          border: '1px solid rgba(124,58,237,0.4)',
        }}
        title="Hablar con el asistente IA"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          '🤖'
        )}

        {!open && messages.length === 1 && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
            style={{ background: '#EF4444', color: 'white', fontSize: '0.6rem' }}
          >
            IA
          </span>
        )}
      </motion.button>
    </div>
  )
}
