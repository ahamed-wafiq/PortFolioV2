import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Continuous forward-travelling warp star stream
const WarpStarStream = ({
  count = 900,
  speed = 18,
  zMin = -130,
  zMax = 2,
  spreadX = 75,
  spreadY = 50,
  size = 0.08,
  color = '#fff0d0',
  opacity = 0.85,
  reducedMotion,
}) => {
  const pointsRef = useRef();

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Cylindrical / radial distribution leaving center path clear for viewing
      const angle = Math.random() * Math.PI * 2;
      const radius = 4 + Math.random() * (spreadX * 0.5);

      pos[idx] = Math.cos(angle) * radius;
      pos[idx + 1] = Math.sin(angle) * (radius * (spreadY / spreadX));
      pos[idx + 2] = THREE.MathUtils.lerp(zMin, zMax, Math.random());

      // Varied forward travel speeds
      spd[i] = speed * (0.65 + Math.random() * 0.7);
    }
    return { positions: pos, speeds: spd };
  }, [count, speed, zMin, zMax, spreadX, spreadY]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const array = posAttr.array;

    for (let i = 0; i < count; i++) {
      const zIdx = i * 3 + 2;
      array[zIdx] += delta * speeds[i];

      // Seamless wrap-around when passing the cockpit
      if (array[zIdx] > zMax) {
        array[zIdx] = zMin;
        // Re-randomize slightly around the horizon
        const angle = Math.random() * Math.PI * 2;
        const radius = 3.5 + Math.random() * (spreadX * 0.5);
        array[i * 3] = Math.cos(angle) * radius;
        array[i * 3 + 1] = Math.sin(angle) * (radius * (spreadY / spreadX));
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </points>
  );
};

// Fast warp streak space dust (whizzing close past the windshield)
const WarpSpaceDust = ({ count = 300, speed = 32, reducedMotion }) => {
  const pointsRef = useRef();

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pos[idx] = (Math.random() - 0.5) * 35;
      pos[idx + 1] = (Math.random() - 0.5) * 22;
      pos[idx + 2] = -70 + Math.random() * 70;
      spd[i] = speed * (0.8 + Math.random() * 0.5);
    }
    return { positions: pos, speeds: spd };
  }, [count, speed]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const array = posAttr.array;

    for (let i = 0; i < count; i++) {
      const zIdx = i * 3 + 2;
      array[zIdx] += delta * speeds[i];

      if (array[zIdx] > 1.5) {
        array[zIdx] = -70;
        array[i * 3] = (Math.random() - 0.5) * 35;
        array[i * 3 + 1] = (Math.random() - 0.5) * 22;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ff8a1f"
        size={0.09}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
};

// Deep static background stars with subtle parallax
const DeepCosmicStars = ({ count = 800, reducedMotion }) => {
  const ref = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pos[idx] = (Math.random() - 0.5) * 160;
      pos[idx + 1] = (Math.random() - 0.5) * 110;
      pos[idx + 2] = -160 + Math.random() * 40;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!ref.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.008) * 0.008;
    ref.current.rotation.x = Math.cos(t * 0.006) * 0.006;
  });

  return (
    <points ref={ref} frustumCulled>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffb84d"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
};

const StarField = ({ reducedMotion }) => {
  return (
    <group>
      {/* Deep celestial starfield background */}
      <DeepCosmicStars count={750} reducedMotion={reducedMotion} />

      {/* Main forward-streaming starfield (warm cream & golden stars) */}
      <WarpStarStream
        count={850}
        speed={16}
        zMin={-120}
        zMax={1.5}
        spreadX={70}
        spreadY={45}
        size={0.075}
        color="#fff0d0"
        opacity={0.9}
        reducedMotion={reducedMotion}
      />

      {/* Amber glowing warp dust streaming forward */}
      <WarpStarStream
        count={420}
        speed={22}
        zMin={-90}
        zMax={1.5}
        spreadX={55}
        spreadY={35}
        size={0.085}
        color="#ffb84d"
        opacity={0.8}
        reducedMotion={reducedMotion}
      />

      {/* Fast orange warp dust particles whizzing close to windshield */}
      <WarpSpaceDust count={280} speed={34} reducedMotion={reducedMotion} />
    </group>
  );
};

export default StarField;