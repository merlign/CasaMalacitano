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
    images: [{ url: content.photos[0].src, width: 1200, height: 800, alt: content.photos[0].alt }],
  },
}

export default function CasaLayout({ children }: { children: React.ReactNode }) {
  return children
}
