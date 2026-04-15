'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';

const SPECTRUM = [
  new THREE.Color('#ff3366'),
  new THREE.Color('#ff6b35'),
  new THREE.Color('#ffd700'),
  new THREE.Color('#00d4aa'),
  new THREE.Color('#3366ff'),
];

function Particles({ count = 2500 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const { size, viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));
  const scrollProgress = useRef(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / size.width) * 2 - 1;
      mouse.current.y = -((e.clientY / size.height) * 2 - 1);
    };
    window.addEventListener('mousemove', move);
    const onScroll = () => {
      scrollProgress.current = Math.min(window.scrollY / window.innerHeight, 1);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('scroll', onScroll);
    };
  }, [size]);

  const [positions, colors, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 4;
      pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      orig[i * 3] = x; orig[i * 3 + 1] = y; orig[i * 3 + 2] = z;
      const c = SPECTRUM[Math.floor(Math.random() * SPECTRUM.length)];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return [pos, col, orig];
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  const material = useMemo(
    () => new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.85, sizeAttenuation: true }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position;
    const time = state.clock.elapsedTime;
    const repulseRadius = 1.5;
    for (let i = 0; i < count; i++) {
      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];
      const oz = originalPositions[i * 3 + 2];
      let x = ox + Math.sin(time * 0.3 + i * 0.01) * 0.05;
      let y = oy + Math.cos(time * 0.2 + i * 0.01) * 0.05;
      const mx = mouse.current.x * viewport.width * 0.5;
      const my = mouse.current.y * viewport.height * 0.5;
      const dx = x - mx;
      const dy = y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < repulseRadius && dist > 0) {
        const force = (repulseRadius - dist) / repulseRadius;
        x += (dx / dist) * force * 0.8;
        y += (dy / dist) * force * 0.8;
      }
      const sp = scrollProgress.current;
      if (sp > 0) {
        x += ox * sp * 0.25;
        y += oy * sp * 0.25;
      }
      pos.setXYZ(i, x, y, oz);
    }
    pos.needsUpdate = true;
    material.opacity = Math.max(0, 0.85 - scrollProgress.current * 1.5);
    meshRef.current.rotation.y = time * 0.03;
  });

  return <points ref={meshRef} geometry={geometry} material={material} />;
}

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({ delay: 2.6 });

    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll('.word');
      tl.fromTo(
        words,
        { rotateX: 90, opacity: 0, y: 20 },
        { rotateX: 0, opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        0
      );
    }
    tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.5)
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.7)
      .fromTo(scrollHintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.0);

    return () => { tl.kill(); };
  }, []);

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
      backgroundSize: '48px 48px',
      backgroundColor: '#fff',
    }}>
      {/* R3F Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: false, alpha: true }} style={{ background: 'transparent' }}>
          <Particles count={2500} />
        </Canvas>
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
        paddingTop: '80px',
      }}>
        <p className="label" style={{ color: '#888', marginBottom: '24px', display: 'block' }}>
          Enterprise Data Engineering · India — Global Delivery
        </p>

        <h1
          ref={headingRef}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(52px, 9vw, 128px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.93,
            marginBottom: '32px',
            perspective: '800px',
          }}
        >
          {['Your', 'Data.'].map((word, i) => (
            <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.25em', transformStyle: 'preserve-3d' }}>
              {word}
            </span>
          ))}
          <br />
          {['Your', 'Edge.'].map((word, i) => (
            <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.25em', transformStyle: 'preserve-3d' }}>
              {word}
            </span>
          ))}
          <br />
          <span className="word" style={{
            display: 'inline-block',
            transformStyle: 'preserve-3d',
            WebkitTextStroke: '2px #111',
            color: 'transparent',
          }}>
            Delivered.
          </span>
        </h1>

        <p ref={subRef} style={{
          fontFamily: 'Inter, sans-serif',
          color: '#888',
          fontSize: '1rem',
          maxWidth: '420px',
          lineHeight: 1.72,
          marginBottom: '40px',
          opacity: 0,
        }}>
          We architect, migrate, and scale enterprise data platforms —
          so your team spends time on insights, not infrastructure.
        </p>

        <div ref={ctaRef} className="hero-cta-row" style={{ display: 'flex', alignItems: 'center', gap: '24px', opacity: 0 }}>
          <MagneticButton
            href="/contact"
            style={{
              padding: '16px 32px',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, #ff3366, #ff6b35)',
              color: 'white',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Start Your Project
          </MagneticButton>
          <a
            href="/services"
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#888',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
            }}
          >
            Our Services
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div ref={scrollHintRef} style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        opacity: 0,
      }}>
        <div style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(180deg, transparent, #ff3366)',
          animation: 'pulse 2s infinite',
        }} />
        <span className="label" style={{ color: '#888', fontSize: '0.5rem' }}>Scroll</span>
      </div>
    </section>
  );
}
