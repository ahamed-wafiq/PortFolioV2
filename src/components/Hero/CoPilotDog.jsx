import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { playRoboBark, playServoClick } from '../Sections/CyberDog/cyberAudio';
import styles from './CoPilotDog.module.css';

// 3D Voxel Dog Mesh & Procedural Animation Controller
function DogMesh({ pointerRef, isSitting, isHappy, isHovered, onDogClick }) {
  const { scene } = useGLTF('/models/minecraft_robot_dog.glb');
  const rootRef = useRef(null);
  const thrusterLightRef = useRef(null);

  // Parse and separate model parts for organic procedural animation
  const { clonedScene, parts } = useMemo(() => {
    const cloned = scene.clone(true);
    const foundParts = {
      headObjects: [],
      tailObjects: [],
      hindLegs: [],
      frontLegs: [],
      flameObjects: [],
    };

    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material = child.material.clone();
          child.material.roughness = Math.max(child.material.roughness, 0.25);

          const matName = child.material.name || '';
          const isGlow =
            matName.includes('Glow') ||
            child.name.includes('Eye') ||
            child.name.includes('Beacon') ||
            child.name.includes('Gem') ||
            child.name.includes('ToeGlow');

          if (isGlow && !child.name.includes('Flame')) {
            child.material.emissive = new THREE.Color('#00e5ff');
            child.material.emissiveIntensity = 4.0;
          }
        }

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
        }
      }
    });

    return { clonedScene: cloned, parts: foundParts };
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const ptr = pointerRef.current || { x: 0, y: 0 };

    // --- 1. Tail Wagging ---
    const wagFreq = isHappy ? 26.0 : isHovered ? 18.0 : isSitting ? 9.0 : 13.0;
    const wagAmp = isHappy ? 0.48 : isHovered ? 0.40 : 0.28;
    const wagAngle = Math.sin(t * wagFreq) * wagAmp;

    parts.tailObjects.forEach((tailObj) => {
      tailObj.rotation.z = wagAngle;
    });

    // --- 2. Inquisitive Head Tracking Mouse Pointer ---
    const targetHeadYaw = ptr.x * 0.45;
    const targetHeadPitch = -ptr.y * 0.30;
    const tiltWiggle = isHappy
      ? Math.sin(t * 9.0) * 0.18
      : isHovered
      ? Math.sin(t * 4.5) * 0.12
      : Math.sin(t * 1.6) * 0.08;

    parts.headObjects.forEach((headObj) => {
      headObj.rotation.y = THREE.MathUtils.lerp(headObj.rotation.y || 0, targetHeadYaw, 0.09);
      headObj.rotation.x = THREE.MathUtils.lerp(headObj.rotation.x || 0, targetHeadPitch, 0.09);
      headObj.rotation.z = THREE.MathUtils.lerp(headObj.rotation.z || 0, tiltWiggle, 0.09);
    });

    // --- 3. Sit vs Stand Pose Transitions ---
    if (rootRef.current) {
      if (isSitting) {
        // Classic Minecraft sitting dog angle: hind lowered, chest up
        const sitTiltX = 0.26;
        const sitPosY = -0.48;

        rootRef.current.position.y = THREE.MathUtils.lerp(rootRef.current.position.y, sitPosY, 0.09);
        rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, sitTiltX, 0.09);

        parts.hindLegs.forEach((leg) => {
          leg.rotation.x = THREE.MathUtils.lerp(leg.rotation.x || 0, -0.68, 0.09);
        });
        parts.frontLegs.forEach((leg) => {
          leg.rotation.x = THREE.MathUtils.lerp(leg.rotation.x || 0, -sitTiltX, 0.09);
        });
      } else {
        // Standing idle with subtle organic breathing oscillation
        const breathY = -0.45 + Math.sin(t * 2.2) * 0.012;
        rootRef.current.position.y = THREE.MathUtils.lerp(rootRef.current.position.y, breathY, 0.09);
        rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, 0, 0.09);

        parts.hindLegs.forEach((leg) => {
          leg.rotation.x = THREE.MathUtils.lerp(leg.rotation.x || 0, 0, 0.09);
        });
        parts.frontLegs.forEach((leg) => {
          leg.rotation.x = THREE.MathUtils.lerp(leg.rotation.x || 0, 0, 0.09);
        });
      }
    }

    // Flame flicker
    if (thrusterLightRef.current) {
      thrusterLightRef.current.intensity = 1.0 + Math.sin(t * 10.0) * 0.3;
    }
  });

  return (
    <group
      ref={rootRef}
      position={[0, -0.45, 0]}
      scale={[1.08, 1.08, 1.08]}
      onClick={onDogClick}
      cursor="pointer"
    >
      <primitive object={clonedScene} />

      {/* Thruster backpack glow */}
      <pointLight
        ref={thrusterLightRef}
        position={[0, 0.65, -0.3]}
        color="#ff7700"
        intensity={1.2}
        distance={2.2}
      />
    </group>
  );
}

