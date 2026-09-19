import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

/**
 * 3D SPATIAL IBIS AUTOMATION WORKFLOW
 * Stations:
 * 1. Input Files Discovery (z = -10): [.list, .txt, .csv, .net, .spec, .log]
 * 2. Regex Parser (z = -14)
 * 3. Simulation Data Extraction (z = -18)
 * 4. Characterization Curves (z = -22): Pull-up, Pull-down, Power-clamp, Ground-clamp
 * 5. Electrical Calculations (z = -26): Residual correction & Ramp data
 * 6. PVT Corners (z = -30): Typ / Min / Max
 * 7. Validation Engine (z = -34): Missing / Invalid / Inconsistent checks
 * 8. IBIS Model Generation (z = -38): .ibs model output
 * 9. Python Automation GUI (z = -42): Abstract GUI station
 */
export default function IBISPipeline3D({ scrollProgress = 0 }) {
  const streamRef = useRef();
  const ringRefs = useRef([]);

  // Data packet flow along the longitudinal corridor
  const packetCount = 48;
  const packetData = useMemo(() => {
    const pos = new Float32Array(packetCount * 3);
    const speeds = new Float32Array(packetCount);
    for (let i = 0; i < packetCount; i++) {
      pos[i * 3] = (Math.sin(i * 1.5) * 1.8);
      pos[i * 3 + 1] = 1.8 + Math.cos(i * 1.5) * 0.8;
      pos[i * 3 + 2] = -8 - (i * 0.75); // Staggered along -8 to -44
      speeds[i] = 0.25 + Math.random() * 0.3;
    }
    return { pos, speeds };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Animate data stream packets traveling forward through the pipeline
    if (streamRef.current) {
      const positions = streamRef.current.geometry.attributes.position.array;
      for (let i = 0; i < packetCount; i++) {
        const idx = i * 3;
        positions[idx + 2] -= delta * 14 * packetData.speeds[i];
        // Loop packets once they pass z = -44 back to z = -8
        if (positions[idx + 2] < -44) {
          positions[idx + 2] = -8;
        }
      }
      streamRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Pipeline Stations Data
  const stations = [
    { z: -10, title: "01. INPUT FILES", sub: ".LIST .TXT .CSV .NET .SPEC .LOG", color: "#38bdf8" },
    { z: -14, title: "02. REGEX PARSER", sub: "METADATA & DATA EXTRACTION", color: "#00e5ff" },
    { z: -18, title: "03. SIMULATION DATA", sub: "CHARACTERIZATION ORGANIZER", color: "#1fe0d4" },
    { z: -22, title: "04. CLAMP & CURVE", sub: "PULL-UP / PULL-DOWN / PWR / GND", color: "#22d3ee" },
    { z: -26, title: "05. CALCULATIONS", sub: "RESIDUAL CORRECTION & RAMP DATA", color: "#38bdf8" },
    { z: -30, title: "06. CORNERS", sub: "TYP / MIN / MAX CORNERS", color: "#00e5ff" },
    { z: -34, title: "07. VALIDATION", sub: "MISSING / INVALID DATA CHECKS", color: "#10b981" },
    { z: -38, title: "08. IBIS MODEL", sub: "FINAL .IBS GENERATION", color: "#00e5ff" },
    { z: -42, title: "09. PYTHON GUI", sub: "CUSTOMTKINTER / PYSIDE6", color: "#67e8f9" }
  ];

  return (
    <group>
      {/* ─────────────────────────────────────────────────────────────
          STREAMING DATA PACKETS ALONG THE CORRIDOR
          ───────────────────────────────────────────────────────────── */}
      <points ref={streamRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[packetData.pos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color="#00e5ff"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* ─────────────────────────────────────────────────────────────
          9 PIPELINE SPATIAL STATIONS
          ───────────────────────────────────────────────────────────── */}
      {stations.map((st, idx) => {
        // Staggered node offsets left and right along the flight path
        const xOffset = (idx % 2 === 0 ? -2.2 : 2.2);
        const yOffset = 2.0;

        return (
          <group key={idx} position={[xOffset, yOffset, st.z]}>
            {/* Station Node Core Housing */}
            <mesh>
              <boxGeometry args={[1.6, 0.9, 0.08]} />
              <meshBasicMaterial
                color="#06080c"
                transparent
                opacity={0.85}
              />
            </mesh>

            {/* Glowing Wireframe Border */}
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(1.6, 0.9, 0.08)]} />
              <lineBasicMaterial color={st.color} opacity={0.6} transparent />
            </lineSegments>

            {/* Corner Node Ticks */}
            <mesh position={[-0.8, 0.45, 0]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial color={st.color} />
            </mesh>
            <mesh position={[0.8, -0.45, 0]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial color={st.color} />
            </mesh>

            {/* Connecting Bus Line to Center Track */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[
                    new Float32Array([
                      0, 0, 0,
                      -xOffset, 0, 0
                    ]),
                    3
                  ]}
                />
              </bufferGeometry>
              <lineBasicMaterial color={st.color} opacity={0.3} transparent />
            </line>

            {/* Node Title in 3D Space */}
            <Text
              position={[0, 0.15, 0.06]}
              fontSize={0.11}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_ad06nG.woff"
            >
              {st.title}
            </Text>

            {/* Node Subtitle in 3D Space */}
            <Text
              position={[0, -0.15, 0.06]}
              fontSize={0.075}
              color={st.color}
              anchorX="center"
              anchorY="middle"
              font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_ad06nG.woff"
            >
              {st.sub}
            </Text>
          </group>
        );
      })}

      {/* ─────────────────────────────────────────────────────────────
          STATION 9: ABSTRACT PYTHON AUTOMATION GUI FRAME (z = -42)
          Conceptual wireframe GUI, strictly non-fabricated
          ───────────────────────────────────────────────────────────── */}
      <group position={[0, 2.2, -42]}>
        {/* Main GUI Window Shell */}
        <mesh>
          <planeGeometry args={[5.2, 3.2]} />
          <meshBasicMaterial color="#06090e" transparent opacity={0.88} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(5.2, 3.2)]} />
          <lineBasicMaterial color="#00e5ff" opacity={0.5} transparent />
        </lineSegments>

        {/* Title Bar Wireframe */}
        <mesh position={[0, 1.35, 0.02]}>
          <planeGeometry args={[5.0, 0.35]} />
          <meshBasicMaterial color="#0b1320" transparent opacity={0.9} />
        </mesh>
        <Text
          position={[-1.6, 1.35, 0.04]}
          fontSize={0.12}
          color="#00e5ff"
          anchorX="left"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_ad06nG.woff"
        >
          [ PYTHON AUTOMATION GUI // IBIS MODEL GENERATOR ]
        </Text>

        {/* Three Window Controls */}
        {[-2.3, -2.15, -2.0].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, 1.35, 0.04]}>
            <circleGeometry args={[0.04, 12]} />
            <meshBasicMaterial color={idx === 0 ? "#ef4444" : idx === 1 ? "#eab308" : "#22c55e"} />
          </mesh>
        ))}

        {/* Conceptual Left Panel: File Discovery & Parameters */}
        <mesh position={[-1.4, -0.15, 0.02]}>
          <planeGeometry args={[2.0, 2.2]} />
          <meshBasicMaterial color="#080d16" transparent opacity={0.7} />
        </mesh>
        <lineSegments position={[-1.4, -0.15, 0.02]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(2.0, 2.2)]} />
          <lineBasicMaterial color="#1e293b" opacity={0.8} />
        </lineSegments>

        {/* Conceptual Right Panel: Characterization & Curve Viewport */}
        <mesh position={[1.2, -0.15, 0.02]}>
          <planeGeometry args={[2.8, 2.2]} />
          <meshBasicMaterial color="#080d16" transparent opacity={0.7} />
        </mesh>
        <lineSegments position={[1.2, -0.15, 0.02]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(2.8, 2.2)]} />
          <lineBasicMaterial color="#00e5ff" opacity={0.25} />
        </lineSegments>

        {/* Stylized V-I Curve Trace inside GUI Viewport */}
        <line position={[1.2, -0.15, 0.04]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  -1.1, -0.8, 0,
                  -0.7, -0.7, 0,
                  -0.3, -0.5, 0,
                   0.0,  0.0, 0,
                   0.3,  0.5, 0,
                   0.7,  0.7, 0,
                   1.1,  0.75, 0
                ]),
                3
              ]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00e5ff" opacity={0.8} />
        </line>
      </group>
    </group>
  );
}
