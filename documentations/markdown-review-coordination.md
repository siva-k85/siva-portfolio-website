# Markdown Review Coordination Plan

This plan inventories every Markdown file in the repository, classifies the required work into sequential and parallelizable efforts, and captures the complete set of referenced code snippets so execution is fully deterministic. It also documents a coordination exchange with Heather to ensure aligned execution.

## 1. Repository Markdown Inventory

| File Path | Directory Focus | File Type |
| --- | --- | --- |
| README.md | Project overview and quickstart guidance | Markdown (.md) |
| prompts/UNIVERSAL_BUILD_PROMPT.md | Build automation prompt | Markdown (.md) |
| agents/agents.md | AI agent role catalog | Markdown (.md) |
| agents/anthropic-cloud.md | Anthropic agent workflow | Markdown (.md) |
| agents/claude.md | Claude agent priorities | Markdown (.md) |
| agents/codex.md | OpenAI agent instructions | Markdown (.md) |
| agents/gemini.md | Gemini agent guidance | Markdown (.md) |
| documentations/claude-siva-portfolio-review.md | External portfolio audit | Markdown (.md) |
| documentations/SPEC_IMPROVEMENTS.md | Improved specification | Markdown (.md) |
| documentations/gpt-agent-report.md | GPT implementation report | Markdown (.md) |
| documentations/chatgpt-dr-siva-portfolio.md | Deep research prompt | Markdown (.md) |

_All files in scope use the Markdown (.md) format._

## 2. Task Breakdown

### 2.1 Sequential Tasks (must be completed in order)
1. **Verify Markdown inventory** — confirm the file list above against the repository tree.
2. **Extract code snippets** — pull every fenced code block from each file to avoid omissions during review.
3. **Synthesize per-file summaries** — consolidate insights and action items for each Markdown source before distributing work.
4. **Coordinate plan with Heather** — align on responsibilities, sequencing constraints, and hand-offs.
5. **Publish coordination notes** — commit this plan into `documentations/markdown-review-coordination.md` for traceability.

### 2.2 Parallelizable Tasks (after sequential prerequisites)
- **README.md Analysis** — validate setup steps, ensure development workflow commands stay current.
- **Prompt & Agent Docs Review** — divide `prompts/UNIVERSAL_BUILD_PROMPT.md` plus the five `agents/*.md` files for concurrent evaluation of instructions, guardrails, and verification flows.
- **Strategic Documentation Audit** — concurrently inspect `documentations/claude-siva-portfolio-review.md`, `documentations/SPEC_IMPROVEMENTS.md`, `documentations/gpt-agent-report.md`, and `documentations/chatgpt-dr-siva-portfolio.md` to surface implementation directives, UX mandates, and follow-up requirements.
- **Snippet Validation** — cross-check every extracted code snippet against current repository capabilities (commands, config fragments, TypeScript samples) while others complete narrative reviews.
- **Risk & Dependency Mapping** — while summaries progress, identify dependencies (e.g., CI configuration, Firebase loader requirements) that may block downstream implementation.

## 3. Detailed File Summaries and Required Code Inputs

Each subsection below pairs the contextual summary with **every** code snippet captured from the source Markdown file so implementers can copy verbatim without re-opening the originals.

### 3.1 README.md — Portfolio Overview & Operations
- Highlights project features, tech stack, environment setup, and development commands.
- Emphasizes Firebase App Hosting deployment steps and performance targets.

**Code Snippets:**

```bash
# Install dependencies (using pnpm)
pnpm install

# Run development server
pnpm dev

# Run linting and formatting
pnpm lint
pnpm format

# Validate content
pnpm validate:content

# Generate Prisma client
pnpm prisma:generate

# Build for production
pnpm build
```

```bash
cp .env.example .env.local
```

