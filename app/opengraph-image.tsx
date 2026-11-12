import { ogCard, OG_SIZE } from '@/lib/og';

export const alt = 'Aureus Global Systems — Data & AI Engineering Company';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return ogCard({ eyebrow: 'Data & AI Engineering Company', title: 'Data First. AI Ready. Delivered.' });
}
