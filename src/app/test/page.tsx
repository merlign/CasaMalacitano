'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Minus, Plus, Loader2 } from 'lucide-react'

const LP_API_BASE = 'https://lodgepilot-app-api-996176857190.europe-west1.run.app'
const LP_API_KEY = 'ffeb71e8-4ab9-4cff-8c45-09624d2d0781'

const PROPERTIES = {
  casita: {
    id: 'b4b10945-90ed-4ba9-b773-d4e155fd2e80',
    name: 'Casita Malacitano',
    type: 'Detached casita',
    image: '/casita.jpg',
    bookingUrl: 'https://guests.lodgepilot.com/reservations/create/?reservationWidgetId=667b0d0c-98c5-4874-adc0-5fda89d7f090',
    color: '#5b9bd5',
    label: 'Casita',
  },
  casa: {
    id: '037a6377-e705-460c-acca-aa79878a2ded',
    name: 'Casa Malacitano',
    type: 'Studio',
    image: '/casa.jpg',
    bookingUrl: 'https://guests.lodgepilot.com/reservations/create/?reservationWidgetId=db1c7bd3-7359-4139-a31c-61bd58509db6',
    color: '#e07b3a',
    label: 'Casa',
  },
}

// Module-level cache: per-day dots
const dayCache = new Map<string, { casa: boolean; casita: boolean }>()
const fetchingMonths = new Set<string>()

async function fetchMonthAvailability(year: number, month: number): Promise<void> {
  const key = `${year}-${month}`
  if (fetchingMonths.has(key)) return
  fetchingMonths.add(key)
  const today = new Date().toISOString().split('T')[0]
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  await Promise.all(
    Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      if (dateStr < today || dayCache.has(dateStr)) return Promise.resolve()
      const next = new Date(year, month, day + 1)
      const nextStr = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-${String(next.getDate()).padStart(2, '0')}`
      return fetch(`${LP_API_BASE}/public/v1/availability?start=${dateStr}&end=${nextStr}`, {
        headers: { 'X-API-Key': LP_API_KEY },
      })
        .then(r => r.json())
        .then(data => {
          dayCache.set(dateStr, {
            casa: (data.availableResourceIds ?? []).includes(PROPERTIES.casa.id),
            casita: (data.availableResourceIds ?? []).includes(PROPERTIES.casita.id),
          })
        })
        .catch(() => {})
    })
  )
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

function formatDisplay(v: string) {
  if (!v) return null
  const [year, month, day] = v.split('-')
  return `${parseInt(day)} ${MONTHS[parseInt(month) - 1].slice(0, 3)} ${year}`
}

function DatePicker({ label, value, onChange, min, onMonthChange }: {
  label: string
  value: string
  onChange: (v: string) => void
  min?: string
  onMonthChange: (year: number, month: number) => void
}) {
  const today = new Date().toISOString().split('T')[0]
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const initial = value ? new Date(value + 'T12:00:00') : new Date()
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() })
  const [, forceRender] = useState(0)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (!open) return
    const interval = setInterval(() => forceRender(n => n + 1), 300)
    return () => clearInterval(interval)
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

  function toStr(day: number) {
    return `${view.year}-${String(view.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)} className="w-full text-left group">
        <span className="block text-xs font-semibold uppercase tracking-wider text-casa-text-light mb-2">{label}</span>
        <span className={`text-sm font-medium ${value ? 'text-casa-text' : 'text-gray-400 group-hover:text-gray-500'}`}>
          {formatDisplay(value) ?? 'Add date'}
        </span>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-50 w-80">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-casa-text-light">
              <ChevronLeft size={15} />
            </button>
            <span className="text-sm font-semibold text-casa-text">{MONTHS[view.month]} {view.year}</span>
            <button onClick={() => navigate(1)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-casa-text-light">
              <ChevronRight size={15} />
            </button>
          </div>
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => <span key={d} className="text-center text-xs text-casa-text-light font-medium py-1">{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />
              const str = toStr(day)
              const disabled = str < (min || today)
              const selected = str === value
              const avail = dayCache.get(str)
              const neitherAvail = avail && !avail.casa && !avail.casita
              return (
                <button
                  key={i}
                  disabled={disabled}
                  onClick={() => { onChange(str); setOpen(false) }}
                  className={`w-full flex flex-col items-center justify-center pt-1.5 pb-1 rounded-xl text-xs font-medium transition-colors
                    ${selected ? 'bg-casa-teal text-white' : ''}
                    ${!selected && !disabled && !neitherAvail ? 'hover:bg-gray-50 text-casa-text' : ''}
                    ${disabled || (!selected && neitherAvail) ? 'text-gray-300 cursor-not-allowed' : ''}
                  `}
                >
                  <span>{day}</span>
                  {!disabled && !selected && (
                    <span className="flex gap-0.5 mt-0.5 h-1.5">
                      {avail?.casa && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: PROPERTIES.casa.color }} />}
                      {avail?.casita && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: PROPERTIES.casita.color }} />}
                    </span>
                  )}
                  {!disabled && !selected && !avail && <span className="h-1.5 mt-0.5" />}
                </button>
              )
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-4 text-xs text-casa-text-light">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PROPERTIES.casa.color }} />
              Casa
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PROPERTIES.casita.color }} />
              Casita
            </span>
            <span className="ml-auto text-gray-400 italic">no dot = fully booked</span>
          </div>
        </div>
      )}
    </div>
  )
}