```
.
├── app/                  # Next.js App Router pages and API routes
├── components/           # React components (Hero3D, Graph, UI)
├── content/             # MDX content for projects and notes
├── lib/                 # Utility functions and configurations
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── scripts/             # Build and validation scripts
└── agents/              # AI agent documentation
```

### 3.2 prompts/UNIVERSAL_BUILD_PROMPT.md — Universal Build Workflow
- Directs agents to verify Node and pnpm versions, install dependencies, generate Prisma client, and run the dev server.
- Outlines Firebase App Hosting onboarding plus verification checklists for functionality, performance, quality, and accessibility.

**Code Snippets:**

```bash
node --version  # Should be >= 20.0.0
pnpm --version  # Should be >= 9.0.0
```

```bash
pnpm install
```

```bash
pnpm prisma:generate
```

```bash
pnpm dev
```

```bash
gh repo create siva-k85/siva-portfolio-repo --public --source=. --remote=origin --push
```

### 3.3 agents/agents.md — Agent Roles & Guardrails
- Documents specialized agent responsibilities, milestone-based definitions of done, and pre-deployment checklists.
- No code snippets present.

### 3.4 agents/anthropic-cloud.md — Anthropic Workflow Blueprint
- Mandates atomic commits per milestone and a Plan → Implement → Verify → Document loop.
- Lists verification commands and a change log template.

**Code Snippets:**

```bash
# M0: Initial setup
git add .
git commit -m "feat: initialize project structure and configuration"

# M1: Core features
git add app/ components/
git commit -m "feat: implement core pages and components"

# M2: Content system
git add content/ lib/content.ts
git commit -m "feat: add MDX content management system"

# M3: Backend integration
git add api/ prisma/ lib/
git commit -m "feat: integrate database and API routes"

# M4: Production optimizations
git add .
git commit -m "perf: optimize bundle size and performance"

# M5: Deployment
git add .github/ apphosting.yaml
git commit -m "ci: configure deployment pipeline"
```

```markdown
## [Version] - Date

### Added
- Feature descriptions

### Changed
- Modification details

### Fixed
- Bug fixes

### Performance
- Optimization details
```

### 3.5 agents/claude.md — Accessibility & Performance Priorities
- Stresses WCAG AA compliance, Core Web Vitals budgets, and content validation enhancements.
- Provides template code for frame-rate adaptation, deep-link handling, validation scripts, and Core Web Vital monitoring hooks.

**Code Snippets:**

```typescript
// FPS adaptation example
function adaptToFrameRate() {
  const fps = measureFPS()
  if (fps < 30) {
    // Reduce particle count or disable 3D
    setRenderMode('2D')
  }
}

// Deep-linking implementation
function handleDeepLink(path: string) {
  const segments = path.split('/')
  if (segments[0] === 'projects' && segments[1]) {
    // Navigate to specific project
    router.push(`/projects/${segments[1]}`)
  }
}
```

```typescript
// scripts/validate-content.ts
import { promises as fs } from 'node:fs'
import path from 'node:path'
import fg from 'fast-glob'
import matter from 'gray-matter'

async function validateContent() {
  const errors: string[] = []

  // Check projects
  const projectFiles = await fg('*.mdx', {
    cwd: path.join(process.cwd(), 'content/projects')
  })

  for (const file of projectFiles) {
    const content = await fs.readFile(
      path.join(process.cwd(), 'content/projects', file),
      'utf8'
    )
    const { data } = matter(content)

    // Required fields
    const required = ['title', 'summary', 'tech', 'skills']
    for (const field of required) {
      if (!data[field]) {
        errors.push(`${file}: missing required field '${field}'`)
      }
    }
  }

  if (errors.length > 0) {
    console.error('Content validation failed:')
    errors.forEach(err => console.error(`  - ${err}`))
    process.exit(1)
  }

  console.log('✅ Content validation passed')
}

validateContent()
```

```tsx
// Adapts render quality based on device FPS
// Falls back to 2D when FPS < 30
```

