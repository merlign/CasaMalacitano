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

// ICS calendar export IDs: one file per property lists all booked/closed
// periods, so two requests fill the entire calendar at once
const ICS_IDS: Record<PropertyKey, string> = {
  casita: 'bb8c02d0-143d-48e6-8244-34e254e8ffe8',
  casa: '12caaddd-d463-4cdf-b89e-8eeb4930bb39',
}

// How far ahead the calendar dots are computed
const HORIZON_DAYS = 550

// Shared module-level cache so all components share one fetch pool
export const dayCache = new Map<string, { casa: boolean; casita: boolean }>()
let icsLoading: Promise<void> | null = null

function toDateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// Collect every booked night from an ICS export (DTEND is exclusive)
function parseBookedNights(ics: string, booked: Set<string>) {
  for (const event of ics.split('BEGIN:VEVENT').slice(1)) {
    const start = event.match(/DTSTART;VALUE=DATE:(\d{4})(\d{2})(\d{2})/)
    const end = event.match(/DTEND;VALUE=DATE:(\d{4})(\d{2})(\d{2})/)
    if (!start || !end) continue
    const cur = new Date(+start[1], +start[2] - 1, +start[3])
    const until = new Date(+end[1], +end[2] - 1, +end[3])
    while (cur < until) {
      booked.add(toDateStr(cur))
      cur.setDate(cur.getDate() + 1)
    }
  }
}

async function loadCalendars(): Promise<void> {
  const bookedByProp: Record<PropertyKey, Set<string>> = { casita: new Set(), casa: new Set() }
  await Promise.all(
    (Object.keys(ICS_IDS) as PropertyKey[]).map(prop =>
      fetch(`${LP_API_BASE}/ics/export/${ICS_IDS[prop]}/`)
        .then(r => r.text())
        .then(ics => parseBookedNights(ics, bookedByProp[prop]))
        .catch(() => {})
    )
  )
  const cur = new Date()
  for (let i = 0; i < HORIZON_DAYS; i++) {
    const str = toDateStr(cur)
    dayCache.set(str, {
      casa: !bookedByProp.casa.has(str),
      casita: !bookedByProp.casita.has(str),
    })
    cur.setDate(cur.getDate() + 1)
  }
}

// Signature kept for the calendar components; the two ICS fetches fill the
// whole horizon on the first call, later calls resolve instantly
export async function fetchMonthAvailability(_year: number, _month: number): Promise<void> {
  if (!icsLoading) icsLoading = loadCalendars()
  await icsLoading
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
