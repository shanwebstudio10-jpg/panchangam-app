import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import festivals from '../data/festivals.json'
import holidays from '../data/holidays.json'

export default function SearchBox() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSearch(val) {
    setQuery(val)
    if (val.trim().length < 2) { setResults([]); setOpen(false); return }
    const q = val.toLowerCase()
    const festResults = festivals
      .filter(f => f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q))
      .map(f => ({ ...f, source: 'Festival' }))
    const holResults = holidays
      .filter(h => h.name.toLowerCase().includes(q))
      .map(h => ({ ...h, source: 'Holiday', category: h.type }))
    const combined = [...festResults, ...holResults]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 8)
    setResults(combined)
    setOpen(true)
  }

  function handleSelect(item) {
    setOpen(false)
    setQuery('')
    if (item.source === 'Festival') {
      navigate('/festivals', { state: { highlight: item.name } })
    } else {
      navigate('/calendar', { state: { date: item.date } })
    }
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-bark-50/40 dark:text-cream-100/30" />
        <input
          type="text"
          value={query}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Search festivals, holidays..."
          className="w-48 md:w-64 pl-9 pr-8 py-2 rounded-xl text-sm border border-saffron-100 dark:border-bark-50/30 bg-white dark:bg-bark-100 text-bark-300 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-saffron-400 transition-all placeholder:text-bark-50/40 dark:placeholder:text-cream-100/30"
        />
        {query && (
          <button onClick={() => { setQuery(''); setResults([]); setOpen(false) }} className="absolute right-2 top-1/2 -translate-y-1/2">
            <X size={14} className="text-bark-50/40 hover:text-saffron-500" />
          </button>
        )}
      </div>
      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 w-72 md:w-80 bg-white dark:bg-bark-100 rounded-xl border border-saffron-100 dark:border-bark-50/30 shadow-xl z-50 overflow-hidden animate-fade-in">
          {results.map((item, i) => (
            <button
              key={i}
              onClick={() => handleSelect(item)}
              className="w-full text-left px-4 py-3 hover:bg-saffron-50 dark:hover:bg-bark-50/50 transition-colors flex items-start gap-3 border-b border-saffron-50 dark:border-bark-50/20 last:border-0"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-bark-300 dark:text-cream-100 truncate">{item.name}</p>
                <p className="text-xs text-bark-50/60 dark:text-cream-100/40 mt-0.5">
                  {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300">
                    {item.source}
                  </span>
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}