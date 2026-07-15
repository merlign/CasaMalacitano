import { Mail, MapPin, Phone } from 'lucide-react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import FadeIn from '@/components/FadeIn'
import settings from '../../../content/settings.json'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Jans and Minouche. Questions about availability, arrival or the area? We respond quickly.',
  alternates: {
    canonical: 'https://casamalacitano.com/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-casa-stone font-sans text-casa-text">
      <SiteHeader />

      <main className="pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

            {/* Left: contact info */}
            <FadeIn from="left">
              <p className="text-casa-teal font-bold tracking-widest uppercase text-xs mb-3">Contact</p>
              <h1 className="text-4xl md:text-5xl font-serif text-casa-text mb-6 leading-tight">Get in touch</h1>
              <p className="text-casa-text-light text-lg leading-relaxed mb-10">
                Questions about availability, the area or your arrival? Jans and Minouche are happy to help. They respond personally and quickly, in English, Dutch, German or French.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-casa-teal/10 text-casa-teal rounded-xl shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-casa-text mb-0.5">Email</p>
                    <a href={`mailto:${settings.email}`} className="text-casa-text-light hover:text-casa-teal transition-colors">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-casa-teal/10 text-casa-teal rounded-xl shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-casa-text mb-0.5">Phone / WhatsApp</p>
                    <a href={`tel:${settings.phonePrimary.replace(/\s/g, '')}`} className="text-casa-text-light hover:text-casa-teal transition-colors block">{settings.phonePrimary}</a>
                    <a href={`tel:${settings.phoneSecondary.replace(/\s/g, '')}`} className="text-casa-text-light hover:text-casa-teal transition-colors block">{settings.phoneSecondary}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-casa-teal/10 text-casa-teal rounded-xl shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-casa-text mb-0.5">Address</p>
                    <p className="text-casa-text-light">{settings.address.street}</p>
                    <p className="text-casa-text-light">{settings.address.postalCode} {settings.address.city}</p>
                    <p className="text-casa-text-light">{settings.address.region}, {settings.address.country}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <a
                  href={`mailto:${settings.email}`}
                  className="inline-flex items-center gap-2 bg-casa-teal hover:bg-casa-teal/90 text-white px-8 py-4 rounded-full font-medium transition-all shadow-md hover:-translate-y-0.5"
                >
                  <Mail size={18} />
                  Send us a message
                </a>
              </div>
            </FadeIn>

            {/* Right: map */}
            <FadeIn from="right" delay={0.1} className="rounded-3xl overflow-hidden shadow-lg h-[420px] md:h-[560px]">
              <iframe
                src={`https://maps.google.com/maps?q=${settings.coordinates.latitude},${settings.coordinates.longitude}&t=k&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                title="Casa Malacitano location"
              />
            </FadeIn>

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
