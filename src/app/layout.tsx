import type { Metadata } from 'next'
import { Inter, Playfair_Display, Fredoka } from 'next/font/google'
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
  title: 'Casa Malacitano - Valle de Abdalajís, Andalusia',
  description: 'A fresh, breathing oasis in southern Spain. Escape the crowds and enjoy peace, authentic atmosphere and comfortable accommodations near the Caminito del Rey.',
  openGraph: {
    title: 'Casa Malacitano',
    description: 'A fresh, breathing oasis in southern Spain.',
    url: 'https://casamalacitano.com',
    siteName: 'Casa Malacitano',
    images: [{ url: '/view.jpg' }],
    locale: 'en_US',
    type: 'website',
  },
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
      </head>
      <body>{children}</body>
    </html>
  )
}
