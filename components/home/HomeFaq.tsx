'use client';

import { useState } from 'react';
import Link from 'next/link';
import { homeFaqs } from '@/lib/home-content';

export type HomeInsight = { slug: string; title: string; summary: string; readingMinutes: number };

/** Latest articles + home FAQ — the content answer engines quote. */
export default function HomeFaq({ insights }: { insights: HomeInsight[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      {insights.length > 0 && (
        <section style={{ width: '100%', padding: '96px 0', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
          <div className="page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <div>
                <p className="label" style={{ color: '#888', marginBottom: '12px' }}>Insights</p>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>Field notes<br /><span className="outline-text">from the build.</span></h2>
              </div>
              <Link href="/insights" className="label" style={{ color: '#111', textDecoration: 'underline', textUnderlineOffset: '4px' }}>All insights →</Link>
            </div>
            <div className="rg-3" style={{ gap: '24px' }}>
              {insights.map((p) => (
                <Link key={p.slug} href={`/insights/${p.slug}`} className="card-link" style={{
                  display: 'flex', flexDirection: 'column', background: 'white', border: '1px solid #eee', borderRadius: '16px', padding: '28px', textDecoration: 'none',
                }}>
                  <span className="label" style={{ color: '#aaa', marginBottom: '14px' }}>{p.readingMinutes} min read</span>
                  <h3 style={{ fontSize: '19px', letterSpacing: '-0.02em', lineHeight: 1.25, color: '#111', marginBottom: '12px' }}>{p.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#777', lineHeight: 1.65, flex: 1 }}>{p.summary}</p>
                  <span className="label" style={{ color: '#ff3366', marginTop: '18px' }}>Read →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ width: '100%', padding: '96px 0', borderTop: '1px solid #f0f0f0' }}>
        <div className="page-container" style={{ maxWidth: '920px' }}>
          <p className="label" style={{ color: '#888', marginBottom: '12px' }}>FAQ</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', marginBottom: '40px' }}>Good questions.<br /><span className="outline-text">Straight answers.</span></h2>
          {homeFaqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} style={{ borderBottom: '1px solid #eee' }}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px',
                  padding: '24px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                }}>
                  <h3 style={{ fontWeight: 700, fontSize: 'clamp(16px, 2vw, 20px)', letterSpacing: '-0.02em', color: isOpen ? '#ff3366' : '#111', transition: 'color 0.2s', lineHeight: 1.3 }}>{f.q}</h3>
                  <span style={{ fontSize: '20px', color: '#ff3366', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }}>+</span>
                </button>
                <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s ease' }}>
                  <div style={{ overflow: 'hidden' }}>
                    <p style={{ color: '#666', lineHeight: 1.75, paddingBottom: '24px', maxWidth: '760px' }}>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
