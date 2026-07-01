import { useEffect, useRef } from 'react'

/**
 * Ambient temple music — invisible, no splash, no button.
 *
 * Browsers block audio from playing WITH SOUND before the visitor interacts
 * with the page, and no script can bypass that. This is the only way to have
 * music without a splash/button: try to autoplay immediately, and if the
 * browser blocks it, keep the track playing muted and unmute it silently at
 * the first user interaction (scroll / click / tap / key). Nothing is shown
 * and nothing is persisted, so it starts fresh on every load / refresh.
 */
const SRC = '/audio/temple-music.mp3'
const VOLUME = 0.05 // very soft, background level
const EVENTS = [
  'pointerdown',
  'keydown',
  'touchstart',
  'touchend',
  'click',
  'wheel',
  'scroll',
  'mousemove',
] as const

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = VOLUME
    audio.loop = true

    let done = false
    const cleanup = () => {
      if (done) return
      done = true
      EVENTS.forEach((e) => window.removeEventListener(e, kick))
    }
    const kick = () => {
      audio.muted = false
      audio.volume = VOLUME
      audio
        .play()
        .then(() => {
          if (!audio.muted && !audio.paused) cleanup()
        })
        .catch(() => {})
    }

    // 1) Try audible autoplay immediately.
    audio.muted = false
    audio
      .play()
      .then(() => {
        if (!audio.muted && !audio.paused) done = true // already playing with sound
      })
      .catch(() => {
        // 2) Blocked — keep it playing muted, unmute at first interaction.
        audio.muted = true
        audio.play().catch(() => {})
        EVENTS.forEach((e) => window.addEventListener(e, kick, { passive: true }))
      })

    return cleanup
  }, [])

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <audio ref={audioRef} src={SRC} autoPlay loop preload="auto" />
}
