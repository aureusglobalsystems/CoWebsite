import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePage from '@/components/service/ServicePage';
import { services, serviceContentBySlug } from '@/lib/services';
import { serviceBySlug } from '@/lib/services-nav';
import { caseStudiesForService } from '@/lib/case-studies';
import { posts } from '@/lib/posts';
import { SITE_URL, SITE_NAME, BOOKING_URL } from '@/lib/site';
import JsonLd from '@/components/seo/JsonLd';

// Only the slugs we generate are valid; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = serviceContentBySlug(slug);
  if (!svc) return {};
  const path = `/services/${slug}`;
  return {
    title: `${svc.seo.title} | Aureus`,
    description: svc.seo.description,
    keywords: svc.seo.keywords,
    alternates: { canonical: path },
    openGraph: { title: svc.seo.title, description: svc.seo.description, url: path, siteName: SITE_NAME, type: 'website' },
    twitter: { card: 'summary_large_image', title: svc.seo.title, description: svc.seo.description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = serviceContentBySlug(slug);
  const nav = serviceBySlug(slug);
  if (!svc || !nav) notFound();

  const url = `${SITE_URL}/services/${slug}`;
  const proof = caseStudiesForService(slug).map(({ slug, title, client, industry, outcomes, tagColor }) => ({ slug, title, client, industry, outcomes, tagColor }));
  const keyword = nav.title.split(' ')[0].toLowerCase();
  const insights = posts
    .filter((p) => p.service === slug || p.tags.some((t) => t.toLowerCase().includes(keyword)))
    .slice(0, 3)
    .map(({ slug, title, summary, readingMinutes }) => ({ slug, title, summary, readingMinutes }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: nav.title,
        serviceType: nav.title,
        url,
        description: svc.answer,
        areaServed: 'Worldwide',
        provider: { '@id': `${SITE_URL}/#organization` },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${nav.title} services`,
          itemListElement: svc.offerings.map((o) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o.title, description: o.body } })),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: svc.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
          { '@type': 'ListItem', position: 3, name: nav.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ServicePage service={svc} nav={nav} caseStudies={proof} insights={insights} bookingUrl={BOOKING_URL} />
    </>
  );
}
