// Occasion categories for the homepage "Events We Style" section and the
// contact form's Event Type field. Every entry here is grounded in an
// existing service, gallery caption, or the business's own Instagram
// "Induction" post, which explicitly lists: "kids to adults birthday
// parties, baby shower, bridal showers, anniversary parties, engagement,
// nikkah ceremony, mahndi, proposals or parties, wedding, picnic and many
// more." Nothing invented beyond that (no "corporate events" etc.).
export const eventTypes = [
  {
    label: 'Weddings',
    body: 'Ceremony, reception and everything styled in between.',
  },
  {
    label: 'Engagements',
    body: 'Celebrating the moment before the wedding planning begins.',
  },
  {
    label: 'Proposals',
    body: 'A styled setting for the question itself.',
  },
  {
    label: 'Birthdays',
    body: 'From kids to adults, first birthdays to milestone celebrations.',
  },
  {
    label: 'Baby Showers',
    body: 'Soft, celebratory styling to welcome a little one.',
  },
  {
    label: 'Bridal Showers',
    body: "Celebrating the bride-to-be ahead of the big day.",
  },
  {
    label: 'Anniversaries',
    body: 'Marking the years with a beautifully styled celebration.',
  },
  {
    label: 'Home & Outdoor Celebrations',
    body: 'From your own living room and garden to a styled picnic setup.',
  },
  {
    label: 'Shop Openings & Launches',
    body: 'A styled entrance and display for your big day.',
  },
  {
    label: 'Religious & Cultural Celebrations',
    body: 'Nikkah, mehndi, mandap and other tradition-led occasions.',
  },
  {
    label: 'Other Special Occasions',
    body: "Celebrating something else? Tell us what you have in mind.",
  },
] as const;
