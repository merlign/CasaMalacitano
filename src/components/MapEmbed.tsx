'use client'

import { useState } from 'react'
import { MapPin } from 'lucide-react'

const MAP_SRC = "https://maps.google.com/maps?q=Cam.+de+la+Fuente+de+La+Zarza,+29240+Valle+de+Abdalajis,+Malaga,+Spain&output=embed&z=15"

interface MapEmbedProps {
  className?: string
  title?: string
}

export default function MapEmbed({ className = '', title = 'Casa Malacitano location' }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-[#e8e0d8] ${className}`}>
      {!loaded && (
        <button
          onClick={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 cursor-pointer group"
          aria-label="Load map"
        >
          {/* Decorative map-like background lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="40%" x2="100%" y2="45%" stroke="#5fa8a5" strokeWidth="2" />
            <line x1="0" y1="60%" x2="100%" y2="57%" stroke="#5fa8a5" strokeWidth="1" />
            <line x1="30%" y1="0" x2="35%" y2="100%" stroke="#5fa8a5" strokeWidth="2" />
            <line x1="65%" y1="0" x2="62%" y2="100%" stroke="#5fa8a5" strokeWidth="1" />
            <rect x="40%" y="38%" width="18%" height="22%" rx="2" fill="none" stroke="#5fa8a5" strokeWidth="1.5" />
          </svg>

          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="p-4 bg-white rounded-full shadow-md group-hover:shadow-lg transition-shadow">
              <MapPin size={24} className="text-casa-teal-dark" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-casa-text text-sm">Valle de Abdalajís</p>
              <p className="text-casa-text-light text-xs mt-0.5">Klik om kaart te laden</p>
            </div>
          </div>
        </button>
      )}

      {loaded && (
        <iframe
          src={MAP_SRC}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
          className="absolute inset-0"
        />
      )}
    </div>
  )
}
