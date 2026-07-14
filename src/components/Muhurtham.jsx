import { useState, useEffect, useMemo } from 'react'
import { Clock, CheckCircle, AlertCircle, MinusCircle, Info } from 'lucide-react'
import { getMuhurthamForDate, formatDate } from '../utils/panchangamHelper'

const qualityIcons = {
  Excellent: CheckCircle,
  Good: CheckCircle,
  Moderate: MinusCircle,
  Avoid: AlertCircle,
}

const qualityColors = {
  Excellent: { bg: 'bg-emerald-50 dark:bg-emerald-900/10', border: 'border-emerald-200 dark:border-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' },
  Good: { bg: 'bg-yellow-50 dark:bg-yellow-900/10', border: 'border-yellow-200 dark:border-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', badge: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
  Moderate: { bg: 'bg-orange-50 dark:bg-orange-900/10', border: 'border-orange-200 dark:border-orange-900/30', text: 'text-orange-700 dark:text-orange-400', badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' },
  Avoid: { bg: 'bg-red-50 dark:bg-red-900/10', border: 'border-red-200 dark:border-red-900/30', text: 'text-red-700 dark:text-red-400', badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' },
}

export default function Muhurtham({ date }) {
  const [muhurtham, setMuhurtham] = useState([])
  const [expanded, setExpanded] = useState(null)
  const targetDate = useMemo(() => date || new Date(), [date])

  useEffect(() => {
    setMuhurtham(getMuhurthamForDate(targetDate))
    setExpanded(null)
  }, [targetDate])

  return (
    <div className="card-glow p-6 md:p-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-400 to-maroon-600 flex items-center justify-center">
          <Clock size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-bark-300 dark:text-cream-100">Muhurtham Finder</h2>
          <p className="text-sm text-bark-50/60 dark:text-cream-100/40">{formatDate(targetDate)}</p>
        </div>
      </div>
      <p className="text-sm text-bark-50/50 dark:text-cream-100/30 mb-6">
        Auspicious times for various activities based on weekday, Tithi, Nakshatra, and Yoga.
      </p>

      <div className="space-y-3">
        {muhurtham.map((item, i) => {
          const colors = qualityColors[item.quality]
          const Icon = qualityIcons[item.quality]
          const isOpen = expanded === i

          return (
            <div key={item.activity} className={`rounded-xl border ${colors.border} ${colors.bg} overflow-hidden transition-all`}>
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className={colors.text} />
                  <div>
                    <p className="font-semibold text-bark-300 dark:text-cream-100">{item.activity}</p>
                    <p className="text-sm text-bark-50/60 dark:text-cream-100/40">{item.time}</p>
                  </div>
                </div>
                <span className={`badge ${colors.badge}`}>{item.quality}</span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-0 animate-slide-up">
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-white/50 dark:bg-bark-100/50">
                    <Info size={14} className="text-bark-50/40 dark:text-cream-100/30 mt-0.5 shrink-0" />
                    <ul className="text-xs text-bark-50/60 dark:text-cream-100/40 space-y-1">
                      {item.reasons.map((r, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${r.startsWith('Favorable') || r.startsWith('Shubha') || r.startsWith('Good') ? 'bg-emerald-400' : 'bg-bark-50/30 dark:bg-cream-100/20'}`} />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}