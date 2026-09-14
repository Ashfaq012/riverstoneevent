import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One entry per service (Wedding Decoration, Birthday Parties, ...).
// Frontmatter carries the structured bits (SEO, feature bullets, card
// blurb); the markdown body carries the longer description shown on the
// service's own page.
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string(),
    summary: z.string(),
    features: z.array(z.string()).default([]),
    order: z.number().default(99),
    seoTitle: z.string(),
    seoDescription: z.string(),
  }),
});

// One entry per hire category (Backdrops, Plinths, Dessert Tables, Arches).
const hireItems = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/hire' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string(),
    summary: z.string(),
    items: z.array(z.string()).default([]),
    order: z.number().default(99),
    seoTitle: z.string(),
    seoDescription: z.string(),
  }),
});

export const collections = { services, hireItems };
