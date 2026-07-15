import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import RasiPalanComponent from '../components/Rasipalan'

export default function RasiPalanPage() {
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
        <h1 className="section-title">Rasi Palan</h1>
        <p className="section-subtitle">Daily zodiac predictions for all 12 Rashis.</p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-8">
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

      <RasiPalanComponent date={date} />
    </div>
  )
}
