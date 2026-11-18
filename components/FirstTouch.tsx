'use client';

import { useEffect } from 'react';

// Remembers how a visitor first arrived (referrer, UTM tags, landing page) for this browser session,
// so a contact-form lead can be attributed even after they browse several pages.
export const FIRST_TOUCH_KEY = 'agsFirstTouch';

export default function FirstTouch() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(FIRST_TOUCH_KEY)) return;
      const q = new URLSearchParams(window.location.search);
      const ref = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : '';
      sessionStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify({
        referrer: ref || '(direct)',
        utm_source: q.get('utm_source') || '',
        utm_medium: q.get('utm_medium') || '',
        utm_campaign: q.get('utm_campaign') || '',
        landing_page: window.location.pathname,
      }));
    } catch { /* storage blocked: attribution is best-effort */ }
  }, []);
  return null;
}

export function readFirstTouch(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(FIRST_TOUCH_KEY) || '{}');
  } catch { return {}; }
}
