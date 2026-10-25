import React from 'react';
import Planet from './Planet';

/**
 * PlanetSystem
 * Large, up-close Minecraft voxel survival planets cruising right past the cockpit windshield!
 * Radii increased significantly (up to 5.4 for gas giant, 3.6 for survival worlds)
 * and flight corridors brought nearer to the screen (zStart: -72, zEnd: 8) so detailed voxel blocks,
 * trees, cabins, castles, and cacti are prominently visible at all times!
 */
const PlanetSystem = ({ reducedMotion }) => {
  return (
    <group>
      {/* ================================================================= */}
      {/* 1. PORT LOW: OVERWORLD SURVIVAL PLANET (CABIN, PINE TREES, RIVER) */}
      {/* Large & up-close right outside the left windshield!              */}
      {/* ================================================================= */}
      <Planet
        type="oceanic"
        radius={3.6}
        passingFlight
        flightSpeed={3.4}
        baseX={-5.8}
        baseY={-1.2}
        lateralDrift={1.4}
        initialZ={-10}
        zStart={-72}
        zEnd={8}
        rotationSpeed={0.016}
        emissiveColor="#151b26"
        emissiveIntensity={0.15}
        reducedMotion={reducedMotion}
      />

      {/* ================================================================= */}
      {/* 2. STARBOARD MID: GIANT AMBER VOXEL PLANET (WITH ASTEROID RING)   */}
      {/* Massive Saturn-scale voxel ringed world                          */}
      {/* ================================================================= */}
      <Planet
        type="gasGiant"
        radius={5.4}
        passingFlight
        flightSpeed={3.2}
        baseX={6.4}
        baseY={0.6}
        lateralDrift={1.6}
        initialZ={-24}
        zStart={-72}
        zEnd={8}
        rotationSpeed={0.012}
        hasRings
        ringsConfig={{
          innerRadius: 6.8,
          outerRadius: 11.2,
          rotation: [Math.PI * 0.38, -0.22, 0.42],
        }}
        reducedMotion={reducedMotion}
      />

      {/* ================================================================= */}
      {/* 3. PORT HIGH: VOLCANIC NETHER FORTRESS PLANET (GLOWING LAVA)      */}
      {/* Towering gothic castle, magma cracks, and soul fire torches       */}
      {/* ================================================================= */}
      <Planet
        type="lava"
        radius={3.5}
        passingFlight
        flightSpeed={3.5}
        baseX={-6.8}
        baseY={2.2}
        lateralDrift={1.5}
        initialZ={-36}
        zStart={-72}
        zEnd={8}
        rotationSpeed={0.015}
        emissiveColor="#ff3d00"
        emissiveIntensity={0.25}
        reducedMotion={reducedMotion}
      />

      {/* ================================================================= */}
      {/* 4. STARBOARD LOW: GOLDEN DESERT SANDSTONE WORLD (CACTI & PYRAMID) */}
      {/* Sandstone temple spire, dunes, and green saguaro cacti            */}
      {/* ================================================================= */}
      <Planet
        type="desert"
        radius={3.2}
        passingFlight
        flightSpeed={3.3}
        baseX={6.0}
        baseY={-2.0}
        lateralDrift={1.4}
        initialZ={-48}
        zStart={-72}
        zEnd={8}
        rotationSpeed={0.014}
        emissiveColor="#3d362c"
        emissiveIntensity={0.15}
        reducedMotion={reducedMotion}
      />

      {/* ================================================================= */}
      {/* 5. PORT MID: TROPICAL JUNGLE ISLAND (GIANT PALM TREES & CLOUDS)   */}
      {/* Lush canopy, turquoise shores, and spreading palm leaves          */}
      {/* ================================================================= */}
      <Planet
        type="emerald"
        radius={3.6}
        passingFlight
        flightSpeed={3.5}
        baseX={-6.2}
        baseY={0.5}
        lateralDrift={1.4}
        initialZ={-60}
        zStart={-72}
        zEnd={8}
        rotationSpeed={0.015}
        emissiveColor="#131c17"
        emissiveIntensity={0.15}
        reducedMotion={reducedMotion}
      />

      {/* ================================================================= */}
      {/* 6. STARBOARD HIGH: END / MOON WORLD (OBSIDIAN PILLARS & CRYSTALS) */}
      {/* Endstone terrain, tall black pillars, glowing purple crystals     */}
      {/* ================================================================= */}
      <Planet
        type="moon"
        radius={2.8}
        passingFlight
        flightSpeed={3.4}
        baseX={6.6}
        baseY={2.4}
        lateralDrift={1.3}
        initialZ={-72}
        zStart={-72}
        zEnd={8}
        rotationSpeed={0.02}
        emissiveColor="#1a1816"
        reducedMotion={reducedMotion}
      />
    </group>
  );
};

export default PlanetSystem;