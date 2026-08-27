# UX Launchpad

A workflow tool that walks a UI/UX designer or research team through five sequential phases — from business framing to a Pre-Figma readiness gate — with an interactive, editable template for every deliverable along the way.

## What it does

- **Multi-project workspace.** Create, rename, duplicate, import/export, and delete projects from a Notion-style list or card view.
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
- **Built-in documentation** at `/docs` — a step-by-step execution manual for all 17 methodology steps (framework explainers, common pitfalls, and the exact workspace action each one maps to) plus a "Using UX Launchpad" guide to the tool itself, with a scroll-synced sidebar and "On this page" panel.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand) with the `persist` middleware for local-storage state
- [lucide-react](https://lucide.dev) for icons, [react-easy-crop](https://github.com/ValentinH/react-easy-crop) for avatar cropping
- [Supabase](https://supabase.com) client/server/middleware helpers are scaffolded under `lib/supabase/` for future auth or database features — the app itself doesn't call them yet; all current functionality is local-first

Visual design follows the project's own [`notion-admin-panel`](.claude/skills/notion-admin-panel/SKILL.md) skill: a left sidebar for navigation, a 1280px content workspace, hairline borders instead of shadows, status dots instead of colored badges, an 8px corner-radius ceiling, and Raleway + Merriweather typography.

## Getting started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables are required to use UX Launchpad itself.

If you want to wire up the scaffolded Supabase helpers, copy `.env.local.example` to `.env.local` and fill in your project's URL and publishable key from Supabase's dashboard under Project Settings → Data API.

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
  projects/[id]/                        Project workspace (layout + sidebar)
    [phaseId]/                          A phase's deliverable table
    [phaseId]/[deliverableId]/          A single deliverable's editor page
    gate/                               Pre-Figma Gate
  docs/                                 In-app documentation (methodology + usage guide)

components/
  templates/                            The 11 editable deliverable templates
  workspace/                            Project sidebar, deliverable table, gate view
  docs/                                 Docs sidebar, step cards, "On this page" TOC
  projects/                             Project list/card views, settings modal, avatar picker
  ui/                                   Shared primitives (Button, Modal, Menu, Avatar, ...)

lib/
  workflow/                             Phase/deliverable config, data model, progress & export logic
  docs/                                 Documentation content and scroll-spy hook
  store.ts                              Zustand store (local-storage persisted)
  supabase/                             Scaffolded Supabase client/server/middleware helpers
```
