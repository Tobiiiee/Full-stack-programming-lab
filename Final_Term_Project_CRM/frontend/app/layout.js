import { Geist } from 'next/font/google'
import ToasterProvider from '@/components/ToasterProvider'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata = {
  title: 'CRM System',
  description: 'Customer Relationship Management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        {children}
        <ToasterProvider />
      </body>
    </html>
  )
}