```tsx
// Supports deep links to:
// - /projects/[slug]
// - /notes/[slug]
// - /graph?focus=[nodeId]
```

```tsx
useEffect(() => {
  // Monitor and report Core Web Vitals
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ getCLS, getFID, getLCP }) => {
      getCLS(console.log)
      getFID(console.log)
      getLCP(console.log)
    })
  }
}, [])
```

### 3.6 agents/codex.md — File Generation Mandate
- Requires full file outputs, runnable code, and dev/build command reminders.

**Code Snippets:**

```typescript
// Full file content here
```

```bash
# Commands to run
pnpm install
pnpm dev
```

### 3.7 agents/gemini.md — Progressive Enhancement Strategy
- Advocates multi-step reasoning, CSS scroll-timeline usage with fallbacks, WebGL detection, and JSON-LD schemas.

**Code Snippets:**

```css
/* Modern browsers with scroll-timeline support */
@supports (animation-timeline: scroll()) {
  .hero-text {
    animation: fade-up linear;
    animation-timeline: scroll();
    animation-range: 0vh 100vh;
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

/* Fallback for browsers without scroll-timeline */
@supports not (animation-timeline: scroll()) {
  .hero-text {
    /* Use JavaScript-based scroll animation */
    transition: opacity 0.3s, transform 0.3s;
  }

  .hero-text.visible {
    opacity: 1;
    transform: translateY(0);
  }
}
```

```typescript
function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') ||
               canvas.getContext('experimental-webgl')
    return !!gl
  } catch (e) {
    return false
  }
}

function selectGraphRenderer(data: GraphData) {
  const hasWebGL = detectWebGLSupport()
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
  const isMobile = window.innerWidth < 768

  if (hasWebGL && !prefersReducedMotion && !isMobile) {
    return <Graph3D data={data} />
  } else {
    return <Graph2D data={data} />
  }
}
```

```typescript
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Siva Komaragiri',
  url: 'https://sivakomaragiri.com',
  image: 'https://sivakomaragiri.com/images/profile.jpg',
  sameAs: [
    'https://linkedin.com/in/k-siva',
    'https://github.com/Siva-K85',
    'https://twitter.com/SivaK'
  ],
  jobTitle: 'AI Systems Architect',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Carnegie Mellon University'
  },
  knowsAbout: [
    'Healthcare Analytics',
    'Machine Learning',
    'Cloud Architecture'
  ]
}
```

```typescript
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description: summary,
  author: {
    '@type': 'Person',
    name: 'Siva Komaragiri'
  },
  datePublished: date,
  dateModified: lastModified,
  publisher: {
    '@type': 'Person',
    name: 'Siva Komaragiri'
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': url
  }
}
```

### 3.8 documentations/SPEC_IMPROVEMENTS.md — Enhanced Build & UX Specification
- Recommends pinning dependencies, expanding lint/format tooling, enhancing CI, upgrading `next.config.mjs`, modernizing data fetching, and improving UI/UX patterns, 3D hero fallbacks, graph renderer logic, API robustness, SEO metadata, and OG generation.

**Code Snippets:**

```json
"dependencies": {
  "@next/mdx": "15.0.0-rc.0", // Use specific versions
  "@prisma/client": "5.15.0",
  "next": "15.0.0-rc.0",
  "react": "19.0.0-rc.0",
  // ... etc.
},
"devDependencies": {
  "prisma": "5.15.0",
  "ts-node": "10.9.2", // Add ts-node for scripts
  "typescript": "5.4.5",
  // ... etc.
}
```

```json
"scripts": {
  // ...
  "lint": "next lint",
  "format": "prettier --write .",
  "validate:content": "ts-node scripts/validate-content.ts"
},
```

```javascript
/** @type {import("prettier").Config} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'always',
  printWidth: 80,
};

export default config;
```

```yaml
# ... (previous steps)
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm validate:content # <-- Add this step
      - run: pnpm build
```

