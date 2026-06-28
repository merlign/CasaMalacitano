'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShow(false)
    // GA initialisation goes here once the measurement ID is available:
    // window.gtag('consent', 'update', { analytics_storage: 'granted' })
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-casa-text-light flex-1 leading-relaxed">
          We use cookies for analytics (Google Analytics) to improve this site.{' '}
          <Link href="/privacy-policy" className="underline hover:text-casa-teal transition-colors">
            Privacy policy
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 rounded-full text-sm font-medium text-casa-text border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-full text-sm font-medium bg-casa-teal text-white hover:bg-casa-teal/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
