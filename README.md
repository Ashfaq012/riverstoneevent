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
  content/services/*.md  one file per service (16)
  content/hire/*.md      one file per hire category (4)
  lib/schema.ts          JSON-LD builders
  layouts/BaseLayout.astro   <head>, meta, schema injection, header/footer
  components/            Header, Footer, ServiceCard, HireCard, CTASection, Breadcrumbs
  components/icons/      Instagram, WhatsApp, TikTok, Location, Phone, Mail
  pages/
    index.astro
    about.astro
    services/index.astro
    services/[slug].astro   ← one indexable URL per service
    hire/index.astro
    hire/[slug].astro       ← one indexable URL per hire category
    gallery.astro
    contact.astro
    privacy-policy.astro         ← draft only, noindex — see below
    terms-and-conditions.astro   ← draft only, noindex — see below
    404.astro
```

**Gotcha when styling an icon component:** each file in `components/icons/`
renders its own `<svg>`. If you size one from a *parent* component's scoped
`<style>` block (e.g. a rule inside `Footer.astro` targeting
`.some-icon-class`), it silently won't apply — Astro's scoped-style
attribute is added per-file, so the icon's `<svg>` never carries the
parent's scope id and falls back to the browser's oversized default SVG
size. Icon sizing rules (`.btn__icon`, `.footer-contact__icon`,
`.footer-social__icon`) live in `global.css` instead, which isn't scoped.

## Contact form (WhatsApp hand-off, no backend)

The site is fully static — there's no server route and no email provider.
The contact form (`src/pages/contact.astro`) is plain HTML with a small
inline `<script>`: on submit, it builds a message from whatever was filled
in and opens `wa.me/<business phone>?text=...` in a new tab, which launches
the visitor's own WhatsApp (app on mobile, WhatsApp Web / download prompt
on desktop) with that message pre-written. They still have to tap send
themselves on WhatsApp's side — there's no way to send a WhatsApp message
on someone's behalf without that. If the browser blocks the new tab
(pop-up blocker), it falls back to navigating the current tab there
instead.

Nothing about this needs configuring — the phone number comes from
`business.phone` in `src/data/business.ts`, same as everywhere else it's
used (the "Chat on WhatsApp" buttons, the footer, etc.), so it only ever
needs updating in one place.

This project previously emailed enquiries via Resend from a Vercel
serverless function (`src/pages/api/contact.ts`); that route, the `resend`
dependency, and its environment variables have been removed now that the
form hands off to WhatsApp instead. The `@astrojs/vercel` adapter is still
installed for now — it degrades cleanly to a pure static build when there
are no server routes (confirmed: `astro build` reports `mode: "static"`
with nothing bundled), so leaving it in costs nothing and keeps the door
open if a server route is ever needed again. Remove it (and the `vercel()`
line in `astro.config.mjs`) if you'd rather not carry the unused
dependency.

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

- **Contact form abuse.** The contact form still has a hidden honeypot
  field, now checked client-side in `contact.astro`'s submit script — if
  it's filled in, the script quietly does nothing instead of opening
  WhatsApp. There's no server left to abuse (no email quota, no API key,
  nothing to spam), and actually reaching a stranger's WhatsApp requires
  tapping send in WhatsApp itself, which is a much higher bar than a
  scripted POST — so this is lower-risk than the previous email-based flow
  by design, not just by the honeypot.
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
- **`privacy-policy.astro` and `terms-and-conditions.astro` are drafts**,
  `noindex`ed and excluded from the sitemap. The privacy policy honestly
  describes what this site actually does today (contact form → WhatsApp
  hand-off, no cookies/analytics) but hasn't been reviewed by a solicitor.
  The terms page is a bare structural skeleton with bracketed placeholders — none of
  the deposit/cancellation/liability specifics are real; they need
  Riverstone Event's actual policies filled in before this goes live and
  the `noindex` comes off.
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
