'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'

function Particles() {
  const ref = useRef<any>(null)
  const positions = useMemo(() => {
    const N = 2500
    const arr = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      arr[i*3+0] = THREE.MathUtils.randFloatSpread(10)
      arr[i*3+1] = THREE.MathUtils.randFloatSpread(6)
      arr[i*3+2] = THREE.MathUtils.randFloatSpread(10)
    }
    return arr
  }, [])
  return (
    <Points ref={ref} positions={positions} frustumCulled>
      <PointMaterial size={0.035} sizeAttenuation transparent depthWrite={false} />
    </Points>
  )
}

function Scene() {
  return <Particles />
}

export default function Hero3D() {
  return (
    <div className="h-[140vh] relative">
      <Canvas camera={{ position: [0, 0, 16], fov: 40 }} className="sticky top-0 h-screen">
        <ScrollControls pages={1.4} damping={0.12}>
          <Scroll><Scene /></Scroll>
          <Scroll html>
            <div className="h-[140vh] pointer-events-none">
              <div className="sticky top-24 mx-auto max-w-3xl text-center pointer-events-auto">
                <h1 className="text-6xl font-semibold tracking-tight">Siva Komaragiri</h1>
                <p className="mt-4 text-xl opacity-80">Healthcare Analytics Leader & AI Systems Architect</p>
                <div className="mt-8 space-x-3">
                  <a href="https://calendly.com/siva-komaragiri" className="inline-flex rounded-2xl px-6 py-3 border">Book an intro call</a>
                  <a href="/resume" className="inline-flex rounded-2xl px-6 py-3 border">View résumé</a>
                </div>
              </div>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}