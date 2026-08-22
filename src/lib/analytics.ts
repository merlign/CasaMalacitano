// Fires a GA4 event if analytics has loaded (only true after the visitor
// accepts the cookie banner). No-ops silently otherwise, so it's always
// safe to call regardless of consent state.
export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window === 'undefined') return
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  if (typeof gtag === 'function') gtag('event', name, params)
}
