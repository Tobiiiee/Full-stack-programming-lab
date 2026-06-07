'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import api from '@/lib/axios'
import CustomerForm from '@/components/CustomerForm'

export default function EditCustomerPage() {
  const { id } = useParams()
  const [customer, setCustomer] = useState(null)

  useEffect(() => {
    api.get(`/customers/${id}`).then(({ data }) => setCustomer(data))
  }, [id])

  if (!customer) return <div className="text-sm text-zinc-400 py-12 text-center">Loading...</div>

  return <CustomerForm initial={customer} customerId={id} />
}
