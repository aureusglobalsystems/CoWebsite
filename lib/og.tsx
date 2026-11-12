import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

/** Shared 1200×630 share-card renderer for LinkedIn / X / Slack previews. */
export function ogCard({ eyebrow, title, accent = '#ff3366' }: { eyebrow: string; title: string; accent?: string }) {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '72px', background: '#ffffff',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}>
        <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0, right: 0, height: '10px', background: 'linear-gradient(90deg, #ff3366, #ff6b35, #ffd700, #00d4aa, #3366ff)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', width: '18px', height: '18px', borderRadius: '50%', background: accent }} />
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 4, textTransform: 'uppercase', color: '#666' }}>{eyebrow}</div>
        </div>
        <div style={{ display: 'flex', fontSize: title.length > 60 ? 64 : 78, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2, color: '#111', maxWidth: '1000px' }}>
          {title}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, color: '#ff3366' }}>Aureus Global Systems</div>
          <div style={{ display: 'flex', fontSize: 24, color: '#888' }}>Data & AI Engineering · Projects & Engineers</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
