# API

NestJS REST API serving metrics data for the dashboard frontend.

## Quick Start

```bash
# From monorepo root
pnpm install
pnpm --filter api dev

# Or from this directory
pnpm dev
```

Server runs at http://localhost:8000

## Endpoints

| Method | Route                    | Description                                        |
| ------ | ------------------------ | -------------------------------------------------- |
| GET    | `/`                      | Health check (returns "Hello World")               |
| GET    | `/metrics/health`        | API health with timestamp                          |
| GET    | `/metrics/summary`       | Dashboard summary (users, uptime, latency, errors) |
| GET    | `/metrics/trends?days=N` | Time-series data for charts                        |

### Response Types

All responses use shared types from `@repo/types`:

```typescript
// GET /metrics/health
interface MetricsHealthResponse {
  ok: boolean;
  timestamp: string;
}

// GET /metrics/summary
interface MetricsSummaryResponse {
  generatedAt: string;
  totals: MetricSummary[]; // key, label, value, change, unit
}

// GET /metrics/trends
interface MetricsTrendResponse {
  generatedAt: string;
  range: { start: string; end: string; days: number };
  series: MetricTrend[]; // key, label, points[]
}
```

## Project Structure

```
src/
├── main.ts                 # Bootstrap, listens on PORT (default: 8000)
├── app.module.ts           # Root module
├── app.controller.ts       # Root endpoint (/)
├── app.service.ts
└── metrics/
    ├── metrics.module.ts
    ├── metrics.controller.ts   # /metrics/* endpoints
    ├── metrics.service.ts      # Mock data generation
    └── *.spec.ts               # Unit tests
```

## Commands

| Command           | Description                 |
| ----------------- | --------------------------- |
| `pnpm dev`        | Start with hot reload       |
| `pnpm build`      | Compile to `dist/`          |
| `pnpm start:prod` | Run compiled output         |
| `pnpm test`       | Run unit tests              |
| `pnpm test:watch` | Tests in watch mode         |
| `pnpm test:cov`   | Tests with coverage report  |
| `pnpm test:e2e`   | Run end-to-end tests        |
| `pnpm lint`       | Lint source files           |
| `pnpm typecheck`  | Type check without emitting |

### Running a Single Test

```bash
pnpm test -- --testPathPattern=metrics.service.spec.ts
```

## Testing

**Unit Tests** (Jest):

- Located alongside source files (`*.spec.ts`)
- Run with `pnpm test`

**E2E Tests** (Jest + Supertest):

- Located in `test/` directory (`*.e2e-spec.ts`)
- Run with `pnpm test:e2e`

## Configuration

### Environment Variables

| Variable | Default | Description |
| -------- | ------- | ----------- |
| `PORT`   | `8000`  | Server port |

Copy `.env.example` to `.env` for local development.

### Shared Config

This app extends monorepo-wide configuration:

- **ESLint**: `@repo/config/eslint/nest` (TypeScript + Prettier + Node/Jest globals)
- **TypeScript**: `@repo/config/tsconfig/base.json` (strict mode)
- **Prettier**: `@repo/config/prettier/base` (single quotes, trailing commas)

## Docker

```bash
# Build from monorepo root
docker build -f apps/api/Dockerfile -t api .

# Run
docker run -p 8000:8000 api
```

The Dockerfile:

1. Uses `node:25-alpine`
2. Installs pnpm and dependencies
3. Builds with `pnpm --filter api build`
4. Runs `node dist/main`
