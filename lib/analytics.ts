// Sends site events to Google Tag Manager (dataLayer) — or straight to GA4
// when the site is installed with a GA ID and no Tag Manager container.
//
// Events: cta_click, hire_engineers_click, lead_magnet_click, book_call_click, generate_lead

import { GTM_ID } from '@/lib/site';

type Win = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (command: 'event', name: string, params?: Record<string, unknown>) => void;
};

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as Win;
  if (GTM_ID) {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: name, ...params });
  } else if (typeof w.gtag === 'function') {
    w.gtag('event', name, params);
  }
}
