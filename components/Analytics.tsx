import { GTM_ID, GA_ID } from '@/lib/site';

/**
 * Google tag, placed at the top of <head> on every page as Google instructs.
 *
 * - GTM_ID (Google Tag Manager container, default GTM-T7R8N782): GA4 and any other
 *   tags are configured inside Tag Manager. Site events are pushed to the dataLayer
 *   (see lib/analytics.ts) for Tag Manager triggers.
 * - GA_ID is only used when no container is set (direct GA4 install), so pages are
 *   never double-tagged.
 */
export function GoogleTagHead() {
  if (GTM_ID) {
    return (
      <>
        <script async src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`,
          }}
        />
      </>
    );
  }
  if (GA_ID) {
    return (
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
          }}
        />
      </>
    );
  }
  return null;
}

/** Tag Manager fallback for visitors with JavaScript disabled — first thing in <body>. */
export function GoogleTagBody() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
