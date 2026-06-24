import { createContext, useContext, useState, useCallback } from 'react'

const MESSAGE_LIMIT = 20
const API_URL =
  import.meta.env.VITE_API_URL !== undefined
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:8000'

function getOrCreateSessionId() {
  let sid = sessionStorage.getItem('portfolio_session_id')
  if (!sid) {
    sid = crypto.randomUUID()
    sessionStorage.setItem('portfolio_session_id', sid)
  }
  return sid
}

const ChatContext = createContext(null)

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        '¡Hola! Soy el asistente de Álvaro. Puedo responderte preguntas sobre su experiencia, proyectos y habilidades técnicas. ¿En qué puedo ayudarte?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messagesLeft, setMessagesLeft] = useState(MESSAGE_LIMIT)
  const [limitReached, setLimitReached] = useState(false)

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim()
      if (!trimmed || loading || limitReached) return

      const sessionId = getOrCreateSessionId()
      setMessages((prev) => [...prev, { role: 'user', content: trimmed }])
      setInput('')
      setLoading(true)

      try {
        const res = await fetch(`${API_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, session_id: sessionId }),
        })

        if (!res.ok) throw new Error('Network error')

        const data = await res.json()
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.response },
        ])

        if (data.messages_left !== undefined) setMessagesLeft(data.messages_left)
        if (data.limit_reached) setLimitReached(true)
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              'Lo siento, hay un problema de conexión. Asegúrate de que el backend está corriendo.',
          },
        ])
      } finally {
        setLoading(false)
      }
    },
    [loading, limitReached]
  )

  return (
    <ChatContext.Provider
      value={{ messages, input, setInput, sendMessage, loading, messagesLeft, limitReached }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatContext must be used inside ChatProvider')
  return ctx
}
