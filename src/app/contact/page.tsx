import { Mail, MapPin, Phone } from 'lucide-react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata = {
  title: 'Contact — Casa Malacitano',
  description: 'Get in touch with Jans and Minouche. Questions about availability, arrival or the area — we respond quickly.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-casa-stone font-sans text-casa-text">
      <SiteHeader />

      <main className="pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

            {/* Left: contact info */}
            <div>
              <p className="text-casa-teal font-bold tracking-widest uppercase text-xs mb-3">Contact</p>
              <h1 className="text-4xl md:text-5xl font-serif text-casa-text mb-6 leading-tight">Get in touch</h1>
              <p className="text-casa-text-light text-lg leading-relaxed mb-10">
                [Placeholder: a short, warm sentence about how Jans and Minouche love to hear from guests — questions about availability, the area, arrival, or anything else.]
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-casa-teal/10 text-casa-teal rounded-xl shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-casa-text mb-0.5">Email</p>
                    <a href="mailto:info.malacitano@gmail.com" className="text-casa-text-light hover:text-casa-teal transition-colors">
                      info.malacitano@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-casa-teal/10 text-casa-teal rounded-xl shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-casa-text mb-0.5">Phone / WhatsApp</p>
                    <a href="tel:+34680922373" className="text-casa-text-light hover:text-casa-teal transition-colors block">+34 680 922 373</a>
                    <a href="tel:+31647100061" className="text-casa-text-light hover:text-casa-teal transition-colors block">+31 647 100 061</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-casa-teal/10 text-casa-teal rounded-xl shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-casa-text mb-0.5">Address</p>
                    <p className="text-casa-text-light">Cam. de la Fuente de La Zarza</p>
                    <p className="text-casa-text-light">29240 Valle de Abdalajís</p>
                    <p className="text-casa-text-light">Málaga, Spain</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <a
                  href="mailto:info.malacitano@gmail.com"
                  className="inline-flex items-center gap-2 bg-casa-teal hover:bg-casa-teal/90 text-white px-8 py-4 rounded-full font-medium transition-all shadow-md hover:-translate-y-0.5"
                >
                  <Mail size={18} />
                  Send us a message
                </a>
              </div>
            </div>

            {/* Right: map */}
            <div className="rounded-3xl overflow-hidden shadow-lg h-[420px] md:h-[560px]">
              <iframe
                src="https://maps.google.com/maps?q=Cam.+de+la+Fuente+de+La+Zarza,+29240+Valle+de+Abdalajis,+Malaga,+Spain&output=embed&z=16"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Casa Malacitano location"
              />
            </div>

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
