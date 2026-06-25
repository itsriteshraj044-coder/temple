import { useMemo, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 220

/** Soft radial sprite so each particle reads as a glowing ember, not a square. */
function makeGlowTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,236,190,1)')
  g.addColorStop(0.35, 'rgba(249,173,85,0.85)')
  g.addColorStop(0.7, 'rgba(238,123,30,0.25)')
  g.addColorStop(1, 'rgba(238,123,30,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function Embers() {
  const ref = useRef<THREE.Points>(null)
  const texture = useMemo(makeGlowTexture, [])

  const { positions, speeds, drift, sizes } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const speeds = new Float32Array(COUNT)
    const drift = new Float32Array(COUNT)
    const sizes = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5
      speeds[i] = 0.08 + Math.random() * 0.22
      drift[i] = Math.random() * Math.PI * 2
      sizes[i] = 0.05 + Math.random() * 0.16
    }
    return { positions, speeds, drift, sizes }
  }, [])

  useFrame((state, delta) => {
    const pts = ref.current
    if (!pts) return
    const arr = pts.geometry.attributes.position.array as Float32Array
    const t = state.clock.elapsedTime
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += speeds[i] * delta // rise
      arr[i * 3] += Math.sin(t * 0.5 + drift[i]) * delta * 0.12 // sway
      if (arr[i * 3 + 1] > 5.5) {
        arr[i * 3 + 1] = -5.5
        arr[i * 3] = (Math.random() - 0.5) * 14
      }
    }
    pts.geometry.attributes.position.needsUpdate = true
    pts.rotation.z = Math.sin(t * 0.05) * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.22}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9}
      />
    </points>
  )
}

/**
 * Subtle sacred particle environment for the hero — drifting diya embers.
 * Pointer-events disabled; sits behind hero content. No heavy geometry.
 */
export function SacredParticles({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <Embers />
        </Suspense>
      </Canvas>
    </div>
  )
}
