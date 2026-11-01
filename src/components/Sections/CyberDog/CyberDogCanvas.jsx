import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

import { OPTIC_COLORS } from './opticColors';

function RobotDogModel({
  pointerRef,
  isSitting = false,
  boosterActive = false,
  opticColor = 'cyan',
  isPetting = false,
}) {
  const { scene } = useGLTF('/models/minecraft_robot_dog.glb');
  const rootGroupRef = useRef(null);
  const thrusterLightRef = useRef(null);

  // Parse and cache objects
  const { clonedScene, parts, glowMaterials } = useMemo(() => {
    const cloned = scene.clone(true);
    const glowMats = [];
    const foundParts = {
      headObjects: [],
      tailObjects: [],
      hindLegs: [],
      frontLegs: [],
      flameObjects: [],
      hindObjects: [],
    };

    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material = child.material.clone();

          // Check if this is an emissive cyber glow part
          const matName = child.material.name || '';
          const isGlow =
            matName.includes('Glow') ||
            child.name.includes('Eye') ||
            child.name.includes('Beacon') ||
            child.name.includes('Gem') ||
            child.name.includes('ToeGlow');

          if (isGlow && !child.name.includes('Flame')) {
            glowMats.push(child.material);
          }
        }

        // Categorize parts for procedural animation
        const n = child.name;
        if (
          n.includes('Head') ||
          n.includes('Snout') ||
          n.includes('Nose') ||
          n.includes('Eye') ||
          n.includes('Ear') ||
          n.includes('Antenna') ||
          n.includes('LowerJaw')
        ) {
          foundParts.headObjects.push(child);
        } else if (n.includes('Tail')) {
          foundParts.tailObjects.push(child);
        } else if (n.includes('Leg_BL') || n.includes('Leg_BR')) {
          foundParts.hindLegs.push(child);
        } else if (n.includes('Leg_FL') || n.includes('Leg_FR')) {
          foundParts.frontLegs.push(child);
        } else if (n.includes('Flame')) {
          foundParts.flameObjects.push(child);
        } else if (n.includes('Hind') || n.includes('Spine')) {
          foundParts.hindObjects.push(child);
        }
      }
    });

    return { clonedScene: cloned, parts: foundParts, glowMaterials: glowMats };
  }, [scene]);

  // Update glowing optic colors dynamically
  useEffect(() => {
    const config = OPTIC_COLORS[opticColor] || OPTIC_COLORS.cyan;
    const color = new THREE.Color(config.hex);

    glowMaterials.forEach((mat) => {
      mat.emissive = color;
      mat.emissiveIntensity = 5.5;
    });
  }, [opticColor, glowMaterials]);

  // Animation frame loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const ptr = pointerRef.current || { x: 0, y: 0 };

    // --- 1. Tail Wagging Physics ---
    const baseWagFreq = isPetting ? 24.0 : isSitting ? 7.0 : 11.0;
    const wagAmp = isPetting ? 0.48 : 0.32;
    const wagAngle = Math.sin(t * baseWagFreq) * wagAmp;

    parts.tailObjects.forEach((tailObj) => {
      tailObj.rotation.z = wagAngle;
    });

    // --- 2. Inquisitive Head Tracking & Tilt ---
    // Smooth target orientation based on mouse parallax
    const targetHeadYaw = ptr.x * 0.45;
    const targetHeadPitch = -ptr.y * 0.32;
    const tiltWiggle = isPetting ? Math.sin(t * 8.0) * 0.18 : Math.sin(t * 1.8) * 0.08;

    parts.headObjects.forEach((headObj) => {
      headObj.rotation.y = THREE.MathUtils.lerp(headObj.rotation.y || 0, targetHeadYaw, 0.08);
      headObj.rotation.x = THREE.MathUtils.lerp(headObj.rotation.x || 0, targetHeadPitch, 0.08);
      headObj.rotation.z = THREE.MathUtils.lerp(headObj.rotation.z || 0, tiltWiggle, 0.08);
    });

    // --- 3. Sit vs Stand Pose Transitions ---
    if (rootGroupRef.current) {
      if (boosterActive) {
        // Zero-G Hover Flight Mode
        const hoverY = 0.28 + Math.sin(t * 3.5) * 0.06;
        const pitchFlight = Math.sin(t * 2.0) * 0.04 + 0.12;

        rootGroupRef.current.position.y = THREE.MathUtils.lerp(rootGroupRef.current.position.y, hoverY, 0.06);
        rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(rootGroupRef.current.rotation.x, pitchFlight, 0.06);

        // Legs dangle slightly
        parts.frontLegs.forEach((leg) => {
          leg.rotation.x = THREE.MathUtils.lerp(leg.rotation.x || 0, 0.22, 0.08);
        });
        parts.hindLegs.forEach((leg) => {
          leg.rotation.x = THREE.MathUtils.lerp(leg.rotation.x || 0, -0.28, 0.08);
        });
      } else if (isSitting) {
        // Classic Minecraft Wolf Sitting Pose
        const sitTiltX = 0.28; // Front raised, hind grounded
        const sitPosY = -0.12;

        rootGroupRef.current.position.y = THREE.MathUtils.lerp(rootGroupRef.current.position.y, sitPosY, 0.08);
        rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(rootGroupRef.current.rotation.x, sitTiltX, 0.08);

        // Fold hind legs forward
        parts.hindLegs.forEach((leg) => {
          leg.rotation.x = THREE.MathUtils.lerp(leg.rotation.x || 0, -0.72, 0.08);
        });
        // Front legs straight to brace against floor
        parts.frontLegs.forEach((leg) => {
          leg.rotation.x = THREE.MathUtils.lerp(leg.rotation.x || 0, -sitTiltX, 0.08);
        });
      } else {
        // Normal Standing Idle with subtle breathing
        const breathY = Math.sin(t * 2.4) * 0.012;
        rootGroupRef.current.position.y = THREE.MathUtils.lerp(rootGroupRef.current.position.y, breathY, 0.08);
        rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(rootGroupRef.current.rotation.x, 0, 0.08);

        parts.hindLegs.forEach((leg) => {
          leg.rotation.x = THREE.MathUtils.lerp(leg.rotation.x || 0, 0, 0.08);
        });
        parts.frontLegs.forEach((leg) => {
          leg.rotation.x = THREE.MathUtils.lerp(leg.rotation.x || 0, 0, 0.08);
        });
      }
    }

    // --- 4. Rocket Thruster Flames & Lighting ---
    const flameScale = boosterActive ? 1.4 + Math.sin(t * 28.0) * 0.35 : 0.8 + Math.sin(t * 12.0) * 0.15;
    parts.flameObjects.forEach((flame) => {
      flame.scale.set(flameScale, flameScale * 1.5, flameScale);
    });

    if (thrusterLightRef.current) {
      thrusterLightRef.current.intensity = boosterActive ? 7.0 + Math.random() * 2.0 : 1.2;
    }
  });

  return (
    <group ref={rootGroupRef} position={[0, -0.32, 0]} scale={[1.45, 1.45, 1.45]}>
      <primitive object={clonedScene} />

      {/* Thruster exhaust point light */}
      <pointLight
        ref={thrusterLightRef}
        position={[0, 0.65, -0.3]}
        color="#ff7700"
        intensity={1.5}
        distance={2.5}
      />

      {/* Zero-G Thruster Particle Sparkles */}
      {boosterActive && (
        <Sparkles
          count={35}
          scale={[0.8, 0.8, 1.4]}
          position={[0, 0.6, -0.5]}
          color="#ffaa00"
          size={3.5}
          speed={3.5}
        />
      )}
    </group>
  );
}

