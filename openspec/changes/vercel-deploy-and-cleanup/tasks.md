## 1. Remove Supabase

- [x] 1.1 Delete `src/integrations/supabase/` (both `client.ts` and `types.ts`); remove the `src/integrations/` directory if it ends up empty
- [x] 1.2 Delete the top-level `supabase/` directory (contains only `config.toml`)
- [x] 1.3 Remove `@supabase/supabase-js` from `dependencies` in `package.json`
- [x] 1.4 Run `npm install` to refresh `package-lock.json`
- [x] 1.5 Grep `src/` for any lingering `supabase` / `@supabase` references and confirm none remain
- [x] 1.6 Confirm `npm run build` still succeeds (no broken imports)

## 2. Remove Lovable

- [x] 2.1 In `vite.config.ts`: remove the `import { componentTagger } from "lovable-tagger";` line and remove `mode === "development" && componentTagger()` from `plugins` (leave just `[react()]`); drop the `.filter(Boolean)` if it's now unnecessary
- [x] 2.2 Remove `lovable-tagger` from `devDependencies` in `package.json` and re-run `npm install`
- [x] 2.3 Pick/produce a local OG image. **Done**: copied `src/assets/therapist-portrait.jpg` to `public/og-image.jpg`. (Used `.jpg` instead of `.png` since the source asset is JPG.)
- [x] 2.4 In `index.html`: replace both `og:image` and `twitter:image` URLs with `/og-image.jpg`
- [x] 2.5 Grep tracked files for `lovable` (case-insensitive, excluding `node_modules`, `openspec/`, lockfiles) and confirm zero matches

## 3. Wire Contact form to send real email via Web3Forms

- [ ] 3.1 **User action**: sign up at web3forms.com, register `romharel98@gmail.com` as the destination email, and copy the Access Key into `VITE_WEB3FORMS_ACCESS_KEY` (locally in `.env`, and on Vercel for both Production and Preview)
- [x] 3.2 Replaced the `setTimeout` stub in `src/components/site/Contact.tsx` with a real `fetch` POST to `https://api.web3forms.com/submit` — `FormData` from the form plus `access_key`, `subject` (`פנייה חדשה מהאתר`), `from_name`
- [x] 3.3 Added `name` attributes to each input (`name`, `phone`, `email`, `message`)
- [x] 3.4 Added a hidden honeypot `<input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden />`
- [x] 3.5 If `VITE_WEB3FORMS_ACCESS_KEY` is falsy: destructive toast in Hebrew + `console.error` + no fetch call
- [x] 3.6 On `res.ok && json.success === true`: success toast + `form.reset()`
- [x] 3.7 On failure: destructive-variant toast in Hebrew; form is NOT reset
- [x] 3.8 `sending` state still drives button label (`שולחת...`) and disabled attribute
- [ ] 3.9 **User action**: smoke-test in `npm run dev` with a real Access Key in `.env` (depends on 3.1)

## 4. Env, gitignore, and secrets

- [x] 4.1 Rewrote `.env` to contain only `VITE_WEB3FORMS_ACCESS_KEY=""` with explanatory comments; dropped the three `VITE_SUPABASE_*` lines
- [x] 4.2 Created `.env.example` with `VITE_WEB3FORMS_ACCESS_KEY=` and a pointer comment
- [x] 4.3 Extended `.gitignore` to include `.env`, `.env.*`, `!.env.example`, `.vercel/`, `*.zip`, `coverage/`, `*.tsbuildinfo`; kept existing entries for `node_modules`, `dist`, editor files, OS junk
- [x] 4.4 **No-op** — `.env` was never tracked in git (only `README.md` was modified in the working tree; everything else is untracked). Nothing to `git rm --cached`.
- [x] 4.5 Verified `git ls-files | grep -E '^\.env$|\.zip$'` produces no output
- [x] 4.6 **No-op** — the Supabase publishable anon key was never committed; the `.env` containing it is still local-only. Nothing to flag/rotate. (If the Supabase project itself is no longer needed, you can delete it from supabase.com.)

## 5. Vercel configuration

- [x] 5.1 Created `vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
- [x] 5.2 `npm run build` succeeded; `grep -r "lovable\|supabase" dist/` returns no matches
- [ ] 5.3 **User action**: create the Vercel project, link the repo, set `VITE_WEB3FORMS_ACCESS_KEY` in Project Settings → Environment Variables for Production AND Preview, and trigger first deploy
- [ ] 5.4 **User action**: on the live deploy, submit a real test message via the contact form and confirm it arrives at `romharel98@gmail.com`

## 6. README rewrite

- [x] 6.1 Replaced the Lovable-placeholder README with a real one covering project description, stack, local dev commands, env vars, Vercel deployment steps, and project layout
- [x] 6.2 README contains zero references to Lovable

## 7. Final verification

- [x] 7.1 `npm run lint` — 10 pre-existing problems in shadcn-generated UI components and `tailwind.config.ts`; **none introduced by this change**. Our modified files (`Contact.tsx`, `vite.config.ts`) lint cleanly.
- [x] 7.2 `npm run test` — 1 test passing (existing example test); no regressions
- [x] 7.3 `npm run build` — succeeds; `dist/index.html` references `/og-image.jpg`; `grep -r "lovable\|supabase" dist/` returns no matches
- [ ] 7.4 **User action**: `npm run dev` and manually click through the site (home, contact form with a real Access Key, deep-link to a 404 path). Requires browser + Web3Forms Access Key.
- [x] 7.5 `git status` is clean for intent — every changed/created file is part of this change (`.env`, `.env.example`, `.gitignore`, `README.md`, `vercel.json`, `package.json`, `package-lock.json`, `vite.config.ts`, `index.html`, `public/og-image.jpg`, `src/components/site/Contact.tsx`, deletions under `src/integrations/supabase/` and `supabase/`). No `.env` is or can be staged (gitignored).
