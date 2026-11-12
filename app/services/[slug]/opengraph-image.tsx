import { ogCard, OG_SIZE } from '@/lib/og';
import { serviceBySlug } from '@/lib/services-nav';
import { serviceContentBySlug } from '@/lib/services';

export const alt = 'Aureus Global Systems service';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const nav = serviceBySlug(slug);
  const svc = serviceContentBySlug(slug);
  return ogCard({ eyebrow: nav?.title ?? 'Services', title: svc ? `${svc.hero.line1} ${svc.hero.line2}` : 'Data & AI Engineering', accent: nav?.accent });
}
