# Deployment Guide

This guide covers the full workflow for deploying the portfolio to Firebase App Hosting with Cloud SQL, Plausible Analytics, and supporting services.

## 1. Prerequisites
- Google Cloud project with billing enabled
- Firebase App Hosting activated in the project
- Cloud SQL (PostgreSQL 14+) instance provisioned
- Firebase CLI (`npm install -g firebase-tools`)
- Google Cloud CLI (`gcloud components update`)
- GitHub repository with GitHub Actions enabled

Authenticate both CLIs:

```bash
firebase login
gcloud auth login
```

## 2. Configure Environment Secrets
Use Google Secret Manager for all runtime secrets. The `apphosting.yaml` file maps secret names to environment variables.

| Secret Name | Environment Variable | Description |
| --- | --- | --- |
| `portfolio-database-url` | `DATABASE_URL` | Postgres connection string |
| `portfolio-resend-api-key` | `RESEND_API_KEY` | Email delivery |
| `portfolio-recaptcha-api-key` | `RECAPTCHA_API_KEY` | reCAPTCHA Enterprise server key |
| `portfolio-recaptcha-site-key` | `RECAPTCHA_SITE_KEY` | reCAPTCHA client key |
| `portfolio-plausible-domain` | `PLAUSIBLE_DOMAIN` | Analytics domain |
| `portfolio-sentry-dsn` | `SENTRY_DSN` | Observability |

**Command**

```bash
gcloud secrets create portfolio-database-url --replication-policy="automatic"
gcloud secrets versions add portfolio-database-url --data-file=<(echo "$DATABASE_URL")
```

Repeat for each secret.

## 3. Database Migration
1. Create the database:
   ```bash
   gcloud sql instances create portfolio-db --database-version=POSTGRES_14 --tier=db-custom-1-3840
   gcloud sql databases create portfolio_app --instance=portfolio-db
   ```
2. Generate SSL certificates if required and store credentials securely.
3. Run Prisma migrations (locally or via CI):
   ```bash
   DATABASE_URL="postgres://..." pnpm prisma migrate deploy
   ```

## 4. Firebase App Hosting Setup
1. Initialize Firebase in the repo:
   ```bash
   firebase experiments:enable webframeworks
   firebase init hosting
   ```
2. Select the existing project, enable App Hosting, and confirm Next.js detection.
3. Ensure `apphosting.yaml` contains secret mappings, region, and image builder config.

## 5. GitHub Actions Pipeline
The CI/CD pipeline performs:
1. Checkout & cache dependencies (`pnpm install --frozen-lockfile`)
2. Run linting (`pnpm lint`) and tests (`pnpm test`)
3. Build (`pnpm build`)
4. Deploy via `firebase deploy --only hosting`

**Secrets in GitHub Actions**
- `FIREBASE_SERVICE_ACCOUNT` (JSON)
- `DATABASE_URL`
- Any other runtime secrets to mirror Secret Manager values

## 6. Plausible Analytics Integration
1. Add the domain (`sivakomaragiri.com`) in Plausible
2. Configure custom events in Plausible UI (CTA clicks, contact conversions)
3. Ensure script injection is enabled in the Next.js layout for production builds

## 7. Post-Deployment Checklist
- ✅ Homepage, projects, notes, and about routes load without errors
- ✅ Contact form submissions appear in Prisma database and Resend inbox
- ✅ Analytics events register in Plausible dashboard
- ✅ Core Web Vitals metrics remain within budget (verify in Chrome Lighthouse)
- ✅ 3D hero gracefully degrades to 2D fallback on unsupported devices
- ✅ Service worker caches static assets (after implementation)

## 8. Rolling Back
Use Firebase Hosting rollback:

```bash
firebase hosting:versions:list
firebase hosting:rollback <versionId>
```

Keep Prisma migrations reversible with `prisma migrate resolve --applied` to sync state when rolling back database schema changes.

## 9. Monitoring & Alerts
- Configure Plausible email reports for traffic and conversions
- Add uptime checks via Google Cloud Monitoring or StatusCake
- Forward Next.js runtime logs to Google Cloud Logging
- Integrate Sentry DSN for error tracing (server and client)

## 10. Disaster Recovery
- Schedule daily automated backups for Cloud SQL
- Export MDX content and schema to Cloud Storage weekly
- Maintain GitHub branch protection to prevent accidental force pushes
