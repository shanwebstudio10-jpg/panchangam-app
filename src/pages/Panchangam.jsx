import { useState } from 'react'
import TodayPanchangam from '../components/Todaypanchangam'
import Muhurtham from '../components/Muhurtham'
import RasiPalan from '../components/Rasipalan'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Panchangam() {
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

  const dateStr = date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const isToday = date.toDateString() === new Date().toDateString()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="section-title">Panchangam</h1>
        <p className="section-subtitle">Detailed daily Panchangam with Muhurtham and Rasi Palan</p>
      </div>

      {/* 日期选择器 */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <button onClick={prevDay} className="p-2 rounded-xl hover:bg-saffron-50 dark:hover:bg-bark-50/30 transition-colors border border-saffron-100 dark:border-bark-50/20">
          <ChevronLeft size={20} />
        </button>
        <div className="text-center min-w-[200px]">
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

      <div className="space-y-8">
        <TodayPanchangam date={date} />
        <Muhurtham date={date} />

        <div>
          <h2 className="section-title mb-2">Rasi Palan</h2>
          <p className="section-subtitle mb-6">Daily predictions for all 12 zodiac signs</p>
          <RasiPalan date={date} />
        </div>
      </div>
    </div>
  )
}