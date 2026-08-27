# UX Launchsite

A workflow tool that walks a UI/UX designer or research team through five sequential phases — from business framing to a Pre-Figma readiness gate — with an interactive, editable template for every deliverable along the way.

## What it does

- **Authentication.** Email/password and Google sign-in via Supabase Auth. Every route except `/login`, `/auth/*`, and `/docs` requires a signed-in user.
- **Multi-project workspace, synced per account.** Create, rename, duplicate, import/export, and delete projects from a Notion-style list or card view. Projects are stored in Supabase, scoped to your account with row-level security, so they follow you across devices.
- **5 stage-gated phases**, 19 deliverables total:
  1. **Business Framing & Strategy** — Kickoff Canvas, Scope Matrix, HMW problem statement, HEART success metrics
  2. **Exploratory Research** — Competitor audit, interview builder & script, survey builder, affinity mapping
  3. **Synthesis & Scope** — Lean personas, Impact vs. Effort prioritization matrix
  4. **Architecture & Flows** — Sitemap tree, task flow mapper, card sorting, user flow generator
  5. **Concept Exploration & Pre-Figma Gate** — Paper testing tracker, readiness checklist, design principles, Figma pre-flight checklist
- **11 interactive template types** shared across those 19 deliverables — editable tables, a doc canvas, a script builder, drag-and-drop group boards, a persona builder, a draggable 2×2 matrix, a sitemap tree, flow builders, checklists, and principle cards. Everything autosaves as you type.
- **Pre-Figma Gate.** Locked until every deliverable across all 5 phases is marked complete; once unlocked, compiles the whole project into a single Markdown handoff document.
- **Exports per deliverable**: Markdown / copy-to-Notion, CSV, JSON, Mermaid.js code, SVG (real rendered flow diagrams), PNG (rendered prioritization matrix), and print-to-PDF.
- **Project details**: a cropped profile photo (via `react-easy-crop`), a start date, and an optional due date (shown in red once overdue).
- **Built-in documentation** at `/docs` — a step-by-step execution manual for all 17 methodology steps (framework explainers, common pitfalls, and the exact workspace action each one maps to) plus a "Using UX Launchsite" guide to the tool itself, with a scroll-synced sidebar and "On this page" panel.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand) as a reactive client cache, backed by Supabase (optimistic local updates, synced to the database in the background)
- [lucide-react](https://lucide.dev) for icons, [react-easy-crop](https://github.com/ValentinH/react-easy-crop) for avatar cropping
- [Supabase](https://supabase.com) for authentication (email/password + Google OAuth) and Postgres storage (one `projects` table, row-level security scoped to `auth.uid()`)

Visual design follows the project's own [`notion-admin-panel`](.claude/skills/notion-admin-panel/SKILL.md) skill: a left sidebar for navigation, a 1280px content workspace, hairline borders instead of shadows, status dots instead of colored badges, an 8px corner-radius ceiling, and Raleway + Merriweather typography.

## Getting started

1. **Install and configure.**

   ```bash
   bun install
   cp .env.local.example .env.local
   ```

   Fill in `.env.local` with your Supabase project's URL and publishable key (Supabase dashboard → Project Settings → Data API).

2. **Create the database table.** Open the SQL Editor in your Supabase dashboard and run [`supabase/migrations/0001_create_projects.sql`](supabase/migrations/0001_create_projects.sql). It creates the `projects` table with row-level security so each account only ever sees its own rows.

3. **(Optional) Enable Google sign-in.** In the Supabase dashboard: Authentication → Providers → Google → enable it, and paste in a Client ID/Secret from a Google Cloud OAuth 2.0 Web application. Google's authorized redirect URI should be `https://<your-project-ref>.supabase.co/auth/v1/callback`. Then, in Supabase's Authentication → URL Configuration, add `http://localhost:3000/auth/callback` (and your production URL's equivalent) to the allowed redirect URLs. Email/password sign-in works out of the box without this step.

4. **Run it.**

   ```bash
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) — it'll redirect you to `/login` until you sign up or sign in.

Other scripts:

```bash
bun run build   # production build
bun run start   # run the production build
bun run lint    # eslint
```

## Project structure

```
app/
  page.tsx                              Projects home (list/card view)
  login/                                Sign in / sign up (email+password, Google)
  auth/callback/                        OAuth code exchange route handler
  projects/[id]/                        Project workspace (layout + sidebar)
    [phaseId]/                          A phase's deliverable table
    [phaseId]/[deliverableId]/          A single deliverable's editor page
    gate/                               Pre-Figma Gate
  docs/                                 In-app documentation (methodology + usage guide) — public, no login required

components/
  templates/                            The 11 editable deliverable templates
  workspace/                            Project sidebar, deliverable table, gate view
  docs/                                 Docs sidebar, step cards, "On this page" TOC
  projects/                             Project list/card views, form modal, avatar picker
  auth/                                 AuthSync (loads the session + projects), sign-out button
  ui/                                   Shared primitives (Button, Modal, Menu, Avatar, ...)

lib/
  workflow/                             Phase/deliverable config, data model, progress & export logic
  docs/                                 Documentation content and scroll-spy hook
  store.ts                              Zustand store — optimistic local cache backed by Supabase
  supabase/                             Client/server/middleware helpers + queries.ts (projects CRUD)

supabase/migrations/                    SQL to run in the Supabase SQL Editor (table + RLS policies)
```

## Auth & data model

- Route protection lives in `lib/supabase/middleware.ts`: everything except `/login`, `/auth/*`, and `/docs` requires a signed-in user, enforced server-side on every request.
- `lib/store.ts` still exposes the same actions every page already used (`createProject`, `updateDeliverableData`, etc.) — internally, each one updates the local Zustand cache immediately (so the UI never waits on a network round trip) and writes to Supabase in the background. Deliverable edits are debounced (600ms) so rapid typing doesn't spam the database.
- The whole `deliverables` object for a project is stored as one `jsonb` column rather than as separate rows — it matches the shape the app already worked with, so no template component needed to change.
