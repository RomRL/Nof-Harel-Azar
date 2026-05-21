## ADDED Requirements

### Requirement: The repository SHALL contain no Supabase code or dependencies

All Supabase scaffolding from the Lovable export MUST be removed. No file under `src/` may import `@supabase/supabase-js` or reference the `supabase` client; the `@supabase/supabase-js` package MUST be absent from `dependencies` and `devDependencies` in `package.json`; the `supabase/` config directory MUST be deleted; and no `VITE_SUPABASE_*` env var may remain in `.env` or `.env.example`.

#### Scenario: No Supabase imports remain in source
- **WHEN** running `grep -r "@supabase\|from ['\"].*supabase" src/`
- **THEN** the command produces no matches

#### Scenario: Supabase is not in package.json
- **WHEN** inspecting `package.json`
- **THEN** neither `dependencies` nor `devDependencies` contains a `@supabase/*` entry

#### Scenario: Supabase integration directory is gone
- **WHEN** listing the repo
- **THEN** neither `src/integrations/supabase/` nor `supabase/` exists

### Requirement: The repository SHALL contain no Lovable code or dependencies

All Lovable-specific tooling and assets MUST be removed. `lovable-tagger` MUST be absent from `package.json`; `vite.config.ts` MUST NOT import it or include `componentTagger()`; `index.html` MUST NOT reference Lovable-hosted URLs (`*.lovable.app`, `pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev`); and `README.md` MUST NOT mention Lovable.

#### Scenario: No Lovable references in tracked files
- **WHEN** running `grep -ri "lovable" --include='*.ts' --include='*.tsx' --include='*.html' --include='*.md' --include='*.json'` (excluding `node_modules`, `openspec/`, and lockfiles)
- **THEN** the command produces no matches

#### Scenario: OG and Twitter images are served from the local `public/` directory
- **WHEN** inspecting `index.html`
- **THEN** `og:image` and `twitter:image` reference a path under `/og-image.*` (a file shipped in `public/`), not an external Lovable/R2 URL

### Requirement: Secrets and build artifacts SHALL be excluded from version control

`.gitignore` MUST cover `.env`, `.env.*` (with an explicit `!.env.example` re-include), `node_modules`, `dist`, `dist-ssr`, `.vercel/`, `*.local`, common editor/OS files, and large export artifacts like `*.zip`. Files that should not have been tracked (existing `.env`, `Nof Harel-Ezr.zip` if present) MUST be removed from the index.

#### Scenario: `.env` is no longer tracked
- **WHEN** running `git ls-files .env`
- **THEN** the command produces no output

#### Scenario: `.env.example` is tracked
- **WHEN** running `git ls-files .env.example`
- **THEN** the command outputs `.env.example`

#### Scenario: `.gitignore` covers env, build, vercel, and OS files
- **WHEN** inspecting `.gitignore`
- **THEN** it includes (at minimum) entries for `.env`, `.env.*`, `!.env.example`, `node_modules`, `dist`, `.vercel/`, `.DS_Store`, and `*.zip`

### Requirement: README SHALL describe the project accurately

`README.md` MUST identify the project (Nof Harel-Ezr practitioner site), the stack (Vite + React + TypeScript + Tailwind + shadcn/ui), local dev commands, the env vars required (Web3Forms key), and Vercel deployment steps. It MUST NOT reference Lovable.

#### Scenario: README contains setup and deploy instructions
- **WHEN** a new developer opens `README.md`
- **THEN** it explains what the project is, how to run `npm install` / `npm run dev` / `npm run build`, where to set `VITE_WEB3FORMS_ACCESS_KEY` on Vercel, and how SPA routing is configured
