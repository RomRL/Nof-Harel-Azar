## ADDED Requirements

### Requirement: The project SHALL build and deploy as a static SPA on Vercel

The repository MUST be deployable to Vercel using its default Vite framework preset, producing a static `dist/` bundle with no server-side runtime requirement.

#### Scenario: `npm run build` produces a deployable static bundle
- **WHEN** a developer runs `npm install && npm run build` on a clean checkout
- **THEN** the command exits 0
- **AND** a `dist/` directory is produced containing `index.html`, hashed JS/CSS, and `public/` assets
- **AND** the bundle contains no references to `lovable-tagger`, `@supabase/supabase-js`, or the Lovable CDN (`*.lovable.app`, `pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev`)

### Requirement: Client-side routes SHALL resolve on Vercel via SPA rewrites

A `vercel.json` MUST be present at the repository root that rewrites all non-asset paths to `/index.html` so React Router routes (including the catch-all `NotFound`) resolve on direct navigation or hard refresh.

#### Scenario: Direct navigation to an unknown route renders NotFound, not Vercel 404
- **WHEN** a user visits `https://<deploy>/some-deep-path` directly
- **THEN** Vercel serves `/index.html`
- **AND** the React app boots and the `NotFound` route is rendered by `react-router-dom`

### Requirement: Required runtime environment variables SHALL be documented

The README MUST list every `VITE_*` env var the app requires, the meaning of each, and where it must be configured on Vercel. Currently this is `VITE_WEB3FORMS_ACCESS_KEY` only.

#### Scenario: README documents the Web3Forms key
- **WHEN** a new developer reads the README
- **THEN** they find a section listing `VITE_WEB3FORMS_ACCESS_KEY`, what it does, and instructions to set it in Vercel → Project Settings → Environment Variables for Production and Preview

#### Scenario: `.env.example` exists and is committed
- **WHEN** a new developer clones the repo
- **THEN** they find a committed `.env.example` containing `VITE_WEB3FORMS_ACCESS_KEY=` (with no value) and a brief comment
- **AND** `.env.example` is NOT excluded by `.gitignore`
