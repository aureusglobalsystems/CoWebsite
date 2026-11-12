// Tiny GA4 wrapper. No-ops until NEXT_PUBLIC_GA_ID is set (see components/Analytics.tsx).

type GtagFn = (command: 'event', name: string, params?: Record<string, unknown>) => void;

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag === 'function') gtag('event', name, params);
}
