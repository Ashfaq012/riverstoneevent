// FAQ copy. Deliberately silent on anything not established elsewhere in
// the project — no deposit %, cancellation window, delivery fee, or
// minimum hire period is invented here. Also powers the FAQPage JSON-LD
// on the homepage (src/lib/schema.ts).
export const faqs = [
  {
    question: 'What types of events do you decorate?',
    answer:
      "We style a wide range of celebrations — weddings, engagements, proposals, birthdays, baby showers, anniversaries, home celebrations, shop openings and launches, and religious or cultural occasions such as nikkah and mandap setups. If your event isn't listed, get in touch and tell us what you're planning.",
  },
  {
    question: 'Do you provide complete event decoration?',
    answer:
      "Yes. We design and set up a full decoration package for your event — backdrops, table styling, balloon and floral work and more — built around your date, venue, style and theme.",
  },
  {
    question: 'Can I hire individual decorative items?',
    answer:
      'Yes. If you only need specific pieces — a backdrop, a cake plinth, a flower arch — you can hire them separately and style the rest of your event yourself.',
  },
  {
    question: 'Can I hire items without booking full event decoration?',
    answer:
      "Yes — the two services are independent. You don't need to book full decoration to hire individual pieces, and hiring items doesn't commit you to anything beyond that.",
  },
  {
    question: 'Can I request a specific theme or colour scheme?',
    answer:
      "Yes. Every enquiry starts with a conversation about your preferred style, colours and theme so the setup feels designed around your event, not a fixed template.",
  },
  {
    question: 'How do I check availability?',
    answer:
      'Send an enquiry through the contact form, WhatsApp or Instagram with your date and what you have in mind, and we\'ll confirm availability from there.',
  },
  {
    question: 'How far in advance should I enquire?',
    answer:
      "As early as you can, especially for popular dates — but it's always worth asking, even for shorter notice.",
  },
  {
    question: 'How do I enquire about decorative item hire?',
    answer:
      'Use the contact form and select "Decorative Item Hire" as your enquiry type, or message us directly on WhatsApp or Instagram with the item and date.',
  },
] as const;
