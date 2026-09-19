import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

export default function ExperienceWorld3D({ scrollProgress = 0 }) {
  const pulseRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pulseRef.current) {
      pulseRef.current.material.opacity = 0.3 + Math.sin(time * 2) * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* ─────────────────────────────────────────────────────────────
          NODE 1: DUBAI // HASSANI GROUP (z = -50)
          ───────────────────────────────────────────────────────────── */}
      <group position={[-3.2, 2.0, -50]}>
        {/* Monolithic Structure */}
        <mesh>
          <boxGeometry args={[2.2, 3.4, 0.2]} />
          <meshBasicMaterial color="#06090e" transparent opacity={0.8} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2.2, 3.4, 0.2)]} />
          <lineBasicMaterial color="#64748b" opacity={0.4} />
        </lineSegments>

        <Text
          position={[0, 1.2, 0.12]}
          fontSize={0.11}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_ad06nG.woff"
        >
          2023 - 2025 // DUBAI
        </Text>
        <Text
          position={[0, 0.75, 0.12]}
          fontSize={0.13}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_ad06nG.woff"
        >
          TECH SUPPORT
        </Text>
        <Text
          position={[0, 0.45, 0.12]}
          fontSize={0.08}
          color="#64748b"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_ad06nG.woff"
        >
          ACCOUNTS OPERATIONS
        </Text>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          TRANSITION BRIDGE LINE: SUPPORT -> AUTOMATION
          ───────────────────────────────────────────────────────────── */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([
                -3.2, 2.0, -50,
                 0.0, 2.5, -55,
                 3.2, 2.0, -60
              ]),
              3
            ]}
          />
        </bufferGeometry>
        <lineBasicMaterial ref={pulseRef} color="#00e5ff" opacity={0.4} transparent />
      </line>

      {/* ─────────────────────────────────────────────────────────────
          NODE 2: BANGALORE // SOCSANG SEMICONDUCTORS (z = -60)
          ───────────────────────────────────────────────────────────── */}
      <group position={[3.2, 2.0, -60]}>
        {/* Monolithic Structure */}
        <mesh>
          <boxGeometry args={[2.4, 3.6, 0.2]} />
          <meshBasicMaterial color="#06090e" transparent opacity={0.85} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2.4, 3.6, 0.2)]} />
          <lineBasicMaterial color="#00e5ff" opacity={0.7} />
        </lineSegments>

        <Text
          position={[0, 1.3, 0.12]}
          fontSize={0.11}
          color="#00e5ff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_ad06nG.woff"
        >
          MAY 2026 - PRESENT // BLR
        </Text>
        <Text
          position={[0, 0.85, 0.12]}
          fontSize={0.13}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_ad06nG.woff"
        >
          AI AUTOMATION
        </Text>
        <Text
          position={[0, 0.55, 0.12]}
          fontSize={0.08}
          color="#00e5ff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_ad06nG.woff"
        >
          SOCSANG SEMICONDUCTORS
        </Text>
      </group>
    </group>
  );
}
