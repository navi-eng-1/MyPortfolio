import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraRig from './CameraRig';
import TechWorld from './TechWorld';

export default function Experience({ scrollProgress = 0 }) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{
          position: [0, 3, 22],
          fov: 50,
          near: 0.1,
          far: 200,
        }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
          stencil: false,
          depth: true,
        }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.75)]}
      >
        <Suspense fallback={null}>
          <CameraRig scrollProgress={scrollProgress} />
          <TechWorld scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
