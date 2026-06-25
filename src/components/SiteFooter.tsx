import Link from 'next/link'
import { MapPin } from 'lucide-react'

export default function SiteFooter() {
  return (
    <footer className="bg-white text-casa-text-light pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo-1.png" alt="Casa Malacitano logo" className="h-10 w-auto" />
            <h3 className="text-2xl font-brand font-bold text-casa-text tracking-wide">Casa Malacitano</h3>
          </div>
          <p className="max-w-sm mb-6 leading-relaxed">
            A fresh, breathing oasis in the heart of southern Spain. Escape the crowds and enjoy peace, authentic atmosphere and comfortable accommodations in Valle de Abdalajís.
          </p>
        </div>
        <div>
          <h4 className="text-casa-text font-semibold mb-6 uppercase tracking-wider text-sm">Navigation</h4>
          <ul className="space-y-3">
            <li><Link href="/" className="hover:text-casa-teal transition-colors">Home</Link></li>
            <li><Link href="/casita" className="hover:text-casa-teal transition-colors">Casita Malacitano</Link></li>
            <li><Link href="/casa" className="hover:text-casa-teal transition-colors">Casa Malacitano</Link></li>
            <li><Link href="/activities" className="hover:text-casa-teal transition-colors">Activities</Link></li>
            <li><Link href="/#surroundings" className="hover:text-casa-teal transition-colors">Surroundings</Link></li>
            <li><Link href="/#contact" className="hover:text-casa-teal transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-casa-text font-semibold mb-6 uppercase tracking-wider text-sm">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2"><MapPin size={14} /> Valle de Abdalajís</li>
            <li>Andalusia, Spain</li>
            <li><a href="mailto:info@casamalacitano.com" className="hover:text-casa-teal transition-colors">info@casamalacitano.com</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Casa Malacitano. All rights reserved.</p>
          <span className="hidden md:inline text-gray-200">·</span>
          <p className="text-xs text-gray-400">Tourism licence: CR/MA/02488 (Andalusia)</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-casa-text transition-colors">Privacy policy</a>
          <a href="#" className="hover:text-casa-text transition-colors">Terms and conditions</a>
        </div>
      </div>
    </footer>
  )
}
