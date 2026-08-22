import type { Metadata } from 'next'
import { Inter, Playfair_Display, Fredoka } from 'next/font/google'
import CookieBanner from '@/components/CookieBanner'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import settings from '../../content/settings.json'
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
    default: 'Casa Malacitano: Valle de Abdalajís Rental near Caminito del Rey',
    template: '%s | Casa Malacitano',
  },
  description: 'Quiet and authentic. Two holiday homes with private pool near Caminito del Rey and El Torcal, Andalusia. Book direct, no Airbnb or Booking.com fees.',
  keywords: ['vacation rental Andalusia', 'holiday home Valle de Abdalajís', 'casa rural Valle de Abdalajís', 'casa rural Málaga', 'accommodation near Caminito del Rey', 'guesthouse near El Chorro', 'private pool Spain', 'El Torcal nearby', 'boutique guesthouse Andalusia', 'book direct no platform fees', 'vakantiehuis Andalusië zwembad', 'vakantiewoning Valle de Abdalajís'],
  openGraph: {
    title: 'Casa Malacitano, Valle de Abdalajís, Andalusia',
    description: 'Quiet and authentic. Two holiday homes with private pool near Caminito del Rey, Andalusia. Book direct, no Airbnb fees.',
    url: 'https://casamalacitano.com',
    siteName: 'Casa Malacitano',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Casa Malacitano, terrace view over Valle de Abdalajís' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casa Malacitano, Valle de Abdalajís, Andalusia',
    description: 'Quiet and authentic. Two holiday homes with private pool near Caminito del Rey, Andalusia. Book direct, no Airbnb fees.',
    images: ['/og-image.jpg'],
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
  telephone: [settings.phonePrimary.replace(/\s/g, ''), settings.phoneSecondary.replace(/\s/g, '')],
  email: settings.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: settings.address.street,
    addressLocality: settings.address.city,
    addressRegion: settings.address.region,
    postalCode: settings.address.postalCode,
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: settings.coordinates.latitude,
    longitude: settings.coordinates.longitude,
  },
  hasMap: `https://maps.google.com/maps?q=${settings.coordinates.latitude},${settings.coordinates.longitude}`,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <CookieBanner />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
