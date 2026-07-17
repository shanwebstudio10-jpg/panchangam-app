/**
 * பஞ்சாங்கம் — வானியல் கணக்கீட்டு இயந்திரம்
 * சூரியன் & சந்திரன்: Meeus வானியல் வார்ப்புருக்கள் (நியாய துல்லியம்)
 * மற்ற கிரகங்கள்: J2000.0 சராசரி நீளங்கள் (mean longitude)
 * அயனாம்சம்: லாகிரி (Lahiri)
 */

// ─── ஜூலியன் தேதி ───
export function jdFromUTC(date) {
  const y = date.getUTCFullYear()
  const m = date.getUTCMonth() + 1
  const d =
    date.getUTCDate() +
    date.getUTCHours() / 24 +
    date.getUTCMinutes() / 1440 +
    date.getUTCSeconds() / 86400

  let Y = y
  let M = m
  if (M <= 2) {
    Y -= 1
    M += 12
  }
  const A = Math.floor(Y / 100)
  const B = 2 - A + Math.floor(A / 4)
  return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + d + B - 1524.5
}

// ─── கணித உதவிகள் ───
function norm360(x) {
  return ((x % 360) + 360) % 360
}
function toRad(deg) {
  return (deg * Math.PI) / 180
}

// ─── சூரியன் நிலையலைவு (Tropical, Meeus Ch.25) ───
export function sunLongitudeJD(jd) {
  const T = (jd - 2451545.0) / 36525.0
  const L0 = norm360(280.46646 + 36000.76983 * T + 0.0003032 * T * T)
  const M = norm360(357.52911 + 35999.05029 * T - 0.0001537 * T * T)
  const Mrad = toRad(M)
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad) +
    0.000289 * Math.sin(3 * Mrad)
  return norm360(L0 + C)
}

// ─── சந்திரன் நிலையலைவு (Tropical, Meeus Ch.47 simplified) ───
export function moonLongitudeJD(jd) {
  const T = (jd - 2451545.0) / 36525.0
  const T2 = T * T
  const T3 = T2 * T
  const T4 = T3 * T

  const Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T2 + T3 / 538841.0 - T4 / 65194000.0
  const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T2 + T3 / 545868.0 - T4 / 113065000.0
  const M = 134.9633964 + 477198.8675055 * T + 0.0087414 * T2 + T3 / 69699.0 - T4 / 14712000.0
  const Ms = 357.5291092 + 35999.0502909 * T - 0.0001536 * T2 + T3 / 24490000.0
  const F = 93.2720950 + 483202.0175233 * T - 0.0036539 * T2 - T3 / 3526000.0 + T4 / 863310000.0

  const Mrad = toRad(M)
  const Drad = toRad(D)
  const Msrad = toRad(Ms)
  const Frad = toRad(F)

  const lon =
    Lp +
    6.289 * Math.sin(Mrad) +
    1.274 * Math.sin(2 * Drad - Mrad) +
    0.658 * Math.sin(2 * Drad) +
    0.214 * Math.sin(2 * Mrad) -
    0.186 * Math.sin(Msrad) -
    0.114 * Math.sin(2 * Frad)

  return norm360(lon)
}

// ─── சராசரி கிரக நீளங்கள் (J2000.0 epoch) ───
export function mercuryLongitude(jd) {
  const T = (jd - 2451545.0) / 36525.0
  return norm360(252.2509 + 149472.6746358 * T)
}
export function venusLongitude(jd) {
  const T = (jd - 2451545.0) / 36525.0
  return norm360(181.9798 + 58517.8156770 * T)
}
export function marsLongitude(jd) {
  const T = (jd - 2451545.0) / 36525.0
  return norm360(355.4330 + 19140.2993313 * T)
}
export function jupiterLongitude(jd) {
  const T = (jd - 2451545.0) / 36525.0
  return norm360(34.3515 + 3034.9057476 * T)
}
export function saturnLongitude(jd) {
  const T = (jd - 2451545.0) / 36525.0
  return norm360(50.0774 + 1222.1137943 * T)
}
export function rahuLongitude(jd) {
  const T = (jd - 2451545.0) / 36525.0
  return norm360(125.0445 - 1934.1362891 * T)
}

// ─── லாகிரி அயனாம்சம் ───
export function ayanamsaJD(jd) {
  return 23.856 + 0.01397 * ((jd - 2451545.0) / 365.25)
}

// ─── ராசி பெயர்கள் ───
export const RASI_NAMES = [
  'மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்', 'சிம்மம்', 'கன்னி',
  'துலாம்', 'விருச்சிகம்', 'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்',
]

// ─── நட்சத்திர பெயர்கள் ───
export const NAKSHATRA_NAMES = [
  'அஸ்வினி', 'பரணி', 'கார்த்திகை', 'ரோகிணி', 'மிருகசீரிடம்', 'திருவாதிரை',
  'புனர்பூசம்', 'பூசம்', 'ஆயில்யம்', 'மகம்', 'பூரம்', 'உத்திரம்',
  'ஹஸ்தம்', 'சித்திரை', 'சுவாதி', 'விசாகம்', 'அனுஷம்', 'கேட்டை',
  'மூலம்', 'பூராடம்', 'உத்திராடம்', 'திருவோணம்', 'அவிட்டம்', 'சதயம்',
  'பூரட்டாதி', 'உத்திரட்டாதி', 'ரேவதி',
]