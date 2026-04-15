'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const logos = [
  { name: 'Databricks', color: '#FF3621', svg: <svg viewBox="0 0 100 100" fill="none" width="36" height="36"><path d="M50 5L95 30V70L50 95L5 70V30L50 5Z" fill="#FF3621" opacity="0.15"/><path d="M50 25L75 40V60L50 75L25 60V40L50 25Z" fill="#FF3621"/><text x="50" y="55" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Syne,sans-serif">DB</text></svg> },
  { name: 'Snowflake', color: '#29B5E8', svg: <svg viewBox="0 0 100 100" fill="none" width="36" height="36"><circle cx="50" cy="50" r="45" fill="#29B5E8" opacity="0.12"/><line x1="50" y1="10" x2="50" y2="90" stroke="#29B5E8" strokeWidth="6" strokeLinecap="round"/><line x1="10" y1="50" x2="90" y2="50" stroke="#29B5E8" strokeWidth="6" strokeLinecap="round"/><line x1="22" y1="22" x2="78" y2="78" stroke="#29B5E8" strokeWidth="6" strokeLinecap="round"/><line x1="78" y1="22" x2="22" y2="78" stroke="#29B5E8" strokeWidth="6" strokeLinecap="round"/><circle cx="50" cy="50" r="6" fill="#29B5E8"/></svg> },
  { name: 'Apache Spark', color: '#E25A1C', svg: <svg viewBox="0 0 100 100" fill="none" width="36" height="36"><path d="M50 8C50 8 72 25 72 50C72 65 62 78 50 82C38 78 28 65 28 50C28 35 50 8 50 8Z" fill="#E25A1C" opacity="0.85"/><path d="M50 22C50 22 63 34 63 50C63 60 57 68 50 72C43 68 37 60 37 50C37 40 50 22 50 22Z" fill="#FFA500"/><circle cx="50" cy="52" r="8" fill="white" opacity="0.9"/></svg> },
  { name: 'AWS', color: '#FF9900', svg: <svg viewBox="0 0 100 100" fill="none" width="36" height="36"><rect width="100" height="100" rx="12" fill="#232F3E"/><text x="50" y="45" textAnchor="middle" fill="#FF9900" fontSize="16" fontWeight="bold" fontFamily="sans-serif">aws</text><path d="M25 60 Q50 70 75 60" stroke="#FF9900" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M70 56 L75 60 L70 64" stroke="#FF9900" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { name: 'Azure', color: '#0089D6', svg: <svg viewBox="0 0 100 100" fill="none" width="36" height="36"><path d="M15 80L42 20L60 55L45 58L65 80H15Z" fill="#0089D6"/><path d="M50 20L85 80H60L42 20H50Z" fill="#0089D6" opacity="0.6"/></svg> },
  { name: 'dbt', color: '#FF694A', svg: <svg viewBox="0 0 100 100" fill="none" width="36" height="36"><circle cx="50" cy="50" r="45" fill="#FF694A" opacity="0.1"/><circle cx="50" cy="50" r="35" fill="none" stroke="#FF694A" strokeWidth="3"/><circle cx="50" cy="50" r="8" fill="#FF694A"/><line x1="50" y1="15" x2="50" y2="42" stroke="#FF694A" strokeWidth="3"/><line x1="50" y1="58" x2="50" y2="85" stroke="#FF694A" strokeWidth="3"/><line x1="15" y1="50" x2="42" y2="50" stroke="#FF694A" strokeWidth="3"/><line x1="58" y1="50" x2="85" y2="50" stroke="#FF694A" strokeWidth="3"/></svg> },
  { name: 'Power BI', color: '#F2C811', svg: <svg viewBox="0 0 100 100" fill="none" width="36" height="36"><rect x="10" y="55" width="18" height="30" rx="3" fill="#F2C811" opacity="0.5"/><rect x="34" y="40" width="18" height="45" rx="3" fill="#F2C811" opacity="0.7"/><rect x="58" y="20" width="18" height="65" rx="3" fill="#F2C811"/></svg> },
  { name: 'Kafka', color: '#231F20', svg: <svg viewBox="0 0 100 100" fill="none" width="36" height="36"><circle cx="50" cy="50" r="45" fill="#231F20" opacity="0.08"/><circle cx="50" cy="20" r="10" fill="#231F20"/><circle cx="20" cy="70" r="10" fill="#231F20"/><circle cx="80" cy="70" r="10" fill="#231F20"/><line x1="50" y1="30" x2="28" y2="62" stroke="#231F20" strokeWidth="3"/><line x1="50" y1="30" x2="72" y2="62" stroke="#231F20" strokeWidth="3"/><line x1="30" y1="70" x2="70" y2="70" stroke="#231F20" strokeWidth="3"/></svg> },
  { name: 'BigQuery', color: '#4285F4', svg: <svg viewBox="0 0 100 100" fill="none" width="36" height="36"><circle cx="44" cy="44" r="30" fill="none" stroke="#4285F4" strokeWidth="8"/><line x1="65" y1="65" x2="88" y2="88" stroke="#4285F4" strokeWidth="8" strokeLinecap="round"/><circle cx="44" cy="44" r="12" fill="#4285F4" opacity="0.4"/></svg> },
  { name: 'Tableau', color: '#E97627', svg: <svg viewBox="0 0 100 100" fill="none" width="36" height="36"><line x1="50" y1="10" x2="50" y2="90" stroke="#E97627" strokeWidth="5" strokeLinecap="round"/><line x1="10" y1="50" x2="90" y2="50" stroke="#E97627" strokeWidth="5" strokeLinecap="round"/><line x1="20" y1="20" x2="80" y2="80" stroke="#4E79A7" strokeWidth="3" strokeLinecap="round" opacity="0.7"/><line x1="80" y1="20" x2="20" y2="80" stroke="#4E79A7" strokeWidth="3" strokeLinecap="round" opacity="0.7"/><circle cx="50" cy="50" r="6" fill="#E97627"/></svg> },
  { name: 'Airflow', color: '#017CEE', svg: <svg viewBox="0 0 100 100" fill="none" width="36" height="36"><path d="M50 15 A35 35 0 0 1 85 50 A35 35 0 0 1 50 85 A35 35 0 0 1 15 50 A35 35 0 0 1 50 15Z" fill="none" stroke="#017CEE" strokeWidth="3"/><path d="M30 50 L50 30 L70 50 L50 70Z" fill="#017CEE" opacity="0.6"/><circle cx="50" cy="50" r="6" fill="#017CEE"/></svg> },
  { name: 'Delta Lake', color: '#00ADD4', svg: <svg viewBox="0 0 100 100" fill="none" width="36" height="36"><path d="M50 10L90 80H10L50 10Z" fill="#00ADD4" opacity="0.3" stroke="#00ADD4" strokeWidth="3"/><path d="M50 30L75 75H25L50 30Z" fill="#00ADD4" opacity="0.6"/><path d="M50 50L62 72H38L50 50Z" fill="#00ADD4"/></svg> },
  { name: 'MLflow', color: '#0194E2', svg: <svg viewBox="0 0 100 100" fill="none" width="36" height="36"><path d="M15 70 L35 35 L50 55 L65 25 L85 65" stroke="#0194E2" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="15" cy="70" r="5" fill="#0194E2"/><circle cx="35" cy="35" r="5" fill="#0194E2"/><circle cx="50" cy="55" r="5" fill="#0194E2"/><circle cx="65" cy="25" r="5" fill="#0194E2"/><circle cx="85" cy="65" r="5" fill="#0194E2"/></svg> },
];

const allLogos = [...logos, ...logos];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const totalWidth = trackRef.current.scrollWidth / 2;
    tweenRef.current = gsap.to(trackRef.current, {
      x: -totalWidth, duration: 32, ease: 'none', repeat: -1,
    });
    const parent = trackRef.current.parentElement;
    if (parent) {
      parent.addEventListener('mouseenter', () => tweenRef.current?.timeScale(0.2));
      parent.addEventListener('mouseleave', () => tweenRef.current?.timeScale(1));
    }
    return () => { tweenRef.current?.kill(); };
  }, []);

  return (
    <section style={{ width: '100%', background: '#111', padding: '40px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Film grain */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", opacity: 0.12, pointerEvents: 'none', zIndex: 1, mixBlendMode: 'overlay' }} />

      {/* Fade masks */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '96px', background: 'linear-gradient(90deg, #111 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '96px', background: 'linear-gradient(270deg, #111 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />

      <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#444', textAlign: 'center', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
        Trusted Technology Partners
      </p>

      <div style={{ overflow: 'hidden', position: 'relative', zIndex: 2 }}>
        <div ref={trackRef} style={{ display: 'flex', alignItems: 'center', gap: '48px', width: 'max-content', willChange: 'transform' }}>
          {allLogos.map((tech, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.55, transition: 'opacity 0.3s', cursor: 'default', flexShrink: 0 }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0.55'}
            >
              {tech.svg}
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.45rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666' }}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
