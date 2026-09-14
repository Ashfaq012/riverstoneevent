// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // TODO: swap for the real production domain before launch.
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
  // Everything still prerenders to static HTML by default. The adapter only
  // switches on for routes that opt out with `export const prerender = false`
  // — currently just src/pages/api/contact.ts, which needs to run server-side
  // to call Resend with a secret API key.
  adapter: vercel(),
});
