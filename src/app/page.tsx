'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';
import SurroundingsCarousel from '../components/SurroundingsCarousel'
import FadeIn from '../components/FadeIn'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import BookingWidget from '../components/BookingWidget'
import { getIcon } from '@/lib/icons'
import content from '../../content/homepage.json'
import settings from '../../content/settings.json'

export default function Page() {
  const heroBgRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleParallax = () => {
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`
      }
    }
    window.addEventListener('scroll', handleParallax, { passive: true })
    return () => window.removeEventListener('scroll', handleParallax)
  }, []);

  const mapsUrl = `https://maps.google.com/maps?q=${settings.coordinates.latitude},${settings.coordinates.longitude}`

  return (
    <div className="min-h-screen bg-casa-stone font-sans text-casa-text">
      <SiteHeader hero />

      {/* Hero + Booking Widget */}
      <section className="relative min-h-screen flex flex-col justify-center pb-32 md:pb-48">
        {/* Background — clipped separately so calendar dropdowns aren't cut off */}
        <div className="absolute inset-0 overflow-hidden">
          <div ref={heroBgRef} className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform" style={{ backgroundImage: `url("${content.hero.backgroundImage}")` }}></div>
          <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-casa-stone via-transparent to-transparent opacity-90 h-48 bottom-0 top-auto"></div>
        </div>

        <div className="relative z-10 text-center px-6 md:px-4 max-w-5xl mx-auto mt-20 md:mt-24">
          <motion.a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 text-casa-teal font-bold tracking-widest uppercase text-xs mb-8 bg-black/40 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10 hover:bg-black/60 transition-colors"
          >
            <MapPin size={16} />
            <span>{content.hero.locationTag}</span>
          </motion.a>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-serif text-white mb-6 md:mb-8 leading-[1.1]"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.4)' }}
          >
            {content.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-white font-light max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
          >
            {content.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center"
          >
            <a href="#accommodations" className="bg-casa-teal hover:bg-casa-teal/90 text-white px-10 py-4 rounded-full text-lg font-medium transition-all shadow-lg hover:-translate-y-1">
              {content.hero.ctaLabel}
            </a>
          </motion.div>
        </div>

      </section>

      {/* Booking Widget — straddles hero/cream border */}
      <div id="booking" className="relative z-20 max-w-3xl mx-auto px-4 -mt-10 pb-12 md:pb-20">
        <BookingWidget />
      </div>

      {/* Facilities */}
      <section className="pb-16 md:pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <FadeIn from="left">
            <h2 className="text-3xl md:text-4xl font-serif text-casa-text mb-6">{content.facilities.title}</h2>
            <p className="text-casa-text-light text-lg mb-8 leading-relaxed">
              {content.facilities.text}
            </p>
            <div className="grid grid-cols-2 gap-6">
              {content.facilities.items.map((item, i) => {
                const Icon = getIcon(item.icon)
                const colors = [
                  'bg-casa-pink/10 text-casa-pink',
                  'bg-casa-teal/10 text-casa-teal',
                  'bg-casa-yellow/20 text-yellow-700',
                  'bg-gray-200 text-gray-700',
                ]
                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${colors[i % colors.length]}`}><Icon size={24} /></div>
                    <div>
                      <h4 className="font-semibold text-casa-text">{item.title}</h4>
                      <p className="text-sm text-casa-text-light mt-1">{item.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </FadeIn>
          <FadeIn from="right" delay={0.1}>
            <div className="relative">
            <img src={content.facilities.image} alt="Pool and terrace" className="rounded-2xl shadow-2xl object-cover h-[300px] md:h-[500px] w-full" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-casa-yellow rounded-full mix-blend-multiply opacity-50 blur-2xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-casa-pink rounded-full mix-blend-multiply opacity-30 blur-2xl"></div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Accommodations */}
      <section id="accommodations" className="py-24 bg-casa-stone-dark px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-casa-text mb-4">{content.accommodations.title}</h2>
            <p className="text-lg text-casa-text-light max-w-2xl mx-auto">{content.accommodations.subtitle}</p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-10">
            <FadeIn delay={0.05} className="bg-white rounded-3xl overflow-hidden shadow-lg group hover:shadow-xl transition-all flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img src={content.accommodations.casita.image} alt="Casita Malacitano" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-casa-text uppercase tracking-wide">{content.accommodations.casita.badge}</div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-serif mb-3">{content.accommodations.casita.title}</h3>
                <p className="text-casa-text-light mb-8 line-clamp-3 flex-1">{content.accommodations.casita.text}</p>
                <div className="flex items-center gap-4">
                  <a href="/casita" className="bg-casa-teal hover:bg-casa-teal/90 text-white px-6 py-3 rounded-full font-medium transition-colors">View details</a>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} className="bg-white rounded-3xl overflow-hidden shadow-lg group hover:shadow-xl transition-all flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img src={content.accommodations.casa.image} alt="Casa Malacitano Studio" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-casa-text uppercase tracking-wide">{content.accommodations.casa.badge}</div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-serif mb-3">{content.accommodations.casa.title}</h3>
                <p className="text-casa-text-light mb-8 line-clamp-3 flex-1">{content.accommodations.casa.text}</p>
                <div className="flex items-center gap-4">
                  <a href="/casa" className="bg-casa-teal hover:bg-casa-teal/90 text-white px-6 py-3 rounded-full font-medium transition-colors">View details</a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Surroundings */}
      <section id="surroundings" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn><SurroundingsCarousel /></FadeIn>
        </div>
      </section>

      {/* Village & Map */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="grid md:grid-cols-2 gap-10 md:gap-16 items-end mb-10">
            <div>
              <p className="text-casa-teal font-bold tracking-widest uppercase text-xs mb-3">{content.village.eyebrow}</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-casa-text mb-3">{content.village.title}</h2>
              <p className="text-casa-text-light text-lg italic">{content.village.tagline}</p>
            </div>
            <p className="text-casa-text-light text-lg leading-relaxed">
              {content.village.text}
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="rounded-3xl overflow-hidden h-80 md:h-[480px] shadow-lg">
            <iframe
              src={`https://maps.google.com/maps?q=${settings.coordinates.latitude},${settings.coordinates.longitude}&t=k&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              title="Casa Malacitano locatie"
            />
          </FadeIn>
        </div>
      </section>

      {/* Hosts */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 md:gap-16 items-center">
          <FadeIn from="left" className="md:col-span-2">
            <p className="text-casa-teal font-bold tracking-widest uppercase text-xs mb-3">{content.hosts.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-serif text-casa-text mb-6">{content.hosts.title}</h2>
            <p className="text-casa-text-light text-lg leading-relaxed">
              {content.hosts.text}
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="relative h-64 md:h-72 rounded-3xl overflow-hidden bg-casa-stone-dark flex items-center justify-center">
            <img
              src={content.hosts.image}
              alt="Jans and Minouche"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            <p className="text-casa-text-light/40 font-serif text-lg select-none">Photo coming soon</p>
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-casa-stone-dark">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-4 bg-casa-teal/10 text-casa-teal rounded-2xl w-fit mx-auto mb-8"><Mail size={28} /></div>
          <h2 className="text-3xl sm:text-4xl font-serif text-casa-text mb-4">{content.contact.title}</h2>
          <p className="text-casa-text-light text-lg mb-8 leading-relaxed">{content.contact.text}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={`mailto:${settings.email}`} className="bg-casa-teal hover:bg-casa-teal/90 text-white px-8 py-4 rounded-full font-medium transition-all shadow-md hover:-translate-y-0.5">
              {settings.email}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
