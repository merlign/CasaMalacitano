'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sun, Coffee, Waves, Snowflake, Calendar, Users, Mail } from 'lucide-react';
import SurroundingsCarousel from '../components/SurroundingsCarousel'
import FadeIn from '../components/FadeIn'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

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

  return (
    <div className="min-h-screen bg-casa-stone font-sans text-casa-text">
      <SiteHeader hero />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pb-32 md:pb-40">
        <div ref={heroBgRef} className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform" style={{ backgroundImage: 'url("/view.jpg")' }}></div>
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-casa-stone via-transparent to-transparent opacity-90 h-48 bottom-0 top-auto"></div>

        <div className="relative z-10 text-center px-6 md:px-4 max-w-5xl mx-auto mt-20 md:mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 text-casa-teal font-bold tracking-widest uppercase text-xs mb-8 bg-black/40 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10"
          >
            <MapPin size={16} />
            <span>Valle de Abdalajís, Andalusia</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-serif text-white mb-6 md:mb-8 leading-[1.1]"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.4)' }}
          >
            A fresh, breathing oasis in southern Spain.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-white font-light max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
          >
            A place where you don&apos;t just stay. A place where you truly come back to yourself.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center"
          >
            <a href="#accommodations" className="bg-casa-teal hover:bg-casa-teal/90 text-white px-10 py-4 rounded-full text-lg font-medium transition-all shadow-lg hover:-translate-y-1">
              View accommodations
            </a>
          </motion.div>
        </div>
      </section>

      {/* Booking Widget */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-16 md:-mt-24 mb-16 md:mb-24">
        <div className="relative bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row gap-6 items-center justify-between border border-gray-100">
          <div className="absolute -top-10 left-4 text-white text-sm font-semibold italic drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            * Opmerking: hier komt later jullie eigen boekingswidget
          </div>
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-2 md:mt-0">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="p-3 bg-gray-50 rounded-full group-hover:bg-casa-teal/10 transition-colors text-casa-teal"><Calendar size={24} /></div>
              <div>
                <label className="block text-sm text-casa-text-light mb-0.5">Check in</label>
                <div className="font-medium text-casa-text text-base">Add date</div>
              </div>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-8">
              <div className="p-3 bg-gray-50 rounded-full group-hover:bg-casa-teal/10 transition-colors text-casa-teal"><Calendar size={24} /></div>
              <div>
                <label className="block text-sm text-casa-text-light mb-0.5">Check out</label>
                <div className="font-medium text-casa-text text-base">Add date</div>
              </div>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-8">
              <div className="p-3 bg-gray-50 rounded-full group-hover:bg-casa-teal/10 transition-colors text-casa-teal"><Users size={24} /></div>
              <div>
                <label className="block text-sm text-casa-text-light mb-0.5">Guests</label>
                <div className="font-medium text-casa-text text-base">2 guests</div>
              </div>
            </div>
          </div>
          <button className="w-full md:w-auto bg-casa-text hover:bg-black text-white px-10 py-5 rounded-2xl font-medium transition-colors whitespace-nowrap shadow-lg">
            Check availability
          </button>
        </div>
      </div>

      {/* Facilities */}
      <section className="pb-16 md:pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <FadeIn from="left">
            <h2 className="text-3xl md:text-4xl font-serif text-casa-text mb-6">Your own place under the Andalusian sun</h2>
            <p className="text-casa-text-light text-lg mb-8 leading-relaxed">
              At Casa Malacitano we offer two unique stays: a fully equipped casita and a cozy studio apartment. Both with access to our wonderful outdoor facilities. Not a place where you have to — a place where you get to. Genuine Spanish hospitality, no mass tourism.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-casa-pink/10 text-casa-pink rounded-xl"><Sun size={24} /></div>
                <div>
                  <h4 className="font-semibold text-casa-text">Spacious solarium</h4>
                  <p className="text-sm text-casa-text-light mt-1">Wonderful relaxing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-casa-teal/10 text-casa-teal rounded-xl"><Waves size={24} /></div>
                <div>
                  <h4 className="font-semibold text-casa-text">Nice pool</h4>
                  <p className="text-sm text-casa-text-light mt-1">For the necessary cooling</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-casa-yellow/20 text-yellow-700 rounded-xl"><Coffee size={24} /></div>
                <div>
                  <h4 className="font-semibold text-casa-text">Outdoor kitchen</h4>
                  <p className="text-sm text-casa-text-light mt-1">With cozy honesty bar</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-gray-200 text-gray-700 rounded-xl"><Snowflake size={24} /></div>
                <div>
                  <h4 className="font-semibold text-casa-text">Modern comfort</h4>
                  <p className="text-sm text-casa-text-light mt-1">Aircon & free parking</p>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn from="right" delay={0.1}>
            <div className="relative">
            <img src="/zwembad.jpg" alt="Pool and terrace" className="rounded-2xl shadow-2xl object-cover h-[300px] md:h-[500px] w-full" />
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-casa-text mb-4">Our accommodations</h2>
            <p className="text-lg text-casa-text-light max-w-2xl mx-auto">Choose the stay that suits you and easily book directly or via Airbnb.</p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-10">
            <FadeIn delay={0.05} className="bg-white rounded-3xl overflow-hidden shadow-lg group hover:shadow-xl transition-all flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img src="/casita.jpg" alt="Casita Malacitano" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-casa-text uppercase tracking-wide">Detached</div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-serif mb-3">Casita Malacitano</h3>
                <p className="text-casa-text-light mb-8 line-clamp-3 flex-1">A beautiful, stylishly furnished detached house with its own veranda. Equipped with a spacious living room with open kitchen, bedroom and a modern bathroom. Enjoy the breathtaking view in complete privacy.</p>
                <div className="flex items-center gap-4">
                  <a href="/casita" className="bg-casa-teal hover:bg-casa-teal/90 text-white px-6 py-3 rounded-full font-medium transition-colors">View details</a>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} className="bg-white rounded-3xl overflow-hidden shadow-lg group hover:shadow-xl transition-all flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img src="/casa.jpg" alt="Casa Malacitano Studio" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-casa-text uppercase tracking-wide">Private entrance</div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-serif mb-3">Casa Malacitano</h3>
                <p className="text-casa-text-light mb-8 line-clamp-3 flex-1">A cozy and beautifully renovated studio apartment. Connected to the main building, but with a private entrance and terrace. Perfect as a comfortable base for hikers and active travelers.</p>
                <div className="flex items-center gap-4">
                  <a href="/casa" className="bg-casa-teal hover:bg-casa-teal/90 text-white px-6 py-3 rounded-full font-medium transition-colors">View details</a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Hosts */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn from="left">
            <p className="text-casa-teal font-bold tracking-widest uppercase text-xs mb-3">Your hosts</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-casa-text mb-6">Meet Jans &amp; Minouche</h2>
            <p className="text-casa-text-light text-lg leading-relaxed mb-8">
              [Placeholder: a short, warm introduction about Jans and Minouche together. Who they are, how they ended up in Valle de Abdalajís, and what kind of hosts they are.]
            </p>
          </FadeIn>

          {/* Photo placeholder — replace src with /hosts.jpg when ready */}
          <FadeIn delay={0.15} className="relative h-[420px] md:h-[520px] rounded-3xl overflow-hidden bg-casa-stone-dark flex items-center justify-center">
            <img
              src="/hosts.jpg"
              alt="Jans and Minouche"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            <p className="text-casa-text-light/40 font-serif text-lg select-none">Photo coming soon</p>
          </FadeIn>
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
              <p className="text-casa-teal font-bold tracking-widest uppercase text-xs mb-3">The village</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-casa-text mb-3">Valle de Abdalajís</h2>
              <p className="text-casa-text-light text-lg italic">Quiet, authentic, surrounded by nature.</p>
            </div>
            <p className="text-casa-text-light text-lg leading-relaxed">
              Nestled between mountain ridges in the province of Málaga, Valle de Abdalajís is an authentic Andalusian village that tourism has largely passed by. Around 2,000 residents, a handful of bars, and a pace of life that slows you down the moment you arrive.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="rounded-3xl overflow-hidden h-80 md:h-[480px] shadow-lg">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-4.682%2C36.933%2C-4.654%2C36.953&layer=mapnik&marker=36.94303%2C-4.66811"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Valle de Abdalajís map"
            />
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-casa-stone-dark">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-4 bg-casa-teal/10 text-casa-teal rounded-2xl w-fit mx-auto mb-8"><Mail size={28} /></div>
          <h2 className="text-3xl sm:text-4xl font-serif text-casa-text mb-4">Get in touch</h2>
          <p className="text-casa-text-light text-lg mb-8 leading-relaxed">Questions about availability, arrival or the area? We&apos;re happy to help. Reach out directly and we&apos;ll get back to you quickly.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="mailto:info.malacitano@gmail.com" className="bg-casa-teal hover:bg-casa-teal/90 text-white px-8 py-4 rounded-full font-medium transition-all shadow-md hover:-translate-y-0.5">
              info.malacitano@gmail.com
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
