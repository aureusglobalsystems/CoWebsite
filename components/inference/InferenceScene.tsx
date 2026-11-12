'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ACCENT = new THREE.Color('#3366ff');
const INPUT_COLORS = ['#ff3366', '#ff6b35', '#ffd700', '#00d4aa', '#8b5cf6'].map(c => new THREE.Color(c));

type StreamData = {
  progress: Float32Array; speed: Float32Array; spreadY: Float32Array;
  spreadZ: Float32Array; lane: Float32Array; inColor: Float32Array;
};

function makeStreamData(count: number): StreamData {
  const progress = new Float32Array(count);
  const speed = new Float32Array(count);
  const spreadY = new Float32Array(count);
  const spreadZ = new Float32Array(count);
  const lane = new Float32Array(count);
  const inColor = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    progress[i] = Math.random();
    speed[i] = 0.035 + Math.random() * 0.05;
    spreadY[i] = (Math.random() - 0.5) * 6;
    spreadZ[i] = (Math.random() - 0.5) * 3;
    lane[i] = (Math.floor(Math.random() * 7) - 3) * 0.28;
    const c = INPUT_COLORS[i % INPUT_COLORS.length];
    inColor[i * 3] = c.r; inColor[i * 3 + 1] = c.g; inColor[i * 3 + 2] = c.b;
  }
  return { progress, speed, spreadY, spreadZ, lane, inColor };
}

/**
 * "Token stream" — scattered, multi-coloured requests flow in from the left,
 * converge through the inference core at the centre, and leave on the right
 * as tight, ordered lanes in the accent colour.
 */
function TokenStream({ count = 1800 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const scroll = useRef(0);

  useEffect(() => {
    const onScroll = () => { scroll.current = Math.min(window.scrollY / window.innerHeight, 1); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Per-particle state lives in a ref and is only touched inside useFrame,
  // so React never sees it change.
  const dataRef = useRef<StreamData | null>(null);
  const buffers = useMemo(() => ({ position: new Float32Array(count * 3), color: new Float32Array(count * 3) }), [count]);

  useFrame((_, delta) => {
    const points = pointsRef.current;
    if (!points) return;
    if (!dataRef.current || dataRef.current.progress.length !== count) dataRef.current = makeStreamData(count);
    const data = dataRef.current;
    const pos = points.geometry.attributes.position as THREE.BufferAttribute;
    const col = points.geometry.attributes.color as THREE.BufferAttribute;
    const dt = Math.min(delta, 0.05);
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      let t = data.progress[i] + data.speed[i] * dt;
      if (t > 1) t -= 1;
      data.progress[i] = t;

      const x = -6 + t * 12;
      // 1 at the edges, 0 at the core
      const funnel = Math.min(1, Math.abs(x) / 4.5);
      let y: number;
      let z: number;
      if (x < 0) {
        y = data.spreadY[i] * funnel * funnel;
        z = data.spreadZ[i] * funnel;
      } else {
        // leave as ordered lanes
        y = data.lane[i] * funnel;
        z = 0;
      }
      pos.setXYZ(i, x, y, z);

      // colour: input spectrum → accent after the core
      const mix = THREE.MathUtils.smoothstep(x, -0.6, 0.8);
      tmp.setRGB(data.inColor[i * 3], data.inColor[i * 3 + 1], data.inColor[i * 3 + 2]).lerp(ACCENT, mix);
      col.setXYZ(i, tmp.r, tmp.g, tmp.b);
    }
    pos.needsUpdate = true;
    col.needsUpdate = true;
    (points.material as THREE.PointsMaterial).opacity = Math.max(0, 0.9 - scroll.current * 1.5);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[buffers.position, 3]} />
        <bufferAttribute attach="attributes-color" args={[buffers.color, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.9} sizeAttenuation />
    </points>
  );
}

function Core() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outer.current) { outer.current.rotation.x = t * 0.25; outer.current.rotation.y = t * 0.35; }
    if (inner.current) { inner.current.rotation.x = -t * 0.5; inner.current.rotation.z = t * 0.4; }
    if (glow.current) {
      const s = 1 + Math.sin(t * 2.2) * 0.08;
      glow.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color="#3366ff" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#111111" wireframe transparent opacity={0.7} />
      </mesh>
      <mesh ref={glow}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color="#3366ff" transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  // On wide screens push the core into the empty space right of the headline;
  // on narrow screens keep it centred and smaller, behind the copy.
  const wide = viewport.width > 7;
  const offsetX = wide ? viewport.width * 0.24 : 0;
  const scale = wide ? 0.9 : 0.65;
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y += (state.pointer.x * 0.25 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-state.pointer.y * 0.15 - group.current.rotation.x) * 0.05;
  });
  return (
    <group position={[offsetX, wide ? 0 : 2.1, 0]} scale={scale}>
      <group ref={group}>{children}</group>
    </group>
  );
}

export default function InferenceScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 55 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
      <Rig>
        <TokenStream />
        <Core />
      </Rig>
    </Canvas>
  );
}
