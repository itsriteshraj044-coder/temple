import { useEffect, useRef } from 'react'

/**
 * Ambient temple music — autoplays on load, no controls, no splash.
 *
 * IMPORTANT: every modern browser blocks audio from playing WITH SOUND before
 * the visitor interacts with the page. No script can bypass this. So this does
 * the maximum that is actually possible:
 *   1. Try to play audibly the moment the page loads (works where the browser
 *      allows it — e.g. returning visitors / relaxed autoplay settings).
 *   2. If the browser blocks that, keep the track playing muted and unmute it
 *      invisibly at the first user interaction — no button, no splash.
 * Nothing is persisted, so it starts fresh on every load / refresh.
 */
const SRC = '/audio/temple-music.mp3'
const VOLUME = 0.05 // very soft, background level
const GESTURES = ['pointerdown', 'keydown', 'touchstart', 'touchend', 'click'] as const

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = VOLUME
    audio.loop = true

    let removed = false
    const unmute = () => {
      audio.muted = false
      audio.volume = VOLUME
      audio.play().catch(() => {})
      if (!removed) {
        removed = true
        GESTURES.forEach((e) => window.removeEventListener(e, unmute))
      }
    }

    // 1) Attempt audible autoplay straight away.
    audio.muted = false
    audio
      .play()
      .catch(() => {
        // 2) Blocked — keep it playing muted and unmute at first interaction.
        audio.muted = true
        audio.play().catch(() => {})
        GESTURES.forEach((e) => window.addEventListener(e, unmute, { passive: true }))
      })

    return () => GESTURES.forEach((e) => window.removeEventListener(e, unmute))
  }, [])

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <audio ref={audioRef} src={SRC} autoPlay loop preload="auto" />
}
