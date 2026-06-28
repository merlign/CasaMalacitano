'use client'

export default function CookiePreferencesButton() {
  return (
    <button
      onClick={() => { localStorage.removeItem('cookie-consent'); window.location.reload() }}
      className="hover:text-casa-text transition-colors"
    >
      Cookie preferences
    </button>
  )
}
