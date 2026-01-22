# Native

Expo React Native app with file-based routing, currently a scaffold for future mobile development.

> **Status**: Experimental — not yet integrated into CI/CD pipeline

## Quick Start

```bash
# From monorepo root
pnpm install
pnpm --filter native start
```

Then open with:
- [Expo Go](https://expo.dev/go) on your device
- Android emulator (`a` in terminal)
- iOS simulator (`i` in terminal)

## Project Structure

```
app/
├── _layout.tsx         # Root layout
└── (tabs)/
    ├── _layout.tsx     # Tab navigation layout
    └── index.tsx       # Home screen

components/
├── ui/                 # Reusable UI primitives
│   ├── collapsible.tsx
│   └── icon-symbol.tsx
├── themed-text.tsx     # Theme-aware Text
├── themed-view.tsx     # Theme-aware View
└── parallax-scroll-view.tsx

constants/
└── theme.ts            # Color definitions

hooks/
├── use-color-scheme.ts # System theme detection
└── use-theme-color.ts  # Theme color accessor
```

## Commands

| Command           | Description                     |
|-------------------|---------------------------------|
| `pnpm start`      | Start Expo dev server           |
| `pnpm android`    | Start on Android emulator       |
| `pnpm ios`        | Start on iOS simulator          |
| `pnpm web`        | Start web version               |
| `pnpm lint`       | Lint with Expo ESLint config    |

## Configuration

### Environment Variables

| Variable              | Default                 | Description     |
|-----------------------|-------------------------|-----------------|
| `EXPO_PUBLIC_API_URL` | `http://localhost:8000` | Backend API URL |

### App Configuration

See `app.json` for Expo settings:
- New Architecture enabled
- Typed routes enabled
- React Compiler enabled
- iOS tablet support
- Android adaptive icons

## Tech Stack

| Technology       | Version  |
|------------------|----------|
| Expo             | 54       |
| React Native     | 0.81     |
| React            | 19       |
| Expo Router      | 6        |

## Notes

This app is not included in the monorepo's Turborepo pipeline (`turbo.json`) since Expo has its own build system. Run commands directly with `pnpm --filter native <script>`.
