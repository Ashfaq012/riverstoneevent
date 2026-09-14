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
  // TODO: confirm a public business email — none was published on the
  // current site, so this is a placeholder.
  email: 'hello@riverstoneevent.com',
  address: {
    streetAddress: 'Flat 2, Crown Lodge',
    addressLocality: 'Watford',
    postalCode: 'WD25 0NL',
    addressCountry: 'GB',
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
  locations,
} as const;
