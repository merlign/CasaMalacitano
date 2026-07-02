import type { Metadata } from 'next'
import { Inter, Playfair_Display, Fredoka } from 'next/font/google'
import CookieBanner from '@/components/CookieBanner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://casamalacitano.com'),
  title: {
    default: 'Casa Malacitano: Vacation Rental in Valle de Abdalajís, Andalusia',
    template: '%s | Casa Malacitano',
  },
  description: 'Quiet, authentic and surrounded by nature. Casa Malacitano offers two holiday accommodations with private pool in Valle de Abdalajís, Andalusia, near Caminito del Rey, El Torcal and Málaga.',
  keywords: ['vacation rental Andalusia', 'holiday home Valle de Abdalajís', 'casa rural Málaga', 'Caminito del Rey accommodation', 'private pool Spain', 'El Torcal nearby', 'holiday villa Andalusia'],
  openGraph: {
    title: 'Casa Malacitano, Valle de Abdalajís, Andalusia',
    description: 'Quiet, authentic and surrounded by nature. Two holiday accommodations with private pool near Caminito del Rey and El Torcal.',
    url: 'https://casamalacitano.com',
    siteName: 'Casa Malacitano',
    images: [{ url: '/view.jpg', width: 1200, height: 800, alt: 'Casa Malacitano, view over Valle de Abdalajís' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casa Malacitano, Valle de Abdalajís, Andalusia',
    description: 'Quiet, authentic and surrounded by nature. Two holiday accommodations with private pool near Caminito del Rey.',
    images: ['/view.jpg'],
  },
  alternates: {
    canonical: 'https://casamalacitano.com',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  '@id': 'https://casamalacitano.com/#lodging',
  name: 'Casa Malacitano',
  description: 'Quiet, authentic vacation rental estate in Valle de Abdalajís, Andalusia. Two holiday accommodations with private pool, panoramic mountain views and easy access to Caminito del Rey and El Torcal.',
  url: 'https://casamalacitano.com',
  telephone: ['+34680922373', '+31647100061'],
  email: 'info.malacitano@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Cam. de la Fuente de La Zarza',
    addressLocality: 'Valle de Abdalajís',
    addressRegion: 'Málaga',
    postalCode: '29240',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 36.94303149390095,
    longitude: -4.6681067012908875,
  },
  image: 'https://casamalacitano.com/view.jpg',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Swimming pool', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Air conditioning', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Mountain view', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Private parking', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Outdoor kitchen', value: true },
  ],
  containsPlace: [
    {
      '@type': 'VacationRental',
      '@id': 'https://casamalacitano.com/casita#property',
      name: 'Casita Malacitano',
      url: 'https://casamalacitano.com/casita',
      description: 'Boutique guesthouse with private terrace, pool access and panoramic mountain views. Ideal for couples or solo travellers seeking authentic Andalusian character.',
      image: 'https://casamalacitano.com/casita/photo-1.avif',
      occupancy: { '@type': 'QuantitativeValue', maxValue: 2 },
    },
    {
      '@type': 'VacationRental',
      '@id': 'https://casamalacitano.com/casa#property',
      name: 'Casa Malacitano',
      url: 'https://casamalacitano.com/casa',
      description: 'Spacious villa with large private terrace, shared pool and sweeping views over Valle de Abdalajís. Ideal for couples.',
      image: 'https://casamalacitano.com/casa/photo-8.avif',
      occupancy: { '@type': 'QuantitativeValue', maxValue: 2 },
    },
  ],
  checkinTime: 'T15:00',
  checkoutTime: 'T11:00',
  availableLanguage: ['English', 'Dutch', 'German', 'French'],
  touristType: ['Couples', 'Families', 'Nature lovers', 'Hikers'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${fredoka.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/logo-1.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
