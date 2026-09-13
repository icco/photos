# AGENTS.md

Guidance for coding agents working on photos.

## Project Overview

Photo gallery web application built with Next.js and backed by Google Cloud Storage for media assets.

## Commands

Use pnpm:
- `pnpm dev` — Start Next.js development server
- `pnpm build` — Build production application
- `pnpm start` — Start production server
- `pnpm lint` — Run ESLint with auto-fix

## Architecture & Layout

- `pages/` or `app/` — Routing and gallery views.
- `lib/` — GCS client and photo metadata loaders.
- `components/` — Image display, grid, and navigation components.

## Conventions

- TypeScript for application logic.
- Conventional Commits with lowercase subjects.
- Ensure `pnpm lint` and `pnpm build` pass before opening PRs.
- Never commit GCP service account keys or storage secrets.
