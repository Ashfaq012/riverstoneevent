import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { business } from '../../data/business';

// This is the one route in the whole site that isn't static — it needs to
// run server-side (on Vercel, as a serverless function) because sending
// through Resend requires a secret API key that must never reach the
// browser. Every other page stays prerendered HTML.
export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const eventDate = formData.get('event-date')?.toString().trim();
  const message = formData.get('message')?.toString().trim();

  if (!name || !email || !message) {
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
    subject: `New enquiry from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      eventDate ? `Event date: ${eventDate}` : undefined,
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
