import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getPanchangamForDate } from '../utils/panchangamHelper'
import festivals from '../data/festivals.json'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

// 构建节日日期快速查找表
const festMap = {}
festivals.forEach(f => {
  if (!festMap[f.date]) festMap[f.date] = []
  festMap[f.date].push(f)
})

export default function CalendarView({ selectedDate, onDateSelect }) {
  const [viewDate, setViewDate] = useState(selectedDate || new Date())
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  // 获取当月所有天的 Panchangam 摘要
  const daysData = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d)
      const p = getPanchangamForDate(date)
      const fests = festMap[p.date] || []
      days.push({ date, day: d, panchangam: p, festivals: fests })
    }
    return { firstDay, days }
  }, [year, month])

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))
  const goToday = () => { setViewDate(new Date()); onDateSelect && onDateSelect(new Date()) }

  const isSelected = (d) => selectedDate && d.date.toDateString() === selectedDate.toDateString()
  const isToday = (d) => d.date.toDateString() === new Date().toDateString()

  // 空白填充
  const blanks = Array.from({ length: daysData.firstDay }, (_, i) => (
    <div key={`b-${i}`} className="aspect-square" />
  ))

  return (
    <div className="card p-4 md:p-6">
      {/* 导航头 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-saffron-50 dark:hover:bg-bark-50/30 transition-colors" aria-label="Previous month">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-saffron-50 dark:hover:bg-bark-50/30 transition-colors" aria-label="Next month">
            <ChevronRight size={20} />
          </button>
        </div>
        <h3 className="font-display text-xl md:text-2xl text-bark-300 dark:text-cream-100">
          {MONTHS[month]} {year}
        </h3>
        <button onClick={goToday} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-saffron-100 dark:bg-saffron-900/30 text-saffron-600 dark:text-saffron-400 hover:bg-saffron-200 dark:hover:bg-saffron-900/50 transition-colors">
          Today
        </button>
      </div>

      {/* 星期头 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map(w => (
          <div key={w} className="text-center text-[11px] font-semibold uppercase tracking-wider text-bark-50/50 dark:text-cream-100/30 py-2">
            {w}
          </div>
        ))}
      </div>

      {/* 日期网格 */}
      <div className="grid grid-cols-7 gap-1">
        {blanks}
        {daysData.days.map(d => {
          const selected = isSelected(d)
          const today = isToday(d)
          const hasFest = d.festivals.length > 0
          const isPurnima = d.panchangam.isPurnima
          const isAmavasya = d.panchangam.isAmavasya

          let ringClass = ''
          if (selected) ringClass = 'ring-2 ring-saffron-500 bg-saffron-100 dark:bg-saffron-900/40'
          else if (today) ringClass = 'ring-2 ring-saffron-400'
          else ringClass = 'hover:bg-saffron-50 dark:hover:bg-bark-50/30'

          let textColor = 'text-bark-300 dark:text-cream-100'
          if (isPurnima) textColor = 'text-yellow-600 dark:text-yellow-400'
          if (isAmavasya) textColor = 'text-gray-500 dark:text-gray-400'

          return (
            <button
              key={d.day}
              onClick={() => onDateSelect && onDateSelect(d.date)}
              className={`aspect-square flex flex-col items-center justify-center rounded-xl transition-all duration-200 ${ringClass} ${textColor} relative group`}
              title={`${d.day} ${MONTHS[month]} — ${d.panchangam.tithi}, ${d.panchangam.nakshatra}`}
            >
              <span className={`text-sm font-semibold ${today && !selected ? 'bg-saffron-500 text-white w-7 h-7 rounded-full flex items-center justify-center' : ''}`}>
                {d.day}
              </span>
              {/* 指示点 */}
              <div className="flex gap-0.5 mt-0.5">
                {hasFest && <span className="w-1.5 h-1.5 rounded-full bg-saffron-500" />}
                {isPurnima && <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />}
                {isAmavasya && <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-bark-300 dark:bg-bark-50 text-cream-100 dark:text-bark-300 text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                <div className="font-semibold">{d.panchangam.tithi}</div>
                <div className="text-cream-100/60 dark:text-bark-300/60">{d.panchangam.nakshatra}</div>
                {d.festivals.map(f => (
                  <div key={f.id} className="text-saffron-300">{f.name}</div>
                ))}
              </div>
            </button>
          )
        })}
      </div>

      {/* 图例 */}
      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-saffron-100 dark:border-bark-50/20 text-xs text-bark-50/50 dark:text-cream-100/40">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-saffron-500" /> Festival</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-400" /> Purnima</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-400" /> Amavasya</span>
      </div>
    </div>
  )
}