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
