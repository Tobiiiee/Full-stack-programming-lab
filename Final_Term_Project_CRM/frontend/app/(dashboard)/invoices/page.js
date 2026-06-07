'use client'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '@/lib/axios'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'
import InvoiceModal from '@/components/InvoiceModal'

export default function InvoicesPage() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    api.get('/customers')
      .then(({ data }) => setCustomers(data))
      .catch(() => toast.error('Failed to load customers'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-5xl mx-auto">

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-zinc-900">Invoices</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Generate and download invoices for your customers</p>
      </div>

      <Card className="border-zinc-200 shadow-none">
        <CardContent className="p-0">
          {loading ? (
            <p className="text-sm text-zinc-400 py-12 text-center">Loading...</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left text-xs font-medium text-zinc-400 px-4 py-3">Customer</th>
                  <th className="text-left text-xs font-medium text-zinc-400 px-4 py-3">Company</th>
                  <th className="text-left text-xs font-medium text-zinc-400 px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-zinc-400 px-4 py-3">Email</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c._id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-zinc-600">{c.name.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-medium text-zinc-900">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-600">{c.company || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                        c.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        c.status === 'Lead' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-zinc-100 text-zinc-500 border-zinc-200'
                      }`}>{c.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-500">{c.email}</td>
                    <td className="px-4 py-3">
                      <Button
                        onClick={() => setSelected(c)}
                        className="h-8 text-xs bg-zinc-900 hover:bg-zinc-700 text-white gap-1.5"
                      >
                        <FileText size={13} />
                        Generate
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {selected && (
        <InvoiceModal customer={selected} onClose={() => setSelected(null)} />
      )}

    </div>
  )
}
