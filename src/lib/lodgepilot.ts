export const LP_API_BASE = 'https://lodgepilot-app-api-996176857190.europe-west1.run.app'
export const LP_API_KEY = 'ffeb71e8-4ab9-4cff-8c45-09624d2d0781'

export const PROPERTIES = {
  casita: {
    id: 'b4b10945-90ed-4ba9-b773-d4e155fd2e80',
    name: 'Casita Malacitano',
    type: 'Detached casita',
    image: '/casita.jpg',
    bookingUrl: 'https://guests.lodgepilot.com/reservations/create/?reservationWidgetId=667b0d0c-98c5-4874-adc0-5fda89d7f090',
    color: '#5b9bd5',
  },
  casa: {
    id: '037a6377-e705-460c-acca-aa79878a2ded',
    name: 'Casa Malacitano',
    type: 'Studio',
    image: '/casa.jpg',
    bookingUrl: 'https://guests.lodgepilot.com/reservations/create/?reservationWidgetId=db1c7bd3-7359-4139-a31c-61bd58509db6',
    color: '#e07b3a',
  },
} as const

export type PropertyKey = keyof typeof PROPERTIES

// Shared module-level cache so all components share one fetch pool
export const dayCache = new Map<string, { casa: boolean; casita: boolean }>()
const fetchingMonths = new Set<string>()

export async function fetchMonthAvailability(year: number, month: number): Promise<void> {
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

export function buildBookingUrl(prop: PropertyKey, checkIn: string, checkOut: string, guests: number) {
  const base = PROPERTIES[prop].bookingUrl
  const params = new URLSearchParams({ checkIn, checkOut, guests: String(guests), language: 'nl' })
  return `${base}&${params.toString()}`
}

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

export function formatDisplay(v: string) {
  if (!v) return null
  const [year, month, day] = v.split('-')
  return `${parseInt(day)} ${MONTHS[parseInt(month) - 1].slice(0, 3)} ${year}`
}
