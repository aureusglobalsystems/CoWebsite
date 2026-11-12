import { ogCard, OG_SIZE } from '@/lib/og';
import { caseStudyBySlug } from '@/lib/case-studies';

export const alt = 'Aureus Global Systems case study';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = caseStudyBySlug(slug);
  return ogCard({ eyebrow: cs ? `Case Study · ${cs.tag}` : 'Case Study', title: cs?.title ?? 'Case Study', accent: cs?.tagColor });
}
