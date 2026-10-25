import React from 'react';
import Planet from './Planet';





const PlanetSystem = ({ reducedMotion }) => {
  return (
    <group>
      {/* ================================================================= */}
      {/* PASSING PLANETS FLEET: CONTINUOUS FORWARD PASSING LEFT & RIGHT   */}
      {/* Corridors are strictly non-overlapping and collision-free:       */}
      {/* Port Lanes (Left): X <= -8.8 | Starboard Lanes (Right): X >= 8.4  */}
      {/* Central Corridor (|X| < 4.5) is strictly reserved for spaceship  */}
      {/* ================================================================= */}

      {/* ================================================================= */}
      {/* 1. STARBOARD MID: PRIMARY AMBER GAS GIANT (WITH VOXEL RING)       */}
      {/* ================================================================= */}
      <Planet
        type="gasGiant"
        radius={3.5}
        passingFlight
        flightSpeed={3.6}
        baseX={6.4}
        baseY={0.6}
        lateralDrift={1.8}
        initialZ={-16}
        zStart={-140}
        zEnd={10}
        rotationSpeed={0.012}
        atmosphereColor="#f97316"
        atmosphereOpacity={0.28}
        atmosphereScale={1.08}
        hasRings
        ringsConfig={{
          innerRadius: 4.2,
          outerRadius: 7.2,
          rotation: [Math.PI * 0.38, -0.22, 0.42],
        }}
        reducedMotion={reducedMotion}
      />

      {/* ================================================================= */}
      {/* 2. PORT HIGH: VOLCANIC NETHER FORTRESS PLANET                     */}
      {/* ================================================================= */}
      <Planet
        type="lava"
        radius={2.2}
        passingFlight
        flightSpeed={3.8}
        baseX={-10.5}
        baseY={2.8}
        lateralDrift={2.8}
        initialZ={-38}
        zStart={-140}
        zEnd={10}
        rotationSpeed={0.016}
        emissiveColor="#ff3d00"
        emissiveIntensity={0.25}
        atmosphereColor="#ef4444"
        atmosphereOpacity={0.25}
        reducedMotion={reducedMotion}
      />

      {/* ================================================================= */}
      {/* 3. STARBOARD LOW: GOLDEN DESERT SANDSTONE & CACTUS WORLD          */}
      {/* ================================================================= */}
      <Planet
        type="desert"
        radius={1.8}
        passingFlight
        flightSpeed={3.6}
        baseX={9.4}
        baseY={-2.8}
        lateralDrift={2.2}
        initialZ={-62}
        zStart={-140}
        zEnd={10}
        rotationSpeed={0.014}
        emissiveColor="#3d362c"
        emissiveIntensity={0.15}
        atmosphereColor="#fbbf24"
        atmosphereOpacity={0.22}
        reducedMotion={reducedMotion}
      />

      {/* ================================================================= */}
      {/* 4. PORT LOW: OVERWORLD SURVIVAL PLANET (CABIN, TREES, RIVER)      */}
      {/* ================================================================= */}
      <Planet
        type="oceanic"
        radius={2.0}
        passingFlight
        flightSpeed={4.0}
        baseX={-9.8}
        baseY={-2.4}
        lateralDrift={2.5}
        initialZ={-86}
        zStart={-140}
        zEnd={10}
        rotationSpeed={0.018}
        emissiveColor="#151b26"
        emissiveIntensity={0.15}
        atmosphereColor="#60a5fa"
        atmosphereOpacity={0.25}
        reducedMotion={reducedMotion}
      />

      {/* ================================================================= */}
      {/* 5. STARBOARD HIGH: END / MOON WORLD (OBSIDIAN PILLARS & CRYSTALS) */}
      {/* ================================================================= */}
      <Planet
        type="moon"
        radius={1.5}
        passingFlight
        flightSpeed={3.8}
        baseX={10.2}
        baseY={3.2}
        lateralDrift={2.4}
        initialZ={-110}
        zStart={-140}
        zEnd={10}
        rotationSpeed={0.022}
        emissiveColor="#1a1816"
        atmosphereColor="#c084fc"
        atmosphereOpacity={0.22}
        reducedMotion={reducedMotion}
      />

      {/* ================================================================= */}
      {/* 6. PORT MID: TROPICAL JUNGLE ISLAND (GIANT PALM TREES & CLOUDS)   */}
      {/* ================================================================= */}
      <Planet
        type="emerald"
        radius={2.4}
        passingFlight
        flightSpeed={4.0}
        baseX={-11.2}
        baseY={0.5}
        lateralDrift={3.0}
        initialZ={-134}
        zStart={-140}
        zEnd={10}
        rotationSpeed={0.016}
        emissiveColor="#131c17"
        emissiveIntensity={0.15}
        atmosphereColor="#34d399"
        atmosphereOpacity={0.24}
        reducedMotion={reducedMotion}
      />



    </group>
  );
};

export default PlanetSystem;