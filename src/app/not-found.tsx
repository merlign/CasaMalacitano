import Link from 'next/link'
import { Home, MapPin, Compass, Mail } from 'lucide-react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata = {
  title: 'Page not found',
  description: 'The page you are looking for does not exist. Find your way back to Casa Malacitano.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-casa-stone font-sans text-casa-text">
      <SiteHeader />

      <main className="pt-24 md:pt-28">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-20 md:py-28 text-center">
          <p className="text-casa-teal font-bold tracking-widest uppercase text-xs mb-4">404</p>
          <h1 className="text-4xl md:text-5xl font-serif text-casa-text mb-6 leading-tight">
            This page has wandered off
          </h1>
          <p className="text-casa-text-light text-lg leading-relaxed mb-12 max-w-xl mx-auto">
            The page you are looking for does not exist or has moved. Here are a few places that do.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-12">
            <Link href="/" className="group flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="p-2.5 rounded-xl bg-casa-teal/10 text-casa-teal shrink-0"><Home size={20} /></div>
              <div>
                <p className="font-semibold text-casa-text group-hover:text-casa-teal transition-colors">Home</p>
                <p className="text-sm text-casa-text-light mt-0.5">Back to the homepage</p>
              </div>
            </Link>
            <Link href="/#accommodations" className="group flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="p-2.5 rounded-xl bg-casa-teal/10 text-casa-teal shrink-0"><MapPin size={20} /></div>
              <div>
                <p className="font-semibold text-casa-text group-hover:text-casa-teal transition-colors">Accommodations</p>
                <p className="text-sm text-casa-text-light mt-0.5">Casa and Casita Malacitano</p>
              </div>
            </Link>
            <Link href="/activities" className="group flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="p-2.5 rounded-xl bg-casa-teal/10 text-casa-teal shrink-0"><Compass size={20} /></div>
              <div>
                <p className="font-semibold text-casa-text group-hover:text-casa-teal transition-colors">Things to do</p>
                <p className="text-sm text-casa-text-light mt-0.5">Caminito del Rey, El Torcal and more</p>
              </div>
            </Link>
            <Link href="/contact" className="group flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="p-2.5 rounded-xl bg-casa-teal/10 text-casa-teal shrink-0"><Mail size={20} /></div>
              <div>
                <p className="font-semibold text-casa-text group-hover:text-casa-teal transition-colors">Contact</p>
                <p className="text-sm text-casa-text-light mt-0.5">Get in touch with Jans and Minouche</p>
              </div>
            </Link>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-casa-teal hover:bg-casa-teal/90 text-white px-8 py-4 rounded-full font-medium transition-all shadow-md hover:-translate-y-0.5"
          >
            Take me home
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
