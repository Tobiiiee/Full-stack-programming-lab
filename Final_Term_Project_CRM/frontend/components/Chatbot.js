'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/axios'
import { MessageCircle, X, Send } from 'lucide-react'

const COMMANDS = {
  help: '**Available commands:**\n• `list customers` — show all customers\n• `add customer` — go to add customer page\n• `invoices` — open invoices page\n• `dashboard` — go to dashboard\n• `help` — show this message',
  'list customers': null,
  'add customer': null,
  invoices: null,
  dashboard: null,
}

export default function Chatbot() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Type `help` to see what I can do.' },
  ])
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const addMessage = (from, text) => setMessages(prev => [...prev, { from, text }])

  const handleSend = async () => {
    const cmd = input.trim().toLowerCase()
    if (!cmd) return
    addMessage('user', input.trim())
    setInput('')

    if (cmd === 'help') {
      addMessage('bot', COMMANDS.help)
      return
    }

    if (cmd === 'list customers') {
      addMessage('bot', 'Fetching customers...')
      try {
        const { data } = await api.get('/customers')
        const list = data.map(c => `• ${c.name} (${c.status})`).join('\n')
        addMessage('bot', `Found ${data.length} customers:\n${list}`)
      } catch {
        addMessage('bot', 'Failed to fetch customers.')
      }
      return
    }

    if (cmd === 'add customer') {
      addMessage('bot', 'Opening add customer page...')
      setTimeout(() => router.push('/customers/add'), 600)
      return
    }

    if (cmd === 'invoices') {
      addMessage('bot', 'Opening invoices...')
      setTimeout(() => router.push('/invoices'), 600)
      return
    }

    if (cmd === 'dashboard') {
      addMessage('bot', 'Going to dashboard...')
      setTimeout(() => router.push('/dashboard'), 600)
      return
    }

    addMessage('bot', `Unknown command: "${cmd}". Type \`help\` for available commands.`)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-11 h-11 bg-zinc-900 hover:bg-zinc-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-50"
      >
        {open ? <X size={18} /> : <MessageCircle size={18} />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white border border-zinc-200 rounded-xl shadow-xl z-50 flex flex-col overflow-hidden">

          {/* Header */}
          <div className="px-4 py-3 border-b border-zinc-100">
            <p className="text-sm font-semibold text-zinc-900">CRM Assistant</p>
            <p className="text-xs text-zinc-400">Rule-based chatbot</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 max-h-72">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${
                  msg.from === 'user'
                    ? 'bg-zinc-900 text-white rounded-br-sm'
                    : 'bg-zinc-100 text-zinc-700 rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-zinc-100 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a command..."
              className="flex-1 text-xs bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
            <button
              onClick={handleSend}
              className="w-8 h-8 bg-zinc-900 hover:bg-zinc-700 text-white rounded-lg flex items-center justify-center transition-colors"
            >
              <Send size={13} />
            </button>
          </div>

        </div>
      )}
    </>
  )
}
