# Nof Harel-Ezr — Practitioner Site

Marketing site for נוף הראל־עזר, פסיכולוגית חינוכית. Hebrew, right-to-left, single-page app.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui (Radix primitives)
- react-router-dom (SPA routing — `/` and a catch-all `NotFound`)
- Vitest + React Testing Library for tests
- Contact form delivery via [Web3Forms](https://web3forms.com) (client-side, no backend)
- Deployed as a static SPA on Vercel

## Local development

```bash
npm install
cp .env.example .env   # then fill in VITE_WEB3FORMS_ACCESS_KEY
npm run dev            # serves on http://localhost:8080
```

Other scripts:

- `npm run build` — production build to `dist/`
- `npm run build:dev` — build with development mode
- `npm run preview` — serve the built bundle locally
- `npm run lint` — ESLint
- `npm run test` — Vitest

## Environment variables

| Variable | Purpose |
| --- | --- |
| `VITE_WEB3FORMS_ACCESS_KEY` | Public access key for [Web3Forms](https://web3forms.com). Authorizes posting to the contact form; the destination email (`romharel98@gmail.com`) is configured in the Web3Forms dashboard. Required for the contact form to actually send. |

Get the key by signing up at [web3forms.com](https://web3forms.com) and registering `romharel98@gmail.com` as the destination email.

## Deploying to Vercel

1. Import this repo into Vercel. Vercel auto-detects the Vite framework preset; no overrides needed.
2. In **Project Settings → Environment Variables**, add `VITE_WEB3FORMS_ACCESS_KEY` for both **Production** and **Preview** environments.
3. Deploy. The included [`vercel.json`](./vercel.json) rewrites all paths to `/index.html` so client-side routes resolve on deep links and hard refreshes.
4. After the first deploy, submit a test message via the contact form and confirm it arrives in `romharel98@gmail.com`.

## Project layout

```
src/
  components/site/   page sections (Hero, About, Contact, etc.)
  components/ui/     shadcn primitives
  pages/             Index, NotFound
  hooks/             toast hook, etc.
  assets/            local images
public/              static files served at site root (incl. og-image.jpg)
index.html           entry — includes meta tags and OG image
vercel.json          SPA rewrites
```
