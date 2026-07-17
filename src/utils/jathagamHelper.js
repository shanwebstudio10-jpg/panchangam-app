import {
  jdFromUTC,
  sunLongitudeJD,
  moonLongitudeJD,
  mercuryLongitude,
  venusLongitude,
  marsLongitude,
  jupiterLongitude,
  saturnLongitude,
  rahuLongitude,
  ayanamsaJD,
  RASI_NAMES,
  NAKSHATRA_NAMES,
} from './panchangamEngine'

const IST_OFFSET_HOURS = 5.5

function norm360(x) {
  return ((x % 360) + 360) % 360
}

/**
 * ஜாதகம் கணிக்கும் முக்கிய செயல்பாடு
 * @param {string} dobStr - "1990-05-15" format
 * @param {string} timeStr - "14:30" format (IST)
 * @param {number} lat - அட்சரேகை
 * @param {number} lon - தீர்க்கரேகை
 */
export function calculateJathagam(dobStr, timeStr, lat, lon) {
  const [hh, mm] = timeStr.split(':').map(Number)
  const localDate = new Date(`${dobStr}T00:00:00`)

  // IST → UTC மாற்றம்
  const utcDate = new Date(
    Date.UTC(
      localDate.getFullYear(),
      localDate.getMonth(),
      localDate.getDate(),
      hh - IST_OFFSET_HOURS,
      mm
    )
  )

  const jd = jdFromUTC(utcDate)
  const ayan = ayanamsaJD(jd)

  // ஒவ்வொரு கிரகத்தின் சைதீரியல் நீளம் (அயனாம்சம் கழித்தது)
  const sunSid = norm360(sunLongitudeJD(jd) - ayan)
  const moonSid = norm360(moonLongitudeJD(jd) - ayan)
  const mercurySid = norm360(mercuryLongitude(jd) - ayan)
  const venusSid = norm360(venusLongitude(jd) - ayan)
  const marsSid = norm360(marsLongitude(jd) - ayan)
  const jupiterSid = norm360(jupiterLongitude(jd) - ayan)
  const saturnSid = norm360(saturnLongitude(jd) - ayan)
  const rahuSid = norm360(rahuLongitude(jd) - ayan)
  const ketuSid = norm360(rahuSid + 180)

  // சூரிய & சந்திர ராசி
  const suryaRasi = RASI_NAMES[Math.floor(sunSid / 30)]
  const chandraRasi = RASI_NAMES[Math.floor(moonSid / 30)]

  // நட்சத்திரம் & பாதம்
  const nakStep = 360 / 27
  const nakIdx = Math.floor(moonSid / nakStep)
  const nakPada = Math.floor((moonSid % nakStep) / (nakStep / 4)) + 1

  // கிரக அட்டவணை
  const grahas = [
    ['சூரியன்', sunSid],
    ['சந்திரன்', moonSid],
    ['புதன்', mercurySid],
    ['சுக்கிரன்', venusSid],
    ['செவ்வாய்', marsSid],
    ['குரு', jupiterSid],
    ['சனி', saturnSid],
    ['ராகு', rahuSid],
    ['கேது', ketuSid],
  ].map(([name, lonVal]) => ({
    name,
    rasi: RASI_NAMES[Math.floor(lonVal / 30)],
    degree: (lonVal % 30).toFixed(2),
  }))

  return { suryaRasi, chandraRasi, nakshatra: NAKSHATRA_NAMES[nakIdx], nakPada, grahas }
}