import { useState } from 'react'
import { Calendar, Filter } from 'lucide-react'
import { daysUntil } from '../utils/panchangamHelper'

const CATEGORIES = ['all', 'festival', 'spiritual', 'harvest', 'family', 'auspicious', 'cultural', 'newyear']

const categoryGradients = {
  festival: 'from-saffron-400 to-maroon-600',
  spiritual: 'from-purple-400 to-indigo-600',
  harvest: 'from-emerald-400 to-green-600',
  family: 'from-pink-400 to-rose-600',
  auspicious: 'from-yellow-400 to-amber-600',
  cultural: 'from-teal-400 to-cyan-600',
  newyear: 'from-gold-400 to-saffron-600',
}

const categoryEmojis = {
  festival: '🪔',
  spiritual: '🙏',
  harvest: '🌾',
  family: '🪢',
  auspicious: '✨',
  cultural: '🎭',
  newyear: '🎉',
}

export default function FestivalList({ festivals: festData, highlight }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [showFilter, setShowFilter] = useState(false)

  const filtered = activeCategory === 'all'
    ? festData
    : festData.filter(f => f.category === activeCategory)

  const sorted = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div>
      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-bark-50/60 dark:text-cream-100/40">
          Showing {sorted.length} {sorted.length === 1 ? 'festival' : 'festivals'}
        </p>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            showFilter
              ? 'bg-saffron-500 text-white'
              : 'bg-saffron-50 dark:bg-bark-50/30 text-bark-50/70 dark:text-cream-100/60 hover:bg-saffron-100 dark:hover:bg-bark-50/50'
          }`}
        >
          <Filter size={14} /> Filter
        </button>
      </div>

      {/* Category Filter */}
      {showFilter && (
        <div className="flex flex-wrap gap-2 mb-6 animate-slide-up">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                activeCategory === cat
                  ? 'bg-saffron-500 text-white shadow-lg shadow-saffron-500/25'
                  : 'bg-saffron-50 dark:bg-bark-50/30 text-bark-50/70 dark:text-cream-100/60 hover:bg-saffron-100 dark:hover:bg-bark-50/50'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      )}

      {/* Festival Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map(festival => {
          const days = daysUntil(festival.date)
          const isPast = days < 0
          const isToday = days === 0
          const grad = categoryGradients[festival.category] || 'from-saffron-400 to-maroon-600'
          const emoji = categoryEmojis[festival.category] || '🪔'
          const isHighlighted = highlight && festival.name.toLowerCase().includes(highlight.toLowerCase())

          return (
            <div
              key={festival.id}
              className={`card overflow-hidden group hover:-translate-y-1 transition-all duration-300 ${isHighlighted ? 'ring-2 ring-saffron-500' : ''}`}
            >
              {/* 顶部彩色条 */}
              <div className={`h-24 bg-gradient-to-br ${grad} relative overflow-hidden`}>
                <span className="absolute text-4xl opacity-30 right-3 bottom-1 select-none">{emoji}</span>
                <div className="absolute top-3 left-3">
                  <span className={`badge-${festival.category === 'newyear' ? 'newyear' : festival.category}`}>
                    {festival.category}
                  </span>
                </div>
                {festival.type === 'major' && (
                  <span className="absolute top-3 right-3 badge bg-white/20 text-white backdrop-blur-sm">
                    Major
                  </span>
                )}
              </div>

              {/* 内容 */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-bark-300 dark:text-cream-100 group-hover:text-saffron-500 dark:group-hover:text-saffron-400 transition-colors">
                  {festival.name}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-sm text-bark-50/60 dark:text-cream-100/40">
                  <Calendar size={14} />
                  <span>{new Date(festival.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <p className="text-sm text-bark-50/60 dark:text-cream-100/40 mt-3 line-clamp-2 leading-relaxed">
                  {festival.description}
                </p>

                {/* 倒计时 */}
                <div className="mt-4 pt-3 border-t border-saffron-100 dark:border-bark-50/20">
                  {isToday ? (
                    <span className="text-sm font-bold text-saffron-600 dark:text-saffron-400 animate-pulse">Today!</span>
                  ) : isPast ? (
                    <span className="text-sm text-bark-50/40 dark:text-cream-100/30">Passed</span>
                  ) : (
                    <span className="text-sm font-semibold text-saffron-600 dark:text-saffron-400">
                      In {days} day{days !== 1 ? 's' : ''}
                    </span>
                  )}
                  <span className="text-xs text-bark-50/40 dark:text-cream-100/30 ml-2">
                    {festival.celebration.split(',').slice(0, 2).join(', ')}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-16">
          <p className="text-bark-50/40 dark:text-cream-100/30 text-lg">No festivals found in this category.</p>
        </div>
      )}
    </div>
  )
}