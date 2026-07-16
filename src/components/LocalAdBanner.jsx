"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { localAds } from "./localAds";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

// Filter only active ads
const activeAds = localAds.filter((ad) => ad.active);

export default function LocalAdBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState("next");
  const [animState, setAnimState] = useState("idle"); // idle | entering | exiting
  const timerRef = useRef(null);
  const SLIDE_INTERVAL = 5000;

  // Reset to valid index if ads get deactivated
  useEffect(() => {
    if (currentIndex >= activeAds.length) {
      setCurrentIndex(0);
    }
  }, [activeAds.length, currentIndex]);

  const goToSlide = useCallback(
    (index, direction = "next") => {
      if (activeAds.length <= 1 || index === currentIndex) return;

      setSlideDirection(direction);
      setAnimState("exiting");

      setTimeout(() => {
        setCurrentIndex(index);
        setAnimState("entering");

        setTimeout(() => {
          setAnimState("idle");
        }, 400);
      }, 350);
    },
    [currentIndex, activeAds.length]
  );

  const goNext = useCallback(() => {
    const next = (currentIndex + 1) % activeAds.length;
    goToSlide(next, "next");
  }, [currentIndex, goToSlide]);

  const goPrev = useCallback(() => {
    const prev = (currentIndex - 1 + activeAds.length) % activeAds.length;
    goToSlide(prev, "prev");
  }, [currentIndex, goToSlide]);

  // Auto-slide
  useEffect(() => {
    if (isPaused || activeAds.length <= 1) return;

    timerRef.current = setInterval(goNext, SLIDE_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [isPaused, goNext, activeAds.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  // Animation classes
  const getAnimClass = () => {
    if (animState === "exiting") {
      return slideDirection === "next"
        ? "opacity-0 -translate-x-8 scale-[0.98]"
        : "opacity-0 translate-x-8 scale-[0.98]";
    }
    if (animState === "entering") {
      return slideDirection === "next"
        ? "opacity-100 translate-x-0 scale-100"
        : "opacity-100 translate-x-0 scale-100";
    }
    return "opacity-100 translate-x-0 scale-100";
  };

  // Don't render if no active ads
  if (activeAds.length === 0) return null;

  const currentAd = activeAds[currentIndex];

  return (
    <section
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Banner Label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">
            Sponsored
          </span>
        </span>
        {activeAds.length > 1 && (
          <span className="text-xs text-slate-500">
            {currentIndex + 1} / {activeAds.length}
          </span>
        )}
      </div>

      {/* Ad Container */}
      <div className="relative group rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.08]">
        {/* Ad Image / Link */}
        <a
          href={currentAd.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          aria-label={currentAd.alt}
        >
          <div
            className={`
              transition-all duration-350 ease-out
              ${getAnimClass()}
            `}
          >
            <img
              src={currentAd.image}
              alt={currentAd.alt}
              className="w-full h-auto mx-auto rounded-xl shadow-sm hover:shadow-md transition-shadow object-cover"
              loading="lazy"
            />
          </div>
        </a>

        {/* Overlay Gradient (bottom) */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

        {/* External Link Indicator */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-xs text-white/80">
            <ExternalLink size={12} />
            Visit
          </span>
        </div>

        {/* Pause Indicator */}
        {isPaused && activeAds.length > 1 && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-xs text-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              Paused
            </span>
          </div>
        )}

        {/* Arrow Buttons — only if multiple ads */}
        {activeAds.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/70 hover:border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
              aria-label="Previous ad"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/70 hover:border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
              aria-label="Next ad"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Dot Indicators */}
      {activeAds.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {activeAds.map((ad, index) => (
            <button
              key={ad.id}
              onClick={() =>
                goToSlide(index, index > currentIndex ? "next" : "prev")
              }
              className={`
                rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]
                ${
                  index === currentIndex
                    ? "w-7 h-2 bg-brand-500 shadow-[0_0_8px_rgba(255,107,44,0.5)]"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }
              `}
              aria-label={`Go to ad ${index + 1}: ${ad.name}`}
              aria-current={index === currentIndex ? "true" : undefined}
            />
          ))}
        </div>
      )}

      {/* Ad Name Tag */}
      <p className="text-center text-xs text-slate-500 mt-3 truncate">
        {currentAd.name}
      </p>
    </section>
  );
}