import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Technology Core Internal Scene
function CoreMesh({ pointerRef, activeTech }) {
  const groupRef = useRef(null);
  const coreRef = useRef(null);
  const energySphereRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const satellitesRef = useRef(null);
  const pointLightRef = useRef(null);

  // Geometric geometries & edges
  const { coreGeo, coreEdges, satelliteGeo, satelliteEdges, lineGeo } = useMemo(() => {
    // 1. Dark metallic low-poly icosahedron
    const cGeo = new THREE.IcosahedronGeometry(1.15, 0);
    const cEdges = new THREE.EdgesGeometry(cGeo);

    // 2. Small diamond satellites (6 nodes matching the 6 tech items)
    const satGeo = new THREE.OctahedronGeometry(0.1, 0);
    const satEdges = new THREE.EdgesGeometry(satGeo);

    // 3. Thin circuit lines connecting satellites to center
    const points = [];
    const radius = 1.6;
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle * 1.5) * 0.45;
      const z = Math.sin(angle) * radius;
      // Line from center offset to satellite position
      points.push(new THREE.Vector3(x * 0.3, y * 0.3, z * 0.3));
      points.push(new THREE.Vector3(x, y, z));
    }
    const lGeo = new THREE.BufferGeometry().setFromPoints(points);

    return {
      coreGeo: cGeo,
      coreEdges: cEdges,
      satelliteGeo: satGeo,
      satelliteEdges: satEdges,
      lineGeo: lGeo,
    };
  }, []);

  // Pre-calculate 6 satellite positions
  const satellites = useMemo(() => {
    const list = [];
    const radius = 1.6;
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      list.push({
        id: i,
        pos: [
          Math.cos(angle) * radius,
          Math.sin(angle * 1.5) * 0.45,
          Math.sin(angle) * radius,
        ],
      });
    }
    return list;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const ptr = pointerRef.current || { x: 0, y: 0 };

    // Gentle mouse parallax + smooth idle rotation
    if (groupRef.current) {
      const targetRotX = ptr.y * 0.25;
      const targetRotY = t * 0.18 + ptr.x * 0.35;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    }

    // Core low-poly facet rotation
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.12;
      coreRef.current.rotation.z = -t * 0.08;
    }

    // Central glowing energy sphere pulsing
    if (energySphereRef.current) {
      const pulseSpeed = activeTech ? 5.0 : 3.0;
      const pulseAmp = activeTech ? 0.08 : 0.05;
      const scale = 1 + Math.sin(t * pulseSpeed) * pulseAmp;
      energySphereRef.current.scale.set(scale, scale, scale);
    }

    // Dynamic light pulse
    if (pointLightRef.current) {
      const baseIntensity = activeTech ? 4.5 : 3.0;
      pointLightRef.current.intensity = baseIntensity + Math.sin(t * 3.5) * 0.6;
    }

    // 2-3 Gimbal / Orbital Rings subtle independent rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.28;
      ring1Ref.current.rotation.y = t * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.22;
      ring2Ref.current.rotation.z = t * 0.18;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -t * 0.14;
      ring3Ref.current.rotation.z = -t * 0.26;
    }

    // Satellites gentle bobbing
    if (satellitesRef.current) {
      satellitesRef.current.rotation.y = -t * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Core Group */}
      <group ref={coreRef}>
        {/* Dark Metallic Geometric Core (Icosahedron) */}
        <mesh geometry={coreGeo}>
          <meshStandardMaterial
            color="#080a10"
            roughness={0.22}
            metalness={0.92}
            flatShading={true}
          />
        </mesh>

        {/* Orange Emissive Edges on Core */}
        <lineSegments geometry={coreEdges}>
          <lineBasicMaterial
            color={activeTech ? '#ff9e3b' : '#ff7700'}
            transparent
            opacity={activeTech ? 0.95 : 0.7}
          />
        </lineSegments>
      </group>

      {/* Central Glowing Orange Energy Sphere */}
      <mesh ref={energySphereRef}>
        <sphereGeometry args={[0.46, 32, 32]} />
        <meshStandardMaterial
          color="#ff2a00"
          emissive="#ff6600"
          emissiveIntensity={activeTech ? 3.8 : 2.8}
          roughness={0.12}
        />
      </mesh>

      {/* Point Lights emanating from energy core */}
      <pointLight ref={pointLightRef} color="#ff8a1f" intensity={3.2} distance={8} decay={2} />
      <pointLight color="#ff3300" intensity={1.8} distance={3.5} decay={2} />

      {/* Ring 1: Inner Gimbal Ring (Gold/Amber) */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.6, 0.016, 16, 80]} />
        <meshStandardMaterial
          color="#ff8a1f"
          emissive="#ff5500"
          emissiveIntensity={0.55}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Ring 2: Middle Gimbal Ring (Dark titanium with orange rim) */}
      <mesh ref={ring2Ref} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <torusGeometry args={[1.95, 0.014, 16, 80]} />
        <meshStandardMaterial
          color="#161b26"
          emissive="#ea580c"
          emissiveIntensity={0.35}
          metalness={0.95}
          roughness={0.25}
        />
      </mesh>

      {/* Ring 3: Outer Horizon Ring with technical tick feel */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 2.5, 0, Math.PI / 5]}>
        <torusGeometry args={[2.28, 0.012, 16, 80]} />
        <meshStandardMaterial
          color="#22150c"
          emissive="#ffb84d"
          emissiveIntensity={0.3}
          metalness={0.88}
          roughness={0.3}
        />
      </mesh>

      {/* Floating Geometric Nodes & Thin Circuit Connections */}
      <group ref={satellitesRef}>
        {/* Thin Circuit Line Network */}
        <lineSegments geometry={lineGeo}>
          <lineBasicMaterial
            color="#f97316"
            transparent
            opacity={activeTech ? 0.6 : 0.35}
          />
        </lineSegments>

        {/* Small Octahedral Satellites */}
        {satellites.map((sat) => (
          <group key={sat.id} position={sat.pos}>
            <mesh geometry={satelliteGeo}>
              <meshStandardMaterial
                color="#0c0e14"
                emissive="#ff6600"
                emissiveIntensity={activeTech ? 1.8 : 0.8}
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
            <lineSegments geometry={satelliteEdges}>
              <lineBasicMaterial color="#ff9e3b" transparent opacity={0.85} />
            </lineSegments>
          </group>
        ))}
      </group>
    </group>
  );
}

export default function TechCoreCanvas({ activeTech }) {
  const pointerRef = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    pointerRef.current = { x, y };
  };

  const handlePointerLeave = () => {
    pointerRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative' }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 48, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.75]}
        style={{ width: '100%', height: '100%', display: 'block' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // 100% transparent canvas
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
        }}
      >
        {/* Subtle Ambient & Studio Lights */}
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 5, 4]} intensity={1.1} color="#fff0d0" />
        <directionalLight position={[-4, -3, -2]} intensity={0.7} color="#f97316" />

        {/* 3D Technology Core */}
        <CoreMesh pointerRef={pointerRef} activeTech={activeTech} />
      </Canvas>
    </div>
  );
}
