import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
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

export default function ChatSection() {
  const { messages, input, setInput, sendMessage, loading, messagesLeft, limitReached } = useChat()
  const messagesContainerRef = useRef(null)

  useEffect(() => {
    const el = messagesContainerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, loading])

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const suggestedQuestions = [
    '¿Qué proyectos de IA ha desarrollado?',
    '¿Cuál es su experiencia con n8n?',
    '¿Domina LangGraph?',
    '¿Qué certificaciones tiene?',
  ]

  return (
    <section id="chatbot" className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="absolute left-0 right-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)' }} />
      <div className="absolute left-0 right-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)' }}>
            <span className="text-sm font-mono" style={{ color: '#A78BFA' }}>🤖 RAG Powered · LangChain + Groq</span>
          </div>
          <p className="section-label">IA en vivo</p>
          <h2 className="section-title">
            Habla con mi{' '}
            <span className="gradient-text">asistente de IA</span>
          </h2>
          <p className="mt-3 max-w-xl mx-auto" style={{ color: '#94A3B8' }}>
            Este chatbot tiene acceso a toda mi trayectoria profesional. Pregúntale sobre proyectos, habilidades o experiencia laboral.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="glass p-6" style={{ borderColor: 'rgba(124,58,237,0.2)' }}>
              <h3 className="font-semibold mb-4" style={{ color: '#F8FAFC' }}>
                ¿Qué puedes preguntarme?
              </h3>
              <div className="space-y-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => !limitReached && sendMessage(q)}
                    disabled={limitReached || loading}
                    className="w-full text-left text-sm p-3 rounded-lg transition-all duration-200"
                    style={{
                      background: 'rgba(124,58,237,0.06)',
                      border: '1px solid rgba(124,58,237,0.15)',
                      color: '#A78BFA',
                      opacity: limitReached || loading ? 0.5 : 1,
                      cursor: limitReached || loading ? 'default' : 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (!limitReached && !loading) e.currentTarget.style.background = 'rgba(124,58,237,0.12)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(124,58,237,0.06)'
                    }}
                  >
                    ↗ {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass p-4" style={{ borderColor: 'rgba(59,130,246,0.15)' }}>
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: '#94A3B8' }}>Mensajes restantes</span>
                <span
                  className="font-mono font-semibold"
                  style={{ color: messagesLeft > 5 ? '#4ADE80' : messagesLeft > 0 ? '#FBBF24' : '#F87171' }}
                >
                  {messagesLeft} / 20
                </span>
              </div>
              <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(messagesLeft / 20) * 100}%`,
                    background: messagesLeft > 5
                      ? 'linear-gradient(90deg, #7C3AED, #3B82F6)'
                      : messagesLeft > 0
                      ? 'linear-gradient(90deg, #F59E0B, #EF4444)'
                      : '#EF4444',
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: '16px',
              boxShadow: '0 0 40px rgba(124,58,237,0.08)',
              minHeight: '480px',
            }}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}>
                🤖
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: '#F8FAFC' }}>Asistente de Álvaro</div>
                <div className="text-xs flex items-center gap-1.5" style={{ color: '#4ADE80' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  En línea · RAG activo
                </div>
              </div>
            </div>

            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-5 flex flex-col gap-3" style={{ maxHeight: '340px' }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}
                >
                  {msg.role === 'user'
                    ? msg.content
                    : <ReactMarkdown>{msg.content}</ReactMarkdown>}
                </div>
              ))}
              {loading && <TypingIndicator />}
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 border-t flex gap-3"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  limitReached
                    ? 'Límite de sesión alcanzado'
                    : 'Escribe tu pregunta...'
                }
                disabled={limitReached || loading}
                className="flex-1 px-4 py-2.5 text-sm rounded-lg outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#F8FAFC',
                  opacity: limitReached ? 0.5 : 1,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(124,58,237,0.5)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading || limitReached}
                className="px-4 py-2.5 rounded-lg font-medium text-sm transition-all"
                style={{
                  background: !input.trim() || loading || limitReached
                    ? 'rgba(124,58,237,0.2)'
                    : 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                  color: 'white',
                  cursor: !input.trim() || loading || limitReached ? 'default' : 'pointer',
                }}
              >
                Enviar
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
