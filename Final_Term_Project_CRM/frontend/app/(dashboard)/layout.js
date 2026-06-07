'use client'
import { useAuth } from '@/hooks/useAuth'
import Sidebar from '@/components/Sidebar'
import Chatbot from '@/components/Chatbot'

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="text-sm text-zinc-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-zinc-50">
      <Sidebar user={user} />
      <main className="flex-1 ml-56 p-8">
        {children}
      </main>
      <Chatbot />
    </div>
  )
}
