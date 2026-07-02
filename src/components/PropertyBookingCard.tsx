'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Minus, Plus, Loader2, Check } from 'lucide-react'
import {
  LP_API_BASE, LP_API_KEY, PROPERTIES, PropertyKey,
  dayCache, fetchMonthAvailability, buildBookingUrl, formatDisplay,
  MONTHS, DAYS,
} from '@/lib/lodgepilot'

function DatePicker({ label, value, onChange, min, propKey, onMonthChange }: {
  label: string
  value: string
  onChange: (v: string) => void
  min?: string
  propKey: PropertyKey
  onMonthChange: (y: number, m: number) => void
}) {
  const today = new Date().toISOString().split('T')[0]
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const initial = value ? new Date(value + 'T12:00:00') : new Date()
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() })
  const [, forceRender] = useState(0)

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

  const propColor = PROPERTIES[propKey].color

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)} className="w-full text-left group">
        <span className="block text-xs font-semibold uppercase tracking-wider text-casa-text-light mb-1.5">{label}</span>
        <span className={`text-sm font-medium ${value ? 'text-casa-text' : 'text-gray-400 group-hover:text-gray-500'}`}>
          {formatDisplay(value) ?? 'Add date'}
        </span>
      </button>

      {open && (
        <>
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-40" onClick={() => setOpen(false)} />
        <div className="absolute top-full left-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 w-72">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-gray-100 rounded-full text-casa-text-light">
              <ChevronLeft size={14} />
            </button>
            <span className="text-sm font-semibold text-casa-text">{MONTHS[view.month]} {view.year}</span>
            <button onClick={() => navigate(1)} className="p-1.5 hover:bg-gray-100 rounded-full text-casa-text-light">
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => <span key={d} className="text-center text-xs text-casa-text-light font-medium py-1">{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-y-0.5">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />
              const str = toStr(day)
              const disabled = str < (min || today)
              const selected = str === value
              const avail = dayCache.get(str)
              const propAvail = avail?.[propKey]
              const fullyBooked = avail && !avail.casa && !avail.casita
              return (
                <button
                  key={i}
                  disabled={disabled}
                  onClick={() => { onChange(str); setOpen(false) }}
                  className={`w-full flex flex-col items-center pt-1.5 pb-1 rounded-lg text-xs font-medium transition-colors
                    ${selected ? 'bg-casa-teal text-white' : ''}
                    ${!selected && !disabled && !fullyBooked ? 'hover:bg-gray-50 text-casa-text' : ''}
                    ${disabled || (!selected && fullyBooked) ? 'text-gray-300 cursor-not-allowed' : ''}
                  `}
                >
                  <span>{day}</span>
                  {!disabled && !selected && (
                    <span className="mt-0.5 h-1.5 flex">
                      {propAvail && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: propColor }} />}
                    </span>
                  )}
                  {!disabled && !selected && !avail && <span className="h-1.5 mt-0.5" />}
                </button>
              )
            })}
          </div>
          <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: propColor }} />
            <span>Available · no dot = fully booked</span>
          </div>
        </div>
        </>
      )}
    </div>
  )
}

type AvailStatus = 'neutral' | 'loading' | 'available' | 'unavailable'

export default function PropertyBookingCard({ property, highlights }: {
  property: PropertyKey
  highlights: string[]
}) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [status, setStatus] = useState<AvailStatus>('neutral')
  const [bookingHref, setBookingHref] = useState('')
  const [, forceRender] = useState(0)

  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]
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

  useEffect(() => {
    if (!datesReady) { setStatus('neutral'); setBookingHref(''); return }
    setStatus('loading')
    const ctrl = new AbortController()
    fetch(`${LP_API_BASE}/public/v1/availability?start=${checkIn}&end=${checkOut}`, {
      headers: { 'X-API-Key': LP_API_KEY },
      signal: ctrl.signal,
    })
      .then(r => r.json())
      .then(data => {
        const avail: string[] = data.availableResourceIds ?? []
        const links: Record<string, string> = data.bookingLinks ?? {}
        const propId = PROPERTIES[property].id
        if (avail.includes(propId)) {
          setStatus('available')
          setBookingHref(links[propId] ?? buildBookingUrl(property, checkIn, checkOut, guests))
        } else {
          setStatus('unavailable')
          setBookingHref('')
        }
      })
      .catch(() => setStatus('neutral'))
    return () => ctrl.abort()
  }, [checkIn, checkOut, property])

  return (
    <div id="book" className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-gray-100 p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-casa-teal mb-1">Book direct</p>
      <p className="text-casa-text-light text-sm mb-5 leading-relaxed">No Airbnb or Booking.com fees. Direct contact with your hosts.</p>

      {/* Date + guests fields */}
      <div className="border border-gray-200 rounded-2xl overflow-visible divide-y divide-gray-200 mb-4">
        <div className="px-4 py-3.5">
          <DatePicker label="Check in" value={checkIn} min={todayStr} propKey={property} onMonthChange={handleMonthChange}
            onChange={v => { setCheckIn(v); if (checkOut && v >= checkOut) setCheckOut('') }} />
        </div>
        <div className="px-4 py-3.5">
          <DatePicker label="Check out" value={checkOut} min={checkIn || todayStr} propKey={property} onMonthChange={handleMonthChange}
            onChange={setCheckOut} />
        </div>
        <div className="px-4 py-3.5 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-casa-text-light">Guests</span>
          <div className="flex items-center gap-3">
            <button onClick={() => setGuests(g => Math.max(1, g - 1))} disabled={guests <= 1}
              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-casa-teal hover:text-casa-teal transition-colors disabled:opacity-30">
              <Minus size={12} />
            </button>
            <span className="text-sm font-medium text-casa-text w-4 text-center">{guests}</span>
            <button onClick={() => setGuests(g => Math.min(2, g + 1))} disabled={guests >= 2}
              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-casa-teal hover:text-casa-teal transition-colors disabled:opacity-30">
              <Plus size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* CTA */}
      {status === 'neutral' && (
        <div className="w-full bg-gray-50 text-casa-text-light text-center px-6 py-4 rounded-2xl text-sm font-medium">
          Select dates to check availability
        </div>
      )}
      {status === 'loading' && (
        <div className="w-full bg-gray-50 text-casa-text-light text-center px-6 py-4 rounded-2xl text-sm font-medium flex items-center justify-center gap-2">
          <Loader2 size={15} className="animate-spin" />
          Checking availability...
        </div>
      )}
      {status === 'available' && (
        <a href={bookingHref} target="_blank" rel="noopener noreferrer"
          className="block w-full bg-casa-teal hover:bg-casa-teal-dark text-white text-center px-6 py-4 rounded-2xl font-bold transition-colors shadow-sm">
          Book now →
        </a>
      )}
      {status === 'unavailable' && (
        <div className="text-center">
          <div className="w-full bg-gray-100 text-gray-400 text-center px-6 py-4 rounded-2xl text-sm font-medium mb-3">
            Not available for these dates
          </div>
          <a href="mailto:info.malacitano@gmail.com" className="text-xs text-casa-teal font-semibold hover:underline">
            Contact us for alternatives
          </a>
        </div>
      )}

      {/* Quick facts */}
      <div className="mt-5 pt-5 border-t border-gray-100 space-y-2.5">
        {highlights.map(item => (
          <div key={item} className="flex items-center gap-2 text-sm text-casa-text-light">
            <Check size={13} className="text-casa-teal shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
