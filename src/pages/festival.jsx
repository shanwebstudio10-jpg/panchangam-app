import { useLocation } from 'react-router-dom'
import FestivalList from '../components/FestivalList'
import festivals from '../data/festivals.json'

export default function Festival() {
  const location = useLocation()
  const highlight = location.state?.highlight || null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="section-title">Festivals &amp; Celebrations</h1>
        <p className="section-subtitle">
          Complete guide to {festivals.length} Hindu festivals, vrats, and observances for 2025
        </p>
      </div>

      {/* 统计条 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', value: festivals.length, color: 'from-saffron-400 to-saffron-600' },
          { label: 'Major', value: festivals.filter(f => f.type === 'major').length, color: 'from-maroon-500 to-maroon-700' },
          { label: 'Spiritual', value: festivals.filter(f => f.category === 'spiritual').length, color: 'from-purple-400 to-indigo-600' },
          { label: 'Upcoming', value: festivals.filter(f => new Date(f.date) >= new Date()).length, color: 'from-emerald-400 to-green-600' },
        ].map(stat => (
          <div key={stat.label} className="card p-4 text-center">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-2`}>
              <span className="text-white font-bold text-lg">{stat.value}</span>
            </div>
            <p className="text-xs text-bark-50/50 dark:text-cream-100/30 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      <FestivalList festivals={festivals} highlight={highlight} />
    </div>
  )
}