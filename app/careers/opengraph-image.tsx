import { ogCard, OG_SIZE } from '@/lib/og';

export const alt = 'Careers — remote data and AI contract roles at Aureus Global Systems';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return ogCard({ eyebrow: 'Careers · Remote · Contract', title: 'Remote data & AI work. Databricks first.', accent: '#00d4aa' });
}
