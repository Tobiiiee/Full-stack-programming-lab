'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import api from '@/lib/axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const statusOptions = ['Lead', 'Active', 'Inactive']

export default function CustomerForm({ initial = {}, customerId = null }) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: initial.name || '',
    email: initial.email || '',
    phone: initial.phone || '',
    company: initial.company || '',
    status: initial.status || 'Lead',
    address: initial.address || '',
    notes: initial.notes || '',
  })
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (customerId) {
        await api.put(`/customers/${customerId}`, form)
        toast.success('Customer updated')
      } else {
        await api.post('/customers', form)
        toast.success('Customer added')
      }
      router.push('/customers')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-zinc-900">
          {customerId ? 'Edit customer' : 'Add customer'}
        </h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          {customerId ? 'Update customer information' : 'Fill in the details below'}
        </p>
      </div>

      <Card className="border-zinc-200 shadow-none">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-zinc-700">Full name *</Label>
                <Input value={form.name} onChange={set('name')} placeholder="John Doe" className="h-9 text-sm border-zinc-200" required />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-zinc-700">Email *</Label>
                <Input type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" className="h-9 text-sm border-zinc-200" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-zinc-700">Phone *</Label>
                <Input value={form.phone} onChange={set('phone')} placeholder="03001234567" className="h-9 text-sm border-zinc-200" required />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-zinc-700">Company</Label>
                <Input value={form.company} onChange={set('company')} placeholder="Acme Corp" className="h-9 text-sm border-zinc-200" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-zinc-700">Status</Label>
                <select
                  value={form.status}
                  onChange={set('status')}
                  className="w-full h-9 text-sm border border-zinc-200 rounded-lg px-3 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                >
                  {statusOptions.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-zinc-700">Address</Label>
                <Input value={form.address} onChange={set('address')} placeholder="City, Country" className="h-9 text-sm border-zinc-200" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-zinc-700">Notes</Label>
              <textarea
                value={form.notes}
                onChange={set('notes')}
                placeholder="Any additional notes..."
                rows={3}
                className="w-full text-sm border border-zinc-200 rounded-lg px-3 py-2 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" className="h-9 text-sm bg-zinc-900 hover:bg-zinc-700 text-white" disabled={loading}>
                {loading ? 'Saving...' : customerId ? 'Save changes' : 'Add customer'}
              </Button>
              <Button type="button" variant="outline" className="h-9 text-sm border-zinc-200" onClick={() => router.push('/customers')}>
                Cancel
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}
