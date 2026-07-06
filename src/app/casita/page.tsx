'use client'

import React from 'react'
import {
  MapPin, Star, Users, Bed, Wifi, Car, Waves, Snowflake,
  Wind, Utensils, Shield, Leaf, Coffee, Check,
  ChevronLeft, ChevronRight, Mail, Key, X,
} from 'lucide-react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import FadeIn from '@/components/FadeIn'
import PropertyBookingCard from '@/components/PropertyBookingCard'

// ─── Drop your photos here ────────────────────────────────────────────────────
const PHOTOS = [
  { src: '/casita/photo-1.avif',  alt: 'Casita Malacitano — exterior with pergola and yellow door' },
  { src: '/casita/photo-2.avif',  alt: 'Pool with mountain backdrop' },
  { src: '/casita/photo-3.avif',  alt: 'Pool with pink arched wall' },
  { src: '/casita/photo-4.avif',  alt: 'Terrace with pergola and village view' },
  { src: '/casita/photo-5.avif',  alt: 'Casita exterior with reed pergola' },
  { src: '/casita/photo-6.avif',  alt: 'Open-plan living room and kitchen' },
  { src: '/casita/photo-7.avif',  alt: 'Living room with yellow door and sideboard' },
  { src: '/casita/photo-8.avif',  alt: 'Dining corner with yellow door' },
  { src: '/casita/photo-9.avif',  alt: 'Kitchen with mountain view' },
  { src: '/casita/photo-10.avif', alt: 'Bedroom with double bed and air conditioning' },
  { src: '/casita/photo-11.avif', alt: 'Bathroom with walk-in shower' },
  { src: '/casita/photo-12.avif', alt: 'Sun terrace with loungers and pool' },
  { src: '/casita/photo-13.avif', alt: 'Solarium loungers under reed parasols' },
  { src: '/casita/photo-14.avif', alt: 'Pool area with loungers and cactus' },
  { src: '/casita/photo-15.avif', alt: 'Outdoor kitchen and honesty bar dining area' },
  { src: '/casita/photo-16.avif', alt: 'Living room window with village and mountain view' },
  { src: '/casita/photo-17.avif', alt: 'Private terrace with white beach chairs' },
  { src: '/casita/photo-18.avif', alt: 'Garden and honesty bar from outside' },
  { src: '/casita/photo-19.avif', alt: 'Aerial view of the property' },
  { src: '/casita/photo-20.avif', alt: 'Illuminated staircase at night under the stars' },
]
// ─────────────────────────────────────────────────────────────────────────────

const AMENITIES = [
  {
    category: 'Bedroom & laundry',
    icon: Bed,
    items: ['Towels, linen, soap & toilet paper', 'Hangers', 'Cotton bedding', 'Extra pillows & blankets', 'Blackout curtains', 'Drying rack', 'Safe', 'Wardrobe'],
  },
  {
    category: 'Kitchen',
    icon: Utensils,
    items: ['Fridge & mini-fridge', 'Freezer', 'Induction hob', 'Microwave', 'Kettle', 'Nespresso machine', 'Wine glasses', 'Dining table', 'Cooking essentials', 'Dishes & cutlery'],
  },
  {
    category: 'Bathroom',
    icon: Wind,
    items: ['Hairdryer', 'Shampoo', 'Conditioner', 'Shower gel', 'Hot water'],
  },
  {
    category: 'Heating & cooling',
    icon: Snowflake,
    items: ['Air conditioning (€5/night)', 'Heating (split system)'],
  },
  {
    category: 'Internet',
    icon: Wifi,
    items: ['WiFi', 'Dedicated workspace (private room)'],
  },
  {
    category: 'Outdoor',
    icon: Leaf,
    items: ['Private garden', 'Garden furniture', 'Outdoor dining area', 'Loungers'],
  },
  {
    category: 'Parking & pool',
    icon: Car,
    items: ['Free parking on site, 2 spots', 'Shared outdoor pool (Apr–Oct, 10:00–20:00)'],
  },
  {
    category: 'Safety',
    icon: Shield,
    items: ['Smoke detector', 'Fire extinguisher', 'First aid kit'],
  },
  {
    category: 'Access',
    icon: Key,
    items: ['Private entrance', 'Ground floor, no stairs'],
  },
]

const HIGHLIGHTS = [
  { icon: Check, text: 'Fresh towels & luxury linen', sub: 'Fully provided, no need to pack' },
  { icon: Coffee, text: 'Nespresso coffee machine', sub: 'With starter capsules' },
  { icon: Check, text: 'Shampoo, conditioner & shower gel', sub: 'Quality toiletries provided' },
  { icon: Utensils, text: 'Full kitchen essentials', sub: 'Oil, salt, pepper, pans, dishes' },
  { icon: Waves, text: 'Pool access (Apr–Oct)', sub: 'Open daily 10:00–20:00' },
  { icon: Snowflake, text: 'Air conditioning available', sub: '€5/night. Request on arrival.' },
]

