import { ogCard, OG_SIZE } from '@/lib/og';

export const alt = 'Careers — remote Databricks data engineer roles at Aureus Global Systems';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return ogCard({ eyebrow: 'Careers · Remote · Contract', title: 'Remote Databricks work. Azure, AWS, GCP.', accent: '#00d4aa' });
}
