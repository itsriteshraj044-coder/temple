import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2'
import type Lenis from 'lenis'
import { useLang } from '@/i18n/lang'
import { getContent, type Lang } from '@/data/content'

/**
 * Temple music with a welcome gate.
 *
 * Browsers block audible autoplay until the visitor interacts with the page,
 * so we present an elegant "Enter Temple" splash on load. Tapping it starts
 * the music (a valid user gesture) and plays a temple double-door opening
 * animation that parts to reveal the site. A floating button mutes/resumes.
 */
const SRC = '/audio/temple-music.mp3'
const VOLUME = 0.05 // very soft, background level
const DOOR_EASE = [0.76, 0, 0.24, 1] as const

/**
 * Module-scoped "already entered" flag. It lives for the lifetime of the loaded
 * app, so it survives React remounts during in-app (SPA) navigation — the gate
 * won't reappear when moving between pages. A full page load / refresh runs the
 * module afresh and resets it to false, so the welcome gate shows once on first
 * load and again on every refresh, exactly as intended.
 */
let hasEntered = false

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  // Seed from the module flag so navigating between pages never re-shows the
  // gate; a refresh resets the flag (fresh module) and the gate shows again.
  const [entered, setEntered] = useState(hasEntered)
  const [playing, setPlaying] = useState(false)
  const { setLang } = useLang()

  const lockScroll = (lock: boolean) => {
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis
    if (lock) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }

  // Warm the audio up ONCE on mount. If the visitor already entered (e.g. this
  // component remounted during navigation), resume audibly; otherwise warm up
  // muted so it can start instantly on Enter. Runs on mount only so it never
  // re-mutes the track after the visitor has entered.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = VOLUME
    if (entered) {
      audio.muted = false
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {})
    } else {
      audio.muted = true
      audio.play().catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Hold the page (and lock scroll) only while the welcome gate is up.
  useEffect(() => {
    if (entered) return
    lockScroll(true)
    return () => lockScroll(false)
  }, [entered])

  // Enter the site in the chosen language (defaults to the current one). The tap
  // is the user gesture browsers require before audible autoplay is allowed.
  const enter = (lang?: Lang) => {
    if (lang) setLang(lang)
    hasEntered = true
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

      {/* Welcome gate — one tap starts the music and opens the temple doors. */}
      <AnimatePresence onExitComplete={() => lockScroll(false)}>
        {!entered && (
          <motion.div
            key="temple-gate"
            role="dialog"
            aria-label="Enter the temple"
            className="fixed inset-0 z-[100] overflow-hidden"
          >
            {/* Left door */}
            <motion.div
              aria-hidden
              initial={{ x: 0 }}
              exit={{ x: '-101%' }}
              transition={{ duration: 1.15, ease: DOOR_EASE }}
              className="absolute inset-y-0 left-0 w-1/2 bg-maroon-950"
            >
              <div aria-hidden className="grain absolute inset-0" />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(120% 80% at 100% 50%, rgba(201,161,74,0.12), transparent 60%)',
                }}
              />
            </motion.div>

            {/* Right door */}
            <motion.div
              aria-hidden
              initial={{ x: 0 }}
              exit={{ x: '101%' }}
              transition={{ duration: 1.15, ease: DOOR_EASE }}
              className="absolute inset-y-0 right-0 w-1/2 bg-maroon-950"
            >
              <div aria-hidden className="grain absolute inset-0" />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(120% 80% at 0% 50%, rgba(201,161,74,0.12), transparent 60%)',
                }}
              />
            </motion.div>

            {/* Golden seam that flares as the doors part */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scaleX: 1 }}
              exit={{ opacity: [0, 1, 0], scaleX: [1, 2.4, 1] }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold-300/70 to-transparent"
            />

            {/* Centered content — fades out as the doors open */}
            <motion.div
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.5, ease: 'easeIn' }}
              className="absolute inset-0 z-20 grid place-items-center px-6 text-center"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(60% 50% at 50% 35%, rgba(249,173,85,0.18), transparent 70%)',
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center"
              >
                <img
                  src="/Client%20Website%20Logo.svg"
                  alt=""
                  aria-hidden
                  className="h-56 w-56 object-contain opacity-95 [filter:brightness(0)_invert(1)] sm:h-64 sm:w-64"
                />
                <h1 className="mt-8 max-w-xl font-display text-4xl leading-tight text-cream-50 sm:text-5xl">
                  Sri Vakrathunda <span className="text-gilded">Vinayagar</span> Temple
                </h1>

                <span className="mt-8 text-xs tracking-[0.15em] text-cream-100/60 uppercase">
                  {getContent('en').UI.splashSubtitle} · {getContent('ta').UI.splashSubtitle}
                </span>

                {/* Language choice — the tap also starts the temple music */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      enter('ta')
                    }}
                    className="group inline-flex items-center gap-3 rounded-full bg-saffron-500 px-8 py-4 text-base font-medium tracking-wide text-maroon-950 shadow-[0_18px_40px_-14px_rgba(238,123,30,0.7)] transition-colors duration-300 hover:bg-saffron-400"
                  >
                    <HiMiniSpeakerWave className="h-5 w-5" />
                    தமிழ்
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      enter('en')
                    }}
                    className="group inline-flex items-center gap-3 rounded-full border border-gold-400/50 bg-transparent px-8 py-4 text-base font-medium tracking-wide text-cream-50 transition-colors duration-300 hover:border-gold-300 hover:bg-cream-50/5"
                  >
                    <HiMiniSpeakerWave className="h-5 w-5" />
                    English
                  </button>
                </div>
              </motion.div>
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
          className="group fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-50 grid h-12 w-12 place-items-center rounded-full border border-gold-400/40 bg-maroon-900 text-gold-300 shadow-[0_12px_30px_-8px_rgba(58,10,10,0.65)] backdrop-blur-md transition-colors duration-300 hover:bg-maroon-800 hover:text-gold-200"
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
