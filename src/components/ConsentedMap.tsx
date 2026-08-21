'use client'

import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'

// Google Maps embeds set Google's own cookies, so they only load
// after the visitor accepts the cookie banner, same as GoogleAnalytics.
export default function ConsentedMap({ src, title }: { src: string; title: string }) {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('cookie-consent') === 'accepted') setConsented(true)
    const onAccept = () => setConsented(true)
    window.addEventListener('cookie-consent-accepted', onAccept)
    return () => window.removeEventListener('cookie-consent-accepted', onAccept)
  }, [])

  function acceptAndLoad() {
    localStorage.setItem('cookie-consent', 'accepted')
    setConsented(true)
    window.dispatchEvent(new Event('cookie-consent-accepted'))
  }

  if (consented) {
    return (
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    )
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-casa-stone-dark text-center p-6">
      <MapPin size={24} className="text-casa-teal" />
      <p className="text-sm text-casa-text-light max-w-xs">
        This map is provided by Google Maps and only loads after you accept cookies.
      </p>
      <button
        onClick={acceptAndLoad}
        className="px-5 py-2.5 rounded-full text-sm font-medium bg-casa-teal text-white hover:bg-casa-teal/90 transition-colors"
      >
        Accept cookies to view map
      </button>
    </div>
  )
}
