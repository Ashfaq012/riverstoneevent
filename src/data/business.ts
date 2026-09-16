// Central place for every fact that used to be hand-typed on each WordPress
// page (name, phone, address, service area...). Change it once, it updates
// everywhere it's used — nav, footer, contact page, and the LocalBusiness
// JSON-LD schema in BaseLayout.

export const locations = [
  'Watford',
  'Wembley',
  'Hemel Hempstead',
  'Slough',
  'Bushey',
  'Luton',
  'Harrow',
] as const;

export const business = {
  name: 'Riverstone Event',
  tagline: 'Book Your Event & Hire',
  description:
    'Luxury event decoration and hire services for weddings, birthdays, proposals, baby showers and more, serving Watford, Wembley, Hemel Hempstead, Slough, Bushey, Luton and Harrow.',
  url: 'https://riverstoneevent.com',
  phone: '+44 7863 319472',
  // Confirmed live on the current site's footer.
  email: 'hello@riverstoneevent.com',
  address: {
    streetAddress: 'Flat 2, Crown Lodge',
    addressLocality: 'Watford',
    postalCode: 'WD25 0NL',
    addressCountry: 'GB',
    // Postcode-centroid coordinates for WD25 0NL (not a rooftop geocode —
    // same precision level as publishing the postcode itself). Feeds the
    // LocalBusiness schema's geo field for local/Maps search.
    geo: { latitude: 51.691109, longitude: -0.387171 },
  },
  hours: {
    days: 'Monday - Saturday',
    opens: '09:00',
    closes: '18:00',
    display: '9:00 AM - 6:00 PM',
  },
  // TODO: verify this is the live, correct handle before launch.
  instagram: 'https://www.instagram.com/riverstoneevent/',
  instagramHandle: '@riverstoneevent',
  tiktok: 'https://www.tiktok.com/@riverstoneevent',
  // No confirmed Facebook page yet — don't link one until there is.
  locations,
} as const;

// wa.me click-to-chat links need the number with country code and no
// punctuation — derived from `phone` so the two never drift out of sync.
export const whatsappLink = `https://wa.me/${business.phone.replace(/\D/g, '')}`;
