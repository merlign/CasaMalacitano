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
    images: [{ url: content.photos[0].src, width: 1200, height: 800, alt: content.photos[0].alt }],
  },
}

export default function CasitaLayout({ children }: { children: React.ReactNode }) {
  return children
}
