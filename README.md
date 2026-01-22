# Metrics Dashboard

Production-ready monorepo with a NestJS API and Next.js frontend, configured with CI/CD, quality gates, and shared tooling.

## Quick Start

```bash
# Prerequisites: Node.js 25+ and pnpm 10+
pnpm install
pnpm dev
```

- **Web**: http://localhost:3000
- **API**: http://localhost:8000

## Architecture

```
├── apps/
│   ├── api/         # NestJS REST API (metrics endpoints)
│   ├── web/         # Next.js 16 dashboard (App Router + shadcn/ui)
│   └── native/      # Expo React Native app (experimental)
├── packages/
│   ├── config/      # Shared ESLint, Prettier, TypeScript configs
│   └── types/       # API contracts (DTOs shared between apps)
└── .github/
    └── workflows/   # CI (lint/test/build) + CD (Docker → Railway)
```

## Commands

| Command         | Description                              |
|-----------------|------------------------------------------|
| `pnpm dev`      | Start all apps in development mode       |
| `pnpm build`    | Build all apps                           |
| `pnpm lint`     | Lint all packages                        |
| `pnpm test`     | Run all test suites                      |
| `pnpm format`   | Format all files with Prettier           |

## Quality Gates

**Pre-commit** (via Husky + lint-staged):
- Prettier formatting
- ESLint with `--max-warnings=0` (API) / `--max-warnings=5` (Web)
- Conventional commit enforcement via commitlint

**CI Pipeline** (GitHub Actions on PRs):
- Parallel lint + test jobs
- Full build verification
- Concurrency controls to cancel stale runs

**CD Pipeline** (on merge to `main`):
- Docker images pushed to GitHub Container Registry
- Auto-deploy to Railway (API + Web services)

## Shared Packages

### `@repo/config`
Centralized configuration extending across all apps:
- **ESLint**: Base config + framework-specific (NestJS/Next.js)
- **Prettier**: Single quotes, trailing commas, 100 char width
- **TypeScript**: Strict mode, `noUncheckedIndexedAccess` enabled

### `@repo/types`
Typed API contracts ensuring frontend/backend alignment:
- `MetricsSummaryResponse` — Dashboard summary cards
- `MetricsTrendResponse` — Time-series trend data
- `MetricsHealthResponse` — Health check endpoint

## Environment Variables

| Variable              | App    | Description                     | Default                 |
|-----------------------|--------|---------------------------------|-------------------------|
| `PORT`                | API    | Server port                     | `8000`                  |
| `NEXT_PUBLIC_API_URL` | Web    | Backend API URL                 | `http://localhost:8000` |
| `EXPO_PUBLIC_API_URL` | Native | Backend API URL                 | `http://localhost:8000` |

## Project Structure Details

See individual app READMEs for specifics:
- [`apps/api/README.md`](apps/api/README.md) — API endpoints, testing, deployment
- [`apps/web/README.md`](apps/web/README.md) — Pages, components, styling
- [`apps/native/README.md`](apps/native/README.md) — Expo mobile app (experimental)

## Tech Stack

| Layer       | Technology                                      |
|-------------|-------------------------------------------------|
| Monorepo    | Turborepo + pnpm workspaces                     |
| Backend     | NestJS 11, Node.js 25                           |
| Frontend    | Next.js 16, React 19, Tailwind CSS, shadcn/ui   |
| Mobile      | Expo 54, React Native 0.81 (experimental)       |
| Testing     | Jest (API), Vitest + Testing Library (Web)      |
| CI/CD       | GitHub Actions, Docker, Railway                 |
| Quality     | ESLint 9, Prettier, Husky, commitlint           |
