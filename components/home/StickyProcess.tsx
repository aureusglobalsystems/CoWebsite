'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const steps = [
  { number: '01', title: 'Discovery & Audit', description: 'We map your current data landscape — infrastructure, pipelines, quality issues, and quick wins. No assumptions, just facts.' },
  { number: '02', title: 'Architecture Design', description: 'A production-grade blueprint tailored to your scale, team, and growth trajectory. Medallion, Lakehouse, or hybrid — we design for longevity.' },
  { number: '03', title: 'Build & Migrate', description: 'Incremental delivery with zero disruption. Your old platform keeps running while the new one is built, tested, and validated.' },
  { number: '04', title: 'Handoff & Elevate', description: "Full documentation, team training, and ongoing support. We leave you stronger than we found you — that's the Aureus guarantee." },
];

const SPECTRUM = [new THREE.Color('#ff3366'), new THREE.Color('#ff6b35'), new THREE.Color('#ffd700'), new THREE.Color('#00d4aa'), new THREE.Color('#3366ff')];

function IcosahedronMorph({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const materialRef = useRef<THREE.MeshPhongMaterial>(null);

  useFrame((state) => {
    const p = progressRef.current;
    const time = state.clock.elapsedTime;
    if (!meshRef.current || !wireRef.current || !materialRef.current) return;
    meshRef.current.rotation.y = time * 0.4 + p * Math.PI;
    meshRef.current.rotation.x = time * 0.15;
    const mat = materialRef.current;
    if (p < 0.25) {
      mat.opacity = 0;
      wireRef.current.visible = true;
    } else if (p < 0.5) {
      mat.opacity = ((p - 0.25) / 0.25) * 0.7;
      wireRef.current.visible = true;
    } else if (p < 0.75) {
      mat.opacity = 0.7 + ((p - 0.5) / 0.25) * 0.3;
      wireRef.current.visible = (p - 0.5) / 0.25 < 0.5;
    } else {
      mat.opacity = 1;
      wireRef.current.visible = false;
      mat.emissiveIntensity = (0.85 + Math.sin(time * 3) * 0.15) * 0.3;
    }
    const colorIdx = Math.min(Math.floor(p * (SPECTRUM.length - 1)), SPECTRUM.length - 2);
    const t = (p * (SPECTRUM.length - 1)) % 1;
    mat.color.lerpColors(SPECTRUM[colorIdx], SPECTRUM[colorIdx + 1], t);
    mat.emissive.copy(mat.color);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, -3, 3]} color="#ff3366" intensity={0.5} />
      <pointLight position={[3, 3, -3]} color="#3366ff" intensity={0.5} />
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshPhongMaterial ref={materialRef} color="#ff3366" emissive="#ff3366" emissiveIntensity={0} transparent opacity={0} shininess={100} />
      </mesh>
      <lineSegments ref={wireRef}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(1.55, 1)]} />
        <lineBasicMaterial color="#ff3366" transparent opacity={0.5} />
      </lineSegments>
    </>
  );
}

export default function StickyProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const stepEls = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=300%',
      pin: stickyRef.current,
      pinSpacing: true,
      scrub: 1,
      onUpdate(self) {
        progressRef.current = self.progress;
        stepEls.current.forEach((step, i) => {
          if (!step) return;
          const active = self.progress >= i / 4 && self.progress < (i + 1) / 4;
          const passed = self.progress >= (i + 1) / 4;
          step.style.opacity = (active || passed) ? '1' : '0.25';
          step.style.transform = active ? 'translateX(8px)' : 'translateX(0)';
          const num = step.querySelector('.step-num') as HTMLElement;
          if (num) num.style.color = active ? '#ff3366' : passed ? '#888' : '#ccc';
        });
      },
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section ref={sectionRef} style={{ width: '100%', background: '#fafafa', height: '400vh' }}>
      <div ref={stickyRef} style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', width: '100%', alignItems: 'center' }} className="rg-2">
          {/* Steps */}
          <div>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '24px' }}>Our Process</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.04em', lineHeight: 1.0, color: '#111', marginBottom: '48px' }}>
              How We<br />
              <span style={{ WebkitTextStroke: '2px #111', color: 'transparent' }}>Deliver</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {steps.map((step, i) => (
                <div key={i} ref={(el) => { if (el) stepEls.current[i] = el; }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', opacity: 0.25, transition: 'all 0.4s ease', willChange: 'transform, opacity' }}
                >
                  <span className="step-num" style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', color: '#ccc', flexShrink: 0, paddingTop: '3px', transition: 'color 0.3s' }}>{step.number}</span>
                  <div>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px', letterSpacing: '-0.03em', marginBottom: '6px', color: '#111' }}>{step.title}</h3>
                    <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '0.85rem', lineHeight: 1.7 }}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Icosahedron */}
          <div className="process-canvas-col">
            <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
              <IcosahedronMorph progressRef={progressRef} />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}
