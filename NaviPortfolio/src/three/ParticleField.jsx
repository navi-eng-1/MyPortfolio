import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 4-TIER PARALLAX PARTICLE FIELD
 * Layer 1 (Foreground): z ≈ +5 to +18 (Camera lens close pass, faster drift)
 * Layer 2 (Main Environment): z ≈ -5 to -15 (Subtle technical dust)
 * Layer 3 (Midground): z ≈ -20 to -45 (Simulation particles)
 * Layer 4 (Deep Background): z ≈ -50 to -110 (Deep spatial field)
 */
export default function ParticleField({ scrollProgress = 0 }) {
  const fgRef = useRef();
  const mainRef = useRef();
  const midRef = useRef();
  const bgRef = useRef();

  // 1. Foreground Layer (few, larger, close to lens)
  const fgData = useMemo(() => {
    const count = 90;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12 + 2;
      pos[i * 3 + 2] = Math.random() * 25 + 2; // In front of / around camera start
    }
    return { pos, count };
  }, []);

  // 2. Main Environment Layer (z ≈ -5 to -20)
  const mainData = useMemo(() => {
    const count = 350;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 32;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20 + 2;
      pos[i * 3 + 2] = Math.random() * -25 - 2;
    }
    return { pos, count };
  }, []);

  // 3. Midground Layer (z ≈ -20 to -50)
  const midData = useMemo(() => {
    const count = 450;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 44;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24 + 1;
      pos[i * 3 + 2] = Math.random() * -35 - 20;
    }
    return { pos, count };
  }, []);

  // 4. Deep Background Layer (z ≈ -50 to -110)
  const bgData = useMemo(() => {
    const count = 600;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 32;
      pos[i * 3 + 2] = Math.random() * -60 - 50;
    }
    return { pos, count };
  }, []);

  // Multi-speed parallax drift
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (fgRef.current) {
      fgRef.current.position.y = Math.sin(t * 0.4) * 0.15;
      fgRef.current.position.x = Math.cos(t * 0.3) * 0.1;
    }
    if (mainRef.current) {
      mainRef.current.position.y = Math.sin(t * 0.25) * 0.08;
    }
    if (midRef.current) {
      midRef.current.position.y = Math.cos(t * 0.18) * 0.05;
    }
    if (bgRef.current) {
      bgRef.current.position.y = Math.sin(t * 0.1) * 0.02;
    }
  });

  return (
    <group>
      {/* 1. Foreground Particles */}
      <points ref={fgRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[fgData.pos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#00e5ff"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* 2. Main Environment Particles */}
      <points ref={mainRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[mainData.pos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color="#c8f0f8"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* 3. Midground Particles */}
      <points ref={midRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[midData.pos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#67e8f9"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* 4. Deep Background Particles */}
      <points ref={bgRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[bgData.pos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#38bdf8"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
