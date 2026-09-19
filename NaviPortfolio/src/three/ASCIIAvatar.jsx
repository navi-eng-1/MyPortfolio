import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Custom Shader for Holographic Engineering ASCII Avatar
const HolographicMaterialShader = {
  uniforms: {
    uTexture: { value: null },
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#00e5ff') },
    uOpacity: { value: 0.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    uniform float uTime;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      vec3 pos = position;
      // Subtle micro-wave displacement
      pos.z += sin(pos.y * 5.0 + uTime * 1.5) * 0.03;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      // Subtle scanline coordinates
      float scanline = sin(vUv.y * 320.0 + uTime * 4.0) * 0.08;
      
      // Slight chromatic aberration on RGB channels
      float r = texture2D(uTexture, vUv + vec2(0.0015, 0.0)).r;
      float g = texture2D(uTexture, vUv).g;
      float b = texture2D(uTexture, vUv - vec2(0.0015, 0.0)).b;
      
      vec4 texColor = vec4(r, g, b, (r + g + b) / 3.0);
      
      // Engineering luminous monochrome grade
      float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
      
      // Soft edge fresnel / rim
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.5);

      // Accent tint on highlight characters
      vec3 finalColor = mix(texColor.rgb, uColor, 0.25) + scanline * 0.3;
      finalColor += uColor * fresnel * 0.45;

      // Alpha map based on brightness so background dissolves into the 3D void
      float alpha = smoothstep(0.06, 0.45, luminance) * uOpacity;

      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
};

export default function ASCIIAvatar({ scrollProgress = 0 }) {
  const meshRef = useRef();
  const backPlaneRef = useRef();
  const bracketsRef = useRef();
  const shaderMatRef = useRef();
  const particlesRef = useRef();

  // Load avatar texture
  const texture = useTexture('/assets/ascii-avatar.png');
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  // Custom shader uniforms
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#00e5ff') },
      uOpacity: { value: 0.0 },
    }),
    [texture]
  );

  // Dedicated micro-particle halo around the avatar
  const haloData = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2.0;
    }
    return { pos, count };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Fade in smoothly as camera approaches (0.08 to 0.20)
    // Avoids obstructing the opening screen
    let targetOpacity = 0;
    if (scrollProgress < 0.08) {
      targetOpacity = 0.0;
    } else if (scrollProgress < 0.20) {
      targetOpacity = (scrollProgress - 0.08) / 0.12;
    } else {
      targetOpacity = 1.0;
    }

    if (shaderMatRef.current) {
      shaderMatRef.current.uniforms.uTime.value = time;
      shaderMatRef.current.uniforms.uOpacity.value = targetOpacity * 0.95;
    }

    if (backPlaneRef.current) {
      backPlaneRef.current.material.opacity = targetOpacity * 0.15;
    }

    if (bracketsRef.current) {
      bracketsRef.current.children.forEach(line => {
        if (line.material) line.material.opacity = targetOpacity * 0.4;
      });
    }

    if (meshRef.current) {
      // Subtle organic levitation & slight breathing rotation
      meshRef.current.position.y = 1.8 + Math.sin(time * 0.8) * 0.06;
      meshRef.current.rotation.y = -0.15 + Math.sin(time * 0.4) * 0.04;
      meshRef.current.rotation.x = Math.cos(time * 0.5) * 0.02;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
      particlesRef.current.material.opacity = targetOpacity * 0.5;
    }
  });

  return (
    <group position={[-0.8, 1.8, 3.2]}>
      {/* 3D Holographic Avatar Plane */}
      <mesh ref={meshRef}>
        <planeGeometry args={[4.2, 5.6, 32, 32]} />
        <shaderMaterial
          ref={shaderMatRef}
          vertexShader={HolographicMaterialShader.vertexShader}
          fragmentShader={HolographicMaterialShader.fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>

      {/* Subtle back-layer offset for spatial depth parallax */}
      <mesh ref={backPlaneRef} position={[0, 0, -0.15]} scale={[1.02, 1.02, 1]}>
        <planeGeometry args={[4.2, 5.6]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0}
          color="#00e5ff"
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Holographic Framing Bracket Markers */}
      <group ref={bracketsRef} position={[0, 0, 0.05]}>
        {/* Top-Left Bracket */}
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([-2.2, 2.7, 0, -2.2, 3.0, 0, -1.9, 3.0, 0]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00e5ff" opacity={0} transparent />
        </line>
        {/* Bottom-Right Bracket */}
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([2.2, -2.7, 0, 2.2, -3.0, 0, 1.9, -3.0, 0]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00e5ff" opacity={0} transparent />
        </line>
      </group>

      {/* Micro-particle Halo */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[haloData.pos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#00e5ff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
