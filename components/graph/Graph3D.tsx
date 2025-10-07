'use client'
import type { GraphData } from '@/lib/graph'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ForceGraphMethods } from 'react-force-graph-3d'
import {
  AdditiveBlending,
  CanvasTexture,
  Color,
  Group,
  LinearFilter,
  Mesh,
  MeshStandardMaterial,
  Sprite,
  SpriteMaterial,
  SphereGeometry
} from 'three'
import type { GraphViewControls } from './types'

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false })

interface Graph3DProps {
  data: GraphData
  focusId?: string | null
  onControlsReady?: (controls: GraphViewControls | null) => void
}

type ForceGraphInstance = ForceGraphMethods & {
  graphData: () => GraphData
  centerAt?: (x: number, y: number, ms?: number) => void
  zoom?: (scale: number, ms?: number) => void
  controls?: () => {
    enablePan: boolean
    update?: () => void
  }
}

const glowTextureCache = new Map<string, CanvasTexture>()
const labelTextureCache = new Map<string, CanvasTexture>()

function createGlowTexture(color: string) {
  const cacheKey = color.toLowerCase()
  const cached = glowTextureCache.get(cacheKey)
  if (cached) return cached

  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    const fallback = new CanvasTexture(canvas)
    glowTextureCache.set(cacheKey, fallback)
    return fallback
  }
  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.08,
    size / 2,
    size / 2,
    size / 2
  )
  gradient.addColorStop(0, `${color}FF`)
  gradient.addColorStop(0.3, `${color}AA`)
  gradient.addColorStop(0.7, `${color}33`)
  gradient.addColorStop(1, `${color}00`)
  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  const texture = new CanvasTexture(canvas)
  texture.needsUpdate = true
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  glowTextureCache.set(cacheKey, texture)
  return texture
}

function createLabelTexture(text: string, color: string) {
  const key = `${text}-${color}`.toLowerCase()
  const cached = labelTextureCache.get(key)
  if (cached) return cached

  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const context = canvas.getContext('2d')
  if (!context) {
    const fallback = new CanvasTexture(canvas)
    labelTextureCache.set(key, fallback)
    return fallback
  }

  context.clearRect(0, 0, canvas.width, canvas.height)
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
  gradient.addColorStop(0, 'rgba(15,23,42,0.85)')
  gradient.addColorStop(1, 'rgba(30,64,175,0.75)')
  context.fillStyle = gradient
  const radius = 48
  const width = canvas.width - 80
  const height = canvas.height - 120
  const x = 40
  const y = 40

  context.beginPath()
  context.moveTo(x + radius, y)
  context.lineTo(x + width - radius, y)
  context.quadraticCurveTo(x + width, y, x + width, y + radius)
  context.lineTo(x + width, y + height - radius)
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  context.lineTo(x + radius, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - radius)
  context.lineTo(x, y + radius)
  context.quadraticCurveTo(x, y, x + radius, y)
  context.closePath()
  context.fill()

  context.strokeStyle = color
  context.lineWidth = 6
  context.stroke()

  context.font = 'bold 52px "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif'
  context.fillStyle = 'rgba(226,232,240,0.98)'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(text, canvas.width / 2, canvas.height / 2)

  const texture = new CanvasTexture(canvas)
  texture.needsUpdate = true
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  labelTextureCache.set(key, texture)
  return texture
}

function buildNodeObject({
  id,
  color,
  isFocused,
  isHovered
}: {
  id: string
  color: string
  isFocused: boolean
  isHovered: boolean
}) {
  const group = new Group()
  const normalizedHex = `#${new Color(color).getHexString()}`

  const glowTexture = createGlowTexture(normalizedHex)
  const glowMaterial = new SpriteMaterial({
    map: glowTexture,
    blending: AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: isFocused ? 0.95 : isHovered ? 0.85 : 0.6
  })
  const glowSprite = new Sprite(glowMaterial)
  const glowScale = isFocused ? 42 : isHovered ? 36 : 30
  glowSprite.scale.set(glowScale, glowScale, glowScale)
  group.add(glowSprite)

  const sphere = new Mesh(
    new SphereGeometry(isFocused ? 7 : isHovered ? 6.5 : 5.5, 48, 48),
    new MeshStandardMaterial({
      color: normalizedHex,
      emissive: new Color(normalizedHex),
      emissiveIntensity: isFocused ? 1 : isHovered ? 0.85 : 0.65,
      metalness: 0.25,
      roughness: 0.35
    })
  )
  group.add(sphere)

  const labelSprite = new Sprite(
    new SpriteMaterial({
      map: createLabelTexture(id, normalizedHex),
      depthWrite: false,
      transparent: true,
      opacity: isFocused ? 0.95 : isHovered ? 0.85 : 0.75
    })
  )
  labelSprite.scale.set(46, 24, 24)
  labelSprite.position.set(0, 18, 0)
  group.add(labelSprite)

  return group
}

