import { Link } from 'react-router-dom'
import { Flame, ArrowUpRight, Mail, MapPin } from 'lucide-react'

const footerNav = {
  panchangam: [
    { to: '/panchangam', label: 'Daily Panchangam' },
    { to: '/calendar', label: 'Hindu Calendar' },
    { to: '/festivals', label: 'Festivals & Vrats' },
    { to: '/muhurtham', label: 'Muhurtham' },
  ],
  resources: [
    { to: '/tithi', label: 'Tithi Calculator' },
    { to: '/nakshatra', label: 'Nakshatra Finder' },
    { to: '/yoga', label: 'Yoga Calculator' },
    { to: '/karanam', label: 'Karanam' },
  ],
  company: [
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/disclaimer', label: 'Disclaimer' },
  ],
}

const socialLinks = [
  { label: 'Twitter', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'Telegram', href: '#' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-800/60">
      {/* ── Top glow line ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#D6FF4F]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* ── Main Footer Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 py-16 lg:py-20">
          {/* ── Brand Column ── */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-sm bg-[#D6FF4F] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Flame size={18} strokeWidth={2.5} className="text-zinc-950" />
              </div>
              <div className="leading-none">
                <span className="font-display text-lg text-zinc-100 tracking-tight block">
                  పంచాంగం
                </span>
                <span className="font-mono text-[9px] text-zinc-600 tracking-[0.2em] uppercase mt-0.5 block">
                  Panchangam
                </span>
              </div>
            </Link>

            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Accurate Hindu calendar and Panchangam data based on
              Vedic astronomy. Trusted by millions for daily tithi,
              nakshatra, yoga, and muhurtham calculations.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 pt-2">
              <a
                href="mailto:hello@panchangam.app"
                className="flex items-center gap-2.5 text-xs text-zinc-600 hover:text-[#D6FF4F] transition-colors duration-300 group"
              >
                <Mail size={14} className="text-zinc-700 group-hover:text-[#D6FF4F] transition-colors duration-300" />
                <span className="font-mono tracking-wide">hello@panchangam.app</span>
              </a>
              <div className="flex items-center gap-2.5 text-xs text-zinc-600">
                <MapPin size={14} className="text-zinc-700" />
                <span className="font-mono tracking-wide">Hyderabad, India</span>
              </div>
            </div>
          </div>

          {/* ── Nav Columns ── */}
          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading} className="lg:col-span-2">
              <h3 className="font-mono text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase mb-5">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="
                        group inline-flex items-center gap-1.5
                        text-[13px] text-zinc-500
                        hover:text-zinc-100
                        transition-colors duration-300
                      "
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[#D6FF4F] transition-all duration-300" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ── Newsletter / CTA Column ── */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase mb-5">
              Stay Updated
            </h3>
            <div className="space-y-4">
              <p className="text-[13px] text-zinc-600 leading-relaxed">
                Get festival alerts and daily panchangam in your inbox.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-2.5"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="
                    w-full px-3 py-2.5 rounded-sm
                    bg-zinc-900/60 border border-zinc-800
                    text-xs text-zinc-300 font-mono
                    placeholder:text-zinc-700
                    focus:outline-none focus:border-[#D6FF4F]/50
                    transition-colors duration-300
                  "
                />
                <button
                  type="submit"
                  className="
                    w-full px-3 py-2.5 rounded-sm
                    bg-[#D6FF4F] text-zinc-950
                    text-[11px] font-bold tracking-[0.1em] uppercase
                    hover:bg-[#c8f240] active:scale-[0.98]
                    transition-all duration-300
                  "
                >
                  Subscribe
                </button>
              </form>

              {/* Social links */}
              <div className="pt-2 flex flex-wrap gap-2">
                {socialLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="
                      inline-flex items-center gap-1
                      px-2.5 py-1.5 rounded-sm
                      border border-zinc-800/60
                      text-[10px] font-mono text-zinc-600 tracking-wider uppercase
                      hover:border-[#D6FF4F]/30 hover:text-[#D6FF4F]
                      transition-all duration-300
                    "
                  >
                    {label}
                    <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-zinc-800/40" />

        {/* ── Bottom Bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="font-mono text-[10px] text-zinc-700 tracking-[0.15em] uppercase">
            © {currentYear} Panchangam. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="font-mono text-[10px] text-zinc-700 tracking-wider uppercase hover:text-zinc-400 transition-colors duration-300"
            >
              Privacy
            </Link>
            <span className="text-zinc-800">·</span>
            <Link
              to="/terms"
              className="font-mono text-[10px] text-zinc-700 tracking-wider uppercase hover:text-zinc-400 transition-colors duration-300"
            >
              Terms
            </Link>
            <span className="text-zinc-800">·</span>
            <Link
              to="/disclaimer"
              className="font-mono text-[10px] text-zinc-700 tracking-wider uppercase hover:text-zinc-400 transition-colors duration-300"
            >
              Disclaimer
            </Link>
          </div>

          {/* Scroll-to-top indicator */}
          <div className="hidden sm:flex items-center gap-2 text-zinc-800">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D6FF4F]/40" />
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase">Top</span>
          </div>
        </div>
      </div>

      {/* ── Bottom accent line ── */}
      <div className="h-[2px] w-full bg-[#D6FF4F]/20" />
    </footer>
  )
}