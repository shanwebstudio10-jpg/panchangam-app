import { useState, useEffect, useMemo } from 'react'
import { Sun, Moon, Sunrise, Sunset, Clock, Star, Sparkles, AlertTriangle } from 'lucide-react'
import { getPanchangamForDate, formatDate } from '../utils/panchangamHelper'

export default function TodayPanchangam({ date }) {
  const [panchangam, setPanchangam] = useState(null)
  const targetDate = useMemo(() => date || new Date(), [date])

  useEffect(() => {
    setPanchangam(getPanchangamForDate(targetDate))
  }, [targetDate])

  if (!panchangam) return null

  const items = [
    { icon: Sunrise, label: 'Sunrise', value: panchangam.sunrise, color: 'text-amber-500' },
    { icon: Sunset, label: 'Sunset', value: panchangam.sunset, color: 'text-orange-500' },
    { icon: Moon, label: 'Tithi', value: panchangam.tithi, color: 'text-indigo-500' },
    { icon: Star, label: 'Nakshatra', value: panchangam.nakshatra, color: 'text-purple-500' },
    { icon: Sparkles, label: 'Yoga', value: panchangam.yoga, color: 'text-emerald-500' },
    { icon: Clock, label: 'Karana', value: panchangam.karana, color: 'text-blue-500' },
  ]

  const inauspicious = [
    { icon: AlertTriangle, label: 'Rahu Kalam', value: panchangam.rahukalam, color: 'text-red-500' },
    { icon: AlertTriangle, label: 'Yamagandam', value: panchangam.yamagandam, color: 'text-red-400' },
    { icon: AlertTriangle, label: 'Gulikai', value: panchangam.gulikai, color: 'text-orange-400' },
  ]

  return (
    <div className="card-glow p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <h2 className="text-xl font-bold text-bark-300 dark:text-cream-100">Today's Panchangam</h2>
          <p className="text-sm text-bark-50/60 dark:text-cream-100/40 mt-0.5">{formatDate(targetDate)}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`badge ${panchangam.isPurnima ? 'badge-festival' : panchangam.isAmavasya ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' : 'badge-spiritual'}`}>
            {panchangam.isPurnima ? 'Purnima' : panchangam.isAmavasya ? 'Amavasya' : panchangam.isEkadashi ? 'Ekadashi' : panchangam.masam}
          </span>
          <span className="badge bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300">
            {panchangam.ayanam}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {items.map(item => (
          <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-saffron-50/50 dark:bg-bark-50/20 hover:bg-saffron-100/60 dark:hover:bg-bark-50/40 transition-colors">
            <item.icon size={18} className={item.color + ' mt-0.5 shrink-0'} />
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-bark-50/50 dark:text-cream-100/30 font-medium">{item.label}</p>
              <p className="text-sm font-semibold text-bark-300 dark:text-cream-100 truncate">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Extra Info Row */}
      <div className="flex flex-wrap gap-3 mb-6 text-xs">
        {[
          { label: 'Samvatsara', value: panchangam.samvatsara },
          { label: 'Ritu', value: panchangam.ritu },
          { label: 'Rashi', value: `${panchangam.rashi.symbol} ${panchangam.rashi.name}` },
          { label: 'Day', value: panchangam.dayHindi },
        ].map(info => (
          <span key={info.label} className="px-3 py-1.5 rounded-lg bg-white dark:bg-bark-100 border border-saffron-100 dark:border-bark-50/20">
            <span className="text-bark-50/50 dark:text-cream-100/30">{info.label}: </span>
            <span className="font-semibold text-bark-300 dark:text-cream-100">{info.value}</span>
          </span>
        ))}
      </div>

      {/* Inauspicious Times */}
      <div>
        <h3 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-3 uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle size={14} /> Inauspicious Times
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {inauspicious.map(item => (
            <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
              <item.icon size={16} className={item.color} />
              <div>
                <p className="text-[11px] uppercase tracking-wider text-red-400 dark:text-red-500/60 font-medium">{item.label}</p>
                <p className="text-sm font-semibold text-red-700 dark:text-red-300">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}