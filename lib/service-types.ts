// Shape of a service landing page. Every field is rendered by
// components/service/ServicePage.tsx and used for metadata / JSON-LD.

export type SceneShape = 'lakehouse' | 'neural' | 'snowflake' | 'bars' | 'network';

export type ServiceContent = {
  /** must match an entry in lib/services-nav.ts */
  slug: string;
  /** 3D hero motif */
  shape: SceneShape;
  /** value pre-selected in the contact form (must exist in its service list) */
  contactOption: string;
  /** case-study `service` slug(s) to show as proof on this page */
  seo: {
    /** <title>, ~55-65 chars, primary search phrase first, without the brand suffix */
    title: string;
    /** meta description, 140-160 chars */
    description: string;
    keywords: string[];
  };
  /** 45–70 word answer-first definition an AI assistant can quote verbatim (AEO). */
  answer: string;
  hero: {
    /** H1 line 1 (solid) and line 2 (outline). Primary keyword must appear in the H1. */
    line1: string;
    line2: string;
    /** short punchy sub-line; `highlight` is rendered in the accent colour */
    tagline: string;
    highlight: string;
    /** 1–2 sentence intro paragraph naming concrete technologies */
    intro: string;
    cta: string;
  };
  problemsHeading: [string, string];
  problems: { title: string; body: string }[]; // exactly 4
  offeringsHeading: [string, string];
  offerings: { icon: string; title: string; body: string; points: string[] }[]; // exactly 6, 3 points each
  steps: { title: string; body: string }[]; // exactly 4
  tech: string[];
  faqs: { q: string; a: string }[]; // 5–6, answers 2–4 sentences, written to be quoted by search engines
  /** free offer that converts visitors — rendered as a highlighted block */
  leadMagnet: { title: string; body: string; cta: string };
};
