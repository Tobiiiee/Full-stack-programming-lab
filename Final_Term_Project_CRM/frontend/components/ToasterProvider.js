'use client'
import { Toaster } from 'react-hot-toast'

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#fff',
          color: '#1a1a2e',
          border: '1px solid #e4e4e7',
          borderRadius: '8px',
          fontSize: '14px',
        },
      }}
    />
  )
}