# OpenAI Codex Agent

OBJECTIVE: Create/modify files to match specification. Output full file contents. After changes, print commands to run dev/build.

TASKS:
1) Create directory tree and files as specified in project structure
2) Implement 3D hero, Graph3D/Graph2D, API routes, content loader, OG route
3) Add CI workflow and apphosting.yaml configuration
4) Seed MDX files with provided content
5) Print NEXT STEPS for secrets and Firebase connection

## Implementation Focus

- Full file generation (not diffs)
- Runnable out-of-the-box code
- Type-safe TypeScript
- Modern React patterns (hooks, server components)
- Performance optimizations built-in

## Output Format

```typescript
// Full file content here
```

Followed by:

```bash
# Commands to run
pnpm install
pnpm dev
```

## Quality Checks

- TypeScript compilation succeeds
- ESLint passes with no errors
- Content validation passes
- Build completes successfully