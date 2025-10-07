# Siva Komaragiri — Portfolio

Healthcare analytics portfolio built with **Next.js 15**, **React 19**, and **Tailwind CSS v4**. The site showcases quantified case studies, research notes, and interactive data experiences tailored for healthcare executives and hiring managers.

## Highlights
- 3D hero with 2D fallback, scroll-driven storytelling, and knowledge graph navigation
- MDX-powered content system for projects, notes, skills matrix, and testimonials
- Secure contact workflow backed by Prisma/PostgreSQL, Resend email, and reCAPTCHA
- Analytics instrumentation (Plausible), accessibility guardrails, and performance budgets aligned with Core Web Vitals
- Firebase App Hosting deployment on Google Cloud with CI/CD automation

## Prerequisites
- **Node.js** ≥ 20
- **pnpm** ≥ 9 (preferred package manager)
- **Firebase CLI** ≥ 13 for hosting deployments
- **Google Cloud CLI** for secret and database management
- PostgreSQL instance (local or Cloud SQL) for Prisma

Verify versions before installing:

```bash
node --version
pnpm --version
firebase --version
gcloud --version
```

## Quick Start
1. Install dependencies  
   ```bash
   pnpm install
   ```
2. Copy environment variables  
   ```bash
   cp .env.example .env.local
   ```
3. Generate Prisma client  
   ```bash
   pnpm prisma:generate
   ```
4. Run database migrations (local Postgres)  
   ```bash
   pnpm prisma:migrate:dev
   ```
5. Start development server  
   ```bash
   pnpm dev
   ```
6. Visit `http://localhost:3000`

## Development Commands

| Task | Command |
| --- | --- |
| Lint formatting & types | `pnpm lint` |
| Format with Prettier | `pnpm format` |
| Validate MDX content structure | `pnpm validate:content` |
| Run unit tests (Jest) | `pnpm test` |
| Run Storybook | `pnpm storybook` |
| Build production bundle | `pnpm build` |

> Jest, Storybook, and additional quality tooling are configured in `/scripts` and `package.json`. See the [Testing & QA](#testing--qa) section for details.

## Content Management
- Projects live in `content/projects/*.mdx`
- Notes and long-form articles live in `content/notes/*.mdx`
- Frontmatter properties (`title`, `summary`, `role`, `tech`, etc.) power listing pages and API responses
- Use the content validation script with `pnpm validate:content` to catch missing metadata or schema drift before committing

## Testing & QA
| Area | Command | Notes |
| --- | --- | --- |
| Unit tests | `pnpm test` | Jest + React Testing Library targeting utilities and components |
| Integration/API | `pnpm test:integration` | Exercises Next.js API routes with mocked dependencies |
| Accessibility | `pnpm test:a11y` | Pa11y CLI sweep for critical user journeys |
| Storybook visual review | `pnpm storybook` | Component-driven workflows and Chromatic-ready configuration |
| Content validation | `pnpm validate:content` | Ensures required fields exist in MDX files |
| Performance budget | `pnpm test:performance` | Validates homepage bundle stays below 180KB after build |

> Set `NEXT_PUBLIC_PERFORMANCE_PANEL=true` to display the in-browser Core Web Vitals panel during local development.

## API Surface
REST endpoints under `/api` expose content and contact functionality. Full request/response contracts live in [`documentations/api-reference.md`](documentations/api-reference.md).

## Environment Variables
All required keys, default values, and usage notes are documented in [`documentations/environment-variables.md`](documentations/environment-variables.md). Keep secrets out of version control and configure Firebase Secret Manager for production.

## Deployment (Firebase App Hosting)
1. **Connect Repository**: Firebase Console → App Hosting → Connect GitHub repository `siva-k85/siva-portfolio-repo` on `main`
2. **Configure Secrets**: Map `.env` keys in Google Secret Manager (database, Resend, reCAPTCHA, analytics, Sentry)
3. **Provision Database**: Create Cloud SQL (Postgres) and set `DATABASE_URL`
4. **Image Optimization**: Deploy Firebase Image Processing extension and configure the Next.js custom loader
5. **CI/CD Workflow**: GitHub Actions pipeline runs lint, tests, build, and deploy steps defined in `.github/workflows`
6. **Custom Domain**: Point `sivakomaragiri.com` to Firebase Hosting and enable HTTPS

## Project Structure

```
.
├── app/                  # Next.js App Router pages and API routes
├── components/           # UI, data viz, hero, form, and analytics components
├── content/              # MDX content for projects, notes, skills, bios
├── documentations/       # Specs, deployment guides, API docs
├── lib/                  # Utilities for MDX, analytics, config
├── prisma/               # Database schema and migrations
├── public/               # Static assets (images, fonts, resume PDFs)
├── scripts/              # Automation (content validation, performance checks)
└── tests/                # Unit and integration tests
```

## Performance Budgets
- Largest Contentful Paint ≤ **2.5s**
- Interaction to Next Paint ≤ **200ms**
- Cumulative Layout Shift ≤ **0.1**
- JavaScript payload on landing page ≤ **180KB** (gzipped)

## Troubleshooting
- **Prisma connection errors**: confirm Postgres is running and `DATABASE_URL` is correct
- **reCAPTCHA failures**: ensure keys are configured in both `.env.local` and Firebase Secret Manager
- **Plausible analytics not firing**: verify domains match `PLAUSIBLE_DOMAIN` and script is loaded in production
- **3D hero fallback kicks in**: occurs automatically on unsupported WebGL devices or when reduced motion is enabled

---

© 2024 Siva Komaragiri. All rights reserved.
