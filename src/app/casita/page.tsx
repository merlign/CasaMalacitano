'use client'

import React from 'react'
import Link from 'next/link'
import {
  MapPin, Star, Users, Bed, Wifi, Car, Waves, Snowflake,
  Wind, Utensils, Shield, Mountain, Leaf, Coffee, Check,
  ChevronRight, Mail, ArrowLeft, Key,
} from 'lucide-react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

// ─── Drop your photos here ────────────────────────────────────────────────────
const PHOTOS = [
  { src: '/casita/photo-1.jpg', alt: 'Casita exterior with terrace' },
  { src: '/casita/photo-2.jpg', alt: 'Living room with open kitchen' },
  { src: '/casita/photo-3.jpg', alt: 'Bedroom' },
  { src: '/casita/photo-4.jpg', alt: 'Bathroom with walk-in shower' },
  { src: '/casita/photo-5.jpg', alt: 'View over Valle de Abdalajís' },
  { src: '/casita/photo-6.jpg', alt: 'Terrace at sunset' },
  { src: '/casita/photo-7.jpg', alt: 'Kitchen detail' },
  { src: '/casita/photo-8.jpg', alt: 'Pool area' },
  { src: '/casita/photo-9.jpg', alt: 'Garden' },
  { src: '/casita/photo-10.jpg', alt: 'Outdoor dining area' },
  { src: '/casita/photo-11.jpg', alt: 'Solarium' },
  { src: '/casita/photo-12.jpg', alt: 'Village view from terrace' },
  { src: '/casita/photo-13.jpg', alt: 'Living room seating' },
  { src: '/casita/photo-14.jpg', alt: 'Bedroom detail' },
  { src: '/casita/photo-15.jpg', alt: 'Honesty bar' },
]
// ─────────────────────────────────────────────────────────────────────────────

const AMENITIES = [
  {
    category: 'Bedroom & laundry',
    icon: Bed,
    items: [
      'Towels, linen, soap & toilet paper',
      'Hangers',
      'Cotton bedding',
      'Extra pillows & blankets',
      'Blackout curtains',
      'Drying rack',
      'Safe',
      'Wardrobe',
    ],
  },
  {
    category: 'Bathroom',
    icon: Wind,
    items: ['Hairdryer', 'Shampoo', 'Conditioner', 'Shower gel', 'Hot water'],
  },
  {
    category: 'Kitchen',
    icon: Utensils,
    items: [
      'Full kitchen',
      'Fridge & mini-fridge',
      'Freezer',
      'Induction hob',
      'Microwave',
      'Kettle',
      'Nespresso machine',
      'Wine glasses',
      'Dining table',
      'Cooking essentials (oil, salt, pepper)',
      'Dishes & cutlery',
    ],
  },
  {
    category: 'Heating & cooling',
    icon: Snowflake,
    items: ['Air conditioning — €5/night', 'Heating (split system)'],
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
    items: [
      'Free parking on site — 2 spots',
      'Shared outdoor pool (Apr–Oct, 10:00–20:00)',
    ],
  },
  {
    category: 'Safety',
    icon: Shield,
    items: ['Smoke detector', 'Fire extinguisher', 'First aid kit'],
  },
  {
    category: 'Access',
    icon: Key,
    items: ['Private entrance', 'Ground floor — no stairs'],
  },
]

const DISTANCES = [
  { label: 'Caminito del Rey', dist: '11 km' },
  { label: 'Málaga', dist: '45 min' },
  { label: 'Ronda', dist: '50 min' },
  { label: 'Antequera', dist: '25 min' },
  { label: 'El Torcal', dist: '30 min' },
  { label: 'El Chorro lakes', dist: '15 min' },
]

