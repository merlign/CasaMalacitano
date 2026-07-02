import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Check } from 'lucide-react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import activities from '@/data/activities'

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const activity = activities.find((a) => a.slug === slug)
  if (!activity) return {}
  return {
    title: `${activity.title} | Casa Malacitano`,
    description: activity.shortDescription,
  }
}

export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const activity = activities.find((a) => a.slug === slug)
  if (!activity) notFound()

  return (
    <div className="min-h-screen bg-casa-stone font-sans text-casa-text">
      <SiteHeader />

      <main>
        {/* Hero */}
        <div className="relative h-[55vh] min-h-[360px] overflow-hidden">
          <img
            src={activity.image}
            alt={activity.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 md:px-8 pb-10 md:pb-14">
            <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              {activity.tag}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif text-white leading-tight max-w-2xl">
              {activity.title}
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Practical info strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-8 border-b border-gray-100">
            {activity.practical.map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-casa-text-light mb-1">{item.label}</p>
                <p className="font-semibold text-casa-text">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-[1fr_320px] gap-12 md:gap-16 py-12 md:py-16">
            <div>
              {/* Description */}
              <div className="space-y-4 text-casa-text-light leading-relaxed text-lg mb-12">
                {activity.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Tips */}
              <div className="border-t border-gray-100 pt-10">
                <h2 className="text-2xl font-serif text-casa-text mb-6">Good to know</h2>
                <ul className="space-y-4">
                  {activity.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-casa-text-light">
                      <Check size={17} className="text-casa-teal shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Booking CTA */}
            <div className="hidden md:block">
              <div className="sticky top-32 bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-gray-100 p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-casa-teal mb-1">Your base</p>
                <h3 className="text-xl font-serif text-casa-text mb-2">Casa Malacitano</h3>
                <div className="flex items-center gap-1.5 text-sm text-casa-text-light mb-6">
                  <MapPin size={14} className="text-casa-teal" />
                  <span>{activity.practical[0].value} from here</span>
                </div>
                <Link
                  href="/#accommodations"
                  className="block w-full bg-casa-teal-dark text-white text-center px-6 py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity mb-4"
                >
                  View accommodations
                </Link>
                <Link
                  href="/activities"
                  className="block w-full text-center text-sm text-casa-text-light hover:text-casa-teal transition-colors underline underline-offset-4"
                >
                  All activities
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile CTA */}
        <div className="md:hidden px-4 pb-12">
          <Link
            href="/#accommodations"
            className="block w-full bg-casa-teal-dark text-white text-center px-6 py-4 rounded-2xl font-bold"
          >
            View accommodations
          </Link>
        </div>

      </main>

      <SiteFooter />
    </div>
  )
}
