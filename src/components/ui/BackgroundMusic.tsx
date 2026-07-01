import { useEffect, useRef } from 'react'

/**
 * Ambient temple music — pure autoplay on load. No controls, no splash, and
 * no interaction fallback.
 *
 * Note: browsers block audio from playing WITH SOUND before the visitor
 * interacts with the page, so on browsers/visits where autoplay isn't allowed
 * the track simply stays silent (there is intentionally no tap-to-start
 * fallback). Where autoplay IS allowed, it plays softly on load / refresh.
 */
const SRC = '/audio/temple-music.mp3'
const VOLUME = 0.05 // very soft, background level

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = VOLUME
    audio.loop = true
    audio.muted = false
    audio.play().catch(() => {
      /* autoplay blocked by the browser — leave it silent, no fallback */
    })
  }, [])

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <audio ref={audioRef} src={SRC} autoPlay loop preload="auto" />
}
