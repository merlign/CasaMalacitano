import type { Metadata } from 'next'
import content from '../../../content/casa.json'

export const metadata: Metadata = {
  title: { absolute: content.seo.title },
  description: content.seo.description,
  alternates: {
    canonical: 'https://casamalacitano.com/casa',
  },
  openGraph: {
    title: content.seo.title,
    description: content.seo.description,
    url: 'https://casamalacitano.com/casa',
    images: [{ url: '/casa/og-image.jpg', width: 1200, height: 630, alt: 'Casa Malacitano terrace, Valle de Abdalajís' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: content.seo.title,
    description: content.seo.description,
    images: ['/casa/og-image.jpg'],
  },
}

export default function CasaLayout({ children }: { children: React.ReactNode }) {
  return children
}
