'use client'

import React from 'react'
import {
  MapPin, Star, Users, Bed, Wifi, Car, Waves, Snowflake,
  Wind, Utensils, Shield, Mountain, Leaf, Coffee, Check,
  ChevronLeft, ChevronRight, Mail, Key, X,
} from 'lucide-react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

// ─── Drop your photos here ────────────────────────────────────────────────────
const PHOTOS = [
  { src: '/casa/photo-1.jpg', alt: 'Casa exterior with private terrace' },
  { src: '/casa/photo-2.jpg', alt: 'Bedroom with valley view' },
  { src: '/casa/photo-3.jpg', alt: 'Kitchenette and dining area' },
  { src: '/casa/photo-4.jpg', alt: 'Bathroom' },
  { src: '/casa/photo-5.jpg', alt: 'Terrace with garden furniture' },
  { src: '/casa/photo-6.jpg', alt: 'Terrace at sunset' },
  { src: '/casa/photo-7.jpg', alt: 'Kitchen detail' },
  { src: '/casa/photo-8.jpg', alt: 'Pool area' },
  { src: '/casa/photo-9.jpg', alt: 'Garden view' },
  { src: '/casa/photo-10.jpg', alt: 'Outdoor dining area' },
  { src: '/casa/photo-11.jpg', alt: 'Solarium' },
  { src: '/casa/photo-12.jpg', alt: 'Village view from terrace' },
  { src: '/casa/photo-13.jpg', alt: 'Living area' },
  { src: '/casa/photo-14.jpg', alt: 'Bedroom detail' },
  { src: '/casa/photo-15.jpg', alt: 'Mountain view' },
]
// ─────────────────────────────────────────────────────────────────────────────

const AMENITIES = [
  {
    category: 'Bedroom & laundry',
    icon: Bed,
    items: ['Towels, linen, soap & toilet paper', 'Hangers', 'Cotton bedding', 'Extra pillows & blankets', 'Drying rack', 'Safe', 'Wardrobe'],
  },
  {
    category: 'Kitchen',
    icon: Utensils,
    items: ['Fridge & mini-fridge', 'Bosch induction hob', 'Microwave', 'Kettle', 'Nespresso machine', 'Toaster', 'Wine glasses', 'Cooking essentials', 'Dishes & cutlery', 'Coffee included'],
  },
  {
    category: 'Bathroom',
    icon: Wind,
    items: ['Hairdryer', 'Shampoo', 'Conditioner', 'Shower gel', 'Hot water'],
  },
  {
    category: 'Heating & cooling',
    icon: Snowflake,
    items: ['Air conditioning (split system, included)', 'Heating (split system)'],
  },
  {
    category: 'Internet',
    icon: Wifi,
    items: ['WiFi'],
  },
  {
    category: 'Outdoor',
    icon: Leaf,
    items: ['Private terrace', 'Garden furniture', 'Outdoor dining area', 'Loungers'],
  },
  {
    category: 'Parking & pool',
    icon: Car,
    items: ['Free parking on site, 1 spot', 'Shared outdoor pool (Apr–Oct, 10:00–19:00)'],
  },
  {
    category: 'Safety',
    icon: Shield,
    items: ['Smoke detector', 'Fire extinguisher', 'First aid kit'],
  },
  {
    category: 'Access',
    icon: Key,
    items: ['Private entrance (street level)', 'Self check-in (key box)', 'Ground floor, no stairs'],
  },
  {
    category: 'Views',
    icon: Mountain,
    items: ['Garden view', 'Mountain view', 'Valley view'],
  },
]

const HIGHLIGHTS = [
  { icon: Check, text: 'Fresh towels & luxury linen', sub: 'Fully provided, no need to pack' },
  { icon: Coffee, text: 'Nespresso + coffee included', sub: 'Ready from the moment you arrive' },
  { icon: Check, text: 'Shampoo, conditioner & shower gel', sub: 'Quality toiletries provided' },
  { icon: Utensils, text: 'Full kitchen essentials', sub: 'Oil, salt, pepper, pans, dishes' },
  { icon: Waves, text: 'Pool access (Apr–Oct)', sub: 'Open daily 10:00–19:00' },
  { icon: Snowflake, text: 'Air conditioning included', sub: 'Split system, no extra charge' },
]