export default function CyberDogCanvas({
  isSitting = false,
  boosterActive = false,
  opticColor = 'cyan',
  isPetting = false,
  autoRotate = false,
}) {
  const pointerRef = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
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
      style={{ width: '100%', height: '100%', position: 'relative' }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas
        camera={{ position: [2.1, 1.3, 2.3], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* Cinematic Studio Lighting */}
        <ambientLight intensity={0.75} />
        {/* Main Sun / Key Light */}
        <directionalLight position={[4, 5, 4]} intensity={2.2} castShadow />
        {/* Cyber Cyan Edge / Rim Light */}
        <directionalLight position={[-4, 2, -3]} intensity={1.8} color="#00e5ff" />
        {/* Rocket Orange Flank Fill Light */}
        <pointLight position={[2, -1, -2]} intensity={1.2} color="#ff7700" />

        {/* 3D Robot Dog Model */}
        <RobotDogModel
          pointerRef={pointerRef}
          isSitting={isSitting}
          boosterActive={boosterActive}
          opticColor={opticColor}
          isPetting={isPetting}
        />

        {/* Ground Hologram Docking Ring */}
        <mesh position={[0, -0.68, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.7, 0.76, 48]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.35} />
        </mesh>
        <mesh position={[0, -0.68, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.05, 1.08, 48]} />
          <meshBasicMaterial color="#ff7700" transparent opacity={0.25} />
        </mesh>

        {/* Orbit Controls with user interaction */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
          minDistance={1.4}
          maxDistance={4.2}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
    </div>
  );
}
