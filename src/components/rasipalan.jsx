import { useState, useEffect, useMemo } from 'react'
import { Star, ChevronDown, ChevronUp, Palette, Hash } from 'lucide-react'
import { getRasiPalan } from '../utils/panchangamHelper'

const ratingColors = {
  Excellent: 'text-emerald-500',
  Good: 'text-blue-500',
  Average: 'text-yellow-500',
  Challenging: 'text-red-500',
}

const ratingBg = {
  Excellent: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  Good: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  Average: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  Challenging: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
}

export default function RasiPalan({ date, compact = false }) {
  const [palan, setPalan] = useState([])
  const [expanded, setExpanded] = useState(null)
  const targetDate = useMemo(() => date || new Date(), [date])

  useEffect(() => {
    setPalan(getRasiPalan(targetDate))
    setExpanded(null)
  }, [targetDate])

  // Compact mode: rating & preview மட்டும் காட்டும்
  if (compact) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {palan.map(rasi => (
          <div key={rasi.name} className="card p-3 hover:-translate-y-0.5 transition-all cursor-default">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{rasi.symbol}</span>
              <div>
                <p className="font-semibold text-sm text-bark-300 dark:text-cream-100">{rasi.name}</p>
                <p className="text-[10px] text-bark-50/40 dark:text-cream-100/30">{rasi.english}</p>
              </div>
            </div>
            <span className={`badge text-[10px] ${ratingBg[rasi.rating]}`}>{rasi.rating}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {palan.map((rasi, i) => {
        const isOpen = expanded === i
        return (
          <div key={rasi.name} className="card overflow-hidden hover:shadow-md transition-all">
            <button
              onClick={() => setExpanded(isOpen ? null : i)}
              className="w-full flex items-center justify-between p-4 md:p-5 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saffron-100 to-saffron-200 dark:from-saffron-900/30 dark:to-saffron-800/20 flex items-center justify-center text-2xl shrink-0">
                  {rasi.symbol}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-bark-300 dark:text-cream-100">{rasi.name}</p>
                    <span className="text-xs text-bark-50/50 dark:text-cream-100/30">({rasi.english})</span>
                    <span className="text-[10px] text-bark-50/40 dark:text-cream-100/30">Lord: {rasi.lord}</span>
                  </div>
                  <p className="text-sm text-bark-50/60 dark:text-cream-100/40 mt-0.5 line-clamp-1">{rasi.prediction}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <span className={`hidden sm:inline-block badge text-[10px] ${ratingBg[rasi.rating]}`}>{rasi.rating}</span>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-0 animate-slide-up">
                <div className="pt-4 border-t border-saffron-100 dark:border-bark-50/20 space-y-3">
                  <p className="text-sm text-bark-50/70 dark:text-cream-100/50 leading-relaxed">{rasi.prediction}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="flex items-center gap-1.5 text-xs text-bark-50/60 dark:text-cream-100/40">
                      <Hash size={12} /> Lucky: {rasi.luckyNumber}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-bark-50/60 dark:text-cream-100/40">
                      <Palette size={12} /> Color: {rasi.luckyColor}
                    </span>
                    <span className="text-xs text-bark-50/60 dark:text-cream-100/40">
                      Element: {rasi.element}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}