import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

export default function FloatingStructures() {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const waferRef = useRef();

  // Subtle continuous mechanical rotation
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.04;
      ring1Ref.current.rotation.x = Math.sin(time * 0.03) * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.03;
      ring2Ref.current.rotation.y = Math.cos(time * 0.02) * 0.1;
    }
    if (waferRef.current) {
      waferRef.current.rotation.y = time * 0.02;
    }
  });

  // Longitudinal bus/circuit guide lines running along the corridor sides
  const busLines = useMemo(() => {
    const lines = [];
    const sideX = [-8, 8, -12, 12];
    const heights = [-1, 2, 5];

    sideX.forEach((x, xi) => {
      heights.forEach((y, yi) => {
        const points = [
          new THREE.Vector3(x, y, 20),
          new THREE.Vector3(x, y, -90)
        ];
        lines.push({ points, key: `${xi}-${yi}` });
      });
    });
    return lines;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Background Engineering Ring at z ≈ -25 */}
      <group position={[0, 2, -25]} ref={ring1Ref}>
        <mesh>
          <ringGeometry args={[14, 14.04, 64]} />
          <meshBasicMaterial color="#00e5ff" opacity={0.08} transparent side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <ringGeometry args={[10, 10.03, 48]} />
          <meshBasicMaterial color="#ffffff" opacity={0.04} transparent side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Midground Wafer Wireframe Geometry at z ≈ -45 */}
      <group position={[3, 4, -45]} ref={waferRef}>
        {/* Silicon Wafer stylized perimeter */}
        <mesh rotation={[Math.PI / 6, 0, 0]}>
          <cylinderGeometry args={[5, 5, 0.08, 32, 1, true]} />
          <meshBasicMaterial color="#1fe0d4" opacity={0.09} transparent wireframe />
        </mesh>
      </group>

      {/* Secondary Distant Structural Halo at z ≈ -75 */}
      <group position={[-2, 1, -75]} ref={ring2Ref}>
        <mesh>
          <ringGeometry args={[18, 18.05, 64]} />
          <meshBasicMaterial color="#00e5ff" opacity={0.05} transparent side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Longitudinal Data/Trace Guide Lines along the tunnel */}
      {busLines.map((line) => (
        <line key={line.key}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  line.points[0].x, line.points[0].y, line.points[0].z,
                  line.points[1].x, line.points[1].y, line.points[1].z,
                ]),
                3,
              ]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#00e5ff"
            opacity={0.045}
            transparent
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}

      {/* Spatial Coordinate Ticks / Engineering Crosshairs */}
      {[-10, -25, -45, -65, -85].map((zPos, idx) => (
        <group key={`marker-${idx}`} position={[0, -2.75, zPos]}>
          {/* Ground crosshair */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.5, 0.04]} />
            <meshBasicMaterial color="#00e5ff" opacity={0.2} transparent />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.04, 1.5]} />
            <meshBasicMaterial color="#00e5ff" opacity={0.2} transparent />
          </mesh>
        </group>
      ))}
    </group>
  );
}