```javascript
import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // providerImportSource: "@mdx-js/react", // If you want to use custom components in MDX
  },
})

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    typedRoutes: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default withMDX(nextConfig)
```

```typescript
import { promises as fs } from 'node:fs' // Use promises API
import path from 'node:path'
import matter from 'gray-matter'
import fg from 'fast-glob'

// ... (Front type)

export async function listProjects(): Promise<Front[]> {
  const dir = path.join(process.cwd(), 'content/projects')
  const files = await fg('*.mdx', { cwd: dir })

  const projects = await Promise.all(
    files.map(async (f) => {
      const p = path.join(dir, f)
      const raw = await fs.readFile(p, 'utf8') // Async read
      const { data } = matter(raw)
      return { slug: f.replace(/\.mdx$/, ''), ...(data as any) } as Front
    })
  )

  return projects.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
}
```

```tsx
'use client'
import Hero3D from '@/components/hero/Hero3D'
import { useEffect, useState } from 'react'

export default function Page() {
  const [useJsAnimation, setUseJsAnimation] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && !CSS.supports('animation-timeline: scroll()')) {
      setUseJsAnimation(true)
    }
  }, [])

  return (
    <main>
      {/* You can pass useJsAnimation as a prop to Hero3D to control the animation logic */}
      <Hero3D useJsAnimation={useJsAnimation} />
      {/* ... rest of the page */}
    </main>
  )
}
```

```tsx
'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Graph3D = dynamic(() => import('./Graph3D'), { ssr: false })
const Graph2D = dynamic(() => import('./Graph2D'), { ssr: false })

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch (e) {
    return false
  }
}

export default function GraphRenderer({ data }: { data: any }) {
  const [render3D, setRender3D] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (supportsWebGL() && !prefersReducedMotion) {
      setRender3D(true)
    }
  }, [])

  return render3D ? <Graph3D data={data} /> : <Graph2D data={data} />
}
```

```tsx
import { buildGraph } from '@/lib/graph'
import GraphRenderer from '@/components/graph/GraphRenderer'
export const dynamic = 'force-static'

export default async function GraphPage() {
  const data = await buildGraph()
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-4">Knowledge Graph</h1>
      <GraphRenderer data={data} />
    </main>
  )
}
```

```tsx
import ContactForm from '@/components/contact/ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Siva Komaragiri',
  description: 'Get in touch to collaborate on healthcare analytics and AI initiatives.',
}

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">Contact</h1>
      <ContactForm />
    </main>
  )
}
```

```typescript
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { resend } from '@/lib/resend'
import { db } from '@/lib/db'

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(20),
  token: z.string().optional(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = ContactSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 }
    )
  }

  // TODO: Verify reCAPTCHA token with Enterprise API

  try {
    await Promise.all([
      resend.emails.send({
        from: 'portfolio@sivakomaragiri.com',
        to: 'sivak85@cmu.edu',
        subject: `New portfolio inquiry from ${parsed.data.name}`,
        reply_to: parsed.data.email,
        text: parsed.data.message,
      }),
      db.message.create({
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          message: parsed.data.message,
          userAgent: req.headers.get('user-agent'),
          // ip: req.headers.get('x-forwarded-for'), // Be mindful of privacy
        },
      }),
    ])
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to send email or save message:', error)
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
```

```tsx
import { Person, WithContext } from 'schema-dts'

export default function JsonLd() {
  const personSchema: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Siva Komaragiri',
    url: 'https://sivakomaragiri.com',
    sameAs: [
      'https://www.linkedin.com/in/k-siva',
      'https://github.com/Siva-K85',
      'https://twitter.com/SivaK',
    ],
    jobTitle: 'AI Systems Architect & Healthcare Analytics Leader',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Carnegie Mellon University',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  )
}
```

```tsx
import JsonLd from '@/components/seo/JsonLd'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

```tsx
import { ImageResponse } from 'next/og'