const HIGHLIGHTS = [
  { icon: Check, text: 'Fresh towels & luxury linen', sub: 'Fully provided — no need to pack' },
  { icon: Coffee, text: 'Nespresso coffee machine', sub: 'With starter capsules' },
  { icon: Check, text: 'Shampoo, conditioner & shower gel', sub: 'Quality toiletries provided' },
  { icon: Utensils, text: 'Full kitchen essentials', sub: 'Oil, salt, pepper, pans, dishes' },
  { icon: Waves, text: 'Pool access (Apr–Oct)', sub: 'Open daily 10:00–20:00' },
  { icon: Snowflake, text: 'Air conditioning available', sub: '€5/night — request on arrival' },
]

export default function CasitaPage() {
  return (
    <div className="min-h-screen bg-casa-stone font-sans text-casa-text">
      <SiteHeader />

      <main className="pt-24 md:pt-28">

        {/* Hero gallery — first 5 photos */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-2 rounded-3xl overflow-hidden h-[260px] md:h-[480px]">
            <div className="col-span-2 row-span-2 relative bg-casa-stone-dark">
              <img src={PHOTOS[0].src} alt={PHOTOS[0].alt} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            {PHOTOS.slice(1, 5).map((photo, i) => (
              <div key={i} className={`relative bg-casa-stone-dark ${i >= 2 ? 'hidden md:block' : ''}`}>
                <img src={photo.src} alt={photo.alt} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Title block */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-12">
          <div className="flex items-center gap-2 text-casa-text-light text-sm mb-4">
            <Link href="/" className="hover:text-casa-teal transition-colors flex items-center gap-1">
              <ArrowLeft size={14} />
              All accommodations
            </Link>
            <ChevronRight size={14} />
            <span className="text-casa-text">Casita Malacitano</span>
          </div>

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
              <span className="text-casa-text-light text-sm">on Airbnb</span>
            </div>
          </div>
        </div>

        {/* Two-column content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-14 md:mt-20 grid md:grid-cols-[1fr_360px] gap-12 md:gap-16 items-start">

          <div className="space-y-14">

            {/* Description */}
            <section>
              <h2 className="text-2xl font-serif mb-5">About this space</h2>
              <div className="space-y-4 text-casa-text-light leading-relaxed">
                <p>A completely, stylishly furnished casita with a magnificent view of the friendly village of Valle de Abdalajís. Centrally located between the historic cities of Málaga, Ronda, Granada, Seville and Córdoba.</p>
                <p>The casita is part of Casa Malacitano and has a large living room with open kitchen and French doors that open onto the terrace. There is a spacious bathroom with walk-in shower. The bedroom with double bed is fully equipped with air conditioning (available at €5/night).</p>
                <p>From April to October you can use the swimming pool, shared with any other guests. Upstairs you will find our outdoor kitchen, pool and solarium — in summer months you are welcome to join us for dinner or a drink from the honesty bar.</p>
                <p className="text-sm bg-casa-stone-dark rounded-2xl p-4">The casita can only be reached by car. The village centre is a 5-minute walk away.</p>
              </div>
            </section>

            {/* Pack light */}
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

            {/* Full photo gallery */}
            <section className="pt-14 border-t border-gray-100">
              <h2 className="text-2xl font-serif mb-6">All photos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {PHOTOS.map((photo, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-casa-stone-dark">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section className="pt-14 border-t border-gray-100">
              <h2 className="text-2xl font-serif mb-8">What this place offers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                {AMENITIES.map((group) => (
                  <div key={group.category}>
                    <div className="flex items-center gap-2 mb-3">
                      <group.icon size={17} className="text-casa-teal" />
                      <h3 className="font-semibold text-casa-text text-sm">{group.category}</h3>
                    </div>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-casa-text-light">
                          <Check size={13} className="text-casa-teal shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Book direct banner — after all amenities */}
            <div className="bg-casa-teal-dark rounded-3xl px-8 md:px-12 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Book direct and save</p>
                <h2 className="text-2xl md:text-3xl font-serif text-white mb-2">No platform fees. Just a better price.</h2>
                <p className="text-white/80 text-sm max-w-xl leading-relaxed">
                  Booking directly here skips Airbnb and Booking.com service fees — typically saving you 10–15%. Same property, same hosts, better deal.
                </p>
              </div>
              <a
                href="#book"
                className="bg-white text-casa-teal-dark px-8 py-4 rounded-full font-bold text-base whitespace-nowrap hover:bg-casa-stone transition-colors shadow-sm shrink-0"
              >
                Book now
              </a>
            </div>

            {/* Location */}
            <section className="pt-14 border-t border-gray-100">
              <h2 className="text-2xl font-serif mb-6">Location</h2>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-start gap-3 mb-6">
                  <MapPin size={20} className="text-casa-teal mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-casa-text">Valle de Abdalajís, Málaga, Andalusia</p>
                    <p className="text-sm text-casa-text-light mt-1 leading-relaxed">A quiet village in the heart of Andalusia, surrounded by mountains, gorges and nature. Not packaged for tourists — and that&apos;s exactly the point.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DISTANCES.map((place) => (
                    <div key={place.label} className="flex items-center justify-between text-sm p-3 rounded-xl bg-casa-stone">
                      <span className="text-casa-text-light">{place.label}</span>
                      <span className="font-semibold text-casa-text ml-2 shrink-0">{place.dist}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>

          {/* Sticky booking card */}
          <div className="hidden md:block">
            <div className="sticky top-32">
              <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-gray-100 p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-casa-teal mb-1">Book direct</p>
                <p className="text-casa-text-light text-sm mb-6 leading-relaxed">No Airbnb or Booking.com service fees. Direct contact with the hosts.</p>

                <a
                  href="#book"
                  className="block w-full bg-casa-teal-dark hover:opacity-90 text-white text-center px-6 py-4 rounded-2xl font-bold transition-opacity mb-3"
                >
                  Book now
                </a>
                <a
                  href="https://www.airbnb.nl/rooms/947665014354184314"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center text-sm text-casa-text-light hover:text-casa-teal underline underline-offset-4 transition-colors"
                >
                  View on Airbnb (higher price)
                </a>

                <div className="mt-6 pt-6 border-t border-gray-100 space-y-2.5">
                  {[
                    '2 guests',
                    '1 bedroom — double bed',
                    '1 bathroom — walk-in shower',
                    'Private entrance & garden',
                    'Free parking (2 spots)',
                    'Shared pool (Apr–Oct)',
                  ].map((item) => (
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

        {/* Mobile booking CTA */}
        <div className="md:hidden max-w-7xl mx-auto px-4 mt-12">
          <div className="bg-white rounded-3xl border border-gray-100 shadow p-6">
            <p className="font-semibold text-casa-text mb-1">Ready to book?</p>
            <p className="text-sm text-casa-text-light mb-4">Contact us directly — no platform fees.</p>
            <a
              href="#book"
              className="block w-full bg-casa-teal-dark text-white text-center px-6 py-4 rounded-2xl font-bold"
            >
              Book now
            </a>
          </div>
        </div>

        {/* Contact */}
        <section className="mt-16 md:mt-24 py-16 md:py-24 px-4 bg-casa-stone-dark">
          <div className="max-w-2xl mx-auto text-center">
            <div className="p-4 bg-casa-teal/10 text-casa-teal rounded-2xl w-fit mx-auto mb-6">
              <Mail size={28} />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-casa-text mb-3">Questions? Just ask.</h2>
            <p className="text-casa-text-light mb-8 leading-relaxed">Curious about availability, arrival or the area? We respond quickly and personally.</p>
            <a
              href="mailto:info@casamalacitano.com"
              className="inline-flex items-center gap-2 bg-casa-teal hover:bg-casa-teal/90 text-white px-8 py-4 rounded-full font-medium transition-all shadow-md hover:-translate-y-0.5"
            >
              <Mail size={18} />
              info@casamalacitano.com
            </a>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}
