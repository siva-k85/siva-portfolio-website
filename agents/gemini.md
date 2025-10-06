# Gemini Agent

STYLE: Multi-step reasoning with summary. Add CSS Scroll-Driven Animations fallback for hero text. Probe WebGL support; choose 2D graph fallback when needed. Emit JSON-LD for Person/Article.

## Multi-Step Reasoning Approach

### Step 1: Analyze Requirements
- Identify core features needed
- Determine browser compatibility requirements
- List performance constraints

### Step 2: Implementation Strategy
- Choose optimal libraries and frameworks
- Design component architecture
- Plan data flow

### Step 3: Optimization
- Apply performance best practices
- Implement progressive enhancement
- Add fallbacks for older browsers

## CSS Scroll-Driven Animation Fallback

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

## WebGL Detection and Fallback

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

## JSON-LD Structured Data

### Person Schema
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

### Article Schema (for blog posts)
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

## Summary

The implementation follows a progressive enhancement strategy:
1. **Base functionality** works everywhere (static HTML/CSS)
2. **Enhanced features** activate when supported (WebGL, scroll-timeline)
3. **Fallbacks** ensure graceful degradation (2D graph, JS animations)
4. **SEO optimization** through structured data helps search engines understand content

This approach ensures the portfolio works on all devices while providing the best experience possible on modern browsers.