import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { posts, postBySlug } from '@/lib/posts';
import type { PostBlock } from '@/lib/post-types';
import { serviceBySlug } from '@/lib/services-nav';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import JsonLd from '@/components/seo/JsonLd';

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Aureus`,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      title: post.title, description: post.description, url: `/insights/${slug}`, siteName: SITE_NAME,
      type: 'article', publishedTime: post.date, tags: post.tags,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  };
}

const fmt = (d: string) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

function Block({ b, accent }: { b: PostBlock; accent: string }) {
  switch (b.type) {
    case 'h2': return <h2 className="article-h2">{b.text}</h2>;
    case 'h3': return <h3 className="article-h3">{b.text}</h3>;
    case 'p': return <p className="article-p">{b.text}</p>;
    case 'ul': return <ul className="article-list">{b.items.map((i) => <li key={i}>{i}</li>)}</ul>;
    case 'ol': return <ol className="article-list">{b.items.map((i) => <li key={i}>{i}</li>)}</ol>;
    case 'callout': return <aside className="article-callout" style={{ borderColor: accent, background: accent + '0d' }}>{b.text}</aside>;
    case 'table': {
      const [head, ...rows] = b.rows;
      return (
        <div className="article-table-wrap">
          <table className="article-table">
            <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
    }
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();
  const svc = serviceBySlug(post.service);
  const accent = svc?.accent ?? '#ff3366';
  const url = `${SITE_URL}/insights/${slug}`;
  const more = posts.filter((p) => p.slug !== slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        url,
        mainEntityOfPage: url,
        keywords: post.tags.join(', '),
        author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Insights', item: `${SITE_URL}/insights` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <article style={{ width: '100%' }}>
      <JsonLd data={jsonLd} />
      <header style={{ width: '100%', padding: '140px 0 48px', borderBottom: '1px solid #f0f0f0' }}>
        <div className="page-container" style={{ maxWidth: '860px' }}>
          <nav aria-label="Breadcrumb" className="label" style={{ color: '#aaa', marginBottom: '28px' }}>
            <Link href="/insights" style={{ color: '#aaa', textDecoration: 'none' }}>Insights</Link>
            <span style={{ margin: '0 10px' }}>/</span>
            <span style={{ color: accent }}>{post.tags[0]}</span>
          </nav>
          <h1 style={{ fontSize: 'clamp(34px, 5vw, 60px)', lineHeight: 1.02, marginBottom: '24px' }}>{post.title}</h1>
          <p className="label" style={{ color: '#999' }}>
            <time dateTime={post.date}>{fmt(post.date)}</time> · {post.readingMinutes} min read · {SITE_NAME}
          </p>
        </div>
      </header>

      <div className="page-container" style={{ maxWidth: '860px', padding: '48px 24px 32px' }}>
        <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '24px', marginBottom: '40px' }}>
          <p className="label" style={{ color: accent, marginBottom: '10px' }}>Key takeaway</p>
          <p style={{ fontSize: '1.12rem', lineHeight: 1.65, color: '#222' }}>{post.summary}</p>
        </div>
        {post.body.map((b, i) => <Block key={i} b={b} accent={accent} />)}
      </div>

      {svc && (
        <section className="page-container" style={{ maxWidth: '860px', paddingBottom: '64px' }}>
          <div style={{ borderRadius: '20px', padding: '36px', background: '#111', color: 'white', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ maxWidth: '520px' }}>
              <p className="label" style={{ color: accent, marginBottom: '10px' }}>Need help with this?</p>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', letterSpacing: '-0.02em', lineHeight: 1.2, color: 'white' }}>
                Our {svc.title} team does this every week — as a project or as engineers on your team.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href={svc.href} style={{ padding: '14px 26px', borderRadius: '100px', background: accent, color: 'white', textDecoration: 'none' }} className="label">
                Explore {svc.title}
              </Link>
              <Link href="/contact" className="label" style={{ color: 'white', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Talk to us →</Link>
            </div>
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section style={{ width: '100%', padding: '64px 0 112px', borderTop: '1px solid #f0f0f0', background: '#fafafa' }}>
          <div className="page-container" style={{ maxWidth: '860px' }}>
            <p className="label" style={{ color: '#888', marginBottom: '24px' }}>Keep reading</p>
            <div className="rg-2" style={{ gap: '20px' }}>
              {more.map((p) => (
                <Link key={p.slug} href={`/insights/${p.slug}`} className="card-link" style={{ display: 'block', padding: '28px', border: '1px solid #eee', borderRadius: '16px', background: 'white', textDecoration: 'none' }}>
                  <h2 style={{ fontSize: '19px', letterSpacing: '-0.02em', lineHeight: 1.25, color: '#111', marginBottom: '10px' }}>{p.title}</h2>
                  <p style={{ fontSize: '0.85rem', color: '#777', lineHeight: 1.65 }}>{p.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