function buildBookingUrl(prop: keyof typeof PROPERTIES, checkIn: string, checkOut: string, guests: number) {
  const base = PROPERTIES[prop].bookingUrl
  const params = new URLSearchParams({ checkIn, checkOut, guests: String(guests), language: 'nl' })
  return `${base}&${params.toString()}`
}

type AvailResult = { available: string[]; unavailable: string[]; bookingLinks: Record<string, string> }

export default function BookingTest() {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [avail, setAvail] = useState<AvailResult | null>(null)
  const [checking, setChecking] = useState(false)
  const [, forceRender] = useState(0)

  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]
  const datesReady = !!(checkIn && checkOut)

  // Pre-load current + next 2 months
  useEffect(() => {
    const y = today.getFullYear(), m = today.getMonth()
    Promise.all([
      fetchMonthAvailability(y, m),
      fetchMonthAvailability(m + 1 > 11 ? y + 1 : y, (m + 1) % 12),
      fetchMonthAvailability(m + 2 > 11 ? y + 1 : y, (m + 2) % 12),
    ]).then(() => forceRender(n => n + 1))
  }, [])

  const handleMonthChange = useCallback((year: number, month: number) => {
    fetchMonthAvailability(year, month).then(() => forceRender(n => n + 1))
  }, [])

  // Auto-check availability when both dates are set
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

  function status(prop: keyof typeof PROPERTIES) {
    if (!datesReady) return 'neutral'
    if (checking) return 'loading'
    if (!avail) return 'neutral'
    if (avail.available.includes(PROPERTIES[prop].id)) return 'available'
    if (avail.unavailable.includes(PROPERTIES[prop].id)) return 'unavailable'
    return 'neutral'
  }

  return (
    <div className="min-h-screen bg-casa-stone font-sans flex flex-col items-center pt-32 p-8 gap-6">

      {/* Booking bar */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col sm:flex-row overflow-visible">
        <div className="flex-1 px-6 py-5 border-b sm:border-b-0 sm:border-r border-gray-100">
          <DatePicker label="Check in" value={checkIn} min={todayStr} onMonthChange={handleMonthChange}
            onChange={v => { setCheckIn(v); if (checkOut && v >= checkOut) setCheckOut('') }} />
        </div>
        <div className="flex-1 px-6 py-5 border-b sm:border-b-0 sm:border-r border-gray-100">
          <DatePicker label="Check out" value={checkOut} min={checkIn || todayStr} onMonthChange={handleMonthChange}
            onChange={setCheckOut} />
        </div>
        <div className="flex-1 px-6 py-5">
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
      </div>

      {/* Property cards — always visible, update live */}
      <div className="w-full max-w-4xl grid grid-cols-2 gap-4">
        {(Object.keys(PROPERTIES) as Array<keyof typeof PROPERTIES>).map(prop => {
          const s = status(prop)
          const bookingHref = avail?.bookingLinks[PROPERTIES[prop].id] ?? buildBookingUrl(prop, checkIn, checkOut, guests)

          return (
            <div key={prop} className={`bg-white rounded-3xl border-2 overflow-hidden transition-all duration-300 shadow-sm
              ${s === 'available' ? 'border-green-400 shadow-green-100' : ''}
              ${s === 'unavailable' ? 'border-gray-100 opacity-50' : ''}
              ${s === 'neutral' || s === 'loading' ? 'border-gray-100' : ''}
            `}>
              <div className="relative h-44 overflow-hidden">
                <img
                  src={PROPERTIES[prop].image}
                  alt={PROPERTIES[prop].name}
                  className={`w-full h-full object-cover transition-all duration-500 ${s === 'unavailable' ? 'grayscale' : ''}`}
                />
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
                {s === 'available' ? (
                  <a
                    href={bookingHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 bg-casa-teal hover:bg-casa-teal-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-sm"
                  >
                    Book →
                  </a>
                ) : s === 'neutral' || s === 'loading' ? (
                  <a
                    href={`/casita`}
                    onClick={e => e.preventDefault()}
                    className="flex-shrink-0 border border-gray-200 text-casa-text-light text-sm font-medium px-5 py-2.5 rounded-full cursor-default"
                  >
                    {datesReady ? '...' : 'Select dates'}
                  </a>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
