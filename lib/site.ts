// Site-wide settings. Values come from environment variables where they are
// account-specific, so they can be set in Vercel without a code change.

// Production URL — used for canonical URLs, sitemap, OG images and structured data.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://aureusglobalsystems.com').replace(/\/$/, '');

export const SITE_NAME = 'Aureus Global Systems';

// Optional call-booking link (Calendly, Cal.com, HubSpot meetings…).
// When set, "Book a call" buttons appear next to the contact CTAs.
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || '';

// Google Tag Manager container (the site's Google tag). Override in Vercel if it changes;
// set NEXT_PUBLIC_GTM_ID to "off" to disable.
const gtm = process.env.NEXT_PUBLIC_GTM_ID ?? 'GTM-T7R8N782';
export const GTM_ID = gtm === 'off' ? '' : gtm;

// Direct GA4 measurement ID — only used when no Tag Manager container is set.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Optional search-engine verification codes (Search Console / Bing Webmaster Tools).
export const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '';
export const BING_SITE_VERIFICATION = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '';

export const contactHref = (service?: string) =>
  service ? `/contact?service=${encodeURIComponent(service)}` : '/contact';
