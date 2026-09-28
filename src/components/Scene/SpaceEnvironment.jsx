import React, { useMemo } from 'react';
import * as THREE from 'three';

// Procedural high-resolution warm amber cosmic galaxy nebula (Layer 1: Space Background)
function createWarmCosmicGalaxyTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Deep warm cosmos base
  const baseGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
  baseGrad.addColorStop(0, '#120603');
  baseGrad.addColorStop(0.3, '#331005');
  baseGrad.addColorStop(0.65, '#5c1e08');
  baseGrad.addColorStop(1, '#1a0803');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Massive glowing amber nebula cluster (concentrated around planet side)
  const g1 = ctx.createRadialGradient(720, 460, 40, 720, 460, 520);
  g1.addColorStop(0, 'rgba(255, 174, 66, 0.75)');
  g1.addColorStop(0.25, 'rgba(234, 88, 12, 0.55)');
  g1.addColorStop(0.55, 'rgba(154, 52, 18, 0.3)');
  g1.addColorStop(0.85, 'rgba(66, 22, 6, 0.15)');
  g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, 1024, 1024);

  // Secondary radiant golden cloud banks (bottom horizon)
  const g2 = ctx.createRadialGradient(850, 680, 20, 850, 680, 420);
  g2.addColorStop(0, 'rgba(255, 210, 148, 0.6)');
  g2.addColorStop(0.35, 'rgba(255, 138, 31, 0.35)');
  g2.addColorStop(0.7, 'rgba(180, 60, 10, 0.12)');
  g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, 1024, 1024);

  // Left-side deep space dust cloud
  const g3 = ctx.createRadialGradient(220, 400, 30, 220, 400, 380);
  g3.addColorStop(0, 'rgba(234, 88, 12, 0.25)');
  g3.addColorStop(0.5, 'rgba(120, 40, 8, 0.1)');
  g3.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = g3;
  ctx.fillRect(0, 0, 1024, 1024);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const SpaceEnvironment = () => {
  const galaxyTexture = useMemo(() => createWarmCosmicGalaxyTexture(), []);

  return (
    <group>
      {/* === LAYER 1: VIBRANT WARM AMBER GALAXY NEBULA DOME === */}
      <mesh position={[0, 0, -55]} scale={[80, 52, 80]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          map={galaxyTexture}
          side={THREE.BackSide}
          transparent
          opacity={0.96}
        />
      </mesh>

      {/* Billowing volumetric cloud banks along the bottom horizon */}
      <mesh position={[8, -6, -35]} scale={[35, 14, 25]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#ff8a1f"
          transparent
          opacity={0.22}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Cockpit ambient warm fill */}
      <ambientLight intensity={0.65} color="#ffd8b0" />

      {/* Sun directional light illuminating planet and asteroids */}
      <directionalLight position={[14, 9, -15]} intensity={2.4} color="#fff4e0" />

      {/* Soft warm bounce light */}
      <directionalLight position={[-6, 3, -12]} intensity={0.5} color="#ff9933" />
    </group>
  );
};

export default SpaceEnvironment;