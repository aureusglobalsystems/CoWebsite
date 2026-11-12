'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import AgsLogo from '@/components/brand/AgsLogo';

interface LoaderProps {
  onComplete: () => void;
}

/**
 * Intro loader built from the AGS logo: the letters rise in, the spectrum bar
 * under them fills as the progress bar, then the screen lifts away.
 */
export default function Loader({ onComplete }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = logoRef.current;
    const letters = root?.querySelector('path');
    const bar = root?.querySelector('.loader-bar');
    if (!root || !letters || !bar) return;

    // First visit in a session: full intro (~2.3s). Repeat visits: a short
    // version (~0.8s) so the brand still registers without slowing people down.
    let quick = false;
    try { quick = sessionStorage.getItem('agsIntroSeen') === '1'; } catch { /* storage blocked */ }
    const t = quick
      ? { letters: 0.3, barAt: 0.1, bar: 0.55, nameAt: 0.1, hold: 0.15, exit: 0.6 }
      : { letters: 0.7, barAt: 0.35, bar: 1.7, nameAt: 0.7, hold: 0.25, exit: 0.9 };

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, { yPercent: -100, duration: t.exit, ease: 'power4.inOut', onComplete });
      },
    });

    gsap.set(bar, { scaleX: 0 });
    tl.fromTo(letters, { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: t.letters, ease: 'power3.out' }, 0.05)
      .to(bar, { scaleX: 1, duration: t.bar, ease: 'power2.inOut' }, t.barAt)
      .to({}, {
        duration: t.bar,
        onUpdate() {
          if (countRef.current) countRef.current.textContent = String(Math.round(this.progress() * 100)).padStart(3, '0');
        },
      }, t.barAt)
      .fromTo(nameRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, t.nameAt)
      .to({}, { duration: t.hold });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={overlayRef} data-ags-loader="true" style={{
      position: 'fixed', inset: 0, zIndex: 100, background: '#ffffff',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '22px',
    }}>
      <div ref={logoRef} style={{ overflow: 'hidden', paddingBottom: '2px' }}>
        <AgsLogo height={78} barClassName="loader-bar" idSuffix="loader" />
      </div>
      <div ref={nameRef} style={{ display: 'flex', alignItems: 'center', gap: '14px', opacity: 0 }}>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#111' }}>
          Aureus Global Systems
        </span>
        <span style={{ width: '1px', height: '10px', background: '#ddd' }} />
        <span ref={countRef} style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.16em', color: '#999' }}>000</span>
      </div>
    </div>
  );
}
