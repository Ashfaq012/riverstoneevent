// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Live production domain (connected to Vercel and verified) — feeds both
  // the sitemap and every page's canonical/OG URLs.
  site: 'https://riverstoneevent.com',
  integrations: [
    sitemap({
      // Keep draft/noindex pages out of the sitemap too, not just out of
      // search results — no point pointing crawlers at them.
      filter: (page) =>
        !page.includes('/privacy-policy/') &&
        !page.includes('/terms-and-conditions/'),
    }),
  ],
  // The whole site is static HTML now — there's no server route left (the
  // contact form hands off to WhatsApp client-side instead of POSTing
  // anywhere; see README's "Contact form" section). The adapter is kept
  // installed anyway since it costs nothing when there's nothing dynamic
  // to bundle, and keeps the door open if a server route is ever needed
  // again — remove it if you'd rather not carry the unused dependency.
  adapter: vercel(),
});
