import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Star, Clock, Sparkles, Flame } from 'lucide-react'
import TodayPanchangam from '../components/Todaypanchangam'
import CalendarView from '../components/Calendar'
import FestivalList from '../components/Festivallist'
import Muhurtham from '../components/Muhurtham'
import RasiPalan from '../components/Rasipalan'
import LocalAdBanner from '../components/LocalAdBanner'
import festivals from '../data/festivals.json'
import { getUpcomingFestivals, daysUntil, getPanchangamForDate } from '../utils/panchangamHelper'

export default function Home() {
  const [todayPanchangam, setTodayPanchangam] = useState(null)
  const upcoming = getUpcomingFestivals(festivals, 6)

  useEffect(() => {
    setTodayPanchangam(getPanchangamForDate(new Date()))
  }, [])

  return (
    <div className="animate-fade-in">
      {/* ====== HERO ====== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-saffron-600 via-maroon-700 to-bark-300 text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-saffron-400/10 animate-float" />
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gold-400/10 animate-float-delayed" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-white/5 animate-spin-slow" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full border border-white/5 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Flame size={20} className="text-saffron-300" />
              <span className="text-saffron-200 text-sm font-medium tracking-wider uppercase">Shubhakruthu Samvatsara</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-tight mb-4">
              పంచాంగం
            </h1>
            <p className="text-xl md:text-2xl text-cream-100/80 font-light mb-2">
              Your Daily Hindu Calendar &amp; Almanac
            </p>
            {todayPanchangam && (
              <p className="text-cream-100/50 text-sm md:text-base mb-8">
                {todayPanchangam.dayHindi} &middot; {todayPanchangam.tithi} &middot; {todayPanchangam.nakshatra} Nakshatra &middot; {todayPanchangam.masam}
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              <Link to="/panchangam" className="inline-flex items-center gap-2 bg-white text-saffron-700 font-semibold px-6 py-3 rounded-xl hover:bg-cream-100 active:scale-95 transition-all shadow-xl shadow-black/20">
                Today's Panchangam <ArrowRight size={18} />
              </Link>
              <Link to="/calendar" className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 active:scale-95 transition-all">
                <Calendar size={18} /> View Calendar
              </Link>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4 absolute right-6 top-1/2 -translate-y-1/2">
            {[
              { icon: Star, label: 'Nakshatra', value: todayPanchangam?.nakshatra || '—' },
              { icon: Clock, label: 'Rahu Kalam', value: todayPanchangam?.rahukalam || '—' },
              { icon: Sparkles, label: 'Yoga', value: todayPanchangam?.yoga || '—' },
              { icon: Calendar, label: 'Ayanam', value: todayPanchangam?.ayanam || '—' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/15 transition-all">
                <stat.icon size={18} className="text-saffron-300 mb-2" />
                <p className="text-[10px] uppercase tracking-wider text-cream-100/40">{stat.label}</p>
                <p className="font-semibold text-sm text-white mt-0.5">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" className="fill-cream-100 dark:fill-bark-400" />
          </svg>
        </div>
      </section>

      {/* ====== TODAY'S PANCHANGAM ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-2 relative z-10">
        <TodayPanchangam />
      </section>

      {/* ====== LOCAL AD BANNER ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <LocalAdBanner rotateSeconds={8} />
      </section>

      {/* ====== UPCOMING FESTIVALS ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Upcoming Festivals</h2>
            <p className="section-subtitle">Important dates to remember</p>
          </div>
          <Link to="/festivals" className="hidden sm:flex items-center gap-2 text-saffron-500 hover:text-saffron-600 font-semibold text-sm transition-colors">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {upcoming.map(f => {
            const days = daysUntil(f.date)
            return (
              <Link to="/festivals" key={f.id} className="card p-5 hover:-translate-y-1 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-bark-300 dark:text-cream-100 group-hover:text-saffron-500 dark:group-hover:text-saffron-400 transition-colors">{f.name}</h3>
                    <p className="text-sm text-bark-50/60 dark:text-cream-100/40 mt-0.5">
                      {new Date(f.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-saffron-500">{days}</p>
                    <p className="text-[10px] text-bark-50/40 dark:text-cream-100/30 uppercase">days</p>
                  </div>
                </div>
                <p className="text-sm text-bark-50/50 dark:text-cream-100/30 line-clamp-2">{f.description}</p>
                <div className="mt-3 pt-3 border-t border-saffron-100 dark:border-bark-50/20">
                  <span className={`badge-${f.category === 'newyear' ? 'newyear' : f.category}`}>
                    {f.category}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
        <Link to="/festivals" className="sm:hidden flex items-center justify-center gap-2 text-saffron-500 font-semibold text-sm mt-6">
          View All Festivals <ArrowRight size={16} />
        </Link>
      </section>

      {/* ====== RASI PALAN PREVIEW ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Rasi Palan</h2>
            <p className="section-subtitle">Daily zodiac predictions for all 12 rashis</p>
          </div>
          <Link to="/panchangam" className="hidden sm:flex items-center gap-2 text-saffron-500 hover:text-saffron-600 font-semibold text-sm transition-colors">
            Full Details <ArrowRight size={16} />
          </Link>
        </div>
        <RasiPalan compact />
      </section>

      {/* ====== QUICK LINKS ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { to: '/panchangam', icon: Sparkles, title: 'Full Panchangam', desc: 'Detailed daily Panchangam with all elements' },
            { to: '/calendar', icon: Calendar, title: 'Hindu Calendar', desc: 'Monthly calendar with Tithi and Nakshatra' },
            { to: '/festivals', icon: Star, title: 'Festival Guide', desc: 'Complete list of festivals and celebrations' },
            { to: '/contact', icon: Flame, title: 'Contact Us', desc: 'Questions, feedback, or custom Panchangam' },
          ].map(link => (
            <Link key={link.to} to={link.to} className="card p-6 hover:-translate-y-1 transition-all group text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-saffron-100 to-saffron-200 dark:from-saffron-900/30 dark:to-saffron-800/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <link.icon size={24} className="text-saffron-500" />
              </div>
              <h3 className="font-bold text-bark-300 dark:text-cream-100 group-hover:text-saffron-500 dark:group-hover:text-saffron-400 transition-colors">{link.title}</h3>
              <p className="text-sm text-bark-50/50 dark:text-cream-100/30 mt-1">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}