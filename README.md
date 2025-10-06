# Siva Komaragiri — Portfolio

Next.js 15 + React 19 + Tailwind v4 tokens, 3D hero (R3F), Knowledge Graph (3D/2D), Firebase App Hosting on GCP.

## Features

- **3D Hero Animation**: WebGL-powered particle system with scroll-driven animation
- **Knowledge Graph**: Interactive visualization of skills, projects, and technologies
- **MDX Content**: Markdown-powered project and note pages with full MDX support
- **SEO Optimized**: JSON-LD structured data, OG images, sitemap generation
- **Production Ready**: Security headers, reCAPTCHA protection, database integration
- **Performance**: Async data fetching, code splitting, image optimization

## Tech Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **Styling**: Tailwind CSS v4 with CSS variables
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Database**: PostgreSQL with Prisma ORM
- **Hosting**: Firebase App Hosting (SSR) on GCP
- **Analytics**: Plausible (cookieless)
- **Email**: Resend
- **CI/CD**: GitHub Actions + Firebase App Hosting

## Development

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

## Environment Setup

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

Then update the values with your actual credentials. **Never commit real secrets to version control.**

## Deployment (Firebase App Hosting)

1. **Connect Repository**: In Firebase Console → App Hosting → Connect repository `siva-k85/siva-portfolio-repo`, branch `main`

2. **Configure Secrets**: Add secrets in Secret Manager mapped from `apphosting.yaml`:
   - Database: `CLOUDSQL_INSTANCE`, `DB_USER`, `DB_PASS`, `DB_NAME`, `DATABASE_URL`
   - Email: `RESEND_API_KEY`
   - reCAPTCHA: `RECAPTCHA_PROJECT_ID`, `RECAPTCHA_SITE_KEY`, `RECAPTCHA_API_KEY`
   - Monitoring: `SENTRY_DSN`

3. **Set Custom Domain**: Configure `sivakomaragiri.com` in Firebase Hosting settings

4. **Automatic Deployments**:
   - Main branch pushes trigger production deployments
   - Pull requests get preview deployments

## Project Structure

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

## Performance Targets

- **LCP**: ≤ 2.5s
- **INP**: ≤ 200ms
- **CLS**: ≤ 0.1
- **JS Bundle**: ≤ 180KB (landing page)

## License

© 2024 Siva Komaragiri. All rights reserved.
