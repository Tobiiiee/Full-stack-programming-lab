'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { clearAuth } from '@/lib/auth'
import toast from 'react-hot-toast'
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Customers', href: '/customers', icon: Users },
  { label: 'Invoices', href: '/invoices', icon: FileText },
]

export default function Sidebar({ user }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    clearAuth()
    toast.success('Logged out')
    router.push('/login')
  }

  return (
    <aside className="fixed top-0 left-0 h-full w-56 bg-white border-r border-zinc-200 flex flex-col">

      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">C</span>
          </div>
          <span className="text-sm font-semibold text-zinc-900">CRM System</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-zinc-100 text-zinc-900 font-medium'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-zinc-100">
        {user && (
          <div className="px-3 py-2 mb-1">
            <p className="text-xs font-medium text-zinc-900 truncate">{user.name}</p>
            <p className="text-xs text-zinc-400 truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors w-full"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>

    </aside>
  )
}
