'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { SceneShape } from '@/lib/service-types';

/** Ambient particle field tinted with the service accent. */
function Field({ accent, count = 900 }: { accent: string; count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const buffers = useMemo(() => makeField(count, accent), [count, accent]);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[buffers.position, 3]} />
        <bufferAttribute attach="attributes-color" args={[buffers.color, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

function makeField(count: number, accent: string) {
  const position = new Float32Array(count * 3);
  const color = new Float32Array(count * 3);
  const a = new THREE.Color(accent);
  const grey = new THREE.Color('#bbbbbb');
  for (let i = 0; i < count; i++) {
    position[i * 3] = (Math.random() - 0.5) * 12;
    position[i * 3 + 1] = (Math.random() - 0.5) * 7;
    position[i * 3 + 2] = (Math.random() - 0.5) * 4;
    const c = Math.random() < 0.6 ? a : grey;
    color[i * 3] = c.r; color[i * 3 + 1] = c.g; color[i * 3 + 2] = c.b;
  }
  return { position, color };
}

/** Three stacked slabs — bronze / silver / gold layers of a lakehouse. */
function Lakehouse({ accent }: { accent: string }) {
  const g = useRef<THREE.Group>(null);
  const layers = useRef<THREE.Mesh[]>([]);
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (g.current) g.current.rotation.y = t * 0.3;
    layers.current.forEach((m, i) => { if (m) m.position.y = (i - 1) * 0.75 + Math.sin(t * 1.2 + i) * 0.08; });
  });
  return (
    <group ref={g} rotation={[0.45, 0, 0]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(m) => { if (m) layers.current[i] = m; }}>
          <boxGeometry args={[2.2 - i * 0.35, 0.28, 2.2 - i * 0.35]} />
          <meshBasicMaterial color={i === 2 ? accent : '#111111'} wireframe transparent opacity={i === 2 ? 0.8 : 0.35} />
        </mesh>
      ))}
    </group>
  );
}

/** Small neural net: layered nodes joined by edges. */
function Neural({ accent }: { accent: string }) {
  const g = useRef<THREE.Group>(null);
  const { nodes, lines } = useMemo(() => {
    const layers = [4, 6, 6, 3];
    const pts: THREE.Vector3[][] = layers.map((n, li) =>
      Array.from({ length: n }, (_, k) => new THREE.Vector3((li - 1.5) * 1.1, (k - (n - 1) / 2) * 0.5, 0)));
    const seg: number[] = [];
    for (let li = 0; li < pts.length - 1; li++)
      for (const a of pts[li]) for (const b of pts[li + 1]) seg.push(a.x, a.y, a.z, b.x, b.y, b.z);
    return { nodes: pts.flat(), lines: new Float32Array(seg) };
  }, []);
  useFrame((s) => { if (g.current) g.current.rotation.y = Math.sin(s.clock.getElapsedTime() * 0.4) * 0.6; });
  return (
    <group ref={g}>
      <lineSegments>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[lines, 3]} /></bufferGeometry>
        <lineBasicMaterial color={accent} transparent opacity={0.25} />
      </lineSegments>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#111111' : accent} />
        </mesh>
      ))}
    </group>
  );
}

/** Six-armed crystal. */
function Snowflake({ accent }: { accent: string }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => { if (g.current) { g.current.rotation.z = s.clock.getElapsedTime() * 0.2; g.current.rotation.y = Math.sin(s.clock.getElapsedTime() * 0.5) * 0.5; } });
  return (
    <group ref={g}>
      {Array.from({ length: 6 }, (_, i) => (
        <group key={i} rotation={[0, 0, (i * Math.PI) / 3]}>
          <mesh position={[0, 0.85, 0]}>
            <boxGeometry args={[0.06, 1.7, 0.06]} />
            <meshBasicMaterial color={accent} />
          </mesh>
          {[0.7, 1.2].map((y) => (
            <group key={y} position={[0, y, 0]}>
              <mesh rotation={[0, 0, Math.PI / 4]} position={[0.18, 0.18, 0]}>
                <boxGeometry args={[0.04, 0.5, 0.04]} />
                <meshBasicMaterial color="#111111" transparent opacity={0.6} />
              </mesh>
              <mesh rotation={[0, 0, -Math.PI / 4]} position={[-0.18, 0.18, 0]}>
                <boxGeometry args={[0.04, 0.5, 0.04]} />
                <meshBasicMaterial color="#111111" transparent opacity={0.6} />
              </mesh>
            </group>
          ))}
        </group>
      ))}
      <mesh><icosahedronGeometry args={[0.32, 0]} /><meshBasicMaterial color={accent} wireframe /></mesh>
    </group>
  );
}

