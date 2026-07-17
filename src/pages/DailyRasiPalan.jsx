import { useState } from 'react'
import { getDailyRasiPalan } from '../utils/rasiPalanHelper'
import { RASI_SYMBOLS } from '../data/rasiPalanData'

export default function DailyRasiPalanPage() {
  const [palanList] = useState(() => getDailyRasiPalan(new Date()))

  const todayStr = new Date().toLocaleDateString('ta-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* தலைப்பு */}
      <div className="mb-8">
        <h1 className="section-title">இன்றைய ராசி பலன்</h1>
        <p className="section-subtitle">{todayStr}</p>
      </div>

      {/* 12 ராசி அட்டைகள் */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {palanList.map((item, idx) => (
          <div
            key={item.rasi}
            className="card p-5 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          >
            {/* பின்னணி சின்னம் */}
            <span className="absolute -right-3 -top-4 text-7xl opacity-[0.04] dark:opacity-[0.06] group-hover:opacity-[0.08] transition-opacity select-none pointer-events-none">
              {RASI_SYMBOLS[idx]}
            </span>

            <div className="relative flex items-start gap-3">
              <span className="text-3xl leading-none mt-0.5 shrink-0">
                {RASI_SYMBOLS[idx]}
              </span>
              <div>
                <h3 className="font-bold text-lg text-bark-300 dark:text-cream-100 mb-1.5">
                  {item.rasi}
                </h3>
                <p className="text-sm text-bark-50/70 dark:text-cream-100/50 leading-relaxed">
                  {item.palan}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-bark-50/40 dark:text-cream-100/30 mt-6 text-center">
        * இது ஒரு பொதுவான வழிகாட்டி மட்டுமே. தனிப்பட்ட பலன்களுக்கு உங்கள் ஜாதகத்தை
        பார்க்கவும்.
      </p>
    </div>
  )
}