export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'Siva Komaragiri'
  const summary = searchParams.get('summary')

  // Example of loading a font
  const fontData = await fetch(
    new URL('https://.../path-to-font.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '60px',
          background: 'oklch(98% 0.01 95)', // Use your theme colors
          color: 'oklch(18% 0.02 270)',
          fontFamily: '"CustomFont"',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700 }}>{title}</div>
        {summary && <div style={{ fontSize: 32, opacity: 0.8 }}>{summary}</div>}
        <div style={{ alignSelf: 'flex-end', fontSize: 24, opacity: 0.7 }}>
          sivakomaragiri.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'CustomFont', data: fontData, style: 'normal' }],
    }
  )
}
```

### 3.9 documentations/claude-siva-portfolio-review.md — Strategic Portfolio Audit
- Provides market positioning insights, warns against over-engineered 3D experiences, and supplies implementation alternatives focused on performance, accessibility, and recruiter expectations.

**Code Snippets:**

```
Are you applying for 3D/graphics/creative tech roles?
├─ YES → Keep hero, optimize heavily (follow checklist in Section 5)
│         Replace 3D graph with 2D
│         Budget 50+ hours for optimization
│
└─ NO → Remove all 3D
        Use Framer Motion + D3.js 2D graph
        Focus energy on project quality and case studies
        Save 350KB bundle, 2-3x faster performance
```

```javascript
// loader.js - REQUIRED for Firebase App Hosting
export default function imageLoader({ src, width, quality }) {
  if (process.env.NODE_ENV === "development") return src;

  const operations = [
    { operation: "input", type: "url", url: src },
    { operation: "resize", width },
    { operation: "output", format: "webp", quality: quality || 75 }
  ];

  return `/_fah/image/process?operations=${encodeURIComponent(JSON.stringify(operations))}`;
}

// next.config.js
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./loader.js",
  }
};
```

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

return (
  <Canvas frameloop={prefersReducedMotion ? 'never' : 'demand'}>
    {prefersReducedMotion ? (
      <StaticScreenshot /> // Show pre-rendered image
    ) : (
      <3DScene />
    )}
  </Canvas>
);
```

```jsx
// BEFORE: Using react-force-graph-3d
import ForceGraph3D from 'react-force-graph-3d';

export default function KnowledgeGraph({ data }) {
  return (
    <ForceGraph3D
      graphData={data}
      nodeAutoColorBy="group"
      // ... other props
    />
  );
}
```

```jsx
// AFTER: Using react-force-graph-2d
import ForceGraph2D from 'react-force-graph-2d';

export default function KnowledgeGraph({ data }) {
  const fgRef = useRef();

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        nodeAutoColorBy="group"
        nodeCanvasObject={(node, ctx, globalScale) => {
          // Custom rendering for accessibility
          const label = node.id;
          const fontSize = 12/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = node.color;
          ctx.fillText(label, node.x, node.y);
        }}
        onNodeClick={(node) => {
          // Keyboard accessible: focus on click
          fgRef.current.centerAt(node.x, node.y, 1000);
          fgRef.current.zoom(2, 1000);
        }}
        // Performance optimization
        cooldownTicks={100}
        onEngineStop={() => fgRef.current.zoomToFit(400)}
      />
    </div>
  );
}
```

```jsx
// utils/useReducedMotion.js
import { useState, useEffect } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
```

```jsx
// components/Hero3D.jsx (if keeping 3D hero)
import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from '@/utils/useReducedMotion';
import HeroStaticImage from './HeroStaticImage';

export default function Hero3D() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <HeroStaticImage />;
  }

  return (
    <Canvas
      frameloop="demand" // Only render when needed
      dpr={Math.min(window.devicePixelRatio, 2)} // Cap DPR
    >
      {/* Your 3D scene */}
    </Canvas>
  );
}
```

