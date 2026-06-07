'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import api from '@/lib/axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Search, Trash2, Pencil, Eye } from 'lucide-react'

const statusColor = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Lead: 'bg-blue-50 text-blue-700 border-blue-200',
  Inactive: 'bg-zinc-100 text-zinc-500 border-zinc-200',
}

const statusFilters = ['All', 'Active', 'Lead', 'Inactive']

export default function CustomersPage() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [deleting, setDeleting] = useState(null)

  const fetchCustomers = async () => {
    try {
      const params = {}
      if (search) params.search = search
      if (status !== 'All') params.status = status
      const { data } = await api.get('/customers', { params })
      setCustomers(data)
    } catch {
      toast.error('Failed to load customers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [search, status])

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete ${name}? This cannot be undone.`)) return
    setDeleting(id)
    try {
      await api.delete(`/customers/${id}`)
      toast.success(`${name} deleted`)
      setCustomers(prev => prev.filter(c => c._id !== id))
    } catch {
      toast.error('Failed to delete customer')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-zinc-900">Customers</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{customers.length} total records</p>
        </div>
        <Link href="/customers/add">
          <Button className="h-9 text-sm bg-zinc-900 hover:bg-zinc-700 text-white gap-1.5">
            <Plus size={15} />
            Add customer
          </Button>
        </Link>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-9 text-sm border-zinc-200"
          />
        </div>
        <div className="flex items-center gap-1.5">
          {statusFilters.map(f => (
            <button
              key={f}
              onClick={() => setStatus(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                status === f
                  ? 'bg-zinc-900 text-white'
                  : 'bg-white text-zinc-500 border border-zinc-200 hover:text-zinc-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="border-zinc-200 shadow-none">
        <CardContent className="p-0">
          {loading ? (
            <p className="text-sm text-zinc-400 py-12 text-center">Loading...</p>
          ) : customers.length === 0 ? (
            <p className="text-sm text-zinc-400 py-12 text-center">No customers found</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left text-xs font-medium text-zinc-400 px-4 py-3">Name</th>
                  <th className="text-left text-xs font-medium text-zinc-400 px-4 py-3">Company</th>
                  <th className="text-left text-xs font-medium text-zinc-400 px-4 py-3">Phone</th>
                  <th className="text-left text-xs font-medium text-zinc-400 px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-zinc-400 px-4 py-3">Added</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c._id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                          <span className="text-xs font-medium text-zinc-600">{c.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-900">{c.name}</p>
                          <p className="text-xs text-zinc-400">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-600">{c.company || '—'}</td>
                    <td className="px-4 py-3 text-sm text-zinc-600">{c.phone}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColor[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-400">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <Link href={`/customers/${c._id}`}>
                          <button className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors">
                            <Eye size={14} />
                          </button>
                        </Link>
                        <Link href={`/customers/${c._id}/edit`}>
                          <button className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors">
                            <Pencil size={14} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(c._id, c.name)}
                          disabled={deleting === c._id}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

    </div>
  )
}
