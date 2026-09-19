import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

/**
 * 3D SKILLS CONSTELLATION
 * Central Core: PYTHON
 * Satellites: Python Automation, IBIS, Regex, Simulation Data, CustomTkinter, PySide6, GUI Dev, Web Designing
 */
export default function SkillsConstellation3D({ scrollProgress = 0 }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const ringRef = useRef();

  // Satellite node definitions with radius, angle, and height offset
  const satellites = useMemo(() => [
    { label: "PYTHON AUTOMATION", r: 3.2, speed: 0.25, phase: 0, color: "#00e5ff" },
    { label: "IBIS MODEL GEN", r: 3.8, speed: -0.22, phase: 0.8, color: "#38bdf8" },
    { label: "REGEX / PARSING", r: 2.8, speed: 0.3, phase: 1.6, color: "#1fe0d4" },
    { label: "SIMULATION DATA", r: 3.6, speed: -0.28, phase: 2.4, color: "#22d3ee" },
    { label: "CUSTOMTKINTER", r: 4.2, speed: 0.2, phase: 3.2, color: "#67e8f9" },
    { label: "PYSIDE6", r: 3.4, speed: -0.32, phase: 4.0, color: "#00e5ff" },
    { label: "GUI DEVELOPMENT", r: 4.0, speed: 0.24, phase: 4.8, color: "#38bdf8" },
    { label: "WEB DESIGNING", r: 4.5, speed: -0.18, phase: 5.6, color: "#1fe0d4" },
  ], []);

  const satRefs = useRef([]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.3;
      coreRef.current.rotation.x = Math.sin(time * 0.2) * 0.15;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.15;
    }

    // Orbit satellite nodes
    satellites.forEach((sat, i) => {
      const el = satRefs.current[i];
      if (el) {
        const theta = time * sat.speed + sat.phase;
        el.position.x = Math.cos(theta) * sat.r;
        el.position.z = Math.sin(theta) * sat.r;
        el.position.y = Math.sin(theta * 2) * 0.4;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 2.8, -72]}>
      {/* ─────────────────────────────────────────────────────────────
          CENTRAL PYTHON CORE
          ───────────────────────────────────────────────────────────── */}
      <group ref={coreRef}>
        {/* Core Glowing Sphere */}
        <mesh>
          <sphereGeometry args={[0.7, 24, 24]} />
          <meshBasicMaterial color="#00e5ff" wireframe />
        </mesh>
        <mesh scale={[0.85, 0.85, 0.85]}>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshBasicMaterial color="#06080c" transparent opacity={0.9} />
        </mesh>

        {/* Orbit Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[1.4, 1.42, 32]} />
          <meshBasicMaterial color="#00e5ff" opacity={0.4} transparent side={THREE.DoubleSide} />
        </mesh>

        <Text
          position={[0, 1.1, 0]}
          fontSize={0.24}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_ad06nG.woff"
        >
          PYTHON
        </Text>
        <Text
          position={[0, 0.85, 0]}
          fontSize={0.09}
          color="#00e5ff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_ad06nG.woff"
        >
          [ CORE AUTOMATION ENGINE ]
        </Text>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          ORBITING SATELLITE NODES
          ───────────────────────────────────────────────────────────── */}
      {satellites.map((sat, i) => (
        <group
          key={i}
          ref={(el) => (satRefs.current[i] = el)}
        >
          {/* Satellite Node Box */}
          <mesh>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshBasicMaterial color={sat.color} wireframe />
          </mesh>

          {/* Label */}
          <Text
            position={[0, 0.35, 0]}
            fontSize={0.11}
            color="#e2e8f0"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_ad06nG.woff"
          >
            {sat.label}
          </Text>

          {/* Radial Bus Line to Center */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([0, 0, 0, 0, 0, 0]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color={sat.color} opacity={0.2} transparent />
          </line>
        </group>
      ))}

      {/* Outer Constellation Orbit Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.6, 4.62, 64]} />
        <meshBasicMaterial color="#00e5ff" opacity={0.07} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