export default function CasaPage() {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null)
  const [showBar, setShowBar] = React.useState(false)
  const [showAllAmenities, setShowAllAmenities] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setShowBar(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  return (
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
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-12">

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <span className="inline-block bg-casa-pink/10 text-casa-pink text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">Studio with private entrance</span>
              <h1 className="text-4xl md:text-5xl font-serif text-casa-text mb-3 leading-tight">Casa Malacitano</h1>
              <div className="flex items-center gap-2 text-casa-text-light mb-4">
                <MapPin size={16} className="text-casa-teal shrink-0" />
                <span>Valle de Abdalajís, Málaga, Spain</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-casa-text-light">
                <span className="flex items-center gap-1.5"><Users size={15} /> 2 guests</span>
                <span className="text-gray-300">·</span>
                <span className="flex items-center gap-1.5"><Bed size={15} /> 1 bedroom</span>
                <span className="text-gray-300">·</span>
                <span>1 bed</span>
                <span className="text-gray-300">·</span>
                <span>1 bathroom</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 bg-white border border-gray-100 rounded-2xl px-4 py-3">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-casa-text">4.97</span>
              <span className="text-casa-text-light text-sm">· 74 reviews</span>
            </div>
          </div>
        </div>

        {/* Two-column layout: content + sticky booking card */}
        {/* Sticky card stops naturally when this grid ends (after amenities) */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-14 md:mt-20 grid md:grid-cols-[1fr_360px] gap-12 md:gap-16">
          <div className="space-y-14 min-w-0">

            <section>
              <h2 className="text-2xl font-serif mb-5">About this space</h2>
              <div className="space-y-4 text-casa-text-light leading-relaxed">
                <p>A beautifully renovated studio apartment with its own front door and terrace, overlooking the friendly village of Valle de Abdalajís. Centrally located between Málaga, Ronda, Granada, Seville and Córdoba.</p>
                <p>The apartment has a cozy veranda where you can enjoy the setting sun. There is a comfortable bedroom, a kitchenette and a modern bathroom. Air conditioning is included.</p>
                <p>You have your own space and entrance: your own bathroom, kitchen and bedroom. The apartment is connected to the main house. You have access to the shared pool from April to October.</p>
                <p>The Torcal mountains and the Caminito del Rey walk are absolutely worth the visit. The natural scenery around the El Chorro lakes is spectacular.</p>
                <p className="text-sm bg-casa-stone-dark rounded-2xl p-4">Pets are welcome on request. Please get in touch before booking.</p>
              </div>
            </section>

            <section className="pt-14 border-t border-gray-100">
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
            </section>

            <section className="pt-14 border-t border-gray-100">
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
            </section>

          </div>

          {/* Sticky booking card, sticks until this grid ends */}
          <div className="hidden md:block">
            <div className="sticky top-32">
              <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-gray-100 p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-casa-teal mb-1">Book direct</p>
                <p className="text-casa-text-light text-sm mb-6 leading-relaxed">No Airbnb or Booking.com service fees. Direct contact with the hosts.</p>
                <a href="#book" className="block w-full bg-casa-teal-dark hover:opacity-90 text-white text-center px-6 py-4 rounded-2xl font-bold transition-opacity mb-3">
                  Book now
                </a>
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-2.5">
                  {['2 guests', '1 bedroom (1 bed)', '1 bathroom', 'Private terrace with views', 'Self check-in (key box)', 'Free parking (1 spot)', 'Shared pool (Apr–Oct)'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-casa-text-light">
                      <Check size={13} className="text-casa-teal shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Book direct banner, full width, sticky card stops here */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-14 md:mt-20">
          <div className="bg-casa-teal-dark rounded-3xl px-8 md:px-12 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Book direct and save</p>
              <h2 className="text-2xl md:text-3xl font-serif text-white mb-2">No platform fees. Just a better price.</h2>
              <p className="text-white/80 text-sm max-w-xl leading-relaxed">
                Booking directly here skips Airbnb and Booking.com service fees, typically saving you 10–15%. Same property, same hosts, better deal.
              </p>
            </div>
            <a href="#book" className="bg-white text-casa-teal-dark px-8 py-4 rounded-full font-bold text-base whitespace-nowrap hover:bg-casa-stone transition-colors shadow-sm shrink-0">
              Book now
            </a>
          </div>
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
            <div>
              <div className="p-4 bg-casa-teal/10 text-casa-teal rounded-2xl w-fit mb-6"><Mail size={28} /></div>
              <h2 className="text-2xl md:text-3xl font-serif text-casa-text mb-3">Questions? Just ask.</h2>
              <p className="text-casa-text-light mb-8 leading-relaxed">Curious about availability, arrival or the area? We respond quickly and personally.</p>
              <a href="mailto:info.malacitano@gmail.com" className="inline-flex items-center gap-2 bg-casa-teal hover:bg-casa-teal/90 text-white px-8 py-4 rounded-full font-medium transition-all shadow-md hover:-translate-y-0.5">
                <Mail size={18} />
                info.malacitano@gmail.com
              </a>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg h-72 md:h-96">
              <iframe
                src="https://maps.google.com/maps?q=Valle+de+Abdalajis,+Malaga,+Spain&output=embed&z=13"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Valle de Abdalajís map"
              />
            </div>
          </div>
        </section>

      </main>

      {/* Floating book bar, mobile only, slides up after scrolling */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${showBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.10)] px-4 py-3">
          <a href="#book" className="block w-full bg-casa-teal-dark text-white text-center px-6 py-4 rounded-2xl font-bold text-base">
            Book now, no platform fees
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={closeLightbox}>
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
  )
}
