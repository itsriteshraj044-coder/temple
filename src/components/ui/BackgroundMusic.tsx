import { useEffect, useRef, useState } from 'react'
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2'

/**
 * Ambient temple music that starts softly on every load/refresh. Browsers
 * block audio with sound from autoplaying until the visitor interacts with
 * the page, so we try to play immediately and, if that's rejected, start on
 * the first user gesture (scroll / tap / click / key). The floating button
 * mutes or resumes for the current session — the preference is intentionally
 * NOT persisted, so the music always attempts to play again on refresh.
 */
const SRC = '/audio/temple-music.mp3'
const VOLUME = 0.05 // very soft, background level
const GESTURES = ['pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll'] as const

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = VOLUME

    const cleanup = () => GESTURES.forEach((e) => window.removeEventListener(e, start))
    function start() {
      audio!.volume = VOLUME
      audio!
        .play()
        .then(() => {
          setPlaying(true)
          cleanup()
        })
        .catch(() => {
          /* still blocked — keep waiting for another gesture */
        })
    }

    // Try immediate autoplay; if the browser blocks it, wait for a gesture.
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        GESTURES.forEach((e) => window.addEventListener(e, start, { passive: true }))
      })

    return cleanup
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.volume = VOLUME
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {})
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={SRC} loop preload="auto" />
      <button
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
