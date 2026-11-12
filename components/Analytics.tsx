import Script from 'next/script';
import { GA_ID } from '@/lib/site';

/**
 * Google Analytics 4. Renders nothing until NEXT_PUBLIC_GA_ID is set in Vercel.
 * Custom events (cta_click, hire_engineers_click, lead_magnet_click, generate_lead…)
 * are sent via lib/analytics.ts — mark `generate_lead` as a key event in GA4.
 */
export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
