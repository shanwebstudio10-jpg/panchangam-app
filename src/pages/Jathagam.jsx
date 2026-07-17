import { useState } from 'react'
import { calculateJathagam } from '../utils/jathagamHelper'
import { CITIES, DEFAULT_CITY } from '../data/locations'

export default function JathagamPage() {
  const [dob, setDob] = useState('')
  const [time, setTime] = useState('')
  const [city, setCity] = useState(DEFAULT_CITY)
  const [result, setResult] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!dob || !time) return
    setResult(calculateJathagam(dob, time, city.lat, city.lon))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* தலைப்பு */}
      <div className="mb-8">
        <h1 className="section-title">ஜாதக கணிப்பான்</h1>
        <p className="section-subtitle">
          உங்கள் பிறந்த தேதி, நேரம், இடத்தை உள்ளிட்டு சூரிய ராசி, சந்திர ராசி,
          நட்சத்திரம் மற்றும் கிரக நிலைகளை அறியுங்கள்.
        </p>
      </div>

      {/* படிவம் */}
      <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-bark-300 dark:text-cream-100 mb-1.5">
              பிறந்த தேதி
            </label>
            <input
              type="date"
              value={dob}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDob(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-bark-300 dark:text-cream-100 mb-1.5">
              பிறந்த நேரம் (IST)
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-bark-300 dark:text-cream-100 mb-1.5">
              பிறந்த இடம்
            </label>
            <select
              value={city.value}
              onChange={(e) =>
                setCity(CITIES.find((c) => c.value === e.target.value) || DEFAULT_CITY)
              }
              className="input-field"
            >
              {CITIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="btn-primary">
          ஜாதகம் காண்க
        </button>
      </form>

      {/* முடிவுகள் */}
      {result && (
        <div className="mt-6 space-y-6 animate-slide-up">
          {/* சுருக்க அட்டைகள் */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'சூரிய ராசி', value: result.suryaRasi },
              { label: 'சந்திர ராசி', value: result.chandraRasi },
              { label: 'ஜென்ம நட்சத்திரம்', value: result.nakshatra },
              { label: 'பாதம்', value: `${result.nakPada}-ஆம்` },
            ].map((item) => (
              <div key={item.label} className="card p-4 text-center">
                <p className="text-[11px] uppercase tracking-wider text-bark-50/50 dark:text-cream-100/30">
                  {item.label}
                </p>
                <p className="font-semibold text-bark-300 dark:text-cream-100 mt-1 text-lg">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* கிரக அட்டவணை */}
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-saffron-50 dark:bg-bark-50/20">
                <tr>
                  <th className="text-left px-4 py-3 text-bark-300 dark:text-cream-100 font-semibold">
                    கிரகம்
                  </th>
                  <th className="text-left px-4 py-3 text-bark-300 dark:text-cream-100 font-semibold">
                    ராசி
                  </th>
                  <th className="text-left px-4 py-3 text-bark-300 dark:text-cream-100 font-semibold">
                    பாகை (Sidereal)
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.grahas.map((g, i) => (
                  <tr
                    key={g.name}
                    className={`border-t border-saffron-100 dark:border-bark-50/20 ${
                      i % 2 === 0 ? '' : 'bg-saffron-50/30 dark:bg-bark-50/5'
                    }`}
                  >
                    <td className="px-4 py-2.5 font-medium text-bark-300 dark:text-cream-100">
                      {g.name}
                    </td>
                    <td className="px-4 py-2.5 text-bark-300 dark:text-cream-100">
                      {g.rasi}
                    </td>
                    <td className="px-4 py-2.5 text-bark-50/70 dark:text-cream-100/50 tabular-nums">
                      {g.degree}°
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-bark-50/40 dark:text-cream-100/30">
            * சூரியன் &amp; சந்திரன் துல்லியமான கணக்கீடு. மற்ற கிரகங்கள் —
            சராசரி கிரக நிலை (mean longitude) அடிப்படையில் ஒரு பொது வழிகாட்டி மட்டுமே.
          </p>
        </div>
      )}
    </div>
  )
}