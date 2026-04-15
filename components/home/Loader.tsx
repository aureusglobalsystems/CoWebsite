'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<SVGCircleElement>(null);
  const ring2Ref = useRef<SVGCircleElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete,
        });
      },
    });

    tl.to(ring1Ref.current, { rotation: 360, duration: 1.5, ease: 'none', repeat: 1, transformOrigin: '64px 64px' }, 0)
      .to(ring2Ref.current, { rotation: -360, duration: 1.5, ease: 'none', repeat: 1, transformOrigin: '64px 64px' }, 0)
      .to(progressBarRef.current, { width: '100%', duration: 2.2, ease: 'power2.inOut' }, 0.2)
      .to({}, {
        duration: 2.2,
        onUpdate() {
          if (countRef.current) countRef.current.textContent = Math.round(this.progress() * 100) + '%';
        },
      }, 0.2)
      .fromTo(wordmarkRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.4)
      .to([ring1Ref.current, ring2Ref.current], { scale: 0, opacity: 0, duration: 0.4, ease: 'power3.in', transformOrigin: 'center' });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={overlayRef} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'white',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Rings */}
      <div style={{ position: 'relative', width: '128px', height: '128px', marginBottom: '32px' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 128 128">
          <defs>
            <linearGradient id="rg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff3366" />
              <stop offset="50%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#3366ff" />
            </linearGradient>
            <linearGradient id="rg2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00d4aa" />
              <stop offset="50%" stopColor="#ff6b35" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <circle ref={ring1Ref} cx="64" cy="64" r="52" fill="none" stroke="url(#rg1)" strokeWidth="2" strokeDasharray="40 20" />
          <circle ref={ring2Ref} cx="64" cy="64" r="40" fill="none" stroke="url(#rg2)" strokeWidth="1.5" strokeDasharray="20 30" />
        </svg>
        <div ref={wordmarkRef} style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0,
        }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '24px', color: '#111', letterSpacing: '-0.04em' }}>AGS</span>
        </div>
      </div>

      {/* Progress */}
      <div style={{ width: '192px', height: '1px', background: '#f0f0f0', position: 'relative', overflow: 'hidden' }}>
        <div ref={progressBarRef} style={{
          position: 'absolute', left: 0, top: 0, height: '100%', width: 0,
          background: 'linear-gradient(90deg, #ff3366, #ff6b35, #ffd700, #00d4aa, #3366ff)',
        }} />
      </div>

      <div style={{ marginTop: '12px', fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.16em', color: '#888' }}>
        <span ref={countRef}>0%</span>
      </div>
    </div>
  );
}
