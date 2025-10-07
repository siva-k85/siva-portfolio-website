'use client'
import cytoscape from 'cytoscape'
import elk from 'cytoscape-elk'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { GraphData } from '@/lib/graph'
import type { GraphViewControls } from './types'

cytoscape.use(elk as any)

interface Graph2DProps {
  data: GraphData
  focusId?: string | null
  onControlsReady?: (controls: GraphViewControls | null) => void
}

const kindPalette: Record<string, { border: string; glow: string }> = {
  project: { border: '#38bdf8', glow: '#0ea5e9' },
  article: { border: '#f97316', glow: '#fb923c' },
  topic: { border: '#a855f7', glow: '#c084fc' },
  skill: { border: '#22d3ee', glow: '#67e8f9' },
  achievement: { border: '#facc15', glow: '#fde047' },
  default: { border: '#94a3b8', glow: '#cbd5f5' }
}

export default function Graph2D({ data, focusId, onControlsReady }: Graph2DProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const cyRef = useRef<cytoscape.Core | null>(null)
  const [panEnabled, setPanEnabled] = useState(true)

  useEffect(() => {
    if (!ref.current) return
    const elements = [
      ...data.nodes.map(node => ({
        data: {
          id: node.id,
          label: node.id,
          kind: node.kind ?? 'default',
          slug: (node as { slug?: string }).slug ?? null
        }
      })),
      ...data.links.map(link => ({
        data: {
          id: `${link.source}->${link.target}`,
          source: link.source,
          target: link.target
        }
      }))
    ]

    const cy = cytoscape({
      container: ref.current,
      elements,
      layout: {
        name: 'elk',
        algorithm: 'layered',
        nodeSpacing: 80,
        edgeRouting: 'ORTHOGONAL',
        padding: 80,
        elk: {
          'elk.direction': 'RIGHT',
          'elk.layered.spacing.nodeNodeBetweenLayers': '80',
          'elk.spacing.nodeNode': '48'
        }
      } as any,
      style: [
        {
          selector: 'core',
          style: {
            'active-bg-size': 0,
            'selection-box-border-color': '#38bdf8',
            'selection-box-border-width': 1
          }
        },
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'text-wrap': 'wrap',
            'text-max-width': 160,
            'font-size': 12,
            'font-weight': 600,
            'color': '#e2e8f0',
            'text-margin-y': -6,
            'width': 48,
            'height': 48,
            'background-color': '#0f172a',
            'background-fill': 'radial-gradient',
            'background-gradient-stop-colors': '#38bdf8 #0ea5e900',
            'background-gradient-stop-positions': '0 90',
            'border-width': 2,
            'border-color': '#38bdf8',
            'border-opacity': 0.9,
            shape: 'ellipse',
            'shadow-blur': 24,
            'shadow-color': '#38bdf866',
            'transition-property':
              'background-color, border-color, color, shadow-color, width, height, font-size',
            'transition-duration': '250ms'
          }
        },
        ...Object.entries(kindPalette).map(([kind, palette]) => ({
          selector: `node[kind = "${kind}"]`,
          style: {
            'border-color': palette.border,
            'background-gradient-stop-colors': `${palette.border} ${palette.glow}00`,
            'shadow-color': `${palette.border}88`
          }
        })),
        {
          selector: 'node.hovered',
          style: {
            'border-width': 4,
            'width': 58,
            'height': 58,
            'font-size': 14,
            'shadow-blur': 32
          }
        },
        {
          selector: 'node.focused',
          style: {
            'border-width': 6,
            'width': 64,
            'height': 64,
            'font-size': 16,
            'shadow-blur': 42,
            'shadow-color': '#38bdf8aa'
          }
        },
        {
          selector: 'edge',
          style: {
            opacity: 0.38,
            'curve-style': 'unbundled-bezier',
            'control-point-step-size': 40,
            'target-arrow-shape': 'triangle',
            'target-arrow-color': '#38bdf8',
            'line-color': '#64748b',
            'width': 2,
            'arrow-scale': 1.2,
            'transition-property': 'opacity, line-color, width',
            'transition-duration': '250ms'
          }
        },
        {
          selector: 'edge.hovered',
          style: {
            opacity: 0.8,
            'line-color': '#38bdf8',
            'width': 3.5
          }
        },
        {
          selector: 'edge.focused',
          style: {
            opacity: 0.95,
            'line-color': '#38bdf8',
            'width': 4
          }
        }
      ]
    })

    cyRef.current = cy
    cy.minZoom(0.4)
    cy.maxZoom(2.4)
    cy.userZoomingEnabled(true)
    cy.userPanningEnabled(true)

    cy.on('tap', 'node', evt => {
      const target = evt.target
      const { kind, slug } = target.data() as { kind?: string; slug?: string | null }
      if (kind === 'project' && slug) {
        window.location.assign(`/projects/${slug}`)
      }
    })

    cy.on('mouseover', 'node', evt => {
      evt.target.addClass('hovered')
      evt.target.connectedEdges().addClass('hovered')
    })

    cy.on('mouseout', 'node', evt => {
      evt.target.removeClass('hovered')
      evt.target.connectedEdges().removeClass('hovered')
    })

    cy.on('mouseover', 'edge', evt => {
      evt.target.addClass('hovered')
    })

    cy.on('mouseout', 'edge', evt => {
      evt.target.removeClass('hovered')
    })

    cy.once('layoutstop', () => {
      cy.fit(undefined, 80)
    })

    return () => {
      cy.destroy()
      cyRef.current = null
    }
  }, [data])

  useEffect(() => {
    if (!cyRef.current) return
    cyRef.current.userPanningEnabled(panEnabled)
  }, [panEnabled])

  useEffect(() => {
    if (!focusId || !cyRef.current) return
    const cy = cyRef.current
    cy.batch(() => {
      cy.nodes('.focused').removeClass('focused')
      cy.edges('.focused').removeClass('focused')
      const node = cy.$id(focusId)
      if (node.nonempty()) {
        node.addClass('focused')
        node.connectedEdges().addClass('focused')
        cy.center(node)
        cy.animate({ zoom: 1.2, center: { eles: node } }, { duration: 600 })
      }
    })
  }, [focusId])

  const applyZoomFactor = useCallback(
    (factor: number) => {
      const cy = cyRef.current
      if (!cy || !ref.current) return
      const current = cy.zoom()
      const min = cy.minZoom()
      const max = cy.maxZoom()
      const next = Math.min(max, Math.max(min, current * factor))
      const rect = ref.current.getBoundingClientRect()
      cy.zoom({
        level: next,
        renderedPosition: { x: rect.width / 2, y: rect.height / 2 }
      })
    },
    []
  )

  const zoomIn = useCallback(() => applyZoomFactor(1.2), [applyZoomFactor])
  const zoomOut = useCallback(() => applyZoomFactor(0.82), [applyZoomFactor])
  const togglePan = useCallback(() => setPanEnabled(prev => !prev), [])

  useEffect(() => {
    if (!ref.current) return
    ref.current.classList.toggle('cursor-grab', panEnabled)
    ref.current.classList.toggle('cursor-default', !panEnabled)
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
    <div className="relative h-full w-full">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.12),_transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(129,140,248,0.12),rgba(14,165,233,0.08))]" />
      <div
        ref={ref}
        className="relative h-full w-full rounded-3xl border border-slate-800/80 bg-slate-950/60 shadow-inner shadow-sky-500/10"
      />
    </div>
  )
}
