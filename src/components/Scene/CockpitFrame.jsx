import React, { useMemo } from 'react';
import * as THREE from 'three';

const CockpitFrame = () => {
  const frameMat = { color: '#161920', roughness: 0.7, metalness: 0.5 };
  const trimMat = { color: '#252a35', roughness: 0.5, metalness: 0.65 };
  const darkMat = { color: '#0b0d12', roughness: 0.85, metalness: 0.4 };

  const orangeLampMat = {
    color: '#ffb84d',
    emissive: '#ff8a1f',
    emissiveIntensity: 1.8,
    toneMapped: false,
  };

  const canopyCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.4, 2.3, -3.8),
      new THREE.Vector3(-1.8, 2.95, -3.95),
      new THREE.Vector3(0.75, 3.1, -4.0),
      new THREE.Vector3(3.2, 2.95, -3.95),
      new THREE.Vector3(4.8, 2.3, -3.8),
    ]);
  }, []);

  return (
    <group>
      {/* === LEFT A-PILLAR === */}
      <mesh position={[-3.3, 0.7, -3.8]} rotation={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.14, 0.2, 4.4, 16]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>
      <mesh position={[-3.15, 0.7, -3.65]} rotation={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.04, 0.05, 4.0, 8]} />
        <meshStandardMaterial {...trimMat} />
      </mesh>
      <mesh position={[-3.45, 0.7, -3.92]} rotation={[0, 0, 0.08]}>
        <boxGeometry args={[0.15, 4.2, 0.2]} />
        <meshStandardMaterial {...darkMat} />
      </mesh>

      {/* Pillar Amber Light Strip - Left */}
      <mesh position={[-3.18, 0.7, -3.58]} rotation={[0, 0, 0.08]}>
        <boxGeometry args={[0.02, 3.4, 0.03]} />
        <meshStandardMaterial {...orangeLampMat} />
      </mesh>

      {/* Pillar Status Light Blocks - Left (like the reference image) */}
      {[-0.6, 0.4, 1.4].map((y, i) => (
        <mesh key={i} position={[-3.08, y, -3.6]} rotation={[0, 0, 0.08]}>
          <boxGeometry args={[0.08, 0.22, 0.08]} />
          <meshStandardMaterial {...orangeLampMat} />
        </mesh>
      ))}

      {/* === RIGHT A-PILLAR === */}
      <mesh position={[4.8, 0.7, -3.8]} rotation={[0, 0, -0.08]}>
        <cylinderGeometry args={[0.14, 0.2, 4.4, 16]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>
      <mesh position={[4.65, 0.7, -3.65]} rotation={[0, 0, -0.08]}>
        <cylinderGeometry args={[0.04, 0.05, 4.0, 8]} />
        <meshStandardMaterial {...trimMat} />
      </mesh>
      <mesh position={[4.95, 0.7, -3.92]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[0.15, 4.2, 0.2]} />
        <meshStandardMaterial {...darkMat} />
      </mesh>

      {/* Pillar Amber Light Strip - Right */}
      <mesh position={[4.68, 0.7, -3.58]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[0.02, 3.4, 0.03]} />
        <meshStandardMaterial {...orangeLampMat} />
      </mesh>

      {/* Pillar Status Light Blocks - Right */}
      {[-0.6, 0.4, 1.4].map((y, i) => (
        <mesh key={i} position={[4.58, y, -3.6]} rotation={[0, 0, -0.08]}>
          <boxGeometry args={[0.08, 0.22, 0.08]} />
          <meshStandardMaterial {...orangeLampMat} />
        </mesh>
      ))}

      {/* === TOP CANOPY ARCH === */}
      <mesh>
        <tubeGeometry args={[canopyCurve, 48, 0.12, 12, false]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>
      <mesh position={[0, -0.02, 0.12]}>
        <tubeGeometry args={[canopyCurve, 48, 0.04, 8, false]} />
        <meshStandardMaterial {...trimMat} />
      </mesh>

      {/* Overhead Rectangular Lamps (Matching the 4 amber roof lights in the image) */}
      {[
        { x: -1.6, y: 2.85, z: -3.9, rot: 0.12 },
        { x: -0.4, y: 3.02, z: -3.98, rot: 0.03 },
        { x: 1.8, y: 3.02, z: -3.98, rot: -0.03 },
        { x: 3.0, y: 2.85, z: -3.9, rot: -0.12 },
      ].map((lamp, i) => (
        <group key={i} position={[lamp.x, lamp.y, lamp.z]} rotation={[0, 0, lamp.rot]}>
          {/* Lamp bezel */}
          <mesh>
            <boxGeometry args={[0.55, 0.14, 0.1]} />
            <meshStandardMaterial {...darkMat} />
          </mesh>
          {/* Glowing amber lamp element */}
          <mesh position={[0, -0.02, 0.03]}>
            <boxGeometry args={[0.48, 0.09, 0.06]} />
            <meshStandardMaterial {...orangeLampMat} />
          </mesh>
        </group>
      ))}

      {/* === BOTTOM SILL === */}
      <mesh position={[0.75, -0.85, -3.6]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[8.6, 0.24, 0.65]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>
      <mesh position={[0.75, -0.72, -3.88]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[8.4, 0.05, 0.1]} />
        <meshStandardMaterial {...trimMat} />
      </mesh>

      {/* === SIDE WALLS === */}
      <mesh position={[-3.6, 0.5, -1.5]}>
        <boxGeometry args={[0.3, 4.5, 4.5]} />
        <meshStandardMaterial {...darkMat} />
      </mesh>
      <mesh position={[5.1, 0.5, -1.5]}>
        <boxGeometry args={[0.3, 4.5, 4.5]} />
        <meshStandardMaterial {...darkMat} />
      </mesh>

      {/* === CEILING === */}
      <mesh position={[0.75, 3.0, -1]}>
        <boxGeometry args={[8.8, 0.2, 5.5]} />
        <meshStandardMaterial {...darkMat} />
      </mesh>
    </group>
  );
};

export default CockpitFrame;