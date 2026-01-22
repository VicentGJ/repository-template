# AGENTS.md - Repository Guidelines
Guidance for agentic coding tools working in this monorepo.

## Repository Structure
```
/
├── apps/
│   ├── api/          # NestJS backend
│   └── web/          # Next.js frontend (App Router)
├── packages/
│   ├── config/       # Shared ESLint, Prettier, TypeScript configs
│   └── types/        # Shared API contracts and DTOs
└── turbo.json        # Turborepo pipeline configuration
```

## Build, Lint, Test Commands
### Root (runs across workspaces)
```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm typecheck
pnpm format
```

### API (NestJS) `apps/api`
```bash
pnpm build
pnpm start
pnpm start:dev
pnpm lint
pnpm typecheck
pnpm test
pnpm test:watch
pnpm test:cov
pnpm test:e2e
pnpm test:debug

# Single test file
pnpm test -- --testPathPattern=metrics.service.spec.ts

# Single test by name
pnpm test -- -t "should create user"
```

### Web (Next.js) `apps/web`
```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm lint:fix
pnpm typecheck
pnpm test

# Single test file
pnpm test -- src/components/example.spec.tsx

# Single test by name
pnpm test -- -t "renders header"
```

### Shared Types `packages/types`
```bash
pnpm lint --filter @repo/types
```

## Code Style Guidelines
### TypeScript
- Base config is strict with `noUncheckedIndexedAccess`.
- Prefer explicit types at module boundaries and exported functions.
- Avoid `any`; use `unknown` or precise types. API `noImplicitAny` is false, but still prefer explicit typing.
- Keep shared API contracts in `packages/types` and import via `@repo/types`.
- Use `void` for intentional fire-and-forget async calls.

### Imports
- Use workspace imports for shared packages:
  ```ts
  import type { MetricsSummaryResponse } from '@repo/types';
  ```
- Use relative imports within the same app.
- Web app supports `@/*` path alias (from `apps/web/tsconfig.json`).
- Prefer `import type` for type-only imports.

### Formatting
- Prettier config in `packages/config/prettier/base.cjs`.
- Single quotes, trailing commas, print width 100.
- Run `pnpm format` at repo root when applying broad formatting.

### Naming Conventions
- Files: kebab-case for utilities, PascalCase for components/classes.
- Classes/Interfaces/Types: PascalCase; no `I` prefix for interfaces.
- Variables/Functions: camelCase.
- Constants: SCREAMING_SNAKE_CASE.

### Error Handling
- Throw domain errors from services; map to HTTP responses in controllers.
- Do not swallow errors; propagate or convert to typed errors.
- In Next.js, use error boundaries for unexpected UI failures.

### Testing
- API Jest tests live in `apps/api/src` with `.spec.ts` suffix.
- API e2e tests are in `apps/api/test` with `.e2e-spec.ts` suffix.
- Web Vitest tests use `.spec.tsx` and run in jsdom.

## App-Specific Practices
### NestJS (API)
- Keep controllers thin; business logic lives in services.
- Use dependency injection for services and providers.
- Decorators define modules, controllers, and pipes.
- Keep controller responses typed with `@repo/types`.

### Next.js + UI (Web)
- Use App Router (`app/`) and server components by default.
- Add `'use client'` only when needed.
- Prefer `next/image` over `<img>`.
- Use Tailwind utilities and shadcn-style components in `apps/web/components/ui`.
- Use the `cn` helper from `apps/web/lib/utils.ts` when composing class names.
- Design tokens live in `apps/web/app/globals.css`.

#### shadcn Button + Icon
- Use the icon `size` prop and rely on button `gap` for spacing.
- Do not add manual `mr-*` spacing to icons.
- Sizes: `size={16}` for `size="sm"`, `size={20}` for default.

## Shared Configuration
- ESLint: `packages/config/eslint/base.js`, `packages/config/eslint/nest.js`, `packages/config/eslint/next.js`
- Prettier: `packages/config/prettier/base.cjs`
- TypeScript: `packages/config/tsconfig/base.json`
Apps extend these configs via their own `eslint.config.mjs` and `tsconfig.json`.

## Environment Variables
- `NEXT_PUBLIC_API_URL` controls the web app API base URL (default `http://localhost:3001`).

## Tooling Notes
- Package manager: `pnpm` (workspaces in `pnpm-workspace.yaml`).
- Build orchestration: `turbo` with caching; prefer `pnpm <script>` at root.
- Lint-staged is configured per workspace in `package.json`.

## Cursor/Copilot Rules
- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` present.
