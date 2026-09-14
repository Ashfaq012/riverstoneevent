# Riverstone Event — Astro rebuild

A static Astro rebuild of the current WordPress + Elementor site
(`riverstoneevent.com`), built content-first so pages and SEO metadata come
from typed content collections instead of being hand-copied into a page
builder.

## Stack

- **Astro** (static output, no server/DB needed)
- **Content collections** (`src/content/services`, `src/content/hire`) —
  Markdown + a Zod schema, so every service/hire page is guaranteed a title,
  summary and SEO title/description
- **`@astrojs/sitemap`** — auto-generates `sitemap-index.xml` at build time
- **Hand-rolled JSON-LD** (`src/lib/schema.ts`) for `LocalBusiness`, `Service`
  and `BreadcrumbList` — the current site ships none of this today

## Structure

```
src/
  data/business.ts       single source of truth for name/phone/address/areas
  content.config.ts      schema for the services & hire collections
  content/services/*.md  one file per service (10)
  content/hire/*.md      one file per hire category (4)
  lib/schema.ts          JSON-LD builders
  layouts/BaseLayout.astro   <head>, meta, schema injection, header/footer
  components/            Header, Footer, ServiceCard, HireCard, CTASection, Breadcrumbs
  pages/
    index.astro
    about.astro
    services/index.astro
    services/[slug].astro   ← one indexable URL per service
    hire/index.astro
    hire/[slug].astro       ← one indexable URL per hire category
    gallery.astro
    contact.astro
    404.astro
```

## Contact form (Resend)

The site is static except for one route: `src/pages/api/contact.ts`, which
opts out of prerendering (`export const prerender = false`) and runs as a
Vercel serverless function. It receives the contact form's POST, sends the
enquiry via [Resend](https://resend.com), and redirects back to `/contact/`
with `?status=sent` or `?status=error` — a small inline script on that page
turns that into a banner. Everything else in the site is still plain
prerendered HTML.

To run it:

1. `cp .env.example .env` and fill in `RESEND_API_KEY` (from
   [resend.com/api-keys](https://resend.com/api-keys)) and
   `CONTACT_TO_EMAIL`.
2. Set the same two variables in the Vercel project's Environment Variables
   before deploying.
3. Before launch, verify a sending domain at
   [resend.com/domains](https://resend.com/domains) and update the `from`
   address in `contact.ts` — `onboarding@resend.dev` only works for testing
   and is rate-limited.

## Branding

The real brand mark and colour palette are in — no more placeholder line-art.

- **Logo** — `public/brand/logo-header.png` (header), `logo-footer.png`
  (footer, full-colour on the dark footer bg), `logo-monogram-900.png` (hero
  decoration + 404 page). Sourced from the supplied brand asset pack at
  `../files/brand-assets/`; that folder's own `README.md` documents every
  other variant (monochrome, gold, watermark, social profile, print) for
  anything not yet wired into the site.
- **Favicon** — `favicon-16/32/180/512.png`, linked in `BaseLayout.astro`.
  No `.ico` was supplied; PNG favicons are fine in every current browser.
- **OG/social image** — `public/og-default.png` (the pack's
  `social/social-profile.png`, square). A proper 1200×630 landscape crop
  would render better in link previews on platforms that don't center-crop
  squares — worth doing once real event photography exists to feature
  instead of the logo alone.
- **Colour palette** (`src/styles/global.css` `:root`) — the four supplied
  brand colours (`--color-bg`, `--color-bg-alt`, `--color-primary`,
  `--color-text`) plus a handful of values derived from them
  (`--color-primary-dark` for hover/contrast text, `--color-muted` for
  secondary text, `--color-surface`/`--color-border`) so every hover state
  and accent stays in the same family. `--color-gold`/`--color-rose` are
  legacy token names from an earlier terracotta palette, kept only so
  existing component CSS didn't need renaming — both now alias into the
  new rose tones rather than pointing at a separate hue.

## Security

- **Contact form abuse.** `/api/contact` has a hidden honeypot field (a bot
  that auto-fills every input trips it; the response still looks like
  success so the bot doesn't adapt), server-side email-format validation,
  and length caps on every field. This stops generic scripted spam, not a
  targeted attacker. If real spam gets through anyway, turn on Vercel's
  Attack Challenge Mode (project dashboard, no code) or add a CAPTCHA
  (e.g. Cloudflare Turnstile) in front of the form.
- **Security headers** (`vercel.json`): CSP, `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and HSTS.
  The CSP's `script-src` includes `'unsafe-inline'` because Astro inlines a
  couple of small per-page `<script>` tags (the scroll-reveal observer, and
  the contact page's status-banner script) rather than extracting them to
  external files — tightening this further means moving those into real
  `.js` files under `public/` and switching to a hash- or nonce-based CSP.
  Not done here since there's currently no HTML-injection sink in the site
  for a stricter CSP to defend against (no user input is ever reflected
  into rendered HTML).
- **Dependency watch**: `npm audit` currently flags a `path-to-regexp` ReDoS
  advisory via `@vercel/routing-utils`, a transitive dependency of
  `@astrojs/vercel`. It's used at build time to generate Vercel's routing
  config from this project's own routes, not exposed to visitor input, so
  it's low-priority — but rerun `npm audit` occasionally and take the
  adapter update once one ships.

## Known TODOs before launch

- **Real photography.** The current "Gallery" page is just an embedded
  Instagram feed — there's no self-hosted gallery to carry over. Drop real
  event photos into `src/assets/` and swap the placeholder grid in
  `gallery.astro` for `astro:assets` `<Image>` components (auto WebP/AVIF +
  width/height, which also fixes CLS).
- **Business email** in `src/data/business.ts` is a placeholder; only a
  phone number and Instagram were published on the current site.
- **"Events Decorated" / "Years Experience" counters** on the About page
  were animated placeholders on the live site (rendering as 0) — get the
  real numbers from the client rather than inventing them.
- Confirm the production domain in `astro.config.mjs` (`site:`) before
  deploying — it feeds both the sitemap and canonical URLs.

## Commands

| Command | Action |
| --- | --- |
| `npm install` | install dependencies |
| `npm run dev` | start local dev server |
| `npm run build` | build to `./dist/` |
| `npm run preview` | preview the production build locally |
