# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run Next.js/ESLint checks

There is no test suite configured yet.

## Architecture

Next.js 14 App Router site for MECEF ET FILS, a Guinean BTP (construction/public works)
company. Static marketing site with six pages, no database. Everything lives under `src/`
(App Router convention with a `src` dir), matching the developer's other project
(`vision-amah`) — see `docs/PROJET.md` for the full technical writeup.

- `src/app/` — one route per page (`/`, `/qui-sommes-nous`, `/realisations`, `/materiel`, `/partenariats`, `/contact`), each a `page.tsx`. `src/app/layout.tsx` wraps every page with `Navbar`/`Footer` and imports `./globals.css`.
- `src/app/contact/actions.ts` — a `"use server"` Server Action (`sendContactMessage`), validated with `zod`, invoked directly as the `<form action={...}>` handler in `src/components/Contact.tsx` via `useFormState`/`useFormStatus`. Sends through Resend (`RESEND_API_KEY` in `.env.local`); currently blank, so it fails gracefully with a French message instead of calling Resend.
- `src/data/realisations.ts` — typed data module (`Realisation` interface + `realisations` array), the single source of truth for chantier references. Consumed by `src/components/Realisations.tsx` (`variant="featured"` on the homepage, `variant="full"` grouped by category on `/realisations`).
- `src/components/` — one component per page section (`Navbar`, `Hero`, `Sectors`, `Stats`, `Realisations`, `Partenariats`, `Contact`, `Footer`), plus two shared helpers: `Reveal.tsx` (scroll fade-in wrapper, respects `prefers-reduced-motion`) and `RegionMap.tsx` (abstract SVG diagram, not a real map). Referenced by absolute imports (`@/components/...`, `@/data/...`, `@/lib/...`) via the `@/*` path alias (maps to `./src/*` in `tsconfig.json`).
- `src/components/Realisations.tsx` is a client component: `variant="featured"` (homepage, static) and `variant="full"` (`/realisations`, has category filter chips backed by `useState`).
- `src/lib/site.ts` — `SITE_URL` (from `NEXT_PUBLIC_SITE_URL`) and org contact info, shared by `metadataBase` in `layout.tsx`, `sitemap.ts`, `robots.ts`, and the JSON-LD `GeneralContractor` schema injected in `layout.tsx`.
- `docs/CONTENU_SITE.md` — source-of-truth text content (copy, numbers, chantier references) for every page. Never invent content; add it here first, then reflect it in `src/data/realisations.ts` or the relevant component.
- `public/logo/mecef-mark.png` — the real client logo, pictogram only (transparent background, white-stroked shapes so it reads fine directly on the charcoal theme — no chip/backing needed). `public/logo/mecef-logo.png` is the fuller lockup (pictogram + "MECEF" wordmark). Both were cropped from the client-provided `mecef_logo_hd.png` (not in the repo — lives in the client's Downloads). `src/app/icon.png`, `apple-icon.png`, and `opengraph-image.png` were generated from the same source and are auto-wired by Next's App Router file conventions — no code references them explicitly.
- `src/components/Hero.tsx` / `HeroBackground.tsx` — full-bleed background hero (`min-h-screen`, text overlaid with a charcoal gradient scrim for legibility), mirroring the pattern in the developer's other project's `Hero.tsx` + `VideoBackground.tsx` (a sibling project at `Desktop/it-solutions`, same author as `vision-amah`) but with a crossfading image carousel instead of a background video, and MECEF's charcoal tones instead of black. `HeroBackground` takes an `images` array; empty by default, in which case it renders a geometric SVG placeholder (`HeroPlaceholder`) instead of a stock photo. Dot indicators only render when `images.length > 1`.
- `public/images/hero-1.jpg` … `hero-5.jpg` — currently free-license stock photos (Pexels + Unsplash, generic construction scenes, not real MECEF chantiers), wired into `Hero.tsx`'s `heroImages` array with generic alt text (no location/project named). Swap in real client photos under the same filenames whenever they arrive — zero code changes needed. An earlier batch of 5 files under these same names (sourced elsewhere) all carried an Alamy watermark once contrast was boosted and had to be replaced (2026-08-31) — always check new candidate photos the same way (boost contrast/brightness, look for repeating diagonal text or an ID strip) before wiring them in, and check file hashes against anything already rejected in this conversation/history before trusting a "looks clean" filename.

## Conventions

- Import via the `@/*` alias (maps to `./src/*`), not relative paths across top-level folders.
- Never hardcode brand colors as hex in components — use the Tailwind tokens defined in `tailwind.config.ts` (see palette below).
- `.env.local` holds `RESEND_API_KEY` (currently blank) for the contact form's email integration.
- Key server-side logic (`src/app/contact/actions.ts`) carries brief French comments explaining non-obvious constraints (e.g. why a missing API key fails without calling Resend). Follow that pattern for new server-side code in this repo; it's a deliberate project convention, not the general default.

## Visual identity

Deliberately distinct from the developer's other project (`vision-amah`): serif + mono
typefaces instead of Geist, charcoal/latérite palette instead of Vision Amah's palette. Sober,
editorial tone — no gradients, no heavy drop shadows, no generic stock icons or photos.

**Palette** (`tailwind.config.ts`):

| Token | Hex |
|---|---|
| `charcoal` (bg) | `#181A1B` |
| `charcoal-card` | `#212325` |
| `charcoal-border` | `#2C2E2F` |
| `laterite` (accent) | `#D9622B` |
| `cream` (primary text) | `#F3EFE7` |
| `warmgray` (secondary text) | `#9C9A94` |
| `warmgray-dark` / `warmgray-light` (labels) | `#6E6C67` / `#8A8985` |

**Typography**: `font-serif` (Fraunces) for headings, `font-mono` (IBM Plex Mono, uppercase,
letter-spaced) for nav/labels/metadata, default sans-serif for body copy — all loaded via
`next/font/google` in `src/app/layout.tsx`.

## Stack decisions

This is a showcase/vitrine site, not a data-driven app — the stack is intentionally kept light:

- **No database, no Prisma.** Content lives in `src/data/*.ts` (typed data modules) or hardcoded in section components. The only exception that would justify adding a DB later is if MECEF wants a CMS to edit `réalisations` without touching code, or wants to persist contact-form submissions.
- **Resend over Nodemailer** for the contact form (`src/app/contact/actions.ts`) — no SMTP setup, plain API call, works cleanly from a Server Action. Note: the `from` address needs a verified sending domain in Resend before production use.
- **Fonts via `next/font/google`** (Fraunces, IBM Plex Mono) — no separate npm package needed; Next self-hosts the font files, which is better for performance and avoids external requests to Google Fonts.
- **`lucide-react`** for icons — lightweight, tree-shakeable, simple line icons (never stock-style icon sets).
- **`zod`** validates the contact form server-side inside `sendContactMessage` — prevents empty/malformed submissions from reaching Resend. Installed as `zod@4`, which changed error-customization syntax (`error:` instead of `errorMap:`) versus zod 3 — keep that in mind when reading examples online.
