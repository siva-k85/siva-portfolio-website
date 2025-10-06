# API Reference

This document captures the HTTP surface area of the portfolio application. All endpoints are built with Next.js App Router (`app/api/*`) and return JSON responses. Unless stated otherwise, every endpoint:

- Responds with `application/json`
- Is rate-limited by upstream middleware (`withRateLimit`)
- Requires TLS (HTTPS) in production deployments

## Authentication
All endpoints are public but protected with explicit safeguards:

- **Contact form** requests must include a valid reCAPTCHA token
- **Content** routes expose read-only data sourced from MDX files
- **Analytics** events (to be added) require client-side Plausible scripts

## Endpoints

### `GET /api/projects`
Returns a list of project summaries sourced from `content/projects/*.mdx`.

| Attribute | Type | Description |
| --- | --- | --- |
| `slug` | `string` | URL slug for the project |
| `title` | `string` | Project title |
| `description` | `string` | Short summary (mirrors frontmatter `summary`) |
| `date` | `string` (ISO) | Publication date |
| `technologies` | `string[]` | Tech stack metadata |
| `metrics` | `Record<string, unknown>` | Optional KPI map |

**Sample Response**

```json
[
  {
    "slug": "sepsis-command-center",
    "title": "Sepsis Command Center",
    "description": "Real-time physiologic monitoring cut sepsis mortality by 14%.",
    "date": "2024-08-20",
    "technologies": ["Python", "Apache Kafka", "TimescaleDB"],
    "metrics": {
      "mortality_reduction": "14%",
      "bundle_time_improvement_hours": 9.3
    }
  }
]
```

### `GET /api/projects/:slug`
**Status:** _Planned._ Will expose a single case study with rendered MDX. Until implemented, use static pages at `/projects/[slug]`.

### `GET /api/notes` _(planned)_
Will mirror project endpoint but for thought leadership posts under `content/notes`.

### `POST /api/contact`
Submits the contact form, triggering both email notification and persistence in PostgreSQL.

**Headers**

- `Content-Type: application/json`
- `x-recaptcha-token: <string>` — client-side token generated via reCAPTCHA Enterprise

**Payload**

| Field | Type | Rules |
| --- | --- | --- |
| `name` | `string` | Required, min length 2 |
| `email` | `string` | Required, valid email format |
| `message` | `string` | Required, min length 10 |

**Responses**

- `200 OK` – `{ "ok": true }`
- `400 Bad Request` – `{ "ok": false, "error": "bad_request" }` when validation fails
- `429 Too Many Requests` – `{ "ok": false, "error": "captcha" }` or rate limit triggered
- `500 Internal Server Error` – `{ "ok": false, "error": "server_error" }` when email/database fails

### `GET /api/badges`
Placeholder endpoint for badge metadata. Returns `{ ok: true, data: {} }`. Will evolve into analytics badges once performance and certification data are finalized.

## Webhooks
No inbound webhooks are currently configured. Future integrations (e.g., Plausible event forwarding, Resend status callbacks) will be documented here.

## Error Handling
- Validation errors follow a consistent `{ ok: false, error: <code> }` shape.
- Rate limiting wraps handlers with `withRateLimit(req, handler, maxRequests, durationMs)`.
- All fatal errors are logged server-side via `console.error` and surfaced to Observability providers (Sentry) in production.

## Versioning
This API is internal to the portfolio. Backwards-incompatible changes will be noted in commit messages and changelog entries (`documentations/SPEC_IMPROVEMENTS.md`).
