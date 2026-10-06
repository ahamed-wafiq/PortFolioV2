import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import SpaceEnvironment from './SpaceEnvironment';
import PlanetSystem from './PlanetSystem';
import StarField from './StarField';
import styles from './SpaceScene.module.css';

function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => {
      mediaQuery.removeEventListener('change', updatePreference);
    };
  }, []);

  return reducedMotion;
}

function SceneMotion({ reducedMotion, isVisible }) {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion || !isVisible) return undefined;

    const handlePointerMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, [reducedMotion, isVisible]);

  useFrame((state) => {
    if (!isVisible) return;
    const elapsed = state.clock.elapsedTime;
    const mx = reducedMotion ? 0 : pointer.current.x;
    const my = reducedMotion ? 0 : pointer.current.y;

    // Subtle engine micro-rumble
    const rumbleX = Math.sin(elapsed * 14.0) * 0.001;
    const rumbleY = Math.cos(elapsed * 16.0) * 0.0008;

    // Gentle cruising flight sway
    const cruiseSwayX = Math.sin(elapsed * 0.5) * 0.012;
    const cruiseSwayY = Math.cos(elapsed * 0.38) * 0.008;
    const forwardSurgeZ = Math.sin(elapsed * 1.5) * 0.02;

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mx * 0.08 + rumbleX + cruiseSwayX,
      0.04,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      0.05 + my * 0.04 + rumbleY + cruiseSwayY,
      0.04,
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      forwardSurgeZ,
      0.04,
    );

    // Subtle flight banking
    const bankRoll = -mx * 0.035 + Math.sin(elapsed * 0.5) * 0.006;
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, bankRoll, 0.04);

    const lookX = 0.5 + mx * 0.1;
    const lookY = -0.05 + my * 0.05;
    camera.lookAt(lookX, lookY, -10);
  });

  return null;
}

function SpaceSceneCanvas({ isVisible }) {
  const reducedMotion = useReducedMotionPreference();

  return (
    <Canvas
      className={styles.canvas}
      frameloop={isVisible ? 'always' : 'never'}
      camera={{ position: [0, 0.05, 0], fov: 66, near: 0.05, far: 200 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0); // 100% transparent canvas
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.25;
      }}
    >
      <SceneMotion reducedMotion={reducedMotion} isVisible={isVisible} />
      <Suspense fallback={null}>
        <SpaceEnvironment reducedMotion={reducedMotion} />
        <StarField reducedMotion={reducedMotion} />
        <PlanetSystem reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

const SpaceScene = ({ isVisible = true }) => {
  return (
    <div className={styles.sceneRoot} aria-hidden="true">
      <SpaceSceneCanvas isVisible={isVisible} />
    </div>
  );
};

export default SpaceScene;