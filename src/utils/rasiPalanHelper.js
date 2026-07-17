import { RASI_TA, RASI_PALAN_POOL } from '../data/rasiPalanData'

function dayOfYear(d) {
  const start = new Date(Date.UTC(d.getFullYear(), 0, 0))
  return Math.floor((d - start) / 86400000)
}

/**
 * ஒவ்வொரு நாளும் மாறும் 12 ராசி பலன்களின் பட்டியலை தரும்
 * pool-ல் 20 பலன்கள் இருப்பதால், ஒவ்வொரு ராசிக்கும் வெவ்வேறு பலன் கிடைக்கும்
 */
export function getDailyRasiPalan(date = new Date()) {
  const doy = dayOfYear(date)
  return RASI_TA.map((rasi, idx) => ({
    rasi,
    palan: RASI_PALAN_POOL[(doy + idx) % RASI_PALAN_POOL.length],
  }))
}