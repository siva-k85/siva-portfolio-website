# Environment Variables

All environments (local, staging, production) rely on the variables described below. The `.env.example` file provides placeholders for local development; production secrets must be stored in Google Secret Manager and referenced from `apphosting.yaml`.

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `CLOUDSQL_INSTANCE` | ✅ | Cloud SQL instance connection name (`project:region:instance`) used by Firebase App Hosting connector. | `portfolio-1234:us-central1:portfolio-db` |
| `DB_USER` | ✅ | Database username with privileges to run Prisma migrations. | `portfolio_admin` |
| `DB_PASS` | ✅ | Password for the database user. | `secure_pass_123` |
| `DB_NAME` | ✅ | Default database name. | `portfolio_app` |
| `DATABASE_URL` | ✅ | Full Postgres connection string used by Prisma and direct SQL clients. | `postgresql://user:pass@host:5432/portfolio_app?schema=public` |
| `RESEND_API_KEY` | ✅ | Resend API key for transactional emails triggered by the contact form. | `re_1234567890` |
| `RECAPTCHA_PROJECT_ID` | ✅ | Google Cloud project ID hosting reCAPTCHA Enterprise. | `portfolio-1234` |
| `RECAPTCHA_SITE_KEY` | ✅ | Public site key passed to the browser for token generation. | `6LeExampleAAAAAExample` |
| `RECAPTCHA_API_KEY` | ✅ | Server key used to verify tokens via reCAPTCHA Enterprise API. | `AIzaSyExample` |
| `PLAUSIBLE_DOMAIN` | ⚠️ | Domain configured in Plausible for analytics tracking (server-side usage). | `analytics.sivakomaragiri.com` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | ⚠️ | Public domain used by Plausible script on the client. | `sivakomaragiri.com` |
| `NEXT_PUBLIC_PERFORMANCE_PANEL` | ⚠️ | Toggle (`true`/`false`) to render the in-browser Core Web Vitals panel. | `false` |
| `SENTRY_DSN` | ⚠️ | DSN for error tracking; optional but recommended for production. | `https://abc123.ingest.sentry.io/456` |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Canonical site URL used for SEO and metadata. | `https://sivakomaragiri.com` |
| `NEXT_PUBLIC_CALENDLY_URL` | ✅ | CTA link for booking time. | `https://calendly.com/siva-komaragiri` |
| `NEXT_PUBLIC_LINKEDIN_URL` | ✅ | LinkedIn profile link. | `https://www.linkedin.com/in/k-siva` |
| `NEXT_PUBLIC_GITHUB_URL` | ✅ | GitHub profile link. | `https://github.com/Siva-K85` |
| `NEXT_PUBLIC_TWITTER_URL` | ✅ | X/Twitter profile link. | `https://twitter.com/SivaK` |

Legend:
- ✅ Required for all environments
- ⚠️ Optional locally but required in production

## Usage Notes
- Do not commit `.env.local` or production secrets to source control.
- When running Storybook or Jest, ensure environment variables are loaded via `dotenv/config` or the Next.js runtime environment.
- For Firebase deployments, reference [deployment-guide.md](deployment-guide.md) to mirror these variables in Secret Manager.
