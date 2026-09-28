import React, { useMemo } from 'react';
import * as THREE from 'three';

const Windshield = () => {
  const glassShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-3.0, -0.7);
    shape.lineTo(-2.2, 2.5);
    shape.quadraticCurveTo(0.75, 3.15, 3.7, 2.5);
    shape.lineTo(4.5, -0.7);
    shape.lineTo(-3.0, -0.7);
    return shape;
  }, []);

  return (
    <group>
      {/* === MAIN WINDSHIELD GLASS === */}
      <mesh position={[0, 0, -3.9]} rotation={[0.03, 0, 0]}>
        <shapeGeometry args={[glassShape]} />
        <meshPhysicalMaterial
          color="#8ab8d8"
          transparent
          opacity={0.07}
          roughness={0.03}
          metalness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          envMapIntensity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* === GLASS INTERIOR REFLECTION LAYER === */}
      <mesh position={[0, 0, -3.84]} rotation={[0.03, 0, 0]}>
        <shapeGeometry args={[glassShape]} />
        <meshBasicMaterial
          color="#4a8ab0"
          transparent
          opacity={0.025}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* === WINDSHIELD EDGE HIGHLIGHTS === */}
      {/* Top edge */}
      <mesh position={[0.75, 2.72, -3.88]}>
        <boxGeometry args={[6.5, 0.015, 0.035]} />
        <meshStandardMaterial
          color="#40c8ff"
          emissive="#40c8ff"
          emissiveIntensity={0.2}
          transparent
          opacity={0.55}
          toneMapped={false}
        />
      </mesh>
      {/* Bottom edge */}
      <mesh position={[0.75, -0.68, -3.88]}>
        <boxGeometry args={[7.4, 0.015, 0.035]} />
        <meshStandardMaterial
          color="#40c8ff"
          emissive="#40c8ff"
          emissiveIntensity={0.15}
          transparent
          opacity={0.45}
          toneMapped={false}
        />
      </mesh>
      {/* Left edge */}
      <mesh position={[-2.6, 0.9, -3.88]} rotation={[0, 0, 0.24]}>
        <boxGeometry args={[0.015, 3.5, 0.035]} />
        <meshStandardMaterial
          color="#40c8ff"
          emissive="#40c8ff"
          emissiveIntensity={0.12}
          transparent
          opacity={0.35}
          toneMapped={false}
        />
      </mesh>
      {/* Right edge */}
      <mesh position={[4.1, 0.9, -3.88]} rotation={[0, 0, -0.24]}>
        <boxGeometry args={[0.015, 3.5, 0.035]} />
        <meshStandardMaterial
          color="#40c8ff"
          emissive="#40c8ff"
          emissiveIntensity={0.12}
          transparent
          opacity={0.35}
          toneMapped={false}
        />
      </mesh>

      {/* === FAINT HUD REFLECTIONS ON GLASS === */}
      {/* Horizontal targeting line */}
      <mesh position={[1.5, 1.85, -3.82]} rotation={[0.03, 0, 0]}>
        <boxGeometry args={[2.8, 0.006, 0.008]} />
        <meshStandardMaterial
          color="#00e8ff"
          emissive="#00e8ff"
          emissiveIntensity={0.15}
          transparent
          opacity={0.25}
          toneMapped={false}
        />
      </mesh>
      {/* HUD bracket — top-left */}
      <mesh position={[0.25, 2.05, -3.82]}>
        <boxGeometry args={[0.25, 0.004, 0.006]} />
        <meshStandardMaterial
          color="#00e8ff"
          emissive="#00e8ff"
          emissiveIntensity={0.1}
          transparent
          opacity={0.2}
          toneMapped={false}
        />
      </mesh>
      {/* HUD bracket — bottom-left */}
      <mesh position={[0.25, 1.65, -3.82]}>
        <boxGeometry args={[0.25, 0.004, 0.006]} />
        <meshStandardMaterial
          color="#00e8ff"
          emissive="#00e8ff"
          emissiveIntensity={0.1}
          transparent
          opacity={0.2}
          toneMapped={false}
        />
      </mesh>
      {/* HUD bracket — left vertical */}
      <mesh position={[0.1, 1.85, -3.82]}>
        <boxGeometry args={[0.004, 0.42, 0.006]} />
        <meshStandardMaterial
          color="#00e8ff"
          emissive="#00e8ff"
          emissiveIntensity={0.1}
          transparent
          opacity={0.2}
          toneMapped={false}
        />
      </mesh>
      {/* HUD bracket — right vertical */}
      <mesh position={[0.4, 1.85, -3.82]}>
        <boxGeometry args={[0.004, 0.42, 0.006]} />
        <meshStandardMaterial
          color="#00e8ff"
          emissive="#00e8ff"
          emissiveIntensity={0.1}
          transparent
          opacity={0.2}
          toneMapped={false}
        />
      </mesh>
      {/* Small HUD cross-hair center dot */}
      <mesh position={[0.25, 1.85, -3.81]}>
        <circleGeometry args={[0.015, 8]} />
        <meshStandardMaterial
          color="#00e8ff"
          emissive="#00e8ff"
          emissiveIntensity={0.12}
          transparent
          opacity={0.18}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

export default Windshield;