const kindColors: Record<string, string> = {
  project: '#38bdf8',
  article: '#f97316',
  topic: '#a855f7',
  skill: '#22d3ee',
  achievement: '#facc15',
  default: '#64748b'
}

export default function Graph3D({ data, focusId, onControlsReady }: Graph3DProps) {
  const graphRef = useRef<ForceGraphInstance | undefined>(undefined)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | number | null>(null)
  const [panEnabled, setPanEnabled] = useState(true)

  const linkHighlightSet = useMemo(() => {
    const highlight = new Set<string | number>()
    if (hoveredNodeId) highlight.add(hoveredNodeId)
    if (focusId) highlight.add(focusId)
    return highlight
  }, [focusId, hoveredNodeId])

  useEffect(() => {
    if (!focusId || !graphRef.current) return
    const graphData = graphRef.current.graphData()
    const node = graphData.nodes.find(item => item.id === focusId)
    if (node) {
      const { centerAt, zoom } = graphRef.current
      const position = node as unknown as { x?: number; y?: number }
      if (position.x !== undefined && position.y !== undefined) {
        centerAt?.(position.x, position.y, 1000)
      }
      zoom?.(4, 1000)
    }
  }, [focusId])

  const applyZoomFactor = useCallback((factor: number) => {
    const graph = graphRef.current
    if (!graph?.zoom) return
    const current = graph.zoom() ?? 1
    const next = Math.min(10, Math.max(0.35, current * factor))
    graph.zoom(next, 500)
  }, [])

  const zoomIn = useCallback(() => {
    applyZoomFactor(1.2)
  }, [applyZoomFactor])

  const zoomOut = useCallback(() => {
    applyZoomFactor(0.82)
  }, [applyZoomFactor])

  const togglePan = useCallback(() => {
    setPanEnabled(prev => !prev)
  }, [])

  useEffect(() => {
    const controls = graphRef.current?.controls?.()
    if (!controls) return
    controls.enablePan = panEnabled
    controls.update?.()
  }, [panEnabled])

  useEffect(() => {
    if (!onControlsReady) return
    onControlsReady({ zoomIn, zoomOut, togglePan, panEnabled })
  }, [onControlsReady, zoomIn, zoomOut, togglePan, panEnabled])

  useEffect(() => {
    if (!onControlsReady) return
    return () => {
      onControlsReady(null)
    }
  }, [onControlsReady])

  return (
    <ForceGraph3D
      ref={graphRef}
      graphData={data}
      backgroundColor="#020617"
      showNavInfo={false}
      nodeRelSize={5}
      nodeLabel={node => {
        const cast = node as { id?: string | number; description?: string }
        const title = cast.id?.toString() ?? ''
        if (!cast.description) return title
        return `<div class="px-3 py-2 text-sm"><strong>${title}</strong><br/><span>${cast.description}</span></div>`
      }}
      linkOpacity={0.22}
      linkCurvature={0.25}
      linkDirectionalParticles={2}
      linkDirectionalParticleWidth={1.2}
      linkDirectionalParticleSpeed={() => 0.0025}
      linkWidth={link => {
        const sourceId = typeof link.source === 'object' ? (link.source as { id?: string | number }).id : link.source
        const targetId = typeof link.target === 'object' ? (link.target as { id?: string | number }).id : link.target
        if (sourceId && linkHighlightSet.has(sourceId)) return 2.5
        if (targetId && linkHighlightSet.has(targetId)) return 2.5
        return 0.6
      }}
      linkColor={link => {
        const sourceId = typeof link.source === 'object' ? (link.source as { id?: string | number }).id : link.source
        const targetId = typeof link.target === 'object' ? (link.target as { id?: string | number }).id : link.target
        if (sourceId && linkHighlightSet.has(sourceId)) return 'rgba(56,189,248,0.8)'
        if (targetId && linkHighlightSet.has(targetId)) return 'rgba(56,189,248,0.8)'
        return 'rgba(148,163,184,0.35)'
      }}
      onNodeHover={node => {
        const cast = node as { id?: string | number } | null
        setHoveredNodeId(cast?.id ?? null)
      }}
      onNodeClick={node => {
        const cast = node as { kind?: string; slug?: string }
        if (cast.kind === 'project' && cast.slug) window.location.assign(`/projects/${cast.slug}`)
      }}
      nodeThreeObject={node => {
        const cast = node as { id?: string; kind?: string }
        const id = cast.id ?? 'Node'
        const kind = cast.kind ?? 'default'
        const color = kindColors[kind] ?? kindColors.default
        const isFocused = focusId === cast.id
        const isHovered = hoveredNodeId === cast.id
        return buildNodeObject({ id, color, isFocused, isHovered })
      }}
      nodeThreeObjectExtend={false}
    />
  )
}
