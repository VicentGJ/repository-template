# Panel de Métricas

> 🌐 **[English Version](README.md)**

Monorepo listo para producción con una API NestJS y un frontend Next.js, configurado con CI/CD, compuertas de calidad y herramientas compartidas.

## Inicio Rápido

```bash
# Prerequisitos: Node.js 25+ y pnpm 10+
pnpm install
pnpm dev
```

- **Web**: http://localhost:3000
- **API**: http://localhost:8000

## Arquitectura

```
├── apps/
│   ├── api/         # API REST NestJS (endpoints de métricas)
│   ├── web/         # Dashboard Next.js 16 (App Router + shadcn/ui)
│   └── native/      # Aplicación Expo React Native (experimental)
├── packages/
│   ├── config/      # Configuraciones compartidas de ESLint, Prettier, TypeScript
│   └── types/       # Contratos de API (DTOs compartidos entre apps)
└── .github/
    └── workflows/   # CI (lint/test/build) + CD (Docker → Railway)
```

## Comandos

| Comando         | Descripción                                     |
|-----------------|-------------------------------------------------|
| `pnpm dev`      | Iniciar todas las apps en modo desarrollo      |
| `pnpm build`    | Construir todas las apps                        |
| `pnpm lint`     | Ejecutar linter en todos los paquetes          |
| `pnpm test`     | Ejecutar todas las suites de pruebas           |
| `pnpm format`   | Formatear todos los archivos con Prettier      |

## Compuertas de Calidad

**Pre-commit** (vía Husky + lint-staged):
- Formateo con Prettier
- ESLint con `--max-warnings=0` (API) / `--max-warnings=5` (Web)
- Cumplimiento de conventional commits vía commitlint

**Pipeline de CI** (GitHub Actions en PRs):
- Jobs paralelos de lint + test
- Verificación completa de build
- Controles de concurrencia para cancelar ejecuciones obsoletas

**Pipeline de CD** (al hacer merge a `main`):
- Imágenes Docker publicadas en GitHub Container Registry
- Auto-despliegue a Railway (servicios API + Web)

## Paquetes Compartidos

### `@repo/config`
Configuración centralizada que se extiende a todas las apps:
- **ESLint**: Configuración base + específica por framework (NestJS/Next.js)
- **Prettier**: Comillas simples, trailing commas, ancho de 100 caracteres
- **TypeScript**: Modo estricto, `noUncheckedIndexedAccess` habilitado

### `@repo/types`
Contratos de API tipados que aseguran la alineación entre frontend y backend:
- `MetricsSummaryResponse` — Tarjetas de resumen del dashboard
- `MetricsTrendResponse` — Datos de tendencia de series temporales
- `MetricsHealthResponse` — Endpoint de verificación de salud

## Variables de Entorno

| Variable              | App    | Descripción                     | Por Defecto             |
|-----------------------|--------|---------------------------------|-------------------------|
| `PORT`                | API    | Puerto del servidor             | `8000`                  |
| `NEXT_PUBLIC_API_URL` | Web    | URL de la API backend           | `http://localhost:8000` |
| `EXPO_PUBLIC_API_URL` | Native | URL de la API backend           | `http://localhost:8000` |

## Detalles de Estructura del Proyecto

Consulta los READMEs individuales de cada app para más detalles:
- [`apps/api/README.md`](apps/api/README.md) — Endpoints de API, testing, despliegue
- [`apps/web/README.md`](apps/web/README.md) — Páginas, componentes, estilos
- [`apps/native/README.md`](apps/native/README.md) — App móvil Expo (experimental)

## Stack Tecnológico

| Capa        | Tecnología                                      |
|-------------|-------------------------------------------------|
| Monorepo    | Turborepo + pnpm workspaces                     |
| Backend     | NestJS 11, Node.js 25                           |
| Frontend    | Next.js 16, React 19, Tailwind CSS, shadcn/ui   |
| Móvil       | Expo 54, React Native 0.81 (experimental)       |
| Testing     | Jest (API), Vitest + Testing Library (Web)      |
| CI/CD       | GitHub Actions, Docker, Railway                 |
| Calidad     | ESLint 9, Prettier, Husky, commitlint           |