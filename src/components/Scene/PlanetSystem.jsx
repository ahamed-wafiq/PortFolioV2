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
      {/* 1. STARBOARD MID: PRIMARY AMBER GAS GIANT (WITH TILTED RINGS) */}
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
        atmosphereColor="#ff8a1f"
        atmosphereOpacity={0.48}
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
      {/* 2. PORT HIGH: VOLCANIC CRIMSON / LAVA PLANET                      */}
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
        emissiveColor="#b82000"
        emissiveIntensity={0.35}
        atmosphereColor="#ff5500"
        atmosphereOpacity={0.35}
        reducedMotion={reducedMotion}
      />

      {/* ================================================================= */}
      {/* 3. STARBOARD LOW: GOLDEN DESERT TERRESTRIAL WORLD                 */}
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
        emissiveColor="#573718"
        emissiveIntensity={0.25}
        atmosphereColor="#ffb84d"
        atmosphereOpacity={0.3}
        reducedMotion={reducedMotion}
      />

      {/* ================================================================= */}
      {/* 4. PORT LOW: AZURE OCEANIC PLANET / MOON                          */}
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
        emissiveColor="#042038"
        emissiveIntensity={0.2}
        atmosphereColor="#38ada9"
        atmosphereOpacity={0.38}
        reducedMotion={reducedMotion}
      />

      {/* ================================================================= */}
      {/* 5. STARBOARD HIGH: CRATERED ROCKY MOON WORLD                      */}
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
        emissiveColor="#201c18"
        atmosphereColor="#e0d6cb"
        atmosphereOpacity={0.22}
        reducedMotion={reducedMotion}
      />

      {/* ================================================================= */}
      {/* 6. PORT MID: EMERALD AURORA GAS GIANT                             */}
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
        emissiveColor="#062e24"
        emissiveIntensity={0.3}
        atmosphereColor="#2ecc71"
        atmosphereOpacity={0.36}
        reducedMotion={reducedMotion}
      />



    </group>
  );
};

export default PlanetSystem;