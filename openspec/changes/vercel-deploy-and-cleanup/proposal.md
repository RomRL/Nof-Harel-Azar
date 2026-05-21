## Why

The project is a static marketing site exported from Lovable and currently carries unused infrastructure (Supabase client + types, a Lovable Vite plugin, and Lovable-hosted OG image), a checked-in `.env` with publishable keys, and a contact form whose "send" button only fakes a submission with a `setTimeout`. To deploy on Vercel we need the build to be free of Lovable-specific tooling, the repo free of secrets, and the contact form to actually deliver messages to the practitioner so the live site is useful.

## What Changes

- **Wire the contact form to actually send email** via Web3Forms (client-only POST, no backend), delivering submissions to `romharel98@gmail.com`. Replace the `setTimeout` stub in [Contact.tsx](src/components/site/Contact.tsx) with a real `fetch` to `https://api.web3forms.com/submit`, with proper success/error toasts, basic anti-spam (honeypot field), and a required Access Key supplied via `VITE_WEB3FORMS_ACCESS_KEY`.
- **Remove all Supabase usage**: delete [src/integrations/supabase/](src/integrations/supabase/) (client.ts, types.ts), drop the `@supabase/supabase-js` dependency from [package.json](package.json), and remove the three `VITE_SUPABASE_*` entries from `.env`. No code consumes Supabase today, so no replacement is needed.
- **Remove all Lovable dependencies**: drop the `lovable-tagger` devDependency and its plugin invocation in [vite.config.ts](vite.config.ts), replace the Lovable-hosted `og:image` / `twitter:image` in [index.html](index.html) with a local asset under `public/`, and rewrite [README.md](README.md) so it no longer references Lovable.
- **Harden `.gitignore`** to exclude `.env`, `.env.*` (except `.env.example`), `node_modules`, `dist`, build artifacts, OS junk, and editor files. Also untrack the currently-tracked `.env` and `Nof Harel-Ezr.zip` if present, and add an `.env.example` documenting required vars.
- **Make the app Vercel-deployable**: add a minimal `vercel.json` with SPA rewrites (so client-side routes resolve), document the `VITE_WEB3FORMS_ACCESS_KEY` env var in README, and verify `npm run build` produces a deployable `dist/`.

## Capabilities

### New Capabilities
- `contact-email-delivery`: Contact form submissions reach the practitioner's inbox via Web3Forms, with user-visible success/error feedback and basic spam protection.
- `vercel-deployment`: The project builds and runs on Vercel as a static SPA, with the correct rewrites and documented env vars.
- `repo-hygiene`: `.gitignore`, env handling, and README accurately reflect a non-Lovable, non-Supabase Vite+React project with no secrets committed.

### Modified Capabilities
<!-- None — no existing specs in openspec/specs/ -->

## Impact

- **Code**: [src/components/site/Contact.tsx](src/components/site/Contact.tsx) (real send), [src/integrations/supabase/](src/integrations/supabase/) (deleted), [vite.config.ts](vite.config.ts) (drop lovable-tagger), [index.html](index.html) (replace OG image), [README.md](README.md) (rewrite), [.gitignore](.gitignore) (expand), [.env](.env) (rewrite to only `VITE_WEB3FORMS_ACCESS_KEY`).
- **New files**: `vercel.json`, `.env.example`, `public/og-image.*` (local OG image asset).
- **Dependencies removed**: `@supabase/supabase-js`, `lovable-tagger`.
- **New env vars**: `VITE_WEB3FORMS_ACCESS_KEY` (must be set in Vercel project settings).
- **Secrets**: existing Supabase publishable key in `.env` should be considered exposed (it's in git history) — flagged for user follow-up, but rotation/revocation is outside this change since the Supabase project is being abandoned.
- **No backend / serverless functions** are introduced; deployment stays a pure static build.