/** Animated 3D bar chart. */
function Bars({ accent }: { accent: string }) {
  const g = useRef<THREE.Group>(null);
  const bars = useRef<THREE.Mesh[]>([]);
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (g.current) g.current.rotation.y = t * 0.25;
    bars.current.forEach((m, i) => {
      if (!m) return;
      const h = 0.6 + (Math.sin(t * 1.1 + i * 0.9) + 1) * 0.7;
      m.scale.y = h; m.position.y = h / 2 - 0.9;
    });
  });
  return (
    <group ref={g} rotation={[0.35, 0, 0]}>
      {Array.from({ length: 9 }, (_, i) => (
        <mesh key={i} ref={(m) => { if (m) bars.current[i] = m; }} position={[((i % 3) - 1) * 0.7, 0, (Math.floor(i / 3) - 1) * 0.7]}>
          <boxGeometry args={[0.4, 1, 0.4]} />
          <meshBasicMaterial color={i === 4 ? accent : '#111111'} wireframe={i !== 4} transparent opacity={i === 4 ? 0.85 : 0.4} />
        </mesh>
      ))}
    </group>
  );
}

/** Team network: nodes on a sphere linked to a hub. */
function Network({ accent }: { accent: string }) {
  const g = useRef<THREE.Group>(null);
  const { nodes, lines } = useMemo(() => {
    const n = 14;
    const pts = Array.from({ length: n }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return new THREE.Vector3(Math.cos(theta) * Math.sin(phi), Math.sin(theta) * Math.sin(phi), Math.cos(phi)).multiplyScalar(1.4);
    });
    const seg: number[] = [];
    pts.forEach((p, i) => {
      seg.push(0, 0, 0, p.x, p.y, p.z);
      const q = pts[(i + 3) % n];
      seg.push(p.x, p.y, p.z, q.x, q.y, q.z);
    });
    return { nodes: pts, lines: new Float32Array(seg) };
  }, []);
  useFrame((s) => { if (g.current) { g.current.rotation.y = s.clock.getElapsedTime() * 0.3; g.current.rotation.x = 0.3; } });
  return (
    <group ref={g}>
      <lineSegments>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[lines, 3]} /></bufferGeometry>
        <lineBasicMaterial color={accent} transparent opacity={0.35} />
      </lineSegments>
      <mesh><sphereGeometry args={[0.2, 20, 20]} /><meshBasicMaterial color={accent} /></mesh>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}><sphereGeometry args={[0.09, 12, 12]} /><meshBasicMaterial color="#111111" /></mesh>
      ))}
    </group>
  );
}

function Placement({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const wide = viewport.width > 7;
  useFrame((s) => {
    if (!g.current) return;
    g.current.rotation.y += (s.pointer.x * 0.3 - g.current.rotation.y) * 0.05;
    g.current.rotation.x += (-s.pointer.y * 0.2 - g.current.rotation.x) * 0.05;
  });
  return (
    <group position={[wide ? viewport.width * 0.26 : 0, wide ? 0 : 2.1, 0]} scale={wide ? 1 : 0.7}>
      <group ref={g}>{children}</group>
    </group>
  );
}

const SHAPES: Record<SceneShape, (p: { accent: string }) => React.JSX.Element> = {
  lakehouse: Lakehouse, neural: Neural, snowflake: Snowflake, bars: Bars, network: Network,
};

export default function ServiceScene({ shape, accent }: { shape: SceneShape; accent: string }) {
  const Shape = SHAPES[shape];
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 55 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.75]} style={{ background: 'transparent' }}>
      <Field accent={accent} />
      <Placement><Shape accent={accent} /></Placement>
    </Canvas>
  );
}
