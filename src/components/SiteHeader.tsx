'use client'

import React from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [accomOpen, setAccomOpen] = React.useState(false)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const openAccom = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setAccomOpen(true)
  }
  const closeAccom = () => {
    closeTimer.current = setTimeout(() => setAccomOpen(false), 180)
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3 text-casa-text">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo-1.png" alt="Casa Malacitano" className="h-9 md:h-10 w-auto" />
          <span className="font-brand text-xl tracking-wide font-bold hidden sm:block text-casa-text">Casa Malacitano</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {/* Accommodations dropdown */}
          <div
            className="relative"
            onMouseEnter={openAccom}
            onMouseLeave={closeAccom}
          >
            <button className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium tracking-wide text-casa-text-light hover:bg-gray-100 hover:text-casa-text transition-all">
              Accommodations
              <ChevronDown size={14} className={`transition-transform duration-200 ${accomOpen ? 'rotate-180' : ''}`} />
            </button>
            {accomOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-2 min-w-56 z-50">
                <Link
                  href="/casita"
                  onClick={() => setAccomOpen(false)}
                  className="block px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <p className="font-semibold text-casa-text text-sm">Casita Malacitano</p>
                  <p className="text-xs text-casa-text-light mt-0.5">Detached casita</p>
                </Link>
                <Link
                  href="/casa"
                  onClick={() => setAccomOpen(false)}
                  className="block px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <p className="font-semibold text-casa-text text-sm">Casa Malacitano</p>
                  <p className="text-xs text-casa-text-light mt-0.5">Studio with private entrance</p>
                </Link>
              </div>
            )}
          </div>

          <Link href="/activities" className="px-4 py-2 rounded-full text-sm font-medium tracking-wide text-casa-text-light hover:bg-gray-100 hover:text-casa-text transition-all">Activities</Link>
          <Link href="/contact" className="px-4 py-2 rounded-full text-sm font-medium tracking-wide text-casa-text-light hover:bg-gray-100 hover:text-casa-text transition-all">Contact</Link>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden focus:outline-none text-casa-text">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link href="/contact" className="bg-casa-teal text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm hover:bg-casa-teal/90">
            Book now
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden flex flex-col items-center py-5 gap-1 text-casa-text">
          <p className="text-xs font-bold uppercase tracking-widest text-casa-text-light mb-1">Accommodations</p>
          <Link href="/casita" onClick={() => setMenuOpen(false)} className="hover:text-casa-teal transition-colors text-base font-medium">Casita Malacitano</Link>
          <Link href="/casa" onClick={() => setMenuOpen(false)} className="hover:text-casa-teal transition-colors text-base font-medium">Casa Malacitano</Link>
          <div className="w-8 h-px bg-gray-200 my-2" />
          <Link href="/activities" onClick={() => setMenuOpen(false)} className="hover:text-casa-teal transition-colors text-base">Activities</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-casa-teal transition-colors text-base">Contact</Link>
        </div>
      )}
    </header>
  )
}
