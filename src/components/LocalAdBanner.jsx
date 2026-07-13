import { useState, useEffect, useMemo, useRef } from 'react'
import { localAds } from '../data/localAds'

export default function LocalAdBanner({ rotateSeconds = 8, className = '' }) {
  const ads = useMemo(() => localAds.filter(ad => ad.active), [])
  const [index, setIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const videoRef = useRef(null)

  const ad = ads[index]
  const isVideo = ad?.type === 'video'

  const goToNext = () => {
    setAnimating(true)
    setTimeout(() => {
      setIndex(prev => (prev + 1) % ads.length)
      setAnimating(false)
    }, 400) // CSS transition duration-க்கு match ஆகும்படி
  }

  useEffect(() => {
    if (ads.length <= 1 || isVideo) return
    const timer = setInterval(goToNext, rotateSeconds * 1000)
    return () => clearInterval(timer)
  }, [ads.length, rotateSeconds, index, isVideo])

  if (!ads.length) return null

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_click', { ad_name: ad.name, ad_id: ad.id })
    }
  }

  const handleVideoEnded = () => {
    if (ads.length > 1) goToNext()
  }

  return (
    <div className={`my-4 text-center ${className}`}>
      <a
        href={ad.link}
        target="_blank"
        rel="noopener sponsored"
        title={ad.name}
        onClick={handleClick}
        className="inline-block w-full max-w-[728px] overflow-hidden rounded-xl"
      >
        <div
          className={`transition-all duration-400 ease-in-out ${
            animating
              ? 'opacity-0 translate-x-3'
              : 'opacity-100 translate-x-0'
          }`}
        >
          {isVideo ? (
            <video
              ref={videoRef}
              key={ad.id}
              src={ad.video}
              poster={ad.poster}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnded}
              className="w-full h-auto mx-auto rounded-xl shadow-sm hover:shadow-md transition-shadow"
            />
          ) : (
            <img
              src={ad.image}
              alt={ad.alt}
              className="w-full h-auto mx-auto rounded-xl shadow-sm hover:shadow-md transition-shadow"
              loading="lazy"
            />
          )}
        </div>
      </a>

      <div className="text-[11px] text-bark-50/40 dark:text-cream-100/30 mt-1">
        விளம்பரம் / Sponsored
      </div>

      {ads.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-2">
          {ads.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-5 bg-saffron-500' : 'w-1.5 bg-saffron-200 dark:bg-bark-50/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}