'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, TrendingUp, UserCheck, UserMinus } from 'lucide-react'
import api from '@/lib/axios'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuth()
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/customers')
        setCustomers(data)
      } catch {
        // handled by interceptor
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const total = customers.length
  const active = customers.filter(c => c.status === 'Active').length
  const leads = customers.filter(c => c.status === 'Lead').length
  const inactive = customers.filter(c => c.status === 'Inactive').length

  const stats = [
    { label: 'Total customers', value: total, icon: Users, color: 'text-zinc-700' },
    { label: 'Active', value: active, icon: UserCheck, color: 'text-emerald-600' },
    { label: 'Leads', value: leads, icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Inactive', value: inactive, icon: UserMinus, color: 'text-zinc-400' },
  ]

  const statusColor = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Lead: 'bg-blue-50 text-blue-700 border-blue-200',
    Inactive: 'bg-zinc-100 text-zinc-500 border-zinc-200',
  }

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-zinc-900">
          Good morning, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-sm text-zinc-500 mt-1">Here's what's happening with your customers.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-zinc-200 shadow-none">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-zinc-500">{label}</span>
                <Icon size={15} className={color} />
              </div>
              <p className="text-2xl font-semibold text-zinc-900">
                {loading ? '—' : value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent customers */}
      <Card className="border-zinc-200 shadow-none">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-zinc-900">Recent customers</CardTitle>
            <Link href="/customers" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
              View all →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-zinc-400 py-4 text-center">Loading...</p>
          ) : (
            <div className="space-y-1">
              {customers.slice(0, 5).map((c) => (
                <Link
                  key={c._id}
                  href={`/customers/${c._id}`}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-zinc-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-zinc-600">
                        {c.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-900">{c.name}</p>
                      <p className="text-xs text-zinc-400">{c.company || c.email}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColor[c.status]}`}>
                    {c.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  )
}
