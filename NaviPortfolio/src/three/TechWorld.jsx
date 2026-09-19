import React, { Suspense } from 'react';
import Atmosphere from './Atmosphere';
import DigitalGrid from './DigitalGrid';
import ParticleField from './ParticleField';
import FloatingStructures from './FloatingStructures';
import ASCIIAvatar from './ASCIIAvatar';
import IBISPipeline3D from './IBISPipeline3D';
import ExperienceWorld3D from './ExperienceWorld3D';
import SkillsConstellation3D from './SkillsConstellation3D';

export default function TechWorld({ scrollProgress = 0 }) {
  return (
    <group>
      {/* Cinematic Lighting & Fog */}
      <Atmosphere />

      {/* Ground Perspective Grid */}
      <DigitalGrid />

      {/* 4-Tier Depth Particle System */}
      <ParticleField scrollProgress={scrollProgress} />

      {/* Abstract Semiconductor Traces & Spatial Frames */}
      <FloatingStructures />

      {/* Signature 3D Holographic ASCII Avatar */}
      <Suspense fallback={null}>
        <ASCIIAvatar scrollProgress={scrollProgress} />
      </Suspense>

      {/* 3D IBIS Model Generator Automation Pipeline */}
      <Suspense fallback={null}>
        <IBISPipeline3D scrollProgress={scrollProgress} />
      </Suspense>

      {/* 3D Career Evolution Monoliths */}
      <Suspense fallback={null}>
        <ExperienceWorld3D scrollProgress={scrollProgress} />
      </Suspense>

      {/* 3D Skills Constellation with Central Python Node */}
      <Suspense fallback={null}>
        <SkillsConstellation3D scrollProgress={scrollProgress} />
      </Suspense>
    </group>
  );
}
