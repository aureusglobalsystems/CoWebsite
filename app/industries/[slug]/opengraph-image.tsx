import { ogCard, OG_SIZE } from '@/lib/og';
import { industryBySlug } from '@/lib/industries';

export const alt = 'Aureus Global Systems — industries';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = industryBySlug(slug);
  return ogCard({ eyebrow: 'Industries', title: ind ? `Data & AI for ${ind.name}.` : 'Industries', accent: ind?.accent });
}
