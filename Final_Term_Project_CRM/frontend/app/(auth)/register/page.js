'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import api from '@/lib/axios'
import { saveAuth } from '@/lib/auth'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      const { data } = await api.post('/auth/register', form)
      saveAuth(data)
      toast.success(`Welcome, ${data.name}!`)
      router.push('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 mb-4">
            <span className="text-white text-lg font-semibold">C</span>
          </div>
          <h1 className="text-xl font-semibold text-zinc-900">CRM System</h1>
          <p className="text-sm text-zinc-500 mt-1">Create your account</p>
        </div>

        <Card className="border-zinc-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-medium">Sign up</CardTitle>
            <CardDescription className="text-sm">Fill in your details to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium text-zinc-700">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-9 text-sm border-zinc-200"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-zinc-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-9 text-sm border-zinc-200"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium text-zinc-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="h-9 text-sm border-zinc-200"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full h-9 text-sm bg-zinc-900 hover:bg-zinc-700 text-white"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-sm text-zinc-500 text-center w-full">
              Already have an account?{' '}
              <Link href="/login" className="text-zinc-900 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>

      </div>
    </div>
  )
}
