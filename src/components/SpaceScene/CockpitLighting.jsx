import React from 'react';

/**
 * CockpitLighting — Interior lighting rig for the cockpit.
 * 
 * Designed to reveal dark cockpit geometry clearly against the dark background.
 * Uses a combination of:
 * - Ambient base fill
 * - Key directional (simulating external light through windshield)
 * - Interior overhead (cabin light)
 * - Subtle dashboard uplighting
 */
const CockpitLighting = () => {
  return (
    <group>
      {/* Base ambient — keeps all surfaces minimally visible */}
      <ambientLight intensity={0.45} />

      {/* Key light — external starlight coming through the windshield */}
      <directionalLight 
        position={[4, 6, -8]} 
        intensity={1.3} 
        color="#e0e0f0" 
      />

      {/* Secondary fill — softer, from the opposite direction */}
      <directionalLight 
        position={[-3, 2, -6]} 
        intensity={0.4} 
        color="#a0a0b0" 
      />

      {/* Interior overhead — simulates cabin ceiling light */}
      <pointLight 
        position={[0, 3, -1]} 
        intensity={0.7} 
        color="#c0c0d0" 
        distance={10} 
        decay={2} 
      />

      {/* Dashboard underside uplighting — subtle blue tint */}
      <pointLight 
        position={[0, -1.5, -2.5]} 
        intensity={0.3} 
        color="#6080a0" 
        distance={6} 
        decay={2} 
      />

      {/* Left console area light */}
      <pointLight 
        position={[-3.5, 0, -1]} 
        intensity={0.15} 
        color="#80a0b0" 
        distance={5} 
        decay={2} 
      />

      {/* Right console area light */}
      <pointLight 
        position={[3.5, 0, -1]} 
        intensity={0.15} 
        color="#80a0b0" 
        distance={5} 
        decay={2} 
      />
    </group>
  );
};

export default CockpitLighting;
