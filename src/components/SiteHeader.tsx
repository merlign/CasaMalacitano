'use client'

import React from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 pt-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-5 py-3 rounded-full bg-white/90 backdrop-blur-md border border-gray-200/80 shadow-sm text-casa-text">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo-1.png" alt="Casa Malacitano" className="h-9 md:h-10 w-auto" />
          <span className="font-brand text-xl tracking-wide font-bold hidden sm:block text-casa-text">Casa Malacitano</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link href="/#accommodations" className="px-4 py-2 rounded-full text-sm font-medium tracking-wide text-casa-text-light hover:bg-gray-100 hover:text-casa-text transition-all">Accommodations</Link>
          <Link href="/#surroundings" className="px-4 py-2 rounded-full text-sm font-medium tracking-wide text-casa-text-light hover:bg-gray-100 hover:text-casa-text transition-all">Surroundings</Link>
          <Link href="/#contact" className="px-4 py-2 rounded-full text-sm font-medium tracking-wide text-casa-text-light hover:bg-gray-100 hover:text-casa-text transition-all">Contact</Link>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden focus:outline-none text-casa-text">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link href="/#contact" className="bg-casa-teal text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm hover:bg-casa-teal/90">
            Book now
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className="max-w-5xl mx-auto mt-2 rounded-2xl bg-white/90 backdrop-blur-md md:hidden flex flex-col items-center py-5 space-y-4 border border-gray-200/80 text-casa-text">
          <Link href="/#accommodations" onClick={() => setMenuOpen(false)} className="hover:text-casa-teal transition-colors text-base">Accommodations</Link>
          <Link href="/#surroundings" onClick={() => setMenuOpen(false)} className="hover:text-casa-teal transition-colors text-base">Surroundings</Link>
          <Link href="/#contact" onClick={() => setMenuOpen(false)} className="hover:text-casa-teal transition-colors text-base">Contact</Link>
        </div>
      )}
    </header>
  )
}
