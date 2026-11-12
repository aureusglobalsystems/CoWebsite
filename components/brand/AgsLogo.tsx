import { AGS_PATH, AGS_X0, AGS_WIDTH, AGS_CAP, AGS_GAP, AGS_BAR, SPECTRUM } from '@/lib/brand';

type Props = {
  /** height of the AGS letters + bar, in px */
  height?: number;
  tone?: 'ink' | 'white';
  /** show "Aureus Global Systems" beside the mark */
  withName?: boolean;
  /** extra class on the spectrum bar (used for entrance animations) */
  barClassName?: string;
  className?: string;
  idSuffix?: string;
};

const PAD = 20;
const VB_W = AGS_WIDTH + PAD * 2;
const VB_H = AGS_CAP + AGS_GAP + AGS_BAR + PAD * 2 + 11;

/** AGS monogram with the spectrum bar — the primary Aureus Global Systems logo. */
export default function AgsLogo({ height = 32, tone = 'ink', withName = false, barClassName, className, idSuffix = 'a' }: Props) {
  const ink = tone === 'ink' ? '#111111' : '#ffffff';
  const gid = `ags-spectrum-${idSuffix}`;
  const width = (height * VB_W) / VB_H;
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: height * 0.42 }}>
      <svg width={width} height={height} viewBox={`${AGS_X0 - PAD} ${-PAD - 11} ${VB_W} ${VB_H}`} role="img" aria-label="AGS — Aureus Global Systems" style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
            {SPECTRUM.map((c, i) => <stop key={c} offset={i / (SPECTRUM.length - 1)} stopColor={c} />)}
          </linearGradient>
        </defs>
        <path fill={ink} d={AGS_PATH} />
        <rect className={barClassName} x={AGS_X0} y={AGS_CAP + AGS_GAP} width={AGS_WIDTH} height={AGS_BAR} rx={AGS_BAR / 2} fill={`url(#${gid})`} style={{ transformBox: 'fill-box', transformOrigin: 'left center' }} />
      </svg>
      {withName && (
        <span style={{
          borderLeft: `1px solid ${tone === 'ink' ? '#d9d9d9' : '#3a3a3a'}`, paddingLeft: height * 0.42,
          fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: Math.max(10, height * 0.34), lineHeight: 1.2,
          color: ink, letterSpacing: '-0.01em', whiteSpace: 'nowrap',
        }}>
          Aureus<br />Global Systems
        </span>
      )}
    </span>
  );
}
