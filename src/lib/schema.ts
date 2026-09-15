// JSON-LD builders. Centralised so every page emits consistent structured
// data instead of hand-rolling <script type="application/ld+json"> per page.
// This is the piece the current WordPress site has none of at all.
import { business } from '../data/business';

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description,
    url: business.url,
    telephone: business.phone,
    image: `${business.url}/og-default.png`,
    logo: `${business.url}/brand/logo-header.png`,
    priceRange: '££',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: business.hours.opens,
      closes: business.hours.closes,
    },
    areaServed: business.locations.map((name) => ({
      '@type': 'City',
      name,
    })),
    sameAs: [business.instagram, business.tiktok],
  };
}

export function faqSchema(items: readonly { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      '@type': 'LocalBusiness',
      name: business.name,
      telephone: business.phone,
      url: business.url,
    },
    areaServed: business.locations.map((name) => ({
      '@type': 'City',
      name,
    })),
  };
}

export function breadcrumbSchema(
  crumbs: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