/**
 * CoPilotDog Component
 * Interactive 3D Minecraft Robot Wolf Co-Pilot docked in the Cockpit.
 */
export default function CoPilotDog() {
  const [isSitting, setIsSitting] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [hearts, setHearts] = useState([]);
  const pointerRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Global mouse tracking across the entire hero window for responsive head turning
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDogClick = (e) => {
    e.stopPropagation();
    // Play cyber woof audio
    playRoboBark();
    playServoClick();

    setIsHappy(true);
    // Toggle sit/stand on click
    setIsSitting((prev) => !prev);

    // Spawn floating Minecraft heart particles on pet
    const batchId = Date.now();
    const newHearts = Array.from({ length: 4 }).map((_, i) => ({
      id: `${batchId}-${i}`,
      left: 30 + Math.random() * 40,
      delay: i * 0.09,
    }));
    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 1500);

    // Random cute Minecraft robo-dog barking dialogue
    const barks = [
      '♥ WOOF! [K9 CO-PILOT READY]',
      '♥ BARK! [WARP SPEED ENGAGED]',
      '♥ *HAPPY TAIL WAG* 100% AFFINITY',
      '♥ AWOOO! [ALL SYSTEMS NOMINAL]',
      '♥ BEEP-BOOP WOOF! [GOOD BOY MODE]',
      '♥ *CHIRP* [DEFLECTOR SHIELDS SYNCED]',
      '♥ BARK! [COCKPIT SECURED]',
    ];
    const chosen = barks[Math.floor(Math.random() * barks.length)];
    setSpeechText(chosen);

    setTimeout(() => {
      setIsHappy(false);
    }, 2400);

    setTimeout(() => {
      setSpeechText('');
    }, 3200);
  };

  return (
    <div
      ref={containerRef}
      className={styles.dogContainer}
      title="Click to pet / sit K9 Co-Pilot"
      onClick={handleDogClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Speech / Reaction Bubble */}
      {speechText && (
        <div className={styles.speechBubble}>
          <span className={styles.bubbleText}>{speechText}</span>
          <div className={styles.bubbleArrow} />
        </div>
      )}

      {/* Floating Minecraft Heart Particles */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className={styles.floatingHeart}
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
          }}
        >
          ♥
        </span>
      ))}

      {/* Co-Pilot Status Badge */}
      <div className={styles.copilotBadge}>
        <span className={styles.statusDot} />
        <span className={styles.badgeLabel}>
          K9 // {isSitting ? 'DEFENSE' : 'PATROL'}
        </span>
      </div>

      {/* Floating Interactive Badge (Subtle on Hover) */}
      <div className={styles.hoverHint}>
        <span>[CLICK TO PET / SIT] &bull; [DRAG TO ROTATE]</span>
      </div>

      {/* Pure 3D Canvas - 100% Transparent, No Frame */}
      <Canvas
        camera={{ position: [2.1, 0.85, 2.1], fov: 36 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        {/* Balanced Cockpit Studio Lighting */}
        <ambientLight intensity={0.9} />
        {/* Main Sun / Starlight Key */}
        <directionalLight position={[4, 5, 4]} intensity={2.2} castShadow />
        {/* Cyber Cyan Horizon Rim Light */}
        <directionalLight position={[-4, 2, -3]} intensity={1.8} color="#00e5ff" />
        {/* Rocket Flame Warm Bounce */}
        <pointLight position={[2, -1, -2]} intensity={1.2} color="#ff7700" />

        {/* 3D Dog Model */}
        <DogMesh
          pointerRef={pointerRef}
          isSitting={isSitting}
          isHappy={isHappy}
          isHovered={isHovered}
          onDogClick={handleDogClick}
        />

        {/* Subtle Sci-Fi Floor Shadow / Hologram Dock Ring - Exactly at paw level */}
        <mesh position={[0, -0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.55, 0.60, 48]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.4} />
        </mesh>
        <mesh position={[0, -0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.54, 32]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.45} />
        </mesh>

        {/* Orbit Controls (Drag to rotate 360°) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          target={[0, 0, 0]}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2 + 0.15}
        />
      </Canvas>
    </div>
  );
}
