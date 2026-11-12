import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import IndustryPage from '@/components/industry/IndustryPage';
import JsonLd from '@/components/seo/JsonLd';
import { industries, industryBySlug } from '@/lib/industries';
import { serviceNav } from '@/lib/services-nav';
import { caseStudies } from '@/lib/case-studies';
import type { SceneShape } from '@/lib/service-types';
import { SITE_URL, SITE_NAME, BOOKING_URL } from '@/lib/site';

export const dynamicParams = false;

const SHAPES: Record<string, SceneShape> = {
  'banking-financial-services': 'network',
  'retail-ecommerce': 'bars',
  'healthcare-life-sciences': 'neural',
  manufacturing: 'lakehouse',
};

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = industryBySlug(slug);
  if (!ind) return {};
  const path = `/industries/${slug}`;
  return {
    title: `${ind.seo.title} | Aureus`,
    description: ind.seo.description,
    keywords: ind.seo.keywords,
    alternates: { canonical: path },
    openGraph: { title: ind.seo.title, description: ind.seo.description, url: path, siteName: SITE_NAME, type: 'website' },
    twitter: { card: 'summary_large_image', title: ind.seo.title, description: ind.seo.description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = industryBySlug(slug);
  if (!ind) notFound();
  const url = `${SITE_URL}/industries/${slug}`;
  const proof = caseStudies
    .filter((c) => ind.caseStudyIndustries.includes(c.industry))
    .map(({ slug, title, client, industry, outcomes, tagColor }) => ({ slug, title, client, industry, outcomes, tagColor }));
  const services = serviceNav.map(({ slug, href, title, accent, icon }) => ({ slug, href, title, accent, icon }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        url,
        name: ind.seo.title,
        description: ind.answer,
        about: { '@type': 'Thing', name: ind.name },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'FAQPage',
        mainEntity: ind.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE_URL}/industries` },
          { '@type': 'ListItem', position: 3, name: ind.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <IndustryPage industry={ind} shape={SHAPES[slug] ?? 'network'} services={services} caseStudies={proof} bookingUrl={BOOKING_URL} />
    </>
  );
}
