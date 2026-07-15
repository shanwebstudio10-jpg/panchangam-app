import { useState } from 'react'
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react'
import TodayPanchangam from '../components/Todaypanchangam'

export default function RahuKalamPage() {
  const [date, setDate] = useState(new Date())

  const prevDay = () => {
    const d = new Date(date)
    d.setDate(d.getDate() - 1)
    setDate(d)
  }

  const nextDay = () => {
    const d = new Date(date)
    d.setDate(d.getDate() + 1)
    setDate(d)
  }

  const goToday = () => setDate(new Date())

  const dateStr = date.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const isToday = date.toDateString() === new Date().toDateString()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="section-title">Rahu Kalam</h1>
        <p className="section-subtitle">Check inauspicious timing periods and related Panchangam details for the selected day.</p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <button onClick={prevDay} className="p-2 rounded-xl hover:bg-saffron-50 dark:hover:bg-bark-50/30 transition-colors border border-saffron-100 dark:border-bark-50/20">
          <ChevronLeft size={20} />
        </button>
        <div className="text-center min-w-[220px]">
          <p className="font-semibold text-bark-300 dark:text-cream-100">{dateStr}</p>
          {!isToday && (
            <button onClick={goToday} className="text-xs text-saffron-500 hover:text-saffron-600 mt-1 transition-colors">
              Go to today
            </button>
          )}
        </div>
        <button onClick={nextDay} className="p-2 rounded-xl hover:bg-saffron-50 dark:hover:bg-bark-50/30 transition-colors border border-saffron-100 dark:border-bark-50/20">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mb-6 rounded-2xl border border-red-100 bg-red-50/60 dark:border-red-900/20 dark:bg-red-900/10 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle size={18} className="text-red-500 mt-0.5" />
          <p className="text-sm text-bark-50/70 dark:text-cream-100/60 leading-relaxed">
            Rahu Kalam, Yamagandam, and Gulikai are traditionally considered inauspicious periods for starting new ventures or important rituals.
          </p>
        </div>
      </div>

      <TodayPanchangam date={date} />
    </div>
  )
}
