import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { business } from '../../data/business';

// This is the one route in the whole site that isn't static — it needs to
// run server-side (on Vercel, as a serverless function) because sending
// through Resend requires a secret API key that must never reach the
// browser. Every other page stays prerendered HTML.
export const prerender = false;

// Cheap, no-infra spam checks. Neither is adversary-proof — a determined
// bot can leave the honeypot blank and send a well-formed email — but both
// stop the generic scripted spam that scans the web for open POST forms,
// which is the realistic threat for a small local-business contact form.
// If real spam still gets through, add Vercel's Attack Challenge Mode
// (dashboard, no code) or a CAPTCHA (e.g. Turnstile) on top of this.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Must match the <select> options in contact.astro. Anything else
// submitted (a tampered request, not a real browser submission) is
// dropped into "General Enquiry" rather than rejected outright — no need
// to bounce a genuine enquiry over a mismatched value.
const ENQUIRY_TYPES = [
  'Event Decoration',
  'Decorative Item Hire',
  'Both',
  'General Enquiry',
];

function clamp(value: string, max: number) {
  return value.length > max ? value.slice(0, max) : value;
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();

  // Honeypot: a hidden field real visitors never see or fill. Bots that
  // auto-fill every field in the form trip it. Redirect as if it worked so
  // the bot doesn't learn to look for a different tell.
  if (formData.get('company')?.toString().trim()) {
    return redirect('/contact/?status=sent');
  }

  // Strip newlines from name since it lands in the email subject line.
  const name = clamp(
    (formData.get('name')?.toString().trim() ?? '').replace(/[\r\n]+/g, ' '),
    100
  );
  const email = clamp(formData.get('email')?.toString().trim() ?? '', 200);
  const phone = clamp(formData.get('phone')?.toString().trim() ?? '', 30);
  const eventType = clamp(
    formData.get('event-type')?.toString().trim() ?? '',
    100
  );
  const eventDate = clamp(
    formData.get('event-date')?.toString().trim() ?? '',
    20
  );
  const venue = clamp(formData.get('venue')?.toString().trim() ?? '', 150);
  const message = clamp(
    formData.get('message')?.toString().trim() ?? '',
    3000
  );

  const enquiryTypeRaw = formData.get('enquiry-type')?.toString().trim() ?? '';
  const enquiryType = ENQUIRY_TYPES.includes(enquiryTypeRaw)
    ? enquiryTypeRaw
    : 'General Enquiry';

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return redirect('/contact/?status=error');
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.error(
      'Missing RESEND_API_KEY or CONTACT_TO_EMAIL environment variable.'
    );
    return redirect('/contact/?status=error');
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    // TODO: replace with a "from" address on a domain verified in Resend
    // (resend.com/domains) before launch — onboarding@resend.dev only
    // works for testing and is rate-limited.
    from: `${business.name} Website <onboarding@resend.dev>`,
    to,
    replyTo: email,
    subject: `New ${enquiryType.toLowerCase()} enquiry from ${name}`,
    text: [
      `Enquiry type: ${enquiryType}`,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone / WhatsApp: ${phone}` : undefined,
      eventType ? `Event type: ${eventType}` : undefined,
      eventDate ? `Event date: ${eventDate}` : undefined,
      venue ? `Venue / location: ${venue}` : undefined,
      '',
      message,
    ]
      .filter((line) => line !== undefined)
      .join('\n'),
  });

  if (error) {
    console.error('Resend error:', error);
    return redirect('/contact/?status=error');
  }

  return redirect('/contact/?status=sent');
};