```css
/* global.css - Catch-all for animations */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```jsx
// components/TestimonialsSection.jsx
'use client';
import { useState } from 'react';

const testimonials = [
  {
    quote: "Siva transformed our residency compliance metrics from 19% to 75% in just 4 months.",
    author: "Dr. Amanda Lee",
    role: "Program Director, Allegheny General Hospital",
  },
  {
    quote: "Their analytics dashboard uncovered $2.4M in reimbursement risk we didn't know about.",
    author: "Michael Grant",
    role: "VP of Operations, UPMC Mercy",
  },
  {
    quote: "Rare combination of technical depth and healthcare domain expertise.",
    author: "Sarah Chen",
    role: "Principal, Healthcare Analytics Partners",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-[--color-surface-1] py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-[--color-text-secondary] uppercase tracking-[0.3em] text-sm">
              Healthcare Impact
            </p>
            <h2 className="text-4xl font-semibold text-[--color-text-primary]">
              Trusted by clinical and operations leaders
            </h2>
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.author}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-4 rounded-xl transition border ${
                    activeIndex === index
                      ? 'border-[--color-accent] bg-[--color-surface-2]'
                      : 'border-[--color-border-subtle] hover:border-[--color-border-strong]'
                  }`}
                >
                  <p className="text-lg text-[--color-text-primary]">
                    “{testimonial.quote}”
                  </p>
                  <p className="mt-3 text-sm text-[--color-text-secondary]">
                    {testimonial.author} · {testimonial.role}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="relative bg-[--color-surface-2] border border-[--color-border-strong] rounded-3xl p-10 shadow-elevated">
            <span className="absolute -top-6 left-10 text-7xl text-[--color-accent]/30">“</span>
            <p className="text-2xl leading-relaxed text-[--color-text-primary]">
              {testimonials[activeIndex].quote}
            </p>
            <div className="mt-6 border-t border-[--color-border-subtle] pt-6">
              <p className="font-semibold text-[--color-text-primary]">
                {testimonials[activeIndex].author}
              </p>
              <p className="text-sm text-[--color-text-secondary]">
                {testimonials[activeIndex].role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

```jsx
// components/ATSResumeBlock.jsx
export default function ATSResumeBlock() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="bg-[--color-surface-1] border border-[--color-border-subtle] rounded-3xl p-10 shadow-elevated space-y-8">
        <div className="grid gap-8 md:grid-cols-[2fr_3fr] items-start">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-[--color-text-primary]">
              ATS-Optimized Resume Strategy
            </h2>
            <p className="text-[--color-text-secondary]">
              75% of healthcare analytics resumes are rejected by ATS before human review.
              This section ensures yours is read by both systems and people.
            </p>
            <ul className="space-y-2 text-[--color-text-secondary]">
              <li>• Single-column PDF with selectable text</li>
              <li>• Uses ATS-friendly fonts (Arial/Calibri)</li>
              <li>• Includes critical keywords: SQL, Python, Tableau, Epic, HIPAA</li>
              <li>• Mirrors portfolio case studies for consistency</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <a
                href="/resume/sivak-ai-architect.pdf"
                className="group flex flex-col rounded-2xl border border-[--color-border-subtle] bg-[--color-surface-2] p-6 transition hover:border-[--color-border-strong]"
              >
                <span className="text-sm uppercase tracking-[0.3em] text-[--color-text-tertiary]">Primary</span>
                <span className="mt-3 text-xl font-semibold text-[--color-text-primary]">
                  Healthcare Analytics Leader Resume
                </span>
                <span className="mt-2 text-sm text-[--color-text-secondary]">
                  Optimized for data science & clinical informatics roles
                </span>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-[--color-accent] group-hover:translate-x-1 transition">
                  Download PDF →
                </span>
              </a>
              <a
                href="/resume/sivak-product-manager.pdf"
                className="group flex flex-col rounded-2xl border border-[--color-border-subtle] bg-[--color-surface-2] p-6 transition hover:border-[--color-border-strong]"
              >
                <span className="text-sm uppercase tracking-[0.3em] text-[--color-text-tertiary]">Secondary</span>
                <span className="mt-3 text-xl font-semibold text-[--color-text-primary]">
                  Product Strategy Resume
                </span>
                <span className="mt-2 text-sm text-[--color-text-secondary]">
                  Highlights cross-functional leadership & go-to-market wins
                </span>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-[--color-accent] group-hover:translate-x-1 transition">
                  Download PDF →
                </span>
              </a>
            </div>

            <div className="rounded-2xl bg-[--color-surface-3] p-6 border border-[--color-border-strong]">
              <h3 className="text-lg font-semibold text-[--color-text-primary]">Work Authorization</h3>
              <p className="mt-2 text-sm text-[--color-text-secondary] leading-relaxed">
                Authorized to work in the United States through F-1 OPT with STEM extension eligibility
                (36 months total through May 2028). Healthcare employers (hospitals, academic medical centers, nonprofits)
                are often H-1B cap-exempt, providing long-term sponsorship pathways beyond OPT.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

```jsx
// components/AboutHealthcareSection.jsx
export default function AboutHealthcareSection() {
  return (
    <div className="prose prose-neutral dark:prose-invert mx-auto">
      <h2>Why Healthcare Analytics?</h2>
      <p>
        Healthcare systems sit on terabytes of under-utilized data. My work bridges clinical stakeholders,
        data science teams, and compliance requirements to unlock measurable improvements in patient outcomes.
      </p>
      <p>
        I focus on projects that tie analytics directly to operational KPIs—reducing clinician burnout,
        preventing accreditation risks, and improving patient experience.
      </p>

      <h3>Focus Areas</h3>
      <ul>
        <li>Clinical quality & compliance analytics</li>
        <li>Operational efficiency & staffing optimization</li>
        <li>AI-assisted documentation & decision support</li>
        <li>Healthcare financial impact modeling</li>
      </ul>

      {/* Work authorization AFTER establishing value */}
      <section>
        <h2>Work Authorization</h2>
        <p>
          Currently authorized to work in the United States through F-1 OPT status
          with STEM extension eligibility, providing 36 months of continuous work
          authorization through May 2028. Healthcare employers (hospitals, academic
          medical centers, nonprofits) are often H-1B cap-exempt, enabling long-term
          career stability beyond OPT period.
        </p>
      </section>
    </div>
  );
}
```

```javascript
// Resume.pdf content (text version for reference)
// Top of resume, after contact info:

WORK AUTHORIZATION
Authorized to work in US through F-1 OPT with STEM extension eligibility (36 months total through May 2028)
```

```jsx
// app/page.jsx - Above-the-fold hero section
export default function HomePage() {
  return (
    <section className="min-h-screen flex items-center px-6 lg:px-12">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left column: Content (60%) */}
        <div className="space-y-6">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100">
              Siva Komaragiri
            </h1>
            <p className="text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 mt-2">
              Healthcare Data Analyst
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
              MS Healthcare Analytics | Carnegie Mellon University
            </p>
          </div>

          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Transforming complex healthcare data into actionable insights that
            improve patient outcomes and reduce costs.
          </p>

          {/* Hero metrics - Most important */}
          <div className="grid grid-cols-2 gap-4 py-6">
            <MetricCard
              value="296%"
              label="Compliance improvement"
            />
            <MetricCard
              value="$2.4M"
              label="Risk avoidance"
            />
            <MetricCard
              value="40%"
              label="Time saved"
            />
            <MetricCard
              value="3"
              label="Hospitals deployed"
            />
          </div>

          {/* CTAs */}
          <div className="flex gap-4 flex-wrap">
            <Button href="/projects" variant="primary" size="lg">
              View My Work
            </Button>
            <Button href="/Siva_Komaragiri_Resume.pdf" variant="secondary" size="lg" download>
              Download Resume
            </Button>
          </div>

          {/* Trust signals */}
          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>36 months US work authorization</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>Python | SQL | Tableau | Epic EHR</span>
            </div>
          </div>
        </div>

        {/* Right column: Visual (40%) */}
        <div className="flex items-center justify-center">
          <Image
            src="/hero-visual.png"
            alt="Healthcare analytics dashboard visualization"
            width={600}
            height={600}
            priority
            className="rounded-lg shadow-2xl"
          />
          {/* Or: Professional headshot + CMU logo */}
        </div>
      </div>
    </section>
  );
}

function MetricCard({ value, label }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
        {value}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {label}
      </div>
    </div>
  );
}
```

```jsx
// components/HeroAnimation.jsx
'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroAnimation({ children }) {
  const { scrollYProgress } = useScroll();

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

```jsx
// components/FloatingCards.jsx
import { motion } from 'framer-motion';

export default function FloatingCards() {
  return (
    <div className="relative">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6"
          style={{
            left: `${i * 30}%`,
            top: `${i * 40}px`,
          }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        >
          {/* Card content */}
        </motion.div>
      ))}
    </div>
  );
}
```

```jsx
// components/ProjectNetwork.jsx
'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function ProjectNetwork({ nodes, links }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 800;
    const height = 600;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // Force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    // Nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(drag(simulation));

    node.append('circle')
      .attr('r', 8)
      .attr('fill', d => d.color)
      .attr('tabindex', 0) // Keyboard accessible
      .attr('role', 'button')
      .attr('aria-label', d => `Project: ${d.name}`);

    node.append('text')
      .attr('dx', 12)
      .attr('dy', 4)
      .text(d => d.name)
      .style('font-size', '12px');

    // Update positions
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, [nodes, links]);

  return (
    <svg ref={svgRef} className="w-full h-full">
      <title>Project knowledge graph showing relationships between healthcare analytics projects</title>
    </svg>
  );
}

