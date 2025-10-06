
# Drastic Improvements for the Siva Komaragiri Portfolio Spec

This document outlines a series of significant enhancements to the original project specification. The goal is to elevate the final product in terms of performance, user experience, developer experience, and maintainability, ensuring a truly production-ready, high-quality portfolio site.

---

## 1. Project Setup & Developer Experience

Robust tooling and a streamlined developer workflow are crucial for long-term project health.

### 1.1. Dependency Management: Pin Your Dependencies

**Why:** Using `"latest"` for dependencies in `package.json` is highly risky. It can lead to unexpected build failures or runtime bugs when a dependency releases a breaking change.

**How:** Replace all `"latest"` tags with specific, stable versions. After running `pnpm install`, your `pnpm-lock.yaml` will contain the exact versions installed. Update your `package.json` to reflect these versions.

**Example `package.json` snippet:**
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
**Action:** Also add `ts-node` to `devDependencies` to properly run the `validate:content` script.

### 1.2. Enhanced Linting and Formatting

**Why:** A consistent code style is non-negotiable. The default `next lint` is a good start, but enforcing formatting with Prettier and adding stricter ESLint rules prevents bikeshedding and improves code quality.

**How:**
1.  Add Prettier and its ESLint integration.
2.  Create a `.prettierrc.mjs` configuration file.
3.  Add a `format` script to `package.json`.

**`package.json` scripts:**
```json
"scripts": {
  // ...
  "lint": "next lint",
  "format": "prettier --write .",
  "validate:content": "ts-node scripts/validate-content.ts"
},
```

**`.prettierrc.mjs`:**
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

### 1.3. Fortify the CI Pipeline

**Why:** The CI pipeline should be your first line of defense. It currently only runs `lint` and `build`.

**How:** Add the `validate:content` script to your CI workflow to catch content errors before they hit production.

**Updated `.github/workflows/ci.yml`:**
```yaml
# ... (previous steps)
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm validate:content # <-- Add this step
      - run: pnpm build
```

---

## 2. Core Architecture & Performance

Architectural choices directly impact performance and scalability.

### 2.1. Advanced `next.config.mjs`

**Why:** The base configuration is minimal. We can enhance security and performance with a few additions.

**How:** Add security headers via the `headers` function and configure the MDX provider to allow for custom components.

**`next.config.mjs`:**
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

### 2.2. Modernize Data Fetching in `lib`

**Why:** Using synchronous file system calls (`fs.readFileSync`) is blocking and not ideal, even during the build step. Using `async/await` with `fs.promises` is more modern and scalable.

**How:** Refactor `lib/content.ts` and `lib/graph.ts` to use asynchronous methods.

**`lib/content.ts` (listProjects example):**
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

---

## 3. UI/UX & Visuals

A polished UI and smooth UX will make the portfolio stand out.

### 3.1. Performant Hero Animation with CSS Fallback

**Why:** The current hero animation is purely JavaScript-driven. Modern CSS Scroll-Driven Animations are far more performant as they can run off the main thread. We should use them by default and provide the JS animation as a fallback.

**How:**
1.  Use CSS `animation-timeline` to drive the animation via scroll position.
2.  Use `@supports not (animation-timeline: scroll())` to apply the JS-based animation only when the new CSS features are not supported.

**`components/hero/Hero3D.tsx`:**
This component would remain largely the same but would be conditionally rendered or have its animation logic conditionally triggered based on feature detection from the parent.

**A better approach in the parent component `app/(marketing)/page.tsx`:**
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
This provides a much better user experience on supported browsers.

### 3.2. Intelligent Graph Rendering

**Why:** The current logic for showing 2D vs. 3D graphs is based on screen size. A better approach is to check for WebGL support and respect the user's motion preferences.

**How:** Create a client-side wrapper component that performs these checks and renders the appropriate graph.

**New component `components/graph/GraphRenderer.tsx`:**
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
**Then in `app/graph/page.tsx`:**
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

---

## 4. Backend & API

Let's make the backend more robust and feature-complete.

### 4.1. Production-Ready reCAPTCHA Verification

**Why:** The current `verifyRecaptcha` is a placeholder. A real implementation is needed to prevent spam.

**How:** Use `fetch` to call the Google Cloud reCAPTCHA Enterprise API.

**`lib/recaptcha.ts`:**
```typescript
export async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!token) return false

  const projectId = process.env.RECAPTCHA_PROJECT_ID
  const apiKey = process.env.RECAPTCHA_API_KEY
  const siteKey = process.env.RECAPTCHA_SITE_KEY

  if (!projectId || !apiKey || !siteKey) {
    console.error('reCAPTCHA environment variables are not set.')
    return false // Fail open in dev if you prefer, but fail closed in prod
  }

  const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: {
          token: token,
          siteKey: siteKey,
          expectedAction: 'CONTACT_FORM_SUBMIT', // Define expected actions
        },
      }),
    })

    const data = await response.json()

    // Check for token validity and score
    if (data.tokenProperties?.valid && data.riskAnalysis?.score >= 0.7) {
      return true
    }
    return false
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error)
    return false
  }
}
```

### 4.2. Database Integration for Contact Form

**Why:** The `ContactMessage` model exists in `schema.prisma`, but the API route doesn't use it. Storing messages provides a valuable record.

**How:** Instantiate the Prisma client and create a record in the database.

**`app/api/contact/route.ts`:**
```typescript
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { sendEmail } from '@/lib/email'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const Contact = z.object({ name: z.string().min(2), email: z.string().email(), message: z.string().min(10) })

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = Contact.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }

  const token = req.headers.get('x-recaptcha-token') || ''
  const recaptchaOk = await verifyRecaptcha(token)
  if (!recaptchaOk) {
    return NextResponse.json({ ok: false, error: 'captcha' }, { status: 429 })
  }

  // Use a try/catch block for database and email operations
  try {
    await Promise.all([
      sendEmail(parsed.data),
      prisma.contactMessage.create({
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

---

## 5. Content & SEO

Structured data and rich content presentation are key for discoverability.

### 5.1. Structured Data with JSON-LD

**Why:** Search engines love structured data. It helps them understand your content and can result in rich snippets in search results.

**How:** Add a component that generates and injects a JSON-LD script tag into the page `<head>`.

**`components/seo/JsonLd.tsx`:**
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
**In `app/layout.tsx`:**
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
You can create more specific JSON-LD for articles (`NewsArticle`) on your project and note pages.

### 5.2. Superior OG Image Generation

**Why:** The current OG image is generic. A visually appealing, branded OG image improves social sharing engagement.

**How:** Enhance the `app/og/route.tsx` to load custom fonts, use flexbox for better layout, and potentially add a background image or logo.

**`app/og/route.tsx` (Enhanced):**
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
This provides a much more professional and on-brand social card.
