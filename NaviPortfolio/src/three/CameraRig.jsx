import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getCameraState } from '../animations/cameraPath';
import { useReducedMotion, useDeviceTier } from '../hooks/useDeviceTier';

export default function CameraRig({ scrollProgress = 0 }) {
  const { camera, pointer } = useThree();
  const reducedMotion = useReducedMotion();
  const { isMobile } = useDeviceTier();

  // Smooth lerping state vectors
  const currentPos = useRef(new THREE.Vector3(0, 3, 22));
  const currentLookAt = useRef(new THREE.Vector3(0, 2, 0));
  const currentBank = useRef(0);
  const currentFov = useRef(52);

  useFrame((state, delta) => {
    // 1. Calculate target state from master camera spline
    const { pos, lookAt, fov, bank } = getCameraState(scrollProgress);

    // Mobile FOV compensation (wider angle for portrait aspect ratio)
    const targetFov = isMobile ? fov + 8 : fov;

    // 2. Mouse parallax offsets (suppressed if reduced motion is preferred)
    const parallaxX = reducedMotion ? 0 : pointer.x * 0.35;
    const parallaxY = reducedMotion ? 0 : pointer.y * 0.25;
    const targetBank = reducedMotion ? 0 : bank;

    // 3. Drone damping factor (smooth inertia)
    const factor = Math.min(delta * 4.2, 0.15);

    // 4. Smoothly lerp position & lookAt
    currentPos.current.lerp(
      new THREE.Vector3(
        pos.x + parallaxX,
        pos.y + parallaxY,
        pos.z
      ),
      factor
    );

    currentLookAt.current.lerp(
      new THREE.Vector3(
        lookAt.x + parallaxX * 0.4,
        lookAt.y + parallaxY * 0.4,
        lookAt.z
      ),
      factor
    );

    // 5. Smoothly lerp banking and FOV
    currentBank.current = THREE.MathUtils.lerp(currentBank.current, targetBank, factor);
    currentFov.current = THREE.MathUtils.lerp(currentFov.current, targetFov, factor);

    // 6. Apply to Three.js camera
    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
    camera.rotation.z += currentBank.current;

    // 7. Update projection matrix when FOV adjusts
    if (Math.abs(camera.fov - currentFov.current) > 0.05) {
      camera.fov = currentFov.current;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
