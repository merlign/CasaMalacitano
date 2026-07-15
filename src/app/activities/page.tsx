import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { getActivities } from '@/lib/activities'

export const metadata = {
  title: 'Things to do near Casa Malacitano',
  description: 'Gorge walks, mountain trails, historic cities and authentic village life. Everything within easy reach of Valle de Abdalajís.',
  alternates: {
    canonical: 'https://casamalacitano.com/activities',
  },
}

export default function ActivitiesPage() {
  const activities = getActivities()
  return (
    <div className="min-h-screen bg-casa-stone font-sans text-casa-text">
      <SiteHeader />

      <main className="pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <p className="text-casa-teal font-bold tracking-widest uppercase text-xs mb-3">The surroundings</p>
          <h1 className="text-4xl md:text-5xl font-serif text-casa-text mb-4 leading-tight">Things to do</h1>
          <p className="text-casa-text-light text-lg max-w-2xl mb-14 leading-relaxed">
            Valle de Abdalajís sits at the centre of some of the best activities in Andalusia. A gorge walk, mountain trails, three historic cities, and a village that tourism has left untouched.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <Link
                key={activity.slug}
                href={`/activities/${activity.slug}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
              >
                <div className="relative h-56 overflow-hidden bg-casa-stone-dark">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    {activity.tag}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-serif text-casa-text mb-2 leading-snug">{activity.title}</h2>
                  <p className="text-casa-text-light text-sm leading-relaxed flex-1">{activity.shortDescription}</p>
                  <span className="mt-4 text-sm font-semibold text-casa-teal group-hover:underline underline-offset-4">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <section className="py-16 px-4 bg-casa-teal-dark">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-3">Ready to explore?</h2>
            <p className="text-white/80 mb-8">Casa Malacitano is the perfect base. All of this on your doorstep.</p>
            <Link href="/#accommodations" className="inline-block bg-white text-casa-teal-dark px-8 py-4 rounded-full font-bold hover:bg-casa-stone transition-colors">
              View accommodations
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
