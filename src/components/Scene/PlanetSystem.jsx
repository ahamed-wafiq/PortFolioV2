import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import Planet from './Planet';

// Continuous passing voxel asteroid with independent travel speed and multi-axis tumbling (Layer 3: Asteroids)
const PassingVoxelAsteroid = ({
  initialPos,
  speed = 14,
  zStart = -75,
  zEnd = 4,
  scale = 1,
  rotationSpeed = [0.012, 0.018, 0.009],
  reducedMotion,
}) => {
  const meshRef = useRef();
  const currentZ = useRef(initialPos[2]);
  const posX = useRef(initialPos[0]);
  const posY = useRef(initialPos[1]);

  // Procedural voxel cluster for distinct faceted asteroid silhouette
  const voxelData = useMemo(() => {
    const coords = [];
    const r = 2.2;
    for (let x = -2; x <= 2; x++) {
      for (let y = -2; y <= 2; y++) {
        for (let z = -2; z <= 2; z++) {
          const dist = Math.sqrt(x * x + y * y + z * z);
          if (dist <= r && (dist < 1.75 || Math.sin(x * 3 + y * 2 + z) > -0.25)) {
            coords.push([x * 0.45, y * 0.45, z * 0.45]);
          }
        }
      }
    }
    return coords;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;

    // Move forward continuously toward the viewer
    currentZ.current += delta * speed;
    // Drift slightly from right/front toward left/back as requested
    posX.current -= delta * (speed * 0.04);

    if (currentZ.current > zEnd) {
      currentZ.current = zStart;
      posX.current = initialPos[0] + (Math.random() - 0.5) * 3;
      posY.current = initialPos[1] + (Math.random() - 0.5) * 2;
    }

    meshRef.current.position.set(posX.current, posY.current, currentZ.current);

    // Tumbling rotation
    meshRef.current.rotation.x += delta * rotationSpeed[0];
    meshRef.current.rotation.y += delta * rotationSpeed[1];
    meshRef.current.rotation.z += delta * rotationSpeed[2];
  });

  return (
    <group ref={meshRef} position={initialPos} scale={scale}>
      {voxelData.map(([vx, vy, vz], i) => (
        <mesh key={i} position={[vx, vy, vz]}>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          <meshStandardMaterial
            color="#3a2516"
            roughness={0.8}
            metalness={0.2}
            emissive="#ff8a1f"
            emissiveIntensity={0.16}
          />
        </mesh>
      ))}
    </group>
  );
};



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
        radius={2.8}
        passingFlight
        flightSpeed={3.6}
        baseX={10.2}
        baseY={0.8}
        lateralDrift={2.6}
        initialZ={-16}
        zStart={-140}
        zEnd={10}
        rotationSpeed={0.012}
        atmosphereColor="#ff8a1f"
        atmosphereOpacity={0.42}
        atmosphereScale={1.08}
        hasRings
        ringsConfig={{
          innerRadius: 3.5,
          outerRadius: 6.0,
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



      {/* ================================================================= */}
      {/* 8. PASSING VOXEL ASTEROIDS (SAFE INNER CORRIDOR: 3.4 <= |X| <= 4.8) */}
      {/* Passing in between spaceship and outer planet corridors           */}
      {/* ================================================================= */}
      {/* Port Inner Fast Asteroid */}
      <PassingVoxelAsteroid
        initialPos={[-3.8, -1.2, -22]}
        speed={26}
        scale={0.72}
        rotationSpeed={[-0.018, 0.024, -0.012]}
        reducedMotion={reducedMotion}
      />

      {/* Port Upper Asteroid */}
      <PassingVoxelAsteroid
        initialPos={[-4.2, 2.2, -38]}
        speed={19}
        scale={0.92}
        rotationSpeed={[0.014, 0.018, 0.008]}
        reducedMotion={reducedMotion}
      />

      {/* Starboard Inner Asteroid */}
      <PassingVoxelAsteroid
        initialPos={[3.8, 2.4, -30]}
        speed={22}
        scale={0.82}
        rotationSpeed={[-0.012, 0.016, -0.014]}
        reducedMotion={reducedMotion}
      />

      {/* Starboard Lower Asteroid */}
      <PassingVoxelAsteroid
        initialPos={[4.2, -2.2, -46]}
        speed={16}
        scale={1.05}
        rotationSpeed={[-0.008, 0.012, -0.006]}
        reducedMotion={reducedMotion}
      />

      {/* Port Distant Asteroid */}
      <PassingVoxelAsteroid
        initialPos={[-4.5, 3.4, -58]}
        speed={13}
        scale={0.98}
        rotationSpeed={[0.008, -0.012, 0.007]}
        reducedMotion={reducedMotion}
      />

      {/* Starboard Flank Asteroid */}
      <PassingVoxelAsteroid
        initialPos={[4.6, -1.5, -28]}
        speed={24}
        scale={0.68}
        rotationSpeed={[0.015, -0.012, 0.016]}
        reducedMotion={reducedMotion}
      />
    </group>
  );
};

export default PlanetSystem;