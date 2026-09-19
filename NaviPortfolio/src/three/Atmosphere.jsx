import React from 'react';

export default function Atmosphere() {
  return (
    <>
      {/* Scene depth fog */}
      <color attach="background" args={['#020305']} />
      <fog attach="fog" args={['#020305', 8, 48]} />

      {/* Atmospheric directional and ambient lighting */}
      <ambientLight intensity={0.45} color="#cceeff" />

      {/* Primary engineering rim light */}
      <directionalLight
        position={[12, 18, 15]}
        intensity={0.85}
        color="#00e5ff"
      />

      {/* Secondary subtle fill light */}
      <directionalLight
        position={[-15, -10, -10]}
        intensity={0.3}
        color="#172554"
      />

      {/* Ground subtle glow */}
      <pointLight
        position={[0, -2, 0]}
        intensity={0.4}
        color="#00bcd4"
        distance={25}
      />
    </>
  );
}
