# siva-portfolio-repo

Flagship personal portfolio (Next.js 15, Tailwind v4 tokens), CI via GitHub Actions, GCP Firebase App Hosting.

## Local dev

```bash
npm install
npm run dev
```

## Deployment — Firebase App Hosting (GCP)

1. In Firebase Console → **App Hosting** → **Connect repository**, select `siva-k85/siva-portfolio-repo`, branch `main`.
2. Add runtime **Secrets** mapped from `apphosting.yaml` in **Secret Manager**:
   - CLOUDSQL_INSTANCE, DB_USER, DB_PASS, DB_NAME
   - RESEND_API_KEY
   - RECAPTCHA_PROJECT_ID, RECAPTCHA_SITE_KEY, RECAPTCHA_API_KEY
   - SENTRY_DSN
   - (PLAUSIBLE_DOMAIN can be plain env value)
3. Set build command to: `npm ci && npm run build`.
4. Set output/start automatically detected by Next.js.
5. On every push to `main`, App Hosting will build & deploy. PRs get preview builds.

## Environment

Copy `.env.example` to `.env.local` for local dev (do **not** commit real secrets).

## GitHub Actions

CI runs on PRs and `main` pushes (lint + build). Deployment is handled by Firebase App Hosting's GitHub connection.
