'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Minus, Plus, Loader2, X } from 'lucide-react'
import {
  LP_API_BASE, LP_API_KEY, PROPERTIES, PropertyKey,
  dayCache, fetchMonthAvailability, buildBookingUrl, formatDisplay,
  MONTHS, DAYS,
} from '@/lib/lodgepilot'

function RangePicker({ checkIn, checkOut, onSelect, onMonthChange }: {
  checkIn: string
  checkOut: string
  onSelect: (date: string) => void
  onMonthChange: (y: number, m: number) => void
}) {
  const today = new Date().toISOString().split('T')[0]
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const initial = checkIn ? new Date(checkIn + 'T12:00:00') : new Date()
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() })
  const [, forceRender] = useState(0)

  const selectingOut = !!(checkIn && !checkOut)

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  useEffect(() => {
    if (!open) return
    const id = setInterval(() => forceRender(n => n + 1), 300)
    return () => clearInterval(id)
  }, [open, view])

  function navigate(dir: 1 | -1) {
    setView(v => {
      let { year, month } = v
      month += dir
      if (month > 11) { month = 0; year++ }
      if (month < 0) { month = 11; year-- }
      onMonthChange(year, month)
      return { year, month }
    })
  }

  const firstDay = new Date(view.year, view.month, 1).getDay()
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()
  const offset = (firstDay + 6) % 7
  const cells = [...Array(offset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  function toStr(d: number) {
    return `${view.year}-${String(view.month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  }

  function handleClick(str: string) {
    onSelect(str)
    if (selectingOut && str > checkIn) setOpen(false)
  }

  const rangeEnd = checkOut || (selectingOut ? hover : '')

  return (
    // Wrapper is relative so the floating calendar anchors to it
    <div ref={ref} className="relative flex flex-col sm:flex-row sm:border-r border-gray-100">
      {/* Check-in field */}
      <button
        onClick={() => setOpen(true)}
        className="flex-1 px-6 py-5 text-left group border-b sm:border-b-0 sm:border-r border-gray-100"
      >
        <span className="block text-xs font-semibold uppercase tracking-wider text-casa-text-light mb-2">Check in</span>
        <span className={`text-sm font-medium ${checkIn ? 'text-casa-text' : 'text-gray-400 group-hover:text-gray-500'}`}>
          {formatDisplay(checkIn) ?? 'Add date'}
        </span>
      </button>

      {/* Check-out field */}
      <button
        onClick={() => setOpen(true)}
        className="flex-1 px-6 py-5 text-left group border-b sm:border-b-0"
      >
        <span className="block text-xs font-semibold uppercase tracking-wider text-casa-text-light mb-2">Check out</span>
        <span className={`text-sm font-medium ${checkOut ? 'text-casa-text' : 'text-gray-400 group-hover:text-gray-500'}`}>
          {formatDisplay(checkOut) ?? 'Add date'}
        </span>
      </button>

      {/* Single shared calendar popup */}
      {open && (
        <div className="absolute top-full left-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-50 w-80">
          <div className="flex items-center justify-between mb-1">
            <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-gray-100 rounded-full text-casa-text-light"><ChevronLeft size={15} /></button>
            <span className="text-sm font-semibold text-casa-text">{MONTHS[view.month]} {view.year}</span>
            <button onClick={() => navigate(1)} className="p-1.5 hover:bg-gray-100 rounded-full text-casa-text-light"><ChevronRight size={15} /></button>
          </div>
          <p className="text-center text-xs text-casa-teal font-medium mb-3">
            {selectingOut ? 'Select check-out date' : 'Select check-in date'}
          </p>
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => <span key={d} className="text-center text-xs text-casa-text-light font-medium py-1">{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-y-0.5">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />
              const str = toStr(day)
              const disabled = str < today || (selectingOut && str <= checkIn)
              const isIn = str === checkIn
              const isOut = str === checkOut
              const inRange = !!(checkIn && rangeEnd && str > checkIn && str < rangeEnd)
              const avail = dayCache.get(str)
              const neitherAvail = avail && !avail.casa && !avail.casita
              return (
                <button
                  key={i}
                  disabled={disabled}
                  onClick={() => handleClick(str)}
                  onMouseEnter={() => setHover(str)}
                  onMouseLeave={() => setHover('')}
                  className={`w-full flex flex-col items-center justify-center pt-1.5 pb-1 text-xs font-medium transition-colors
                    ${isIn || isOut ? 'bg-casa-teal text-white rounded-xl' : ''}
                    ${inRange ? 'bg-casa-teal/15 text-casa-text' : ''}
                    ${!isIn && !isOut && !inRange && !disabled && !neitherAvail ? 'hover:bg-gray-50 text-casa-text rounded-xl' : ''}
                    ${disabled || (!isIn && !isOut && !inRange && neitherAvail) ? 'text-gray-300 cursor-not-allowed rounded-xl' : ''}
                  `}
                >
                  <span>{day}</span>
                  {!disabled && !isIn && !isOut && (
                    <span className="flex gap-0.5 mt-0.5 h-1.5">
                      {avail?.casa && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: PROPERTIES.casa.color }} />}
                      {avail?.casita && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: PROPERTIES.casita.color }} />}
                    </span>
                  )}
                  {!disabled && !isIn && !isOut && !avail && <span className="h-1.5 mt-0.5" />}
                </button>
              )
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-4 text-xs text-casa-text-light">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PROPERTIES.casa.color }} />Casa
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PROPERTIES.casita.color }} />Casita
            </span>
            <span className="ml-auto text-gray-400 italic">no dot = fully booked</span>
          </div>
        </div>
      )}
    </div>
  )
}

type AvailResult = { available: string[]; unavailable: string[]; bookingLinks: Record<string, string> }

export default function BookingWidget() {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [avail, setAvail] = useState<AvailResult | null>(null)
  const [checking, setChecking] = useState(false)
  const [, forceRender] = useState(0)

  const today = new Date()
  const datesReady = !!(checkIn && checkOut)

  useEffect(() => {
    const y = today.getFullYear(), m = today.getMonth()
    Promise.all([
      fetchMonthAvailability(y, m),
      fetchMonthAvailability(m + 1 > 11 ? y + 1 : y, (m + 1) % 12),
      fetchMonthAvailability(m + 2 > 11 ? y + 1 : y, (m + 2) % 12),
    ]).then(() => forceRender(n => n + 1))
  }, [])

  const handleMonthChange = useCallback((y: number, m: number) => {
    fetchMonthAvailability(y, m).then(() => forceRender(n => n + 1))
  }, [])

  function handleDateSelect(date: string) {
    if (!checkIn || checkOut) {
      setCheckIn(date)
      setCheckOut('')
      setAvail(null)
    } else {
      if (date > checkIn) {
        setCheckOut(date)
      } else {
        setCheckIn(date)
      }
    }
  }

  function clearDates() {
    setCheckIn('')
    setCheckOut('')
    setAvail(null)
  }

  useEffect(() => {
    if (!datesReady) { setAvail(null); return }
    setChecking(true)
    const ctrl = new AbortController()
    fetch(`${LP_API_BASE}/public/v1/availability?start=${checkIn}&end=${checkOut}`, {
      headers: { 'X-API-Key': LP_API_KEY },
      signal: ctrl.signal,
    })
      .then(r => r.json())
      .then(data => setAvail({
        available: data.availableResourceIds ?? [],
        unavailable: data.unavailableResourceIds ?? [],
        bookingLinks: data.bookingLinks ?? {},
      }))
      .catch(() => {})
      .finally(() => setChecking(false))
    return () => ctrl.abort()
  }, [checkIn, checkOut])

  function status(prop: PropertyKey) {
    if (!datesReady) return 'neutral'
    if (checking) return 'loading'
    if (!avail) return 'neutral'
    if (avail.available.includes(PROPERTIES[prop].id)) return 'available'
    if (avail.unavailable.includes(PROPERTIES[prop].id)) return 'unavailable'
    return 'neutral'
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Booking bar */}
      <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col sm:flex-row overflow-visible">
        {/* CHECK IN + CHECK OUT share one calendar via RangePicker */}
        <RangePicker
          checkIn={checkIn}
          checkOut={checkOut}
          onSelect={handleDateSelect}
          onMonthChange={handleMonthChange}
        />

        {/* GUESTS */}
        <div className="px-6 py-5 border-b sm:border-b-0 sm:border-r border-gray-100">
          <span className="block text-xs font-semibold uppercase tracking-wider text-casa-text-light mb-2">Guests</span>
          <div className="flex items-center gap-3">
            <button onClick={() => setGuests(g => Math.max(1, g - 1))} disabled={guests <= 1}
              className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:border-casa-teal hover:text-casa-teal transition-colors disabled:opacity-30">
              <Minus size={11} />
            </button>
            <span className="text-sm font-medium text-casa-text w-4 text-center">{guests}</span>
            <button onClick={() => setGuests(g => Math.min(2, g + 1))} disabled={guests >= 2}
              className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:border-casa-teal hover:text-casa-teal transition-colors disabled:opacity-30">
              <Plus size={11} />
            </button>
          </div>
        </div>

        {/* CLEAR — only visible when dates are set */}
        {datesReady && (
          <div className="px-4 py-5 flex items-center justify-center">
            <button onClick={clearDates} title="Clear dates"
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-red-300 hover:text-red-400 transition-colors text-casa-text-light">
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Property cards */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-500 overflow-hidden ${datesReady ? 'opacity-100 max-h-[600px]' : 'opacity-0 max-h-0 pointer-events-none'}`}>
        {(Object.keys(PROPERTIES) as PropertyKey[]).map(prop => {
          const s = status(prop)
          const href = avail?.bookingLinks[PROPERTIES[prop].id] ?? buildBookingUrl(prop, checkIn, checkOut, guests)
          return (
            <div key={prop} className={`bg-white rounded-3xl border-2 overflow-hidden transition-all duration-300 shadow-sm
              ${s === 'available' ? 'border-green-400 shadow-green-100' : ''}
              ${s === 'unavailable' ? 'border-gray-100 opacity-50' : ''}
              ${s === 'neutral' || s === 'loading' ? 'border-gray-100' : ''}
            `}>
              <div className="relative h-44 overflow-hidden">
                <img src={PROPERTIES[prop].image} alt={PROPERTIES[prop].name}
                  className={`w-full h-full object-cover transition-all duration-500 ${s === 'unavailable' ? 'grayscale' : ''}`} />
                {s === 'available' && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow">Available</span>
                  </div>
                )}
                {s === 'unavailable' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white/90 text-casa-text text-xs font-semibold px-4 py-2 rounded-full shadow">Not available</span>
                  </div>
                )}
                {s === 'loading' && (
                  <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
                    <Loader2 size={20} className="animate-spin text-casa-teal" />
                  </div>
                )}
              </div>
              <div className="p-5 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-casa-text text-base">{PROPERTIES[prop].name}</h3>
                  <p className="text-xs text-casa-text-light mt-1">{PROPERTIES[prop].type} · max. 2 guests</p>
                </div>
                {s === 'available' && (
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="flex-shrink-0 bg-casa-teal hover:bg-casa-teal-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-sm">
                    Book →
                  </a>
                )}
                {(s === 'neutral' || s === 'loading') && (
                  <span className="flex-shrink-0 border border-gray-200 text-casa-text-light text-sm font-medium px-5 py-2.5 rounded-full">
                    {checking ? '...' : 'Select dates'}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