export default function CasitaPage() {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null)
  const [showBar, setShowBar] = React.useState(false)
  const [showAllAmenities, setShowAllAmenities] = React.useState(false)
  const touchStartX = React.useRef<number | null>(null)

  React.useEffect(() => {
    const handleScroll = () => setShowBar(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  React.useEffect(() => {
    if (lightboxIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setLightboxIndex(p => p !== null ? (p - 1 + PHOTOS.length) % PHOTOS.length : 0)
      if (e.key === 'ArrowRight') setLightboxIndex(p => p !== null ? (p + 1) % PHOTOS.length : 0)
      if (e.key === 'Escape') setLightboxIndex(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex])

  const openLightbox = (i: number) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLightboxIndex((prev) => prev !== null ? (prev - 1 + PHOTOS.length) % PHOTOS.length : 0)
  }
  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLightboxIndex((prev) => prev !== null ? (prev + 1) % PHOTOS.length : 0)
  }
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) setLightboxIndex(p => p !== null ? (p + 1) % PHOTOS.length : 0)
      else setLightboxIndex(p => p !== null ? (p - 1 + PHOTOS.length) % PHOTOS.length : 0)
    }
    touchStartX.current = null
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    '@id': 'https://casamalacitano.com/casita#property',
    name: 'Casita Malacitano',
    description: 'Boutique guesthouse with private terrace, pool access and panoramic mountain views in Valle de Abdalajís, Andalusia. Ideal for couples or solo travellers.',
    url: 'https://casamalacitano.com/casita',
    image: 'https://casamalacitano.com/casita/photo-1.avif',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cam. de la Fuente de La Zarza',
      addressLocality: 'Valle de Abdalajís',
      addressRegion: 'Málaga',
      postalCode: '29240',
      addressCountry: 'ES',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 36.93785025045244, longitude: -4.677895900349077 },
    occupancy: { '@type': 'QuantitativeValue', maxValue: 2 },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Swimming pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Private terrace', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Mountain view', value: true },
    ],
    containedInPlace: { '@id': 'https://casamalacitano.com/#lodging' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="min-h-screen bg-casa-stone font-sans text-casa-text">
      <SiteHeader />

      <main className="pt-24 md:pt-28">

        {/* Hero gallery, first 5 photos, clickable */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-2 rounded-3xl overflow-hidden h-[260px] md:h-[480px]">
            <div className="col-span-2 row-span-2 relative bg-casa-stone-dark cursor-zoom-in" onClick={() => openLightbox(0)}>
              <img src={PHOTOS[0].src} alt={PHOTOS[0].alt} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            {PHOTOS.slice(1, 5).map((photo, i) => (
              <div key={i} className={`relative bg-casa-stone-dark cursor-zoom-in ${i >= 2 ? 'hidden md:block' : ''}`} onClick={() => openLightbox(i + 1)}>
                <img src={photo.src} alt={photo.alt} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Title block */}
        <FadeIn className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-12">

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <span className="inline-block bg-casa-teal/10 text-casa-teal text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">Detached casita</span>
              <h1 className="text-4xl md:text-5xl font-serif text-casa-text mb-3 leading-tight">Casita Malacitano</h1>
              <div className="flex items-center gap-2 text-casa-text-light mb-4">
                <MapPin size={16} className="text-casa-teal shrink-0" />
                <span>Valle de Abdalajís, Málaga, Spain</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-casa-text-light">
                <span className="flex items-center gap-1.5"><Users size={15} /> 2 guests</span>
                <span className="text-gray-300">·</span>
                <span className="flex items-center gap-1.5"><Bed size={15} /> 1 bedroom</span>
                <span className="text-gray-300">·</span>
                <span>1 double bed</span>
                <span className="text-gray-300">·</span>
                <span>1 bathroom (walk-in shower)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 bg-white border border-gray-100 rounded-2xl px-4 py-3">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-casa-text">5.0</span>
              <span className="text-casa-text-light text-sm">· 18 reviews</span>
            </div>
          </div>
        </FadeIn>

        {/* Two-column layout: content + sticky booking card */}
        {/* Sticky card stops naturally when this grid ends (after amenities) */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-14 md:mt-20 grid md:grid-cols-[1fr_360px] gap-12 md:gap-16">
          <div className="space-y-14 min-w-0">

            <FadeIn><section>
              <h2 className="text-2xl font-serif mb-5">About this space</h2>
              <div className="space-y-4 text-casa-text-light leading-relaxed">
                <p>A completely, stylishly furnished casita with a magnificent view of the friendly village of Valle de Abdalajís. Centrally located between the historic cities of Málaga, Ronda, Granada, Seville and Córdoba.</p>
                <p>The casita is part of Casa Malacitano and has a large living room with open kitchen and French doors that open onto the terrace. There is a spacious bathroom with walk-in shower. The bedroom with double bed is fully equipped with air conditioning (available at €5/night).</p>
                <p>From April to October you can use the swimming pool, shared with any other guests. Upstairs you will find our outdoor kitchen, pool and solarium, in summer months you are welcome to join us for dinner or a drink from the honesty bar.</p>
                <p>The casita can only be reached by car. The village centre is a 5-minute walk away.</p>
                <p className="text-sm bg-casa-stone-dark rounded-2xl p-4">Pets are welcome on request. Please get in touch before booking.</p>
              </div>
            </section></FadeIn>

            <FadeIn><section className="pt-14 border-t border-gray-100">
              <h2 className="text-2xl font-serif mb-2">Pack light. Everything is here.</h2>
              <p className="text-casa-text-light mb-6">This is a complete stay. You don&apos;t need to bring towels, linen, or toiletries.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HIGHLIGHTS.map((item) => (
                  <div key={item.text} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100">
                    <div className="p-2 bg-casa-teal/10 text-casa-teal rounded-xl shrink-0 mt-0.5">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-casa-text text-sm">{item.text}</p>
                      <p className="text-xs text-casa-text-light mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section></FadeIn>

            <FadeIn><section className="pt-14 border-t border-gray-100">
              <h2 className="text-2xl font-serif mb-8">What this place offers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                {(showAllAmenities ? AMENITIES : AMENITIES.slice(0, 3)).map((group) => (
                  <div key={group.category}>
                    <div className="flex items-center gap-2 mb-3">
                      <group.icon size={18} className="text-casa-teal" />
                      <h3 className="font-semibold text-casa-text text-base">{group.category}</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-base text-casa-text-light">
                          <Check size={15} className="text-casa-teal shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowAllAmenities((v) => !v)}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-casa-text text-casa-text text-sm font-semibold hover:bg-casa-text hover:text-white transition-all"
              >
                {showAllAmenities ? '↑ Show less' : 'Show all amenities'}
              </button>
            </section></FadeIn>

          </div>

          {/* Sticky booking card */}
          <div className="hidden md:block">
            <div className="sticky top-32">
              <PropertyBookingCard
                property="casita"
                highlights={['2 guests', '1 bedroom (double bed)', '1 bathroom (walk-in shower)', 'Private entrance & garden', 'Free parking (2 spots)', 'Shared pool (Apr–Oct)']}
              />
            </div>
          </div>
        </div>

        {/* Mobile booking card (visible on mobile only) */}
        <div id="book" className="md:hidden max-w-7xl mx-auto px-4 mt-14 scroll-mt-24">
          <PropertyBookingCard
            property="casita"
            highlights={['2 guests', '1 bedroom (double bed)', '1 bathroom (walk-in shower)', 'Private entrance & garden', 'Free parking (2 spots)', 'Shared pool (Apr–Oct)']}
          />
        </div>

        {/* Photo gallery, full width, click to open lightbox */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-14 md:mt-20">
          <h2 className="text-2xl font-serif mb-6">All photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PHOTOS.map((photo, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-casa-stone-dark cursor-zoom-in focus:outline-none"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <section className="mt-16 md:mt-24 py-16 md:py-24 px-4 bg-casa-stone-dark">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <FadeIn from="left">
              <div className="p-4 bg-casa-teal/10 text-casa-teal rounded-2xl w-fit mb-6"><Mail size={28} /></div>
              <h2 className="text-2xl md:text-3xl font-serif text-casa-text mb-3">Questions? Just ask.</h2>
              <p className="text-casa-text-light mb-8 leading-relaxed">Curious about availability, arrival or the area? We respond quickly and personally.</p>
              <a href="mailto:info.malacitano@gmail.com" className="inline-flex items-center gap-2 bg-casa-teal hover:bg-casa-teal/90 text-white px-8 py-4 rounded-full font-medium transition-all shadow-md hover:-translate-y-0.5">
                <Mail size={18} />
                info.malacitano@gmail.com
              </a>
            </FadeIn>
            <FadeIn from="right" delay={0.1} className="rounded-3xl overflow-hidden shadow-lg h-72 md:h-96">
              <iframe
                src="https://maps.google.com/maps?q=36.93785025045244,-4.677895900349077&t=k&z=15&ie=UTF8&iwloc=&output=embed"
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
        </section>

      </main>

      {/* Floating book bar, mobile only, slides up after scrolling */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${showBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.10)] px-4 py-3">
          <a
            href="#book"
            onClick={(e) => {
              // Plain hash navigation gets reverted by the Next.js router's
              // scroll restoration, so scroll to the card directly
              e.preventDefault()
              document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="block w-full bg-casa-teal-dark text-white text-center px-6 py-4 rounded-2xl font-bold text-base"
          >
            Book now, no platform fees
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={closeLightbox} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <button onClick={prevPhoto} className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10">
            <ChevronLeft size={28} />
          </button>
          <div className="max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={PHOTOS[lightboxIndex].src}
              alt={PHOTOS[lightboxIndex].alt}
              className="max-h-[82vh] w-auto max-w-full object-contain rounded-2xl"
            />
            <p className="text-white/50 text-sm mt-4">{lightboxIndex + 1} / {PHOTOS.length}, {PHOTOS[lightboxIndex].alt}</p>
          </div>
          <button onClick={nextPhoto} className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10">
            <ChevronRight size={28} />
          </button>
          <button onClick={closeLightbox} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors">
            <X size={22} />
          </button>
        </div>
      )}

      <SiteFooter />
    </div>
    </>
  )
}
