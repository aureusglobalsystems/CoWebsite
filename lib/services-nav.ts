// Lightweight list of every service — used by the nav dropdown, footer,
// sitemap, home carousel and /services hub. Full page content for each
// service lives in lib/services.ts (and lib/inference-content.ts).

export type ServiceNavItem = {
  slug: string;
  href: string;
  title: string;
  short: string;
  accent: string;
  icon: string;
  /** option label in the contact form's service dropdown */
  contact: string;
  isNew?: boolean;
};

export const serviceNav: ServiceNavItem[] = [
  { slug: 'databricks-consulting', contact: 'Databricks AI & Lakehouse', href: '/services/databricks-consulting', title: 'Databricks AI & Lakehouse', short: 'Lakehouse builds, migrations & Mosaic AI', accent: '#ff3366', icon: '◈' },
  { slug: 'ai-ml-engineering', contact: 'AI & ML Engineering', href: '/services/ai-ml-engineering', title: 'AI & ML Engineering', short: 'RAG, LLM apps, MLOps on your data', accent: '#8b5cf6', icon: '◆' },
  { slug: 'ai-inference-engineering', contact: 'AI Inference Engineering', href: '/services/ai-inference-engineering', title: 'AI Inference Engineering', short: 'Self-host open LLMs, cut GPU costs', accent: '#3366ff', icon: '◇', isNew: true },
  { slug: 'snowflake-consulting', contact: 'Snowflake Consulting', href: '/services/snowflake-consulting', title: 'Snowflake Consulting', short: 'Architecture, dbt & cost optimization', accent: '#29B5E8', icon: '❄' },
  { slug: 'analytics-bi-consulting', contact: 'Analytics & BI', href: '/services/analytics-bi-consulting', title: 'Analytics & BI', short: 'Semantic layers, Power BI & Tableau', accent: '#e6b800', icon: '◉' },
  { slug: 'data-engineering-staff-augmentation', contact: 'Staff Augmentation', href: '/services/data-engineering-staff-augmentation', title: 'Staff Augmentation', short: 'Senior data & AI engineers on demand', accent: '#00d4aa', icon: '◎' },
];

export const serviceBySlug = (slug: string) => serviceNav.find((s) => s.slug === slug);
