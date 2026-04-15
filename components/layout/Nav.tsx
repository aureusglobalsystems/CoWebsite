'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MagneticButton from '@/components/ui/MagneticButton';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);
  const strokeRef   = useRef<SVGTextElement>(null);
  const fillRef     = useRef<SVGTextElement>(null);
  const fillRectRef = useRef<SVGRectElement>(null);
  const tipRef      = useRef<SVGCircleElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (!mobileOpen) {
        setHidden(y > lastScroll.current && y > 120);
      }
      lastScroll.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useGSAP(() => {
    const stroke   = strokeRef.current;
    const fillRect = fillRectRef.current;
    const tip      = tipRef.current;
    if (!stroke || !fillRect || !tip) return;

    const FULL_W = 132; // advance width of "Aureus" at Dancing Script 700 30px
    const DASH   = 3000; // safely larger than any letter-outline perimeter

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(stroke,   { strokeDasharray: DASH, strokeDashoffset: DASH, strokeWidth: 1.2 });
      gsap.set(fillRect, { attr: { width: 0 } });
      gsap.set(tip,      { attr: { cx: 4 }, opacity: 1 });

      const tl = gsap.timeline();

      // All three layers start at t=0 and run in perfect sync
      tl.fromTo(stroke,
        { strokeDashoffset: DASH },
        { strokeDashoffset: 0, duration: 1.8, ease: 'power1.inOut' },
        0
      );
      tl.fromTo(tip,
        { attr: { cx: 4 } },
        { attr: { cx: 4 + FULL_W }, duration: 1.8, ease: 'power1.inOut' },
        0
      );
      tl.fromTo(fillRect,
        { attr: { width: 0 } },
        { attr: { width: FULL_W + 6 }, duration: 1.8, ease: 'power1.inOut' },
        0
      );

      // Completion: pen tip disappears, stroke fades out
      tl.to(tip,    { opacity: 0, duration: 0.2, ease: 'power2.out' });
      tl.to(stroke, { strokeWidth: 0, duration: 0.25, ease: 'power2.out' }, '<');
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '64px',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1), background 0.4s',
          background: scrolled || mobileOpen ? 'rgba(255,255,255,0.95)' : 'transparent',
          backdropFilter: scrolled || mobileOpen ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled || mobileOpen ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
        }}
      >
        {/* Rainbow hairline */}
        {scrolled && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, #ff3366, #ff6b35, #ffd700, #00d4aa, #3366ff)',
          }} />
        )}

        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '0 24px', height: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', zIndex: 60, position: 'relative', display: 'block' }}>
            <svg
              width="140" height="44" viewBox="0 0 140 44"
              style={{ overflow: 'visible', display: 'block' }}
              aria-label="Aureus"
            >
              <defs>
                <linearGradient id="navPenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff3366" />
                  <stop offset="100%" stopColor="#ff6b35" />
                </linearGradient>
                <linearGradient id="navFillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff3366" />
                  <stop offset="100%" stopColor="#ff6b35" />
                </linearGradient>
                <clipPath id="navFillClip">
                  <rect ref={fillRectRef} x="-2" y="0" width="0" height="44" />
                </clipPath>
              </defs>

              {/* Layer 1 — stroke trace (pen drawing the letters) */}
              <text
                ref={strokeRef}
                x="4" y="36"
                fontFamily="'Dancing Script', cursive"
                fontSize="30"
                fontWeight="700"
                fill="transparent"
                stroke="url(#navPenGrad)"
                strokeLinecap="round"
                strokeLinejoin="round"
              >Aureus</text>

              {/* Layer 2 — gradient fill revealed by sweeping clip rect */}
              <text
                ref={fillRef}
                x="4" y="36"
                fontFamily="'Dancing Script', cursive"
                fontSize="30"
                fontWeight="700"
                fill="url(#navFillGrad)"
                clipPath="url(#navFillClip)"
              >Aureus</text>

              {/* Pen tip dot — rides the leading edge */}
              <circle ref={tipRef} r="1.8" cx="4" cy="26" fill="#ff3366" opacity="0" />
            </svg>
          </Link>

          {/* Desktop nav links */}
          <div className="nav-desktop-links">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    position: 'relative',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: active ? '#ff3366' : '#111',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                  {active && (
                    <span style={{
                      position: 'absolute', bottom: '-4px', left: 0, right: 0,
                      height: '1px',
                      background: 'linear-gradient(90deg, #ff3366, #ff6b35)',
                    }} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <MagneticButton
            href="/contact"
            className="nav-desktop-cta"
            style={{
              padding: '10px 20px', borderRadius: '100px',
              background: 'linear-gradient(135deg, #ff3366, #ff6b35)',
              color: 'white', fontFamily: 'Space Mono, monospace',
              fontSize: '0.58rem', letterSpacing: '0.16em',
              textTransform: 'uppercase', textDecoration: 'none',
            }}
          >
            Get Started
          </MagneticButton>

          {/* Hamburger button */}
          <button
            className={`nav-hamburger${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile nav drawer */}
      <div className={`mobile-nav-drawer${mobileOpen ? ' open' : ''}`}>
        {/* Spectrum dots */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {['#ff3366', '#ff6b35', '#ffd700', '#00d4aa', '#3366ff'].map(c => (
            <div key={c} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />
          ))}
        </div>

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`mobile-nav-link${pathname === link.href ? ' active' : ''}`}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/contact"
          style={{
            marginTop: '16px',
            padding: '14px 32px', borderRadius: '100px',
            background: 'linear-gradient(135deg, #ff3366, #ff6b35)',
            color: 'white', fontFamily: 'Space Mono, monospace',
            fontSize: '0.6rem', letterSpacing: '0.16em',
            textTransform: 'uppercase', textDecoration: 'none',
          }}
        >
          Get Started
        </Link>
      </div>
    </>
  );
}
