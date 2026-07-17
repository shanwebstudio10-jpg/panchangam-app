import { useState } from 'react'
import { CheckCircle, AlertTriangle } from 'lucide-react'
import { NAKSHATRA_TA } from '../data/nakshatraTamil'
import { taraBalam } from '../utils/poruthamHelper'

export default function PoruthamPage() {
  const [boyIdx, setBoyIdx] = useState(0)
  const [girlIdx, setGirlIdx] = useState(0)
  const [result, setResult] = useState(null)

  const handleCheck = () => {
    setResult(taraBalam(boyIdx, girlIdx))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* தலைப்பு */}
      <div className="mb-8">
        <h1 className="section-title">நட்சத்திர பொருத்தம்</h1>
        <p className="section-subtitle">
          மணமகன் &amp; மணமகள் நட்சத்திரங்களைத் தேர்ந்தெடுத்து அடிப்படை தார பலப்
          பொருத்தத்தை அறியுங்கள்.
        </p>
      </div>

      {/* தேர்வு பகுதி */}
      <div className="card p-6 md:p-8 flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[140px]">
          <label className="block text-sm font-medium text-bark-300 dark:text-cream-100 mb-1.5">
            மணமகன் நட்சத்திரம்
          </label>
          <select
            value={boyIdx}
            onChange={(e) => setBoyIdx(Number(e.target.value))}
            className="input-field"
          >
            {NAKSHATRA_TA.map((n, i) => (
              <option key={i} value={i}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <span className="font-bold text-saffron-500 text-xl pb-2">&amp;</span>

        <div className="flex-1 min-w-[140px]">
          <label className="block text-sm font-medium text-bark-300 dark:text-cream-100 mb-1.5">
            மணமகள் நட்சத்திரம்
          </label>
          <select
            value={girlIdx}
            onChange={(e) => setGirlIdx(Number(e.target.value))}
            className="input-field"
          >
            {NAKSHATRA_TA.map((n, i) => (
              <option key={i} value={i}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleCheck} className="btn-primary">
          பொருத்தம் பார்க்க
        </button>
      </div>

      {/* முடிவு */}
      {result && (
        <div
          className={`card-glow mt-6 p-6 md:p-8 border-l-4 animate-slide-up ${
            result.good
              ? 'border-emerald-500'
              : 'border-amber-500'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            {result.good ? (
              <CheckCircle size={22} className="text-emerald-500" />
            ) : (
              <AlertTriangle size={22} className="text-amber-500" />
            )}
            <h3 className="font-bold text-lg text-bark-300 dark:text-cream-100">
              {result.good
                ? 'தார பலம் பொருந்துகிறது'
                : 'தார பலத்தில் குறை உள்ளது'}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-saffron-50/50 dark:bg-bark-50/10 rounded-lg p-3">
              <p className="text-xs text-bark-50/50 dark:text-cream-100/30">
                {NAKSHATRA_TA[boyIdx]} → {NAKSHATRA_TA[girlIdx]}
              </p>
              <p className="text-2xl font-bold text-bark-300 dark:text-cream-100 mt-1">
                {result.c1}
              </p>
            </div>
            <div className="bg-saffron-50/50 dark:bg-bark-50/10 rounded-lg p-3">
              <p className="text-xs text-bark-50/50 dark:text-cream-100/30">
                {NAKSHATRA_TA[girlIdx]} → {NAKSHATRA_TA[boyIdx]}
              </p>
              <p className="text-2xl font-bold text-bark-300 dark:text-cream-100 mt-1">
                {result.c2}
              </p>
            </div>
          </div>

          <p className="text-sm text-bark-50/70 dark:text-cream-100/50 leading-relaxed">
            {result.good
              ? 'இந்த இரு நட்சத்திரங்களுக்கும் இடையே அடிப்படை தார பலப் பொருத்தம் நல்ல முறையில் அமைந்துள்ளது. இருப்பினும், முழுமையான பொருத்தத்திற்கு பத்து பொருத்தங்களையும் பரிசோதிக்க வேண்டும்.'
              : 'விபத், பிரத்யக் அல்லது நைதன தாரையில் விழுவதால் கூடுதல் கவனம் தேவை. முழுமையான மதிப்பீட்டிற்கு ஒரு நல்ல ஜோதிடரை அணுகுங்கள்.'}
          </p>
        </div>
      )}

      <p className="text-xs text-bark-50/40 dark:text-cream-100/30 mt-4">
        * இது தார பலம் அடிப்படையிலான ஒரு எளிய குறிப்பு மட்டுமே. முழுமையான
        விவாக பொருத்தத்திற்கு தசப்பொருத்தம் பரிசோதனை அவசியம்.
      </p>
    </div>
  )
}