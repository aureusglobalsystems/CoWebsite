import { ogCard, OG_SIZE } from '@/lib/og';
import { postBySlug } from '@/lib/posts';
import { serviceBySlug } from '@/lib/services-nav';

export const alt = 'Aureus Global Systems Insights';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  return ogCard({ eyebrow: 'Insights', title: post?.title ?? 'Insights', accent: post ? serviceBySlug(post.service)?.accent : undefined });
}
