import { Link } from 'react-router-dom'
import { Flame, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-bark-300 border-t border-saffron-100 dark:border-bark-50/20 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-saffron-500 to-maroon-700 flex items-center justify-center">
                <Flame size={16} className="text-white" />
              </div>
              <span className="font-display text-lg text-bark-300 dark:text-cream-100">పంచాంగం</span>
            </Link>
            <p className="text-sm text-bark-50/60 dark:text-cream-100/40 leading-relaxed">
              Your comprehensive Hindu calendar and Panchangam guide. Authentic calculations for Tithi, Nakshatra, Muhurtham, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-bark-300 dark:text-cream-100 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/panchangam', label: 'Today\'s Panchangam' },
                { to: '/calendar', label: 'Hindu Calendar' },
                { to: '/festivals', label: 'Festivals' },
                { to: '/about', label: 'About' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-bark-50/60 dark:text-cream-100/40 hover:text-saffron-500 dark:hover:text-saffron-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Panchangam */}
          <div>
            <h4 className="font-semibold text-bark-300 dark:text-cream-100 mb-4">Panchangam</h4>
            <ul className="space-y-2 text-sm text-bark-50/60 dark:text-cream-100/40">
              <li>Tithi &amp; Nakshatra</li>
              <li>Muhurtham Finder</li>
              <li>Rasi Palan</li>
              <li>Rahu Kalam</li>
              <li>Festival Dates</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-bark-300 dark:text-cream-100 mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm text-bark-50/60 dark:text-cream-100/40 hover:text-saffron-500 dark:hover:text-saffron-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li className="text-sm text-bark-50/60 dark:text-cream-100/40">info@panchangam.app</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-saffron-100 dark:border-bark-50/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-bark-50/40 dark:text-cream-100/30">
            &copy; {new Date().getFullYear()} Panchangam App. All rights reserved.
          </p>
          <p className="text-xs text-bark-50/40 dark:text-cream-100/30 flex items-center gap-1">
            Made with <Heart size={12} className="text-maroon-500" /> for Sanatana Dharma
          </p>
        </div>
      </div>
    </footer>
  )
}