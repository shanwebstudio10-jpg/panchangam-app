import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Flame } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import SearchBox from './SearchBox'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/panchangam', label: 'Panchangam' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/festivals', label: 'Festivals' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-bark-400/80 backdrop-blur-xl border-b border-saffron-100 dark:border-bark-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-saffron-500 to-maroon-700 flex items-center justify-center shadow-lg shadow-saffron-500/20 group-hover:shadow-saffron-500/40 transition-shadow">
              <Flame size={20} className="text-white" />
            </div>
            <div className="leading-tight">
              <span className="font-display text-xl text-bark-300 dark:text-cream-100">పంచాంగం</span>
              <span className="hidden sm:block text-[10px] text-bark-50/50 dark:text-cream-100/40 -mt-0.5 tracking-widest uppercase">Panchangam</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.to
                    ? 'bg-saffron-100 dark:bg-saffron-900/30 text-saffron-600 dark:text-saffron-400'
                    : 'text-bark-50/70 dark:text-cream-100/60 hover:text-saffron-600 dark:hover:text-saffron-400 hover:bg-saffron-50 dark:hover:bg-bark-50/30'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <SearchBox />
            </div>
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-saffron-50 dark:hover:bg-bark-50/30 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-saffron-100 dark:border-bark-50/20 bg-white dark:bg-bark-400 animate-fade-in">
          <div className="px-4 py-3 sm:hidden">
            <SearchBox />
          </div>
          <nav className="px-4 pb-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  pathname === link.to
                    ? 'bg-saffron-100 dark:bg-saffron-900/30 text-saffron-600 dark:text-saffron-400'
                    : 'text-bark-50/70 dark:text-cream-100/60 hover:bg-saffron-50 dark:hover:bg-bark-50/30'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}