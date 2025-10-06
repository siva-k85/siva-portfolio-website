'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'

interface Hero3DProps {
  quality?: 'high' | 'low'
}

function Particles({ quality = 'high' }: Hero3DProps) {
  const ref = useRef<THREE.Points>(null)
  const count = quality === 'high' ? 2400 : 1200
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      arr[i * 3 + 0] = THREE.MathUtils.randFloatSpread(10)
      arr[i * 3 + 1] = THREE.MathUtils.randFloatSpread(6)
      arr[i * 3 + 2] = THREE.MathUtils.randFloatSpread(10)
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.05
    ref.current.rotation.x += delta * 0.02
  })

  return (
    <Points ref={ref} positions={positions} frustumCulled>
      <PointMaterial size={quality === 'high' ? 0.035 : 0.045} sizeAttenuation transparent depthWrite={false} color="#1f2937" />
    </Points>
  )
}

export default function Hero3D({ quality = 'high' }: Hero3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 45 }}
      className="h-full w-full"
      dpr={[1, 2]}
      frameloop="always"
    >
      <ambientLight intensity={0.4} />
      <Particles quality={quality} />
    </Canvas>
  )
}
