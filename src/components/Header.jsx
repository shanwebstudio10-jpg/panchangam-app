import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Flame } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import SearchBox from './Searchbox'
import { useLanguage } from '../context/LanguageContext'

export default function Header() {
  const { language, translate } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  const navLinks = [
    { to: '/', label: translate('nav.home') },
    { to: '/panchangam', label: translate('nav.panchangam') },
    { to: '/calendar', label: translate('nav.calendar') },
    { to: '/festivals', label: translate('nav.festivals') },
    { to: '/about', label: translate('nav.about') },
    { to: '/contact', label: translate('nav.contact') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* Top accent line */}
      <div className="h-[2px] w-full bg-[#D6FF4F] fixed top-0 left-0 z-[60]" />

      <header
        className={`
          sticky top-[2px] z-50 w-full
          transition-all duration-500
          ${scrolled
            ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl shadow-black/30'
            : 'bg-zinc-950/60 backdrop-blur-sm border-b border-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-sm bg-[#D6FF4F] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110">
                <Flame
                  size={18}
                  strokeWidth={2.5}
                  className="text-zinc-950 relative z-10"
                />
                {/* hover glow */}
                <div className="absolute inset-0 bg-[#D6FF4F] blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
              </div>

              <div className="leading-none select-none">
                <span className="font-display text-lg text-zinc-100 tracking-tight block">
                  పంచాంగం
                </span>
                <span className="font-mono text-[9px] text-zinc-600 tracking-[0.2em] uppercase mt-0.5 block">
                  Panchangam
                </span>
              </div>
            </Link>

            {/* ── Desktop Navigation ── */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map(({ to, label }) => {
                const isActive = pathname === to
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`
                      relative px-3.5 py-2 rounded-sm text-[11px] font-bold tracking-[0.12em] uppercase
                      transition-all duration-300
                      ${isActive
                        ? 'bg-[#D6FF4F] text-zinc-950'
                        : 'text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800/60'
                      }
                    `}
                  >
                    {label}
                  </Link>
                )
              })}
            </nav>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <SearchBox />
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <LanguageToggle />
                <div className="w-px h-5 bg-zinc-800" />
              </div>

              <ThemeToggle />

              <button
                onClick={() => setMobileOpen(prev => !prev)}
                className="
                  md:hidden relative w-9 h-9 rounded-sm
                  flex items-center justify-center
                  text-zinc-400 hover:text-[#D6FF4F]
                  bg-zinc-900/50 border border-zinc-800
                  hover:border-zinc-700
                  transition-all duration-300
                "
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                <div className="relative w-5 h-5">
                  <Menu
                    size={20}
                    className={`
                      absolute inset-0 transition-all duration-300
                      ${mobileOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}
                    `}
                  />
                  <X
                    size={20}
                    className={`
                      absolute inset-0 transition-all duration-300
                      ${mobileOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}
                    `}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`
            md:hidden overflow-hidden
            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="border-t border-zinc-800/80 bg-zinc-950/95 backdrop-blur-md">
            {/* Mobile search */}
            <div className="px-6 pt-4 pb-2 sm:hidden">
              <SearchBox />
            </div>

            {/* Mobile links */}
            <nav className="px-4 pb-5 space-y-0.5">
              {navLinks.map(({ to, label }, i) => {
                const isActive = pathname === to
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-sm
                      text-[11px] font-bold tracking-[0.12em] uppercase
                      transition-all duration-300
                      ${isActive
                        ? 'bg-[#D6FF4F] text-zinc-950'
                        : 'text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800/50'
                      }
                    `}
                    style={{ transitionDelay: mobileOpen ? `${i * 40}ms` : '0ms' }}
                  >
                    {/* Active indicator bar */}
                    <span
                      className={`
                        w-0.5 h-4 rounded-full transition-colors duration-300
                        ${isActive ? 'bg-zinc-950' : 'bg-zinc-800'}
                      `}
                    />
                    {label}
                  </Link>
                )
              })}
            </nav>

            {/* Mobile footer */}
            <div className="px-6 pb-4">
              <div className="h-px bg-zinc-800/60 mb-3" />
              <p className="font-mono text-[9px] text-zinc-700 tracking-[0.15em] uppercase">
                © {new Date().getFullYear()} Panchangam
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}