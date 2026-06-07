'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import api from '@/lib/axios'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, ArrowLeft } from 'lucide-react'

const statusColor = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Lead: 'bg-blue-50 text-blue-700 border-blue-200',
  Inactive: 'bg-zinc-100 text-zinc-500 border-zinc-200',
}

export default function CustomerDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/customers/${id}`)
        setCustomer(data)
      } catch {
        toast.error('Customer not found')
        router.push('/customers')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  const handleDelete = async () => {
    if (!confirm(`Delete ${customer.name}? This cannot be undone.`)) return
    try {
      await api.delete(`/customers/${id}`)
      toast.success('Customer deleted')
      router.push('/customers')
    } catch {
      toast.error('Failed to delete')
    }
  }

  if (loading) return <div className="text-sm text-zinc-400 py-12 text-center">Loading...</div>
  if (!customer) return null

  const fields = [
    { label: 'Email', value: customer.email },
    { label: 'Phone', value: customer.phone },
    { label: 'Company', value: customer.company || '—' },
    { label: 'Address', value: customer.address || '—' },
    { label: 'Added', value: new Date(customer.createdAt).toLocaleDateString() },
    { label: 'Notes', value: customer.notes || '—' },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/customers" className="text-zinc-400 hover:text-zinc-700 transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-zinc-900">{customer.name}</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{customer.company || customer.email}</p>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColor[customer.status]}`}>
          {customer.status}
        </span>
      </div>

      <Card className="border-zinc-200 shadow-none mb-4">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-y-5">
            {fields.map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-zinc-400 mb-1">{label}</p>
                <p className="text-sm text-zinc-900">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2">
        <Link href={`/customers/${id}/edit`}>
          <Button className="h-9 text-sm bg-zinc-900 hover:bg-zinc-700 text-white gap-1.5">
            <Pencil size={14} />
            Edit
          </Button>
        </Link>
        <Button variant="outline" onClick={handleDelete} className="h-9 text-sm border-zinc-200 text-red-600 hover:bg-red-50 hover:border-red-200 gap-1.5">
          <Trash2 size={14} />
          Delete
        </Button>
      </div>
    </div>
  )
}
