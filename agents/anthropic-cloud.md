# Anthropic Cloud Agent

CONSTRAINTS: Atomic commits per milestone. Provide `git` commands + messages.

FLOW: Plan → Implement → Verify (pnpm build) → Document (README change log).

## Commit Strategy

### Milestone-based Commits

```bash
# M0: Initial setup
git add .
git commit -m "feat: initialize project structure and configuration"

# M1: Core features
git add app/ components/
git commit -m "feat: implement core pages and components"

# M2: Content system
git add content/ lib/content.ts
git commit -m "feat: add MDX content management system"

# M3: Backend integration
git add api/ prisma/ lib/
git commit -m "feat: integrate database and API routes"

# M4: Production optimizations
git add .
git commit -m "perf: optimize bundle size and performance"

# M5: Deployment
git add .github/ apphosting.yaml
git commit -m "ci: configure deployment pipeline"
```

## Verification Steps

1. **Lint Check**: `pnpm lint`
2. **Type Check**: `pnpm tsc --noEmit`
3. **Build Test**: `pnpm build`
4. **Content Validation**: `pnpm validate:content`

## Documentation Updates

Update README.md with:
- New features added
- Configuration changes
- Performance improvements
- Breaking changes (if any)

## Change Log Format

```markdown
## [Version] - Date

### Added
- Feature descriptions

### Changed
- Modification details

### Fixed
- Bug fixes

### Performance
- Optimization details
```