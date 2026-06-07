"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, isAuthenticated } from '@/lib/auth'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
      return
    }
    setUser(getUser())
    setLoading(false)
  }, [router])

  return { user, loading }
}
