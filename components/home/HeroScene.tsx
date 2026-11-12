'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

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

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: false, alpha: true }} dpr={[1, 1.5]} style={{ background: 'transparent' }}>
      <Particles count={2500} />
    </Canvas>
  );
}
