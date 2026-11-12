import HomeClient from '@/components/home/HomeClient';
import JsonLd from '@/components/seo/JsonLd';
import { homeFaqs } from '@/lib/home-content';
import { posts } from '@/lib/posts';

export default function Home() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const insights = posts.slice(0, 3).map(({ slug, title, summary, readingMinutes }) => ({ slug, title, summary, readingMinutes }));

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <HomeClient insights={insights} />
    </>
  );
}