function drag(simulation) {
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event) {
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  return d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
}
```

### 3.10 documentations/gpt-agent-report.md — Implementation Diffs & Benchmarks
- Summarizes UI component enhancements, hero/graph upgrades, contact form improvements, and target metrics.
- Provides reference code for `Input`, `Label`, and dialog utilities.

**Code Snippet:**

```
#### `components/ui/Input.tsx` and `components/ui/Label.tsx`
```

### 3.11 documentations/chatgpt-dr-siva-portfolio.md — Deep Research Prompt
- Enumerates high-priority files, analysis focus areas, and explicit UI/3D expectations.
- Contains no fenced code snippets but drives comprehensive UI/UX review requirements.

## 4. Coordination Exchange with Heather

> **Me:** "Heather, I've cataloged all 11 Markdown files and extracted their code blocks. First we need to confirm the inventory, then log this plan before splitting analysis."
>
> **Heather:** "Great. I'll double-check the inventory while you finalize the summaries. Once the plan is saved, we can divide the workload."
>
> **Me:** "Perfect. After extraction I'll tackle README plus the prompt and agent docs. Could you concurrently review the strategic docs in `documentations/` and flag dependencies like the Firebase image loader?"
>
> **Heather:** "On it. I'll document risks around the 3D hero, knowledge graph fallback, and ATS messaging, then sync with you for action items."
>
> **Me:** "Once we both finish, let's reconvene to align on sequential follow-ups—CI enhancements, validation scripts, and SEO upgrades—before implementation."
>
> **Heather:** "Sounds good. I'll have notes ready and will highlight anything that blocks the follow-up sequence."

## 5. Execution Notes
- This document should be referenced whenever onboarding new contributors so they understand Markdown dependencies and execution order.
- Parallel tasks only begin after completing the sequential prerequisites outlined in Section 2.1.
- Code snippets were extracted directly from source files on the current branch to guarantee accuracy.
