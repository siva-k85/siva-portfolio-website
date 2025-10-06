# Agents

## Roles
- **LeadArchitect**: Overall system design and architecture decisions
- **FrontendEngineer**: React components, UI/UX implementation
- **GraphEngineer**: Knowledge graph visualization and data structure
- **BackendEngineer**: API routes, database integration, server logic
- **DevOps**: CI/CD, deployment, monitoring, infrastructure
- **QAEngineer**: Testing, validation, performance checks
- **SEOWorker**: SEO optimization, structured data, sitemap
- **PerfAnalyst**: Performance optimization, Core Web Vitals

## DoD (Definition of Done) per Milestone

### M0: Project Setup
- Git repository initialized
- Directory structure created
- Configuration files in place
- Dependencies with pinned versions

### M1: Core Implementation  
- All pages and routes functional
- Components rendering properly
- Content management system working
- API endpoints responding

### M2: Enhanced Features
- 3D animations performant
- Graph visualization interactive
- Database integrated
- Email system operational

### M3: Production Ready
- Security headers configured
- reCAPTCHA protection active
- SEO optimization complete
- Error tracking configured

### M4: Performance
- CWV targets met (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1)
- JS budget ≤ 180KB landing page
- Images optimized
- Code splitting implemented

### M5: Deployment
- CI/CD pipeline running
- Firebase App Hosting configured
- Environment variables secured
- Production deployment successful

## Guardrails

- **Security**: No secrets committed to repository
- **Accessibility**: WCAG AA compliance, focus visible, keyboard navigation
- **Performance**: Respect `prefers-reduced-motion`, WebGL detection
- **Code Quality**: ESLint passing, Prettier formatted
- **Content**: All MDX validated, no broken links

## Checklists

### Pre-deployment
- [ ] Contrast ratio AA compliant
- [ ] Focus states visible on all interactive elements
- [ ] Keyboard navigation functional throughout
- [ ] JSON-LD structured data valid
- [ ] OG cards rendering correctly
- [ ] All environment variables configured
- [ ] Database migrations run
- [ ] Content validation passing
- [ ] Build succeeding locally
- [ ] Lighthouse scores acceptable