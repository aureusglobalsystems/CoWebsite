import { ogCard, OG_SIZE } from '@/lib/og';

export const alt = 'AI Inference Engineering — Aureus Global Systems';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return ogCard({ eyebrow: 'AI Inference Engineering', title: 'Self-host open LLMs. Cut GPU costs.', accent: '#3366ff' });
}
