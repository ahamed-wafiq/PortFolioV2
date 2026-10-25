import React, { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Map each tech node ID to satellite index in the model
const TECH_INDEX_MAP = {
  nodejs: 0,
  aiml: 1,
  python: 2,
  react: 3,
  mongodb: 4,
  threejs: 5,
};

// Blender 3D Model Renderer with dynamic lighting and kinematics
function BlenderTechCore({ pointerRef, activeTech }) {
  const { scene } = useGLTF('/models/tech-core.glb');
  const groupRef = useRef(null);
  const pointLightRef = useRef(null);

  // Clone scene to avoid mutation across mounts
  const { model, parts } = useMemo(() => {
    const cloned = scene.clone(true);
    const lookup = {};

    cloned.traverse((child) => {
      if (child.isMesh) {
        lookup[child.name] = child;
        child.castShadow = true;
        child.receiveShadow = true;

        // Enhance materials with PBR mecha industrial palette
        if (child.name === 'InnerCore') {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#d9651e'),
            emissive: new THREE.Color('#b24e12'),
            emissiveIntensity: 2.0,
            roughness: 0.2,
            metalness: 0.2,
          });
        } else if (child.name === 'InnerWireCage') {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#d9651e'),
            emissive: new THREE.Color('#7e3308'),
            emissiveIntensity: 1.2,
            wireframe: false,
          });
        } else if (child.name === 'OuterCage') {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#141722'),
            roughness: 0.35,
            metalness: 0.85,
          });
        } else if (child.name === 'EnergyShield') {
          child.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#d9651e'),
            transparent: true,
            opacity: 0.12,
            roughness: 0.2,
            transmission: 0.4,
            depthWrite: false,
          });
        } else if (child.name === 'GimbalRingInner') {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#d9651e'),
            emissive: new THREE.Color('#b24e12'),
            emissiveIntensity: 1.0,
            roughness: 0.25,
            metalness: 0.85,
          });
        } else if (child.name === 'GimbalRingMid') {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#eae5d8'),
            emissive: new THREE.Color('#383228'),
            emissiveIntensity: 0.3,
            roughness: 0.3,
            metalness: 0.7,
          });
        } else if (child.name === 'GimbalRingOuter') {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#1a1d28'),
            emissive: new THREE.Color('#7e3308'),
            emissiveIntensity: 0.2,
            roughness: 0.35,
            metalness: 0.9,
          });
        } else if (child.name.startsWith('SatelliteEmitter_')) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#d9651e'),
            emissive: new THREE.Color('#b24e12'),
            emissiveIntensity: 1.5,
          });
        } else if (child.name.startsWith('Satellite_')) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#141722'),
            roughness: 0.35,
            metalness: 0.88,
          });
        }
      }
    });

    return { model: cloned, parts: lookup };
  }, [scene]);

  // Bind references to individual named objects in model
  const innerCore = parts['InnerCore'];
  const innerWire = parts['InnerWireCage'];
  const outerCage = parts['OuterCage'];
  const ringInner = parts['GimbalRingInner'];
  const ringMid = parts['GimbalRingMid'];
  const ringOuter = parts['GimbalRingOuter'];

  // Calculate target satellite coordinates when a tech is hovered
  const activeSatelliteIndex = activeTech ? TECH_INDEX_MAP[activeTech] : null;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const ptr = pointerRef.current || { x: 0, y: 0 };

    // 1. Overall Group smooth mouse parallax
    if (groupRef.current) {
      const targetRotX = ptr.y * 0.22;
      const targetRotY = ptr.x * 0.35 + t * 0.08;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    }

    // 2. Inner Glowing Core Pulse & Rotation
    if (innerCore) {
      const pulseSpeed = activeTech ? 6.0 : 3.2;
      const pulseAmp = activeTech ? 0.12 : 0.06;
      const scale = 1.0 + Math.sin(t * pulseSpeed) * pulseAmp;
      innerCore.scale.set(scale, scale, scale);
      innerCore.rotation.y = t * 0.4;
      innerCore.rotation.x = t * 0.25;

      if (innerCore.material) {
        innerCore.material.emissiveIntensity = (activeTech ? 4.5 : 2.8) + Math.sin(t * 4.0) * 0.6;
      }
    }

    // 3. Inner Wireframe Cage counter-rotation
    if (innerWire) {
      innerWire.rotation.y = -t * 0.25;
      innerWire.rotation.z = t * 0.18;
    }

    // 4. Outer Titanium Exoskeleton slow rotation
    if (outerCage) {
      outerCage.rotation.x = t * 0.12;
      outerCage.rotation.y = -t * 0.15;
    }

    // 5. Gimbal Rings independent gyroscopic rotation
    if (ringInner) {
      ringInner.rotation.x = t * 0.35;
      ringInner.rotation.y = t * 0.22;
    }
    if (ringMid) {
      ringMid.rotation.y = -t * 0.28;
      ringMid.rotation.z = t * 0.2;
    }
    if (ringOuter) {
      ringOuter.rotation.x = -t * 0.18;
      ringOuter.rotation.z = -t * 0.32;
    }

    // 6. Highlight active satellite emitter
    for (let i = 0; i < 6; i++) {
      const satEmitter = parts[`SatelliteEmitter_${i}`];
      if (satEmitter && satEmitter.material) {
        const isActive = activeSatelliteIndex === i;
        const targetIntensity = isActive ? 5.5 : 1.8;
        satEmitter.material.emissiveIntensity = THREE.MathUtils.lerp(
          satEmitter.material.emissiveIntensity,
          targetIntensity,
          0.1
        );
        const s = isActive ? 1.4 : 1.0;
        satEmitter.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
      }
    }

    // 7. Dynamic Point Light pulsation
    if (pointLightRef.current) {
      const baseIntensity = activeTech ? 5.0 : 3.2;
      pointLightRef.current.intensity = baseIntensity + Math.sin(t * 3.0) * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central High-Fidelity 3D Model generated via Blender */}
      <primitive object={model} />

      {/* Internal High-Intensity Point Lights */}
      <pointLight ref={pointLightRef} color="#d9651e" intensity={2.6} distance={6} decay={2} />
      <pointLight color="#b24e12" intensity={1.6} distance={4} decay={2} />
      <pointLight position={[0, 1.2, 0]} color="#eae5d8" intensity={1.0} distance={3} decay={2} />

      {/* Quantum Sparkles / Energy Dust */}
      <Sparkles
        count={28}
        scale={3.6}
        size={1.8}
        speed={0.3}
        color="#d9651e"
        opacity={0.45}
      />
    </group>
  );
}

// Fallback procedural core while GLB loads
function ProceduralFallback() {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });
  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#f97316" wireframe emissive="#f97316" emissiveIntensity={1.5} />
    </mesh>
  );
}

export default function TechCoreCanvas({ activeTech }) {
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
    if (!isInView) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    pointerRef.current = { x, y };
  };

  const handlePointerLeave = () => {
    pointerRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'relative' }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas
        frameloop={isInView ? 'always' : 'never'}
        camera={{ position: [0, 0, 4.4], fov: 48, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.75]}
        style={{ width: '100%', height: '100%', display: 'block' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.35;
        }}
      >
        {/* Cinematic Studio Lighting for metallic reflections */}
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#fff2db" />
        <directionalLight position={[-4, -3, -2]} intensity={1.1} color="#f97316" />
        <pointLight position={[0, -2.5, 2]} intensity={1.2} color="#ff6b00" />

        <Suspense fallback={<ProceduralFallback />}>
          <BlenderTechCore pointerRef={pointerRef} activeTech={activeTech} />
        </Suspense>
      </Canvas>
    </div>
  );
}
