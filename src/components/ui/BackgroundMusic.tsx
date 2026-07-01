import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2'
import type Lenis from 'lenis'

/**
 * Temple music with a welcome gate.
 *
 * Browsers block audible autoplay until the visitor interacts with the page,
 * so we present an elegant "Enter Temple" splash on load. That single tap is
 * a valid user gesture, which lets the music begin — softly, with sound —
 * the instant the site is revealed. A floating button then mutes/resumes.
 */
const SRC = '/audio/temple-music.mp3'
const VOLUME = 0.05 // very soft, background level

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const [entered, setEntered] = useState(false)
  const [playing, setPlaying] = useState(false)

  // Warm the audio up muted so it can start instantly on Enter.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = VOLUME
    audio.muted = true
    audio.play().catch(() => {})
  }, [])

  // Lock scrolling while the welcome gate is showing.
  useEffect(() => {
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis
    if (!entered) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [entered])

  const enter = () => {
    const audio = audioRef.current
    if (audio) {
      audio.muted = false
      audio.volume = VOLUME
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {})
    }
    setEntered(true)
  }

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (!audio.paused && !audio.muted) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.muted = false
      audio.volume = VOLUME
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {})
    }
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={SRC} loop preload="auto" />

      {/* Welcome gate — one tap enters the site and starts the music. */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            key="temple-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={enter}
            role="dialog"
            aria-label="Enter the temple"
            className="fixed inset-0 z-[100] grid cursor-pointer place-items-center overflow-hidden bg-maroon-950 px-6 text-center"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(60% 50% at 50% 35%, rgba(249,173,85,0.18), transparent 70%)',
              }}
            />
            <div aria-hidden className="grain absolute inset-0" />

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center"
            >
              <img
                src="/images/svvt-emblem.webp"
                alt=""
                aria-hidden
                className="h-24 w-24 object-contain opacity-95 [filter:brightness(0)_invert(1)] sm:h-28 sm:w-28"
              />
              <span className="eyebrow mt-6 text-gold-300">Om Gan Ganapataye Namaha</span>
              <h1 className="mt-4 max-w-xl font-display text-4xl leading-tight text-cream-50 sm:text-5xl">
                Sri Vakrathunda <span className="text-gilded">Vinayagar</span> Temple
              </h1>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  enter()
                }}
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-saffron-500 px-8 py-4 text-sm font-medium tracking-wide text-maroon-950 shadow-[0_18px_40px_-14px_rgba(238,123,30,0.7)] transition-colors duration-300 hover:bg-saffron-400"
              >
                <HiMiniSpeakerWave className="h-5 w-5" />
                Enter Temple
              </button>
              <span className="mt-4 text-xs tracking-[0.15em] text-cream-100/50 uppercase">
                Tap anywhere · with temple music
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mute / resume control, once inside. */}
      {entered && (
        <button
          ref={btnRef}
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Mute temple music' : 'Play temple music'}
          aria-pressed={playing}
          title={playing ? 'Mute temple music' : 'Play temple music'}
          className="group fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-50 grid h-11 w-11 place-items-center rounded-full border border-maroon-900/15 bg-cream-50/90 text-maroon-900 shadow-[0_10px_30px_-12px_rgba(58,10,10,0.5)] backdrop-blur-md transition-colors duration-300 hover:border-gold-400 hover:text-saffron-600"
        >
          {playing ? (
            <HiMiniSpeakerWave className="h-5 w-5" />
          ) : (
            <HiMiniSpeakerXMark className="h-5 w-5" />
          )}
          {playing && (
            <span
              aria-hidden
              className="absolute inset-0 -z-10 animate-ping rounded-full bg-saffron-400/20"
            />
          )}
        </button>
      )}
    </>
  )
}
