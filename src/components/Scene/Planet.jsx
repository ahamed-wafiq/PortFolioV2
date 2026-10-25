import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { generateVoxelPlanetData, generateVoxelRingData } from './voxelPlanetData';

const Planet = ({
  type = 'oceanic', // 'oceanic' | 'lava' | 'desert' | 'emerald' | 'moon' | 'gasGiant'
  radius = 5,
  position = [0, 0, -20],
  // Passing Flight Corridor Mode (Forward Space Travel Simulation)
  passingFlight = false,
  flightSpeed = 4.2,      // Forward travel velocity
  zStart = -140,          // Emerges in deep distance
  zEnd = 10,              // Passes safely behind the cockpit
  baseX = 9.0,            // Dedicated lateral corridor (Port or Starboard)
  baseY = 1.0,            // Dedicated vertical corridor
  lateralDrift = 2.5,     // Outward drift as spacecraft flies past
  initialZ,               // Initial staggered Z position
  // Dynamic Horizontal & Vertical Harmonic Movement
  moveSpeedX = 0.22,
  moveRangeX = 5.0,
  moveSpeedY = 0.12,
  moveRangeY = 1.2,
  movePhase = 0,
  continuousCruise = false,
  cruiseSpeed = 0.8,
  cruiseBoundsX = [-18, 18],
  // Satellite Orbiting mode
  isOrbiting = false,
  orbitCenter = [0, 0, -20],
  orbitRadius = [6.5, 3.2],
  orbitSpeed = 0.45,
  // Rotation & Atmosphere
  rotationSpeed = 0.015,
  atmosphereColor = '#FF8A1F',
  atmosphereOpacity = 0.35,
  atmosphereScale = 1.08,
  emissiveColor = '#501c04',
  emissiveIntensity = 0.25,
  hasRings = false,
  ringsConfig,
  reducedMotion,
}) => {
  const groupRef = useRef();
  const surfaceRef = useRef();
  const ringsRef = useRef();
  const currentX = useRef(position[0]);
  const currentZ = useRef(initialZ !== undefined ? initialZ : position[2]);

  // 1. Generate 3D Voxel Survival Planet block data
  const planetData = useMemo(() => {
    return generateVoxelPlanetData(type, radius);
  }, [type, radius]);

  // 2. Build Terrain InstancedMesh (dirt, grass, water, sand, snow, wood, leaves, stone)
  const terrainMesh = useMemo(() => {
    if (!planetData.terrainBlocks || !planetData.terrainBlocks.length) return null;
    const count = planetData.terrainBlocks.length;
    const size = planetData.blockSize;
    const geo = new THREE.BoxGeometry(size, size, size);
    const mat = new THREE.MeshStandardMaterial({
      roughness: 0.82,
      metalness: 0.08,
      flatShading: true,
    });
    const mesh = new THREE.InstancedMesh(geo, mat, count);
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    planetData.terrainBlocks.forEach((b, i) => {
      dummy.position.set(b.x * size, b.y * size, b.z * size);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      color.set(b.color);
      mesh.setColorAt(i, color);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    return mesh;
  }, [planetData]);

  // 3. Build Glowing InstancedMesh (molten lava, warm lit cabin windows, cyan soul torches, purple ender crystals)
  const glowMesh = useMemo(() => {
    if (!planetData.glowBlocks || !planetData.glowBlocks.length) return null;
    const count = planetData.glowBlocks.length;
    const size = planetData.blockSize;
    const geo = new THREE.BoxGeometry(size, size, size);
    const mat = new THREE.MeshStandardMaterial({
      roughness: 0.2,
      metalness: 0.05,
      emissive: '#ffffff',
      emissiveIntensity: 2.8,
      toneMapped: false,
      flatShading: true,
    });
    const mesh = new THREE.InstancedMesh(geo, mat, count);
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    planetData.glowBlocks.forEach((b, i) => {
      dummy.position.set(b.x * size, b.y * size, b.z * size);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      color.set(b.emissive || b.color);
      mesh.setColorAt(i, color);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    return mesh;
  }, [planetData]);

  // 4. Build 3D Voxel Asteroid Belt Rings for ringed planets
  const ringMesh = useMemo(() => {
    if (!hasRings) return null;
    const innerR = ringsConfig?.innerRadius || radius * 1.35;
    const outerR = ringsConfig?.outerRadius || radius * 2.3;
    const ringAsteroids = generateVoxelRingData(innerR, outerR, 130);

    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshStandardMaterial({
      roughness: 0.75,
      metalness: 0.15,
      flatShading: true,
    });
    const mesh = new THREE.InstancedMesh(geo, mat, ringAsteroids.length);
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    ringAsteroids.forEach((a, i) => {
      dummy.position.set(a.x, a.y, a.z);
      dummy.scale.set(a.size, a.size, a.size);
      dummy.rotation.set(a.x * 0.4, a.y * 0.4, a.z * 0.4);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      color.set(a.color);
      mesh.setColorAt(i, color);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    return mesh;
  }, [hasRings, ringsConfig, radius]);

  // =========================================================================
  // MOVEMENT SYSTEM - KEPT STRICTLY IDENTICAL (NO CHANGE IN FLIGHT / MOVEMENT)
  // =========================================================================
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    if (reducedMotion) {
      groupRef.current.position.set(position[0], position[1], position[2]);
      return;
    }

    // === CONTINUOUS NOTICEABLE PASSING FLIGHT (FORWARD TRAVEL) ===
    if (passingFlight) {
      // Advance continuously forward as spacecraft travels through space
      currentZ.current += delta * flightSpeed;
      if (currentZ.current > zEnd) {
        currentZ.current = zStart;
      }

      // As the planet approaches and passes the cockpit, it smoothly drifts outward to the side
      const progress = Math.max(0, Math.min(1, (currentZ.current - zStart) / (zEnd - zStart)));
      const outward = (baseX >= 0 ? 1 : -1) * (progress * lateralDrift);
      const posX = baseX + outward;
      const posY = baseY + Math.sin(currentZ.current * 0.04) * 0.4;

      groupRef.current.position.set(posX, posY, currentZ.current);
    } else if (isOrbiting) {
      // 3D elliptical orbit around an orbital center
      const angle = t * orbitSpeed + movePhase;
      groupRef.current.position.x = orbitCenter[0] + Math.sin(angle) * orbitRadius[0];
      groupRef.current.position.y = orbitCenter[1] + Math.cos(angle) * (orbitRadius[1] * 0.45);
      groupRef.current.position.z = orbitCenter[2] + Math.cos(angle) * (orbitRadius[1] * 0.85);
    } else if (continuousCruise) {
      // Continuously cruising across the windshield corridor
      currentX.current += delta * cruiseSpeed;
      if (cruiseSpeed > 0 && currentX.current > cruiseBoundsX[1]) {
        currentX.current = cruiseBoundsX[0];
      } else if (cruiseSpeed < 0 && currentX.current < cruiseBoundsX[0]) {
        currentX.current = cruiseBoundsX[1];
      }
      groupRef.current.position.x = currentX.current;
      groupRef.current.position.y = position[1] + Math.sin(t * moveSpeedY + movePhase) * moveRangeY;
      groupRef.current.position.z = position[2] + Math.cos(t * 0.15) * 0.5;
    } else {
      // Harmonic sweeping left and right
      const posX = position[0] + Math.sin(t * moveSpeedX + movePhase) * moveRangeX;
      const posY = position[1] + Math.cos(t * moveSpeedY + movePhase) * moveRangeY;
      const posZ = position[2] + Math.sin(t * (moveSpeedX * 0.5)) * 0.6;
      groupRef.current.position.set(posX, posY, posZ);
    }

    // Planet axial rotation (spins entire voxel sphere + trees + cabin + castle)
    if (surfaceRef.current) {
      surfaceRef.current.rotation.y += delta * rotationSpeed;
    }
    // Planetary rings rotation
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * (rotationSpeed * 0.4);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* 3D Voxel Planet Surface & Structures */}
      <group ref={surfaceRef}>
        {terrainMesh && <primitive object={terrainMesh} />}
        {glowMesh && <primitive object={glowMesh} />}
      </group>


      {/* Planetary 3D Voxel Ring */}
      {hasRings && ringMesh && (
        <group
          ref={ringsRef}
          rotation={ringsConfig?.rotation || [Math.PI * 0.38, -0.2, 0.3]}
        >
          <primitive object={ringMesh} />
        </group>
      )}
    </group>
  );
};

export default Planet;