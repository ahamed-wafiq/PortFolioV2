import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Realistic NASA Extravehicular Astronaut 3D Model Renderer
function AstronautModel({ pointerRef, thrusterBurst, visorMode }) {
  const { scene } = useGLTF('/models/astronaut.glb');
  const groupRef = useRef(null);
  const thrusterLightRef = useRef(null);

  // Clone scene to avoid shared mutations across re-renders
  const { model } = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material = child.material.clone();
          // Enhance PBR lighting response on official NASA textures
          child.material.roughness = Math.min(child.material.roughness, 0.85);
          child.material.metalness = Math.max(child.material.metalness, 0.1);
        }
      }
    });

    return { model: cloned };
  }, [scene]);

  // Handle Visor mode toggle (Apollo Gold vs. Holographic Cyan HUD)
  useEffect(() => {
    model.traverse((child) => {
      if (child.isMesh && child.material) {
        if (visorMode) {
          child.material.emissive = new THREE.Color('#00e5ff');
          child.material.emissiveIntensity = 0.45;
        } else {
          child.material.emissive = new THREE.Color('#000000');
          child.material.emissiveIntensity = 0.0;
        }
      }
    });
  }, [model, visorMode]);

  // Impulse physics recoil state
  const recoilRef = useRef(0);

  useEffect(() => {
    if (thrusterBurst > 0) {
      recoilRef.current = 1.0;
    }
  }, [thrusterBurst]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const ptr = pointerRef.current || { x: 0, y: 0 };

    recoilRef.current = THREE.MathUtils.lerp(recoilRef.current, 0, 0.05);

    if (groupRef.current) {
      // Fluid zero-g mouse parallax
      const targetRotX = ptr.y * 0.22 - recoilRef.current * 0.25;
      const targetRotY = ptr.x * 0.35;
      const targetZ = recoilRef.current * 0.15;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.08);
    }

    // Dynamic thruster burst light flash
    if (thrusterLightRef.current) {
      const baseIntensity = recoilRef.current > 0.05 ? 8.0 : 0.8;
      thrusterLightRef.current.intensity = baseIntensity + Math.sin(t * 12.0) * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.98, 0]} scale={[0.78, 0.78, 0.78]}>
      <primitive object={model} />
      {/* Thruster backpack glow light */}
      <pointLight
        ref={thrusterLightRef}
        position={[0, 1.2, -0.45]}
        color="#ff6600"
        intensity={0.8}
        distance={2.5}
      />
    </group>
  );
}

export default function AstronautCanvas({ thrusterBurst, visorMode, autoRotate = true }) {
  const pointerRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '50px 0px 50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (e) => {
    if (!containerRef.current || !isInView) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    pointerRef.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
  };

  const handlePointerLeave = () => {
    pointerRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <Canvas
        frameloop={isInView ? 'always' : 'never'}
        camera={{ position: [0, 0, 4.0], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'auto' }}
      >
        {/* Soft Ambient Cosmic Environment Lighting */}
        <ambientLight color="#ffffff" intensity={1.1} />
        
        {/* Primary Sun / Cockpit Key Light with Warm Gold Shading */}
        <directionalLight position={[3, 4, 3]} color="#ffbe3b" intensity={3.2} castShadow />

        {/* Cold Orbital Cyan Rim Light for Crisp Silhouette Separation */}
        <directionalLight position={[-3, 2, -2]} color="#38bdf8" intensity={2.6} />

        {/* Soft Front Fill Light for Suit Fabric and Patch Textures */}
        <directionalLight position={[0, 0, 3.5]} color="#ffffff" intensity={1.2} />

        {/* Warm Ground/Thruster Bounce Light */}
        <pointLight position={[0, -2, 1]} color="#ff7700" intensity={1.8} />

        {/* 360 Interactive Orbit Controls Centered at [0, 0, 0] */}
        <OrbitControls
          target={[0, 0, 0]}
          enableZoom={false}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={0.7}
          maxPolarAngle={Math.PI * 0.72}
          minPolarAngle={Math.PI * 0.28}
          dampingFactor={0.05}
        />

        {/* Zero-G Float Physics Wrapper */}
        <Float
          speed={1.4}
          rotationIntensity={0.25}
          floatIntensity={0.3}
          floatingRange={[-0.03, 0.03]}
        >
          <AstronautModel
            pointerRef={pointerRef}
            thrusterBurst={thrusterBurst}
            visorMode={visorMode}
          />
        </Float>

        {/* Micro-thruster plasma sparks behind the astronaut */}
        <Sparkles
          count={22}
          scale={[1.2, 1.2, 1.0]}
          size={3.2}
          speed={1.8}
          color="#ff7700"
          position={[0, 0.1, -0.4]}
        />

        {/* Cosmic Ambient Space Dust Particles */}
        <Sparkles
          count={32}
          scale={[3.2, 3.0, 3.2]}
          size={1.6}
          speed={0.4}
          color="#ffd480"
          opacity={0.6}
        />
      </Canvas>
    </div>
  );
}
