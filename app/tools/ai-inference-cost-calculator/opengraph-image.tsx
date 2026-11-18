import { ogCard, OG_SIZE } from '@/lib/og';

export const alt = 'AI Inference Cost Calculator — Aureus Global Systems';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return ogCard({ eyebrow: 'Free tool · AI inference cost calculator', title: 'API or self-hosted? Do the maths.', accent: '#3366ff' });
}
