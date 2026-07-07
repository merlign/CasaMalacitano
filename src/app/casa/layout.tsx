import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Casa Malacitano: Studio with Private Entrance in Valle de Abdalajís' },
  description:
    'A beautifully renovated studio apartment with private entrance, terrace, pool access and mountain views in Valle de Abdalajís, Andalusia. Book direct with your hosts, no platform fees.',
  alternates: {
    canonical: 'https://casamalacitano.com/casa',
  },
  openGraph: {
    title: 'Casa Malacitano: Studio with Private Entrance',
    description:
      'Renovated studio with private entrance, terrace and pool access in Valle de Abdalajís, Andalusia.',
    url: 'https://casamalacitano.com/casa',
    images: [{ url: '/casa.jpg', width: 1200, height: 800, alt: 'Casa Malacitano studio exterior' }],
  },
}

export default function CasaLayout({ children }: { children: React.ReactNode }) {
  return children
}
