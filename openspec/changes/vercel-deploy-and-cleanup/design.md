## Context

The repo is a Vite + React + Tailwind + shadcn/ui static site (Hebrew, RTL) that was exported from Lovable. It carries three classes of dead weight:

1. **Supabase scaffolding** that no component imports (`src/integrations/supabase/client.ts`, `types.ts`, `@supabase/supabase-js` dependency, three `VITE_SUPABASE_*` env vars). A tracked `.env` ships a publishable anon key — low-impact but still a secret-handling smell.
2. **Lovable tooling**: the `lovable-tagger` Vite plugin (devDep + import in `vite.config.ts`), Lovable-hosted OG/Twitter images in `index.html`, and a Lovable placeholder `README.md`.
3. **A fake contact form**: [Contact.tsx:7-15](src/components/site/Contact.tsx#L7-L15) calls `setTimeout` and shows a success toast without sending anything. The visible practitioner email is `romharel98@gmail.com`.

Deployment target is **Vercel** as a pure static SPA build (no serverless functions). The user picked **Web3Forms** for email delivery — a third-party form relay that accepts a client-side `POST` with an Access Key, requires no backend, and forwards submissions to a registered destination address.

## Goals / Non-Goals

**Goals:**
- Contact form actually emails `romharel98@gmail.com` on submit, with clear success/error UX in Hebrew (matching existing copy).
- App builds and deploys on Vercel with SPA routing intact (current routes: `/`, NotFound catch-all).
- Zero Supabase code, zero `@supabase/*` deps, zero Lovable code, zero `lovable-*` deps after this change.
- `.env` and other sensitive/build artifacts are ignored; an `.env.example` documents the one required runtime var.
- `npm run build` succeeds cleanly with no references to removed packages.

**Non-Goals:**
- Replacing Supabase functionality (none is currently used by the app).
- Rotating the leaked Supabase publishable key — the project is being abandoned. Flag it for the user as a follow-up; don't gate on it.
- Server-side validation, rate limiting, or storing submissions anywhere besides the inbox (Web3Forms is the system of record).
- Internationalization, accessibility audit, or design changes to the contact form beyond what's needed to wire the send.
- Setting up a Vercel project, domain, or CI — the user will do the Vercel-side wiring; we just produce a deployable repo.

## Decisions

### D1. Email delivery: Web3Forms via client-side `fetch` (no serverless function)
- **Choice**: Submit `multipart/form-data` (or JSON) to `https://api.web3forms.com/submit` from the browser, including the public Access Key from `VITE_WEB3FORMS_ACCESS_KEY`.
- **Why**: User explicitly chose it. Pure static build keeps Vercel deployment trivial (no `/api` directory, no runtime). Free tier is sufficient for an inbound-contact form on a small practitioner site.
- **Alternatives considered**:
  - *Resend + Vercel Function*: better DX and deliverability story, but requires a serverless function and a server-side API key — overkill here.
  - *EmailJS*: similar shape, but the Web3Forms quota and signup flow are simpler for a single-form site.
  - *`mailto:` link*: opens the user's mail client, breaks on mobile/web mail; rejected because the user wants the click to *send*.
- **Implication**: The Access Key is shipped to the browser. That's expected with Web3Forms — the key only authorizes posting to your form, not reading submissions. Treat it as public.

### D2. Spam mitigation
- **Choice**: Honeypot field (hidden `botcheck` input that real users leave empty; Web3Forms drops the submission if it's non-empty) only — no CAPTCHA.
- **Why**: Site traffic is low; a CAPTCHA degrades the calm UX. Web3Forms natively supports `botcheck` honeypot.
- **Trade-off**: Determined bots still get through. Acceptable for a low-volume contact form; revisit if abuse appears.

### D3. Form state & feedback
- **Choice**: Keep the existing local `useState` + `toast` pattern in `Contact.tsx` rather than introducing `react-hook-form` (already a dep, but unused here). On success → toast "ההודעה נשלחה" and reset form. On error → toast with destructive variant and a generic Hebrew error message asking the visitor to try again or call.
- **Why**: Minimum diff, matches surrounding code style.
- **Implication**: Validation stays HTML5-native (`required`, `type="email"`, `type="tel"`).

### D4. Vercel config: SPA rewrites
- **Choice**: Add a minimal `vercel.json` with a single rewrite of all paths to `/index.html` so client-side routes (currently just `/` and the catch-all NotFound) resolve on hard refresh / deep link.
- **Why**: Vite produces a single `index.html`; without rewrites, refreshing a non-root route on Vercel returns 404.
- **Alternative**: Rely on Vercel's automatic framework detection for Vite (it generally handles this), but an explicit `vercel.json` is unambiguous and survives future framework-detection changes.

### D5. Removing Supabase
- **Choice**: Hard-delete `src/integrations/supabase/` and the `supabase/` directory (contains only `config.toml`), drop `@supabase/supabase-js`, drop three `VITE_SUPABASE_*` env vars.
- **Why**: Nothing in `src/` references `supabase` outside the integrations folder (verified by grep). No migration needed.
- **Note**: The publishable anon key in `.env` is already in git history (commit `e098525`). Since the Supabase project is being abandoned, we surface this to the user but don't rewrite history.

### D6. Removing Lovable
- **Choice**:
  - `vite.config.ts`: remove the `lovable-tagger` import and the `componentTagger()` plugin entry.
  - `package.json`: remove `lovable-tagger` from `devDependencies`.
  - `index.html`: replace the two Lovable-hosted image URLs (`pub-...r2.dev/...lovable.app...png`) with a local file at `/og-image.png` (or `.jpg`) in `public/`. Use the existing project's hero/branding image if one exists; otherwise commit a placeholder and flag for the user.
  - `README.md`: rewrite to a normal "Nof Harel-Ezr — therapist marketing site (Vite/React/Vercel)" with dev/build/deploy instructions.
- **Why**: Lovable plugin only inserts dev-time element tags; safe to remove. Lovable-hosted images are an external dependency on a third-party CDN we don't control.

### D7. `.gitignore` and secrets
- **Choice**: Extend `.gitignore` to cover `.env`, `.env.*` (except `!.env.example`), already-covered `node_modules`/`dist`, plus `.vercel/`, `*.zip`, and OS files. `git rm --cached .env "Nof Harel-Ezr.zip"` to untrack files that should not have been committed. Add `.env.example` listing `VITE_WEB3FORMS_ACCESS_KEY=`.
- **Why**: Prevents future leaks. The existing `.zip` (the Lovable export bundle) is bulky and belongs in cold storage, not git.

## Risks / Trade-offs

- **Web3Forms outage / rate limit** → Mitigation: error toast invites visitor to call/WhatsApp (which are already shown in the Contact section), so a fallback path is visible without us coding one.
- **Access Key not set on Vercel** → Build still succeeds (Vite inlines `undefined`), but every submit fails with a Web3Forms 400. Mitigation: README documents the env var, and the client-side submit handler checks for a missing key at runtime and toasts a clear message ("Form not configured" in Hebrew) so the failure isn't silent.
- **OG image replacement** → If we don't have a curated image, the social share preview gets uglier. Mitigation: ship a sensible default sourced from existing `public/` or `src/assets/`; flag for the user to swap in a designed image later.
- **Honeypot is weak** → Acceptable for low-traffic site; revisit if needed.
- **Leaked Supabase anon key in git history** → Out of scope to scrub; flagged to user. The key is publishable (anon role), so impact is limited to whatever RLS policies are on the (now-abandoned) project.

## Migration Plan

1. Land all code changes in one branch (Supabase removal, Lovable removal, contact form rewrite, `.gitignore`, `vercel.json`).
2. Locally: `npm install` (to refresh lockfile after dep removal), `npm run build`, `npm run dev` — smoke-test the contact form end-to-end with a real Access Key.
3. User creates Vercel project, sets `VITE_WEB3FORMS_ACCESS_KEY` in project env (Production + Preview).
4. First deploy → user verifies a test submission lands in `romharel98@gmail.com`.
5. Rollback: this is the first deploy of this app — rollback = revert the branch before merging. No production users to migrate.

## Open Questions

- **OG image**: do we have a designed image to ship, or commit a placeholder and let the user swap it in? Default: use existing project asset if one fits; otherwise placeholder.
- **Should we delete the `supabase/config.toml` directory entirely?** Default: yes — it's Supabase CLI scaffolding with no value once the integration is removed.
- **Tests**: existing test setup is Vitest + RTL; the current Contact component has no test. Default: don't add one unless trivial — but ensure existing tests still pass.
