'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, X, Minus, Plus, Loader2 } from 'lucide-react'

const LP_API_BASE = 'https://lodgepilot-app-api-996176857190.europe-west1.run.app'
const LP_API_KEY = 'ffeb71e8-4ab9-4cff-8c45-09624d2d0781'

const PROPERTIES = {
  casita: {
    id: 'b4b10945-90ed-4ba9-b773-d4e155fd2e80',
    name: 'Casita Malacitano',
    type: 'Detached casita',
    image: '/casita.jpg',
    bookingUrl: 'https://guests.lodgepilot.com/reservations/create/?reservationWidgetId=667b0d0c-98c5-4874-adc0-5fda89d7f090',
    color: '#5b9bd5',        // blue
    colorLight: '#dbeafe',
    label: 'Casita',
  },
  casa: {
    id: '037a6377-e705-460c-acca-aa79878a2ded',
    name: 'Casa Malacitano',
    type: 'Studio',
    image: '/casa.jpg',
    bookingUrl: 'https://guests.lodgepilot.com/reservations/create/?reservationWidgetId=db1c7bd3-7359-4139-a31c-61bd58509db6',
    color: '#e07b3a',        // warm orange
    colorLight: '#fde8d8',
    label: 'Casa',
  },
}

// Module-level cache so we don't re-fetch across re-renders
const dayCache = new Map<string, { casa: boolean; casita: boolean }>()
const fetchingMonths = new Set<string>()

async function fetchMonthAvailability(year: number, month: number): Promise<void> {
  const key = `${year}-${month}`
  if (fetchingMonths.has(key)) return
  fetchingMonths.add(key)

  const today = new Date().toISOString().split('T')[0]
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const calls = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    if (dateStr < today || dayCache.has(dateStr)) return Promise.resolve()
    const nextDay = new Date(year, month, day + 1)
    const nextStr = `${nextDay.getFullYear()}-${String(nextDay.getMonth() + 1).padStart(2, '0')}-${String(nextDay.getDate()).padStart(2, '0')}`
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

  await Promise.all(calls)
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

function formatDisplay(v: string) {
  if (!v) return null
  const [year, month, day] = v.split('-')
  return `${parseInt(day)} ${MONTHS[parseInt(month) - 1].slice(0, 3)} ${year}`
}

function DatePicker({ label, value, onChange, min, dayAvailability, onMonthChange }: {
  label: string
  value: string
  onChange: (v: string) => void
  min?: string
  dayAvailability: Map<string, { casa: boolean; casita: boolean }>
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

  // Trigger re-render when cache updates for this month
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
              const avail = dayAvailability.get(str)

              const casaAvail = avail?.casa ?? null
              const casitaAvail = avail?.casita ?? null
              const neitherAvail = avail && !casaAvail && !casitaAvail

              return (
                <button
                  key={i}
                  disabled={disabled}
                  onClick={() => { onChange(str); setOpen(false) }}
                  className={`w-full flex flex-col items-center justify-center pt-1.5 pb-1 rounded-xl text-xs font-medium transition-colors
                    ${selected ? 'bg-casa-teal text-white' : ''}
                    ${!selected && !disabled && !neitherAvail ? 'hover:bg-gray-50 text-casa-text' : ''}
                    ${disabled ? 'text-gray-300 cursor-not-allowed' : ''}
                    ${!selected && !disabled && neitherAvail ? 'text-gray-300' : ''}
                  `}
                >
                  <span>{day}</span>
                  {!disabled && !selected && (
                    <span className="flex gap-0.5 mt-0.5 h-1.5">
                      {casaAvail && (
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: PROPERTIES.casa.color }} />
                      )}
                      {casitaAvail && (
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: PROPERTIES.casita.color }} />
                      )}
                    </span>
                  )}
                  {!disabled && !selected && !avail && (
                    <span className="flex mt-0.5 h-1.5" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-4 text-xs text-casa-text-light">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PROPERTIES.casa.color }} />
              Casa
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PROPERTIES.casita.color }} />
              Casita
            </span>
            <span className="flex items-center gap-1.5 ml-auto text-gray-400 italic">
              no dot = fully booked
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function buildBookingUrl(prop: keyof typeof PROPERTIES, checkIn: string, checkOut: string, guests: number) {
  const base = PROPERTIES[prop].bookingUrl
  const params = new URLSearchParams({
    checkIn: checkIn || 'null',
    checkOut: checkOut || 'null',
    guests: String(guests),
    language: 'nl',
  })
  return `${base}&${params.toString()}`
}

async function checkAvailability(checkIn: string, checkOut: string): Promise<{ available: string[]; unavailable: string[]; bookingLinks: Record<string, string> }> {
  const url = `${LP_API_BASE}/public/v1/availability?start=${checkIn}&end=${checkOut}`
  const res = await fetch(url, { headers: { 'X-API-Key': LP_API_KEY } })
  if (!res.ok) throw new Error('API error')
  const data = await res.json()
  return {
    available: data.availableResourceIds ?? [],
    unavailable: data.unavailableResourceIds ?? [],
    bookingLinks: data.bookingLinks ?? {},
  }
}

