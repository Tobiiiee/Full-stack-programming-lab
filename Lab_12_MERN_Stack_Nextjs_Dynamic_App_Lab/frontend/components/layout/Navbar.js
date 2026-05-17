'use client';
import Link             from 'next/link';
import { useState }     from 'react';
import { useCart }      from '@/lib/CartContext';
import { ShoppingCart, Search, Menu, X, Phone, User } from 'lucide-react';

const NAV_LINKS = [
  { label: 'BEDS',      href: '/shop?category=beds' },
  { label: 'CABINETS',  href: '/shop?category=cabinets' },
  { label: 'BOOKCASES', href: '/shop?category=bookcases' },
  { label: 'BOXES',     href: '/shop?category=boxes' },
  { label: 'CHAIRS',    href: '/shop?category=chairs' },
  { label: 'TABLES',    href: '/shop?category=tables' },
];

export default function Navbar() {
  const { totalItems }     = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch]         = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) window.location.href = `/shop?search=${encodeURIComponent(search)}`;
  };

  return (
    <header className="w-full shadow-sm">
      {/* Top utility bar */}
      <div className="bg-gray-50 border-b border-gray-200 py-1 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-gray-500">
          {/* Social icons */}
          <div className="hidden md:flex items-center gap-3">
            {['𝕏', 'f', 'in', 'g+'].map(s => (
              <span key={s} className="cursor-pointer hover:text-[#F16E10] transition-colors">{s}</span>
            ))}
          </div>
          {/* Right side utilities */}
          <div className="flex items-center gap-4 ml-auto">
            <span className="hidden sm:flex items-center gap-1"><Phone size={11} /> 07584 031409</span>
            <Link href="/account" className="hover:text-[#F16E10]">My Account</Link>
            <span className="text-gray-300">|</span>
            <Link href="/auth" className="hover:text-[#F16E10]">Login/Register</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-serif text-2xl font-bold tracking-widest">
              <span className="text-[#F16E10]">R</span>
              <span className="text-gray-800">ustik </span>
              <span className="text-[#F16E10]">Plank</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(link => (
              <Link key={link.label} href={link.href}
                className="text-xs font-semibold tracking-wider text-gray-700 hover:text-[#F16E10] transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search + Cart */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="hidden sm:flex items-center border border-gray-300 rounded overflow-hidden">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="px-3 py-1.5 text-xs outline-none w-36"
              />
              <button type="submit" className="px-2 py-1.5 bg-gray-50 border-l border-gray-300 hover:bg-[#F16E10] hover:text-white transition-colors">
                <Search size={14} />
              </button>
            </form>

            <Link href="/cart" className="relative flex items-center gap-1 text-sm text-gray-700 hover:text-[#F16E10]">
              <ShoppingCart size={20} className="text-[#F16E10]" />
              <span className="text-xs">{totalItems} Item{totalItems !== 1 ? 's' : ''}</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F16E10] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-3">
          <form onSubmit={handleSearch} className="flex mb-3 border border-gray-300 rounded overflow-hidden">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-3 py-2 text-sm outline-none"
            />
            <button type="submit" className="px-3 bg-[#F16E10] text-white">
              <Search size={14} />
            </button>
          </form>
          <div className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map(link => (
              <Link key={link.label} href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold tracking-wider text-gray-700 hover:text-[#F16E10] py-2 border-b border-gray-100">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
