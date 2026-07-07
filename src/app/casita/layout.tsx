import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Casita Malacitano: Detached Casita with Pool in Valle de Abdalajís' },
  description:
    'A stylishly furnished detached casita with private veranda, pool access and panoramic views over Valle de Abdalajís, Andalusia. Book direct with your hosts, no platform fees.',
  alternates: {
    canonical: 'https://casamalacitano.com/casita',
  },
  openGraph: {
    title: 'Casita Malacitano: Detached Casita with Pool',
    description:
      'Detached casita with private veranda, pool access and panoramic views in Valle de Abdalajís, Andalusia.',
    url: 'https://casamalacitano.com/casita',
    images: [{ url: '/casita.jpg', width: 1200, height: 800, alt: 'Casita Malacitano exterior with pergola' }],
  },
}

export default function CasitaLayout({ children }: { children: React.ReactNode }) {
  return children
}
