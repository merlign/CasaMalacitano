import { Star } from 'lucide-react'
import FadeIn from './FadeIn'

type Review = {
  flag: string
  country: string
  date: string
  name: string
  source: string
  text: string
}

export default function ReviewsSection({ eyebrow, title, items, className }: {
  eyebrow: string
  title: string
  items: Review[]
  className?: string
}) {
  return (
    <section className={className ?? 'py-16 md:py-24 px-6 max-w-7xl mx-auto'}>
      <FadeIn className="text-center mb-10 md:mb-12">
        <p className="text-casa-teal font-bold tracking-widest uppercase text-xs mb-3">{eyebrow}</p>
        <h2 className="text-3xl sm:text-4xl font-serif text-casa-text">{title}</h2>
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((review, i) => (
          <FadeIn key={review.name} delay={i * 0.05} className="bg-white rounded-3xl shadow-lg p-8 flex flex-col">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />)}
            </div>
            <p className="text-casa-text-light leading-relaxed mb-6 flex-1">&ldquo;{review.text}&rdquo;</p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <span className="text-2xl leading-none" role="img" aria-label={review.country}>{review.flag}</span>
              <div>
                <p className="font-semibold text-casa-text text-sm">{review.name}</p>
                <p className="text-xs text-casa-text-light">{review.country} · {review.date}</p>
                <p className="text-xs text-casa-text-light">{review.source}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
