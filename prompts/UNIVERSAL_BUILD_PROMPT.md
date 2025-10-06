# UNIVERSAL BUILD PROMPT

(Repeat these instructions verbatim for downstream agents.)

## ACTIONS TO RUN (shell)

1) Ensure Node 20+ and pnpm are installed:
   ```bash
   node --version  # Should be >= 20.0.0
   pnpm --version  # Should be >= 9.0.0
   ```

2) Install dependencies:
   ```bash
   pnpm install
   ```

3) Generate Prisma client:
   ```bash
   pnpm prisma:generate
   ```

4) Run development server:
   ```bash
   pnpm dev
   ```
   Access at http://localhost:3000

5) (Optional) Create GitHub repository:
   ```bash
   gh repo create siva-k85/siva-portfolio-repo --public --source=. --remote=origin --push
   ```

## FIREBASE APP HOSTING (manual once)

1. **Connect Repository**:
   - Go to Firebase Console → App Hosting
   - Connect repository `siva-k85/siva-portfolio-repo` on `main` branch
   - Enable automatic deployments

2. **Configure Secrets in Secret Manager**:
   Map these secrets from `apphosting.yaml`:
   
   **Database**:
   - `CLOUDSQL_INSTANCE`: PROJECT:REGION:INSTANCE
   - `DB_USER`: portfolio_admin
   - `DB_PASS`: [secure password]
   - `DB_NAME`: portfolio_db
   - `DATABASE_URL`: postgresql://[connection string]
   
   **Services**:
   - `RESEND_API_KEY`: [Resend API key]
   - `RECAPTCHA_PROJECT_ID`: [GCP project ID]
   - `RECAPTCHA_SITE_KEY`: [reCAPTCHA site key]
   - `RECAPTCHA_API_KEY`: [reCAPTCHA API key]
   - `SENTRY_DSN`: [Sentry DSN if using]

3. **Set Custom Domain**:
   - Add `sivakomaragiri.com` in Firebase Hosting
   - Configure DNS records as instructed

## VERIFICATION CHECKLIST

### Functionality
- [ ] Landing hero scroll animates smoothly
- [ ] Reduced-motion shows static poster
- [ ] /projects lists 4 seeded projects
- [ ] Each project page renders correctly
- [ ] /notes lists 2 seeded notes
- [ ] Each note page renders correctly
- [ ] /graph loads 3D on desktop, 2D on mobile
- [ ] Graph nodes link to projects when clicked
- [ ] /resume shows 3 PDF links
- [ ] /api/contact returns 200 with valid payload
- [ ] Spam blocked if missing reCAPTCHA token

### Performance
- [ ] LCP ≤ 2.5s on mid-tier mobile
- [ ] INP ≤ 200ms
- [ ] CLS ≤ 0.1
- [ ] JS bundle ≤ 180KB for landing page

### Quality
- [ ] CI build passes on PR and main
- [ ] ESLint has no errors
- [ ] Content validation passes
- [ ] TypeScript compiles without errors
- [ ] Prisma generates successfully

### SEO & Accessibility
- [ ] JSON-LD validates in Schema.org validator
- [ ] OG images render correctly
- [ ] Keyboard navigation works throughout
- [ ] Focus states visible on all interactive elements
- [ ] Contrast ratio meets WCAG AA

## COMMON ISSUES & FIXES

### Issue: Build fails with "Cannot find module"
**Fix**: Run `pnpm install` and ensure all dependencies are installed

### Issue: Prisma client not generated
**Fix**: Run `pnpm prisma:generate`

### Issue: Environment variables not loaded
**Fix**: Copy `.env.example` to `.env.local` and fill in values

### Issue: 3D graph not rendering
**Fix**: Check browser console for WebGL errors; falls back to 2D automatically

### Issue: Content validation fails
**Fix**: Ensure all MDX files have required frontmatter fields (title, summary)

## END OF SPEC

This completes the universal build prompt. All agents should follow these instructions to ensure consistent implementation and deployment.