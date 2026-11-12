// Shape of an industry landing page (/industries/[slug]).

export type IndustryContent = {
  slug: string;
  /** short name used in nav, footer, breadcrumbs */
  name: string;
  accent: string;
  icon: string;
  seo: {
    /** <title> without brand suffix, 55–65 chars, primary phrase first */
    title: string;
    /** meta description 140–160 chars */
    description: string;
    keywords: string[];
  };
  /** 45–70 word answer-first paragraph an AI assistant could quote; uses "Aureus Global Systems (AGS)" once */
  answer: string;
  hero: { line1: string; line2: string; intro: string };
  /** exactly 4 sector-specific data/AI challenges */
  challenges: { title: string; body: string }[];
  /** exactly 6 concrete data & AI use cases for this sector */
  useCases: { title: string; body: string; service: string }[];
  /** relevant regulations / standards the platform must respect (names only, e.g. 'RBI data localisation', 'HIPAA') */
  compliance: string[];
  /** case-study `industry` values (from lib/case-studies.ts) that belong to this sector */
  caseStudyIndustries: string[];
  faqs: { q: string; a: string }[]; // 5
};
