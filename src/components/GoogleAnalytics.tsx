'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import settings from '../../content/settings.json'

// Only loads gtag.js after the visitor accepts the cookie banner, and
// only if a Measurement ID is set in settings.json (CMS-editable).
export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false)
  const gaId = settings.googleAnalyticsId

  useEffect(() => {
    if (localStorage.getItem('cookie-consent') === 'accepted') setConsented(true)
    const onAccept = () => setConsented(true)
    window.addEventListener('cookie-consent-accepted', onAccept)
    return () => window.removeEventListener('cookie-consent-accepted', onAccept)
  }, [])

  if (!gaId || !consented) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
