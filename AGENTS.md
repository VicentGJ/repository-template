# AGENTS.md - Repository Guidelines

This document provides guidelines for AI agents working in this monorepo.

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

## Build, Lint, and Test Commands

### Root Commands (runs across all packages)

```bash
pnpm install          # Install dependencies
pnpm dev              # Run all apps in dev mode with hot reload
pnpm build            # Build all apps
pnpm lint             # Lint all apps
pnpm test             # Run tests across all apps
pnpm format           # Format all files with Prettier
```

### API (NestJS) Commands

```bash
cd apps/api
pnpm build                        # Build NestJS app
pnpm start                        # Start production server
pnpm start:dev                    # Start with hot reload
pnpm lint                         # Lint source files
pnpm test                         # Run unit tests
pnpm test:watch                   # Run tests in watch mode
pnpm test:cov                     # Run tests with coverage
pnpm test:e2e                     # Run e2e tests
# Run a single test file
pnpm test -- --testPathPattern=metrics.service.spec.ts
```

### Web (Next.js) Commands

```bash
cd apps/web
pnpm dev                          # Start dev server
pnpm build                        # Build for production
pnpm start                        # Start production server
pnpm lint                         # Lint source files
pnpm lint:fix                     # Auto-fix lint issues
```

### Shared Types (packages/types)

```bash
cd packages/types
pnpm lint --filter @repo/types    # Lint shared types if needed
```

## Code Style Guidelines

### TypeScript

- Use strict mode (configured in `packages/config/tsconfig/base.json`)
- Enable `noUncheckedIndexedAccess` for safer array/object access
- Avoid `any`; use `unknown` or specific types instead
- Use explicit return types for functions exported from modules
- Use `void` for async functions called at top level (e.g., `void bootstrap()`)
- Keep shared API contracts in `packages/types`

### Imports

- Use workspace imports for shared packages:
  ```typescript
  import type { MetricsSummaryResponse } from '@repo/types';
  ```
- Use relative imports within the same app:
  ```typescript
  import { AppService } from './app.service';
  ```
- Use Next.js path alias `@/*` in the web app

### Naming Conventions

- **Files**: kebab-case for non-components (e.g., `metrics-service.ts`), PascalCase for components/classes (e.g., `UserController.ts`)
- **Classes/Interfaces**: PascalCase (e.g., `AppController`, `MetricsService`)
- **Variables/Functions**: camelCase (e.g., `getMetrics()`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `DEFAULT_PORT`)
- **Interfaces**: Do not prefix with `I` (use `UserService` not `IUserService`)

### Formatting (Prettier)

Prettier is configured in `packages/config/prettier/base.cjs`:

- Single quotes (`'string'`, not `"string"`)
- Trailing commas enabled
- Print width: 100

Run `pnpm format` to format all files.

### Error Handling

- Use typed errors with custom error classes where appropriate
- Always await promises or use `void` for fire-and-forget calls
- Let errors propagate in NestJS services; handle at controller level
- In Next.js, use error boundaries for unexpected errors

### NestJS Specific

- Use decorators for controllers, services, modules, and pipes
- Follow convention: `UserController`, `UserService`, `UserModule`
- Place tests alongside source files with `.spec.ts` suffix
- Keep controller responses typed using `@repo/types`
- Use dependency injection for all services

### Next.js + UI

- Use App Router with `app/` directory structure
- Use server components by default; opt-in with `'use client'` when needed
- Use Next.js Image component instead of `<img>`
- Use Tailwind utility classes and shadcn-style components in `apps/web/components/ui`
- Use `cn` helper from `apps/web/lib/utils.ts` when composing class names
- Keep design tokens in `apps/web/app/globals.css`

#### shadcn Button with Icon

When adding an icon to a button, use the icon's `size` prop and let the button's built-in gap handle spacing:

```tsx
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

<Button variant="ghost" size="sm" asChild className="-ml-3 mb-2">
  <Link href="/">
    <ArrowLeft size={16} />
  </Link>
</Button>;
```

- Do not manually add `mr-2` or similar spacing classes
- The button's `gap-2` in `buttonVariants` handles icon-text spacing
- Use `size={16}` for small buttons, `size={20}` for default size

## Shared Configuration

- **ESLint**: `packages/config/eslint/` (base.js, nest.js, next.js)
- **Prettier**: `packages/config/prettier/base.cjs`
- **TypeScript**: `packages/config/tsconfig/base.json`

Apps extend these configs in their own `eslint.config.mjs` and `tsconfig.json`.

## Environment Variables

- `NEXT_PUBLIC_API_URL` controls the web app API base URL (default `http://localhost:3001`)

## Testing

- Jest is configured in `apps/api/package.json`
- Test files use `.spec.ts` suffix
- E2E tests use `.e2e-spec.ts` suffix in `test/` directory
- Next.js has no tests configured by default (prints a message)

## Other Notes

- Use pnpm workspaces (managed via `pnpm-workspace.yaml`)
- Turbo caching is enabled; use `turbo run` for cached builds
- Run `pnpm install` after adding new dependencies
