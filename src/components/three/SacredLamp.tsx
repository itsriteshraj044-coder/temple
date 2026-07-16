import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/** Soft radial sprite used for the flame's warm halo. */
function makeGlowTexture() {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,236,190,0.95)')
  g.addColorStop(0.4, 'rgba(249,173,85,0.55)')
  g.addColorStop(0.75, 'rgba(238,123,30,0.18)')
  g.addColorStop(1, 'rgba(238,123,30,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/** Lathe profile of a traditional diya bowl (radius, height). */
const PROFILE = [
  [0.0, 0.0],
  [0.72, 0.0],
  [0.95, 0.08],
  [1.06, 0.26],
  [0.99, 0.33],
  [0.82, 0.24],
  [0.7, 0.2],
  [0.0, 0.13],
].map(([x, y]) => new THREE.Vector2(x, y))

function Lamp({ tint }: { tint: string }) {
  const group = useRef<THREE.Group>(null)
  const flameOuter = useRef<THREE.Mesh>(null)
  const flameInner = useRef<THREE.Mesh>(null)
  const light = useRef<THREE.PointLight>(null)
  const glow = useMemo(makeGlowTexture, [])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      group.current.rotation.y += dt * 0.25
      // subtle pointer parallax
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        state.pointer.y * 0.18,
        0.05,
      )
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        -state.pointer.x * 0.12,
        0.05,
      )
    }
    // Candle-like flicker from layered sines plus a touch of noise.
    const flick = 0.86 + Math.sin(t * 17) * 0.05 + Math.sin(t * 6.7) * 0.05 + Math.random() * 0.04
    const sway = Math.sin(t * 8) * 0.012
    for (const f of [flameOuter.current, flameInner.current]) {
      if (!f) continue
      f.scale.y = flick
      f.scale.x = f.scale.z = 0.94 + (flick - 0.86) * 0.35
      f.position.x = sway
    }
    if (light.current) light.current.intensity = 5.5 * flick
  })

  return (
    <group ref={group} position={[0, -0.25, 0]} scale={1.25}>
      {/* brass bowl */}
      <mesh castShadow>
        <latheGeometry args={[PROFILE, 64]} />
        <meshStandardMaterial
          color={tint}
          metalness={0.92}
          roughness={0.3}
          emissive={tint}
          emissiveIntensity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* oil surface */}
      <mesh position={[0, 0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.66, 40]} />
        <meshStandardMaterial color="#3a1e08" metalness={0.6} roughness={0.15} />
      </mesh>

      {/* flame — outer warm cone */}
      <mesh ref={flameOuter} position={[0, 0.18, 0]}>
        <coneGeometry args={[0.14, 0.52, 24]} />
        <meshBasicMaterial
          color="#ffb347"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* flame — inner bright core */}
      <mesh ref={flameInner} position={[0, 0.24, 0]}>
        <coneGeometry args={[0.07, 0.34, 20]} />
        <meshBasicMaterial
          color="#fff3c2"
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* flame glow halo */}
      <sprite position={[0, 0.34, 0]} scale={[1.7, 1.9, 1]}>
        <spriteMaterial
          map={glow}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      <pointLight ref={light} position={[0, 0.45, 0]} color="#ffb347" intensity={5.5} distance={7} />
    </group>
  )
}

/**
 * A hand-modelled brass diya (temple oil lamp) with a living, flickering flame —
 * rendered with Three.js. Pointer-reactive and gently floating; a warm,
 * temple-appropriate 3D accent for page heroes. Pointer-events disabled.
 */
export function SacredLamp({
  tint = '#c9a14a',
  className = '',
}: {
  tint?: string
  className?: string
}) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <Canvas
        camera={{ position: [0, 0.5, 3.8], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[3, 4, 5]} intensity={1.8} color="#fff3d6" />
          <directionalLight position={[-4, -1, -3]} intensity={0.8} color="#ee7b1e" />
          <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.9}>
            <Lamp tint={tint} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  )
}
