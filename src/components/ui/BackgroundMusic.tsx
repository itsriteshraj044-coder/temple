import { useEffect, useRef, useState } from 'react'
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2'

/**
 * Ambient temple music.
 *
 * Browsers (everywhere, including Vercel) block audible autoplay until the
 * visitor interacts with the page — this is a fixed browser policy, not a
 * hosting issue. So we start playback *muted* right away (always allowed) and
 * unmute on the first user gesture — a tap, click or key press anywhere — so
 * the music becomes audible the instant they touch the page. Nothing is
 * persisted, so it always restarts on refresh.
 */
const SRC = '/audio/temple-music.mp3'
const VOLUME = 0.05 // very soft, background level
// Only genuine "user activation" events can unmute per the autoplay policy
// (scroll / wheel / mousemove do not count).
const GESTURES = ['pointerdown', 'keydown', 'touchstart', 'touchend'] as const

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = VOLUME

    // 1) Begin playback immediately, muted — this is always permitted.
    audio.muted = true
    audio.play().catch(() => {})

    // 2) On the first real interaction, unmute so it becomes audible.
    const enable = (e: Event) => {
      // Clicks on the control button are handled by its own onClick — skip
      // them here so we don't unmute-then-pause in the same click.
      if (btnRef.current && e.target instanceof Node && btnRef.current.contains(e.target)) {
        return
      }
      audio.muted = false
      audio.volume = VOLUME
      audio
        .play()
        .then(() => {
          if (!audio.muted && !audio.paused) {
            setPlaying(true)
            GESTURES.forEach((ev) => window.removeEventListener(ev, enable))
          }
        })
        .catch(() => {})
    }
    GESTURES.forEach((ev) => window.addEventListener(ev, enable, { passive: true }))

    return () => GESTURES.forEach((ev) => window.removeEventListener(ev, enable))
  }, [])

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
    </>
  )
}
