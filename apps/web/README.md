# Web

Next.js 16 dashboard displaying metrics from the API backend.

## Quick Start

```bash
# From monorepo root
pnpm install
pnpm --filter web dev

# Or from this directory
pnpm dev
```

App runs at http://localhost:3000

> Requires the API running at `NEXT_PUBLIC_API_URL` (default: http://localhost:8000)

## Pages

| Route        | Description                                     |
| ------------ | ----------------------------------------------- |
| `/`          | Landing page with navigation cards              |
| `/dashboard` | Metrics dashboard with summary cards and trends |
| `/api`       | Raw API payload viewer for debugging            |

All data pages use React Server Components with `force-dynamic` rendering.

## Project Structure

```
app/
├── layout.tsx          # Root layout (Geist fonts, metadata)
├── globals.css         # CSS variables for theming
├── page.tsx            # Landing page
├── dashboard/
│   ├── page.tsx        # Metrics dashboard (server component)
│   ├── page.spec.tsx   # Tests
│   └── error.tsx       # Error boundary with debug UI
└── api/
    ├── page.tsx        # Raw JSON viewer
    └── error.tsx       # Error boundary

components/ui/          # shadcn/ui components
├── button.tsx
├── card.tsx
├── badge.tsx
├── table.tsx
├── tabs.tsx
└── empty-state.tsx

lib/
├── api.ts              # Fetch wrapper with ApiError class
├── metrics.ts          # Typed API fetchers
└── utils.ts            # cn() helper for classNames
```

## Commands

| Command          | Description                 |
| ---------------- | --------------------------- |
| `pnpm dev`       | Start dev server with HMR   |
| `pnpm build`     | Production build            |
| `pnpm start`     | Start production server     |
| `pnpm test`      | Run tests with Vitest       |
| `pnpm lint`      | Lint source files           |
| `pnpm lint:fix`  | Auto-fix lint issues        |
| `pnpm typecheck` | Type check without emitting |

## Testing

**Framework**: Vitest + React Testing Library

```bash
pnpm test           # Run all tests
```

**Setup** (`setup-vitest.tsx`):

- Mocks `next/navigation` (useRouter, usePathname, useSearchParams)
- Mocks `next/link` as standard anchor tags
- Stubs `ResizeObserver` for jsdom

## Configuration

### Environment Variables

| Variable              | Default                 | Description     |
| --------------------- | ----------------------- | --------------- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Backend API URL |

### Shared Config

This app extends monorepo-wide configuration:

- **ESLint**: `@repo/config/eslint/next` (TypeScript + Next.js rules)
- **TypeScript**: `@repo/config/tsconfig/base.json` (strict mode)
- **Prettier**: `@repo/config/prettier/base`

## Styling

**Stack**: Tailwind CSS + shadcn/ui + Radix UI primitives

- **Theme**: CSS variables in `globals.css` (light/dark mode)
- **Components**: Variant-based with `class-variance-authority`
- **Utilities**: `cn()` helper merges classes with `tailwind-merge`

### Adding Components

This project uses [shadcn/ui](https://ui.shadcn.com). Configuration in `components.json`:

```json
{
  "style": "default",
  "rsc": true,
  "tailwind": { "baseColor": "zinc", "cssVariables": true }
}
```

## Error Handling

Error boundaries (`error.tsx`) provide detailed debug information:

- Request URL and method
- HTTP status code
- Elapsed time
- Full stack trace (development only)

## Docker

```bash
# Build from monorepo root
docker build -f apps/web/Dockerfile \
  --build-arg NEXT_PUBLIC_API_URL=https://api.example.com \
  -t web .

# Run
docker run -p 3000:3000 web
```

The Dockerfile:

1. Uses `node:25-alpine`
2. Accepts `NEXT_PUBLIC_API_URL` build arg
3. Builds with `pnpm --filter web build`
4. Runs `pnpm --filter web start`
