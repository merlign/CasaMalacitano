'use client'

import React from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function SiteHeader({ hero = false }: { hero?: boolean }) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [accomOpen, setAccomOpen] = React.useState(false)
  const [mobileAccomOpen, setMobileAccomOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    if (!hero) return
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hero])

  const openAccom = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setAccomOpen(true) }
  const closeAccom = () => { closeTimer.current = setTimeout(() => setAccomOpen(false), 180) }

  const transparent = hero && !scrolled

  return (
    <header className={`fixed top-0 left-0 w-full z-50 px-4 md:px-8 pt-4 pb-2 ${hero ? '' : 'bg-gradient-to-b from-casa-stone via-casa-stone/80 to-transparent'}`}>
      <div className={`max-w-7xl mx-auto flex justify-between items-center px-4 md:px-5 py-3 rounded-full transition-all duration-300 border ${
        transparent
          ? 'bg-transparent border-transparent text-white'
          : 'bg-white/90 backdrop-blur-md border-gray-200/80 shadow-sm text-casa-text'
      }`}>

        <Link href="/" className="flex items-center gap-3">
          <img src="/logo-1.png" alt="Casa Malacitano" className="h-9 md:h-10 w-auto drop-shadow-lg" />
          <span className={`font-brand text-xl tracking-wide font-bold hidden sm:block transition-colors duration-300 ${transparent ? 'text-white drop-shadow-md' : 'text-casa-text'}`}>
            Casa Malacitano
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <div className="relative" onMouseEnter={openAccom} onMouseLeave={closeAccom}>
            <button className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all ${transparent ? 'text-white/90 hover:bg-white/15' : 'text-casa-text-light hover:bg-gray-100 hover:text-casa-text'}`}>
              Accommodations
              <ChevronDown size={14} className={`transition-transform duration-200 ${accomOpen ? 'rotate-180' : ''}`} />
            </button>
            {accomOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-2 min-w-56 z-50">
                <Link href="/casita" onClick={() => setAccomOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <p className="font-semibold text-casa-text text-sm">Casita Malacitano</p>
                  <p className="text-xs text-casa-text-light mt-0.5">Detached casita</p>
                </Link>
                <Link href="/casa" onClick={() => setAccomOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <p className="font-semibold text-casa-text text-sm">Casa Malacitano</p>
                  <p className="text-xs text-casa-text-light mt-0.5">Studio with private entrance</p>
                </Link>
              </div>
            )}
          </div>
          <Link href="/activities" className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all ${transparent ? 'text-white/90 hover:bg-white/15' : 'text-casa-text-light hover:bg-gray-100 hover:text-casa-text'}`}>Activities</Link>
          <Link href="/contact" className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all ${transparent ? 'text-white/90 hover:bg-white/15' : 'text-casa-text-light hover:bg-gray-100 hover:text-casa-text'}`}>Contact</Link>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden focus:outline-none transition-colors duration-300 ${transparent ? 'text-white' : 'text-casa-text'}`}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link href="/contact" className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${transparent ? 'bg-white text-casa-text hover:bg-casa-stone' : 'bg-casa-teal text-white hover:bg-casa-teal/90'}`}>
            Book now
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className={`max-w-5xl mx-auto mt-2 rounded-2xl backdrop-blur-md md:hidden border overflow-hidden ${transparent ? 'bg-black/60 border-white/10 text-white' : 'bg-white/95 border-gray-200/80 text-casa-text'}`}>
          <div className="px-5 py-2">
            <button
              onClick={() => setMobileAccomOpen(!mobileAccomOpen)}
              className={`flex items-center w-full py-3 border-b text-base font-medium hover:text-casa-teal transition-colors ${transparent ? 'border-white/10' : 'border-gray-100'}`}
            >
              Accommodations
              <ChevronDown size={16} className={`ml-auto transition-transform duration-200 ${mobileAccomOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileAccomOpen && (
              <div className={`pl-3 border-b ${transparent ? 'border-white/10' : 'border-gray-100'}`}>
                <Link href="/casita" onClick={() => setMenuOpen(false)} className={`flex items-center py-3 border-b hover:text-casa-teal transition-colors ${transparent ? 'border-white/5' : 'border-gray-50'}`}>
                  <span className="text-sm font-semibold">Casita Malacitano</span>
                  <span className={`text-xs ml-auto ${transparent ? 'text-white/50' : 'text-casa-text-light'}`}>Detached casita</span>
                </Link>
                <Link href="/casa" onClick={() => setMenuOpen(false)} className="flex items-center py-3 hover:text-casa-teal transition-colors">
                  <span className="text-sm font-semibold">Casa Malacitano</span>
                  <span className={`text-xs ml-auto ${transparent ? 'text-white/50' : 'text-casa-text-light'}`}>Studio</span>
                </Link>
              </div>
            )}
            <Link href="/activities" onClick={() => setMenuOpen(false)} className={`flex items-center py-3 border-b text-base font-medium hover:text-casa-teal transition-colors ${transparent ? 'border-white/10' : 'border-gray-100'}`}>Activities</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="flex items-center py-3 text-base font-medium hover:text-casa-teal transition-colors">Contact</Link>
          </div>
          <div className="px-5 pb-4">
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block w-full text-center bg-casa-teal text-white py-3 rounded-full font-semibold hover:bg-casa-teal/90 transition-colors">Book now</Link>
          </div>
        </div>
      )}
    </header>
  )
}
