import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { AGS_PATH, AGS_X0, AGS_WIDTH, AGS_CAP, AGS_GAP, AGS_BAR, SPECTRUM } from '@/lib/brand';

// AGS logo as an inline SVG image (ImageResponse renders <img> data URIs reliably).
const stops = SPECTRUM.map((c, i) => `<stop offset="${i / (SPECTRUM.length - 1)}" stop-color="${c}"/>`).join('');
const VB_H = AGS_CAP + AGS_GAP + AGS_BAR + 51;
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${AGS_X0 - 20} -31 ${AGS_WIDTH + 40} ${VB_H}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0">${stops}</linearGradient></defs><path fill="#111111" d="${AGS_PATH}"/><rect x="${AGS_X0}" y="${AGS_CAP + AGS_GAP}" width="${AGS_WIDTH}" height="${AGS_BAR}" rx="${AGS_BAR / 2}" fill="url(#g)"/></svg>`;
const LOGO_SRC = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;
const LOGO_H = 64;
const LOGO_W = Math.round((LOGO_H * (AGS_WIDTH + 40)) / VB_H);

export const OG_SIZE = { width: 1200, height: 630 };

/** Shared 1200×630 share-card renderer for LinkedIn / X / Slack previews. */
export async function ogCard({ eyebrow, title, accent = '#ff3366' }: { eyebrow: string; title: string; accent?: string }) {
  const dir = join(process.cwd(), 'assets/fonts');
  const [syne, interMed, interSemi] = await Promise.all([
    readFile(join(dir, 'Syne-ExtraBold.ttf')), readFile(join(dir, 'Inter-Medium.ttf')), readFile(join(dir, 'Inter-SemiBold.ttf')),
  ]);
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', fontFamily: 'Inter', fontWeight: 500, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '72px', background: '#ffffff',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}>
        <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0, right: 0, height: '10px', background: 'linear-gradient(90deg, #ff3366, #ff6b35, #ffd700, #00d4aa, #3366ff)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', width: '18px', height: '18px', borderRadius: '50%', background: accent }} />
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 4, textTransform: 'uppercase', color: '#666' }}>{eyebrow}</div>
        </div>
        <div style={{ display: 'flex', fontFamily: 'Syne', fontSize: title.length > 60 ? 54 : 68, fontWeight: 800, lineHeight: 1.06, letterSpacing: -2.5, color: '#111', maxWidth: '1000px' }}>
          {title}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_SRC} width={LOGO_W} height={LOGO_H} alt="" />
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 22, fontWeight: 600, color: '#111', lineHeight: 1.2, borderLeft: '2px solid #ddd', paddingLeft: '20px' }}>
              <span>Aureus</span><span>Global Systems</span>
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#888' }}>Data & AI Engineering · Projects & Engineers</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [
      { name: 'Inter', data: interMed, weight: 500, style: 'normal' },
      { name: 'Inter', data: interSemi, weight: 600, style: 'normal' },
      { name: 'Syne', data: syne, weight: 800, style: 'normal' },
    ] },
  );
}