export default function BookingTest() {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [availability, setAvailability] = useState<{ available: string[]; unavailable: string[]; bookingLinks: Record<string, string> } | null>(null)
  const [error, setError] = useState(false)
  const [, forceRender] = useState(0)

  const today = new Date().toISOString().split('T')[0]
  const todayDate = new Date()
  const datesSelected = !!(checkIn && checkOut)

  // Pre-load current month + next 2 months on mount
  useEffect(() => {
    const year = todayDate.getFullYear()
    const month = todayDate.getMonth()
    const months = [
      { year, month },
      { year: month + 1 > 11 ? year + 1 : year, month: (month + 1) % 12 },
      { year: month + 2 > 11 ? year + 1 : year, month: (month + 2) % 12 },
    ]
    Promise.all(months.map(m => fetchMonthAvailability(m.year, m.month)))
      .then(() => forceRender(n => n + 1))
  }, [])

  const handleMonthChange = useCallback((year: number, month: number) => {
    fetchMonthAvailability(year, month).then(() => forceRender(n => n + 1))
  }, [])

  async function handleCheck() {
    if (!datesSelected) {
      setAvailability(null)
      setModalOpen(true)
      return
    }
    setLoading(true)
    setError(false)
    try {
      const result = await checkAvailability(checkIn, checkOut)
      setAvailability(result)
    } catch {
      setError(true)
      setAvailability(null)
    } finally {
      setLoading(false)
      setModalOpen(true)
    }
  }

  function isAvailable(prop: keyof typeof PROPERTIES) {
    if (!availability || !datesSelected) return true
    return availability.available.includes(PROPERTIES[prop].id)
  }

  function isUnavailable(prop: keyof typeof PROPERTIES) {
    if (!availability || !datesSelected) return false
    return availability.unavailable.includes(PROPERTIES[prop].id)
  }

  return (
    <div className="min-h-screen bg-casa-stone font-sans flex items-start justify-center pt-32 p-8">

      {/* Booking bar */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col sm:flex-row overflow-visible">

        <div className="flex-1 px-6 py-5 border-b sm:border-b-0 sm:border-r border-gray-100">
          <DatePicker
            label="Check in"
            value={checkIn}
            min={today}
            dayAvailability={dayCache}
            onMonthChange={handleMonthChange}
            onChange={v => { setCheckIn(v); if (checkOut && v >= checkOut) setCheckOut(''); setAvailability(null) }}
          />
        </div>

        <div className="flex-1 px-6 py-5 border-b sm:border-b-0 sm:border-r border-gray-100">
          <DatePicker
            label="Check out"
            value={checkOut}
            min={checkIn || today}
            dayAvailability={dayCache}
            onMonthChange={handleMonthChange}
            onChange={v => { setCheckOut(v); setAvailability(null) }}
          />
        </div>

        <div className="flex-1 px-6 py-5 border-b sm:border-b-0 sm:border-r border-gray-100">
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

        <div className="px-4 py-4 flex items-center justify-center">
          <button onClick={handleCheck} disabled={loading}
            className="px-8 py-3.5 rounded-2xl text-sm font-semibold transition-all whitespace-nowrap bg-casa-teal text-white hover:bg-casa-teal-dark shadow-md disabled:opacity-60 flex items-center gap-2">
            {loading && <Loader2 size={15} className="animate-spin" />}
            {loading ? 'Checking...' : 'Check availability'}
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden" onClick={e => e.stopPropagation()}>

            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="flex-1">
                <h2 className="text-base font-semibold text-casa-text">Which accommodation?</h2>
                {datesSelected && (
                  <p className="text-xs text-casa-text-light mt-0.5">
                    {formatDisplay(checkIn)} → {formatDisplay(checkOut)} · {guests} {guests === 1 ? 'guest' : 'guests'}
                  </p>
                )}
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-casa-text-light">
                <X size={18} />
              </button>
            </div>

            {error && (
              <div className="px-6 py-4 bg-red-50 text-red-600 text-sm">
                Could not check availability. Please try again or contact us directly.
              </div>
            )}

            <div className="p-6 grid grid-cols-2 gap-4">
              {(Object.keys(PROPERTIES) as Array<keyof typeof PROPERTIES>).map(prop => {
                const unavailable = isUnavailable(prop)
                const available = isAvailable(prop)
                return unavailable ? (
                  <div key={prop} className="border-2 border-gray-100 rounded-2xl overflow-hidden opacity-45 cursor-not-allowed">
                    <div className="h-36 overflow-hidden relative">
                      <img src={PROPERTIES[prop].image} alt="" className="w-full h-full object-cover grayscale" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-white/90 text-casa-text text-xs font-semibold px-3 py-1.5 rounded-full">Not available</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-casa-text text-sm">{PROPERTIES[prop].name}</h3>
                      <p className="text-xs text-casa-text-light mt-1">{PROPERTIES[prop].type} · max. 2 guests</p>
                    </div>
                  </div>
                ) : (
                  <a
                    key={prop}
                    href={availability?.bookingLinks[PROPERTIES[prop].id] ?? buildBookingUrl(prop, checkIn, checkOut, guests)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-gray-100 hover:border-casa-teal rounded-2xl text-left transition-all group overflow-hidden block"
                  >
                    <div className="h-36 overflow-hidden relative">
                      <img src={PROPERTIES[prop].image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {datesSelected && available && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">Available</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-casa-text group-hover:text-casa-teal transition-colors text-sm">{PROPERTIES[prop].name}</h3>
                      <p className="text-xs text-casa-text-light mt-1">{PROPERTIES[prop].type} · max. 2 guests</p>
                    </div>
                  </a>
                )
              })}
            </div>

            {datesSelected && availability && availability.available.length === 0 && !error && (
              <div className="px-6 pb-6 text-center">
                <p className="text-sm text-casa-text-light">Neither accommodation is available for these dates.</p>
                <a href="mailto:info.malacitano@gmail.com" className="mt-3 inline-block text-sm font-semibold text-casa-teal hover:underline">
                  Contact us for alternatives
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
