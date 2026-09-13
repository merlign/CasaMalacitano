import activities from '../../content/activities-index.generated.json'

// Which activities get a big hero card (bigger photo + intro text) is
// ticked per-activity in the CMS ("Show as large card on homepage"), so
// adding, removing or re-featuring an activity is reflected here without
// ever needing a code change. At most 2 large cards fit the design, so if
// more are ticked only the first 2 are used; everything else, including an
// un-featured activity, automatically gets a small card below it.
const featured = activities.filter((a) => a.featured).slice(0, 2)
const featuredSlugs = new Set(featured.map((a) => a.slug))

const large = featured
  .map((a) => ({ tag: a.tag, title: a.title, description: a.shortDescription, image: a.image, href: `/activities/${a.slug}` }))

const small = activities
  .filter((a) => !featuredSlugs.has(a.slug))
  .map((a) => ({ tag: a.tag, title: a.title, image: a.image, href: `/activities/${a.slug}` }))

export default function SurroundingsCarousel() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-casa-teal font-bold tracking-widest uppercase text-xs mb-3">Activities</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-casa-text leading-tight">
          Step outside. There&apos;s a lot to do.
        </h2>
      </div>

      {/* Large cards (0-2, tick "Show as large card" in the CMS) */}
      {large.length > 0 && (
      <div className={`grid grid-cols-1 gap-3 mb-3 ${large.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
        {large.map((item) => (
          <a key={item.title} href={item.href} className="relative h-[340px] md:h-[420px] rounded-3xl overflow-hidden block group">
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
              <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                {item.tag}
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-tight">
                {item.title}
              </h3>
              <p className="text-white/75 text-sm leading-relaxed max-w-md">
                {item.description}
              </p>
            </div>
          </a>
        ))}
      </div>
      )}

      {/* Small cards, wraps to a new row past 4 on desktop */}
      <div className="hidden md:grid md:grid-cols-4 gap-3">
        {small.map((item) => (
          <a key={item.title} href={item.href} className="relative h-[200px] rounded-2xl overflow-hidden block group">
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-2">
                {item.tag}
              </span>
              <h3 className="text-base font-serif text-white leading-snug">
                {item.title}
              </h3>
            </div>
          </a>
        ))}
      </div>

      {/* Mobile: horizontal scroll strip */}
      <div className="md:hidden flex gap-3 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory">
        {small.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="relative shrink-0 w-56 h-[180px] rounded-2xl overflow-hidden block snap-start group"
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-2">
                {item.tag}
              </span>
              <h3 className="text-sm font-serif text-white leading-snug">
                {item.title}
              </h3>
            </div>
          </a>
        ))}
      </div>

      {/* Link to all activities */}
      <div className="mt-8 text-center">
        <a
          href="/activities"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-casa-text text-casa-text text-sm font-semibold hover:bg-casa-text hover:text-white transition-all"
        >
          View all activities
        </a>
      </div>
    </div>
  )
}
