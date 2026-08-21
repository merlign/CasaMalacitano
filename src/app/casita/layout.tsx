import type { Metadata } from 'next'
import content from '../../../content/casita.json'

export const metadata: Metadata = {
  title: { absolute: content.seo.title },
  description: content.seo.description,
  alternates: {
    canonical: 'https://casamalacitano.com/casita',
  },
  openGraph: {
    title: content.seo.title,
    description: content.seo.description,
    url: 'https://casamalacitano.com/casita',
    images: [{ url: '/casita/og-image.jpg', width: 1200, height: 630, alt: 'Casita Malacitano terrace, Valle de Abdalajís' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: content.seo.title,
    description: content.seo.description,
    images: ['/casita/og-image.jpg'],
  },
}

export default function CasitaLayout({ children }: { children: React.ReactNode }) {
  return children
}
