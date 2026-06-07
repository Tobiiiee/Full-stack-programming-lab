'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { jsPDF } from 'jspdf'
import { X, Plus, Trash2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function InvoiceModal({ customer, onClose }) {
  const [items, setItems] = useState([
    { description: '', quantity: 1, rate: 0 },
  ])

  const addItem = () => setItems([...items, { description: '', quantity: 1, rate: 0 }])
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i))
  const updateItem = (i, field, value) => {
    const updated = [...items]
    updated[i][field] = field === 'description' ? value : Number(value)
    setItems(updated)
  }

  const total = items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const handleDownload = () => {
    if (items.some(i => !i.description)) {
      toast.error('Please fill in all item descriptions')
      return
    }

    const doc = new jsPDF()

    // Header
    doc.setFillColor(24, 24, 27)
    doc.rect(0, 0, 210, 40, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('INVOICE', 20, 25)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(invoiceNumber, 190, 20, { align: 'right' })
    doc.text(date, 190, 28, { align: 'right' })

    // Customer info
    doc.setTextColor(24, 24, 27)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('Bill To', 20, 58)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(customer.name, 20, 66)
    doc.text(customer.company || '', 20, 73)
    doc.text(customer.email, 20, 80)
    doc.text(customer.phone, 20, 87)

    // Table header
    doc.setFillColor(244, 244, 245)
    doc.rect(15, 100, 180, 10, 'F')
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(113, 113, 122)
    doc.text('DESCRIPTION', 20, 107)
    doc.text('QTY', 120, 107)
    doc.text('RATE', 145, 107)
    doc.text('AMOUNT', 175, 107)

    // Table rows
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(24, 24, 27)
    let y = 120
    items.forEach((item) => {
      doc.setFontSize(10)
      doc.text(item.description, 20, y)
      doc.text(String(item.quantity), 120, y)
      doc.text(`$${item.rate.toFixed(2)}`, 145, y)
      doc.text(`$${(item.quantity * item.rate).toFixed(2)}`, 175, y)
      doc.setDrawColor(228, 228, 231)
      doc.line(15, y + 4, 195, y + 4)
      y += 14
    })

    // Total
    doc.setFillColor(24, 24, 27)
    doc.rect(140, y + 4, 55, 12, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text('TOTAL', 145, y + 12)
    doc.text(`$${total.toFixed(2)}`, 190, y + 12, { align: 'right' })

    // Footer
    doc.setTextColor(161, 161, 170)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text('Thank you for your business.', 105, 275, { align: 'center' })

    doc.save(`${invoiceNumber}-${customer.name.replace(/\s+/g, '-')}.pdf`)
    toast.success('Invoice downloaded')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl border border-zinc-200 shadow-lg w-full max-w-lg">

        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900">Generate invoice</h2>
            <p className="text-xs text-zinc-400 mt-0.5">{customer.name} · {invoiceNumber}</p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="px-5 py-4 space-y-2 max-h-64 overflow-y-auto">
          <div className="grid grid-cols-12 gap-2 mb-1">
            <p className="col-span-5 text-xs text-zinc-400">Description</p>
            <p className="col-span-2 text-xs text-zinc-400">Qty</p>
            <p className="col-span-3 text-xs text-zinc-400">Rate ($)</p>
            <p className="col-span-2 text-xs text-zinc-400 text-right">Total</p>
          </div>
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center">
              <Input
                className="col-span-5 h-8 text-xs border-zinc-200"
                placeholder="Service..."
                value={item.description}
                onChange={(e) => updateItem(i, 'description', e.target.value)}
              />
              <Input
                className="col-span-2 h-8 text-xs border-zinc-200"
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateItem(i, 'quantity', e.target.value)}
              />
              <Input
                className="col-span-3 h-8 text-xs border-zinc-200"
                type="number"
                min="0"
                value={item.rate}
                onChange={(e) => updateItem(i, 'rate', e.target.value)}
              />
              <div className="col-span-2 flex items-center justify-end gap-1">
                <span className="text-xs text-zinc-600">${(item.quantity * item.rate).toFixed(0)}</span>
                {items.length > 1 && (
                  <button onClick={() => removeItem(i)} className="text-zinc-300 hover:text-red-500 transition-colors">
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add item + total */}
        <div className="px-5 pb-4">
          <button
            onClick={addItem}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-700 transition-colors mb-4"
          >
            <Plus size={13} />
            Add item
          </button>
          <div className="flex items-center justify-between py-3 border-t border-zinc-100">
            <span className="text-sm font-medium text-zinc-900">Total</span>
            <span className="text-sm font-semibold text-zinc-900">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-zinc-100">
          <Button variant="outline" onClick={onClose} className="h-8 text-xs border-zinc-200">
            Cancel
          </Button>
          <Button onClick={handleDownload} className="h-8 text-xs bg-zinc-900 hover:bg-zinc-700 text-white gap-1.5">
            <Download size={13} />
            Download PDF
          </Button>
        </div>

      </div>
    </div>
  )
}
