import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';

export default function DigitalGrid() {
  const gridRef = useRef();

  // Subtle breathing or movement if needed, keeping it rock solid
  useFrame((state) => {
    if (gridRef.current) {
      // Subtle pulse to ground grid material
    }
  });

  return (
    <group position={[0, -2.8, -40]}>
      {/* Infinite-feel perspective grid */}
      <Grid
        ref={gridRef}
        renderOrder={-1}
        position={[0, 0, 0]}
        infiniteGrid
        cellSize={1.2}
        cellThickness={0.7}
        cellColor="#1e293b"
        sectionSize={6}
        sectionThickness={1.2}
        sectionColor="#00e5ff"
        fadeDistance={45}
        fadeStrength={1.5}
      />
    </group>
  );
}
