// Shape of an Insights article. Rendered by app/insights/[slug]/page.tsx.

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; text: string }
  /** simple comparison table; first row is the header */
  | { type: 'table'; rows: string[][] };

export type Post = {
  slug: string;
  title: string;
  /** meta description, 140-160 chars */
  description: string;
  /** ISO date, e.g. 2026-11-12 */
  date: string;
  readingMinutes: number;
  /** slug from lib/services-nav.ts this article supports (linked at the end) */
  service: string;
  tags: string[];
  /** 2–3 sentence summary shown at the top and on the listing page */
  summary: string;
  body: PostBlock[];
};
