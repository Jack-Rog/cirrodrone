# Cirro Pre-Runtime Validation Site

Cirro is a future Windows desktop product for deploying and running custom software on MAVLink drones. This repo is not that runtime. It is the first public-facing validation site used to explain the product story, recruit design partners, and collect workflow signals before the runtime exists.

## Why this repo exists

This repo is designed to validate whether operators and technical co-creators respond to a narrower story:

- Operators want to deploy custom drone software without stitching together repos and setup scripts by hand.
- Developers need a future path to package and present their workflows more clearly.
- Cirro can become the packaging, deployment, and runtime layer between those two groups.

If this repo works, the next step is a narrower runtime PRD built around the strongest repeated use case.

## What is real vs mocked

Real in this repo:

- The public site, copy, routes, and conversion flows
- The primary early-access capture action
- The UI system, mock data models, and reusable product surfaces
- The app-library, app-detail, and runtime-preview interactions

Mocked in this repo:

- The app library content and compatibility data
- The runtime dashboard and telemetry surfaces
- Repo submission intake persistence
- Design partner application persistence
- Any actual drone control, MAVSDK integration, telemetry backend, auth, or marketplace behavior

The early-access form will post to `EARLY_ACCESS_WEBHOOK_URL` if configured. If that env var is missing, it intentionally falls back to a logged demo-mode success so the site remains usable locally.

## Validation goals

This repo is successful if it helps generate:

- qualified early-access requests
- strong repo or workflow submissions
- design partner applications from technical co-creators
- founder conversations that reveal repeated deployment pain
- enough confidence to write the first narrow runtime PRD

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui-style component architecture
- `next-themes`
- `react-hook-form` + `zod`
- Playwright smoke tests

## Routes

- `/`
- `/submit-repo`
- `/design-partner`
- `/product/app-library`
- `/product/app/[slug]`
- `/product/runtime-preview`
- `/thank-you`

## Run locally

```bash
pnpm install
pnpm dev
```

Optional:

```bash
$env:EARLY_ACCESS_WEBHOOK_URL="https://your-webhook.example"
```

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test:e2e
```
