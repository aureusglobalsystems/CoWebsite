import Link from 'next/link';

export type LegalSection = { h: string; p?: string[]; list?: string[] };

const body: React.CSSProperties = { fontFamily: 'Inter, sans-serif', color: '#444', fontSize: '0.95rem', lineHeight: 1.8 };

/** Plain, readable layout shared by the privacy policy and terms of use. */
export default function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <div style={{ width: '100%' }}>
      <section style={{ width: '100%', padding: '130px 0 112px' }}>
        <div className="page-container" style={{ maxWidth: '820px' }}>
          <nav aria-label="Breadcrumb" style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: '28px' }}>
            <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>Home</Link> / <span style={{ color: '#111' }}>{title}</span>
          </nav>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(34px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: 1, color: '#111', marginBottom: '16px' }}>{title}</h1>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: '32px' }}>Last updated {updated}</p>
          <p style={{ ...body, fontSize: '1.02rem', marginBottom: '40px' }}>{intro}</p>
          {sections.map((s, i) => (
            <section key={s.h} style={{ marginBottom: '36px' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.02em', color: '#111', marginBottom: '12px' }}>{i + 1}. {s.h}</h2>
              {s.list && (
                <ul style={{ ...body, paddingLeft: '22px', listStyle: 'disc', display: 'grid', gap: '6px', marginBottom: '12px' }}>
                  {s.list.map((t) => <li key={t}>{t}</li>)}
                </ul>
              )}
              {s.p?.map((t) => <p key={t} style={{ ...body, marginBottom: '12px' }}>{t}</p>)}
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
