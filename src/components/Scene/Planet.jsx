import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 1. Amber Gas Giant Texture
function createAmberGasGiantTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const baseGrad = ctx.createLinearGradient(0, 0, 0, 512);
  const stops = [
    '#2d1102', '#7a2e05', '#bd4c0a', '#f97316', '#ff8a1f',
    '#ffb84d', '#ff9933', '#c44b08', '#5e2003',
  ];
  stops.forEach((c, idx) => baseGrad.addColorStop(idx / (stops.length - 1), c));
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 1024, 512);

  for (let y = 0; y < 512; y += 3) {
    const sinFactor = Math.sin(y * 0.03) * Math.cos(y * 0.01);
    const alpha = (Math.sin(y * 0.1) * 0.5 + 0.5) * 0.2;
    ctx.fillStyle = sinFactor > 0 ? `rgba(255, 230, 180, ${alpha})` : `rgba(40, 12, 2, ${alpha * 1.5})`;
    ctx.fillRect(0, y, 1024, 2);
  }

  // Storm spots
  const storms = [
    { x: 380, y: 280, rx: 80, ry: 38, col: 'rgba(255, 120, 30, 0.65)', core: 'rgba(255, 240, 200, 0.45)' },
    { x: 720, y: 190, rx: 60, ry: 25, col: 'rgba(240, 90, 20, 0.5)', core: 'rgba(255, 200, 150, 0.3)' },
  ];
  storms.forEach((s) => {
    const grad = ctx.createRadialGradient(s.x, s.y, 5, s.x, s.y, s.rx);
    grad.addColorStop(0, s.core);
    grad.addColorStop(0.4, s.col);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(s.x, s.y, s.rx, s.ry, 0.1, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// 2. Crimson / Rust Lava World Texture
function createLavaPlanetTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Dark volcanic crust background
  ctx.fillStyle = '#1c0b05';
  ctx.fillRect(0, 0, 1024, 512);

  // Volcanic rust bands
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#361106');
  grad.addColorStop(0.3, '#7a1f07');
  grad.addColorStop(0.6, '#4f1406');
  grad.addColorStop(0.85, '#992607');
  grad.addColorStop(1, '#240a03');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Magma cracks and glowing fissures
  ctx.strokeStyle = '#ff4d00';
  ctx.lineWidth = 2.5;
  ctx.shadowColor = '#ffaa00';
  ctx.shadowBlur = 8;
  for (let i = 0; i < 28; i++) {
    ctx.beginPath();
    let cx = (i * 38) % 1024;
    let cy = (i * 24 + 40) % 512;
    ctx.moveTo(cx, cy);
    for (let j = 0; j < 5; j++) {
      cx += (Math.random() - 0.5) * 80;
      cy += (Math.random() - 0.5) * 60;
      ctx.lineTo(cx, cy);
    }
    ctx.stroke();
  }

  // Molten hot-spot calderas
  for (let k = 0; k < 12; k++) {
    const rx = ((k * 93) + 60) % 1024;
    const ry = ((k * 47) + 50) % 512;
    const rGrad = ctx.createRadialGradient(rx, ry, 2, rx, ry, 32);
    rGrad.addColorStop(0, '#fff4cc');
    rGrad.addColorStop(0.25, '#ff8a00');
    rGrad.addColorStop(0.6, '#b82000');
    rGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rGrad;
    ctx.beginPath();
    ctx.arc(rx, ry, 32, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// 3. Azure / Ocean World Texture
function createOceanicPlanetTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep ocean gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#04172a');
  grad.addColorStop(0.4, '#09365e');
  grad.addColorStop(0.7, '#0b4878');
  grad.addColorStop(1, '#031221');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Swirling continents/islands
  ctx.fillStyle = 'rgba(28, 92, 60, 0.65)';
  for (let c = 0; c < 15; c++) {
    const ox = (c * 72 + 30) % 1024;
    const oy = (c * 42 + 80) % 512;
    ctx.beginPath();
    ctx.ellipse(ox, oy, 45 + (c % 5) * 12, 25 + (c % 4) * 8, (c * 0.4), 0, Math.PI * 2);
    ctx.fill();
  }

  // Swirling white clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
  for (let y = 0; y < 512; y += 4) {
    const sinCloud = Math.sin(y * 0.02) * Math.sin(y * 0.05);
    if (sinCloud > 0.1) {
      ctx.fillRect(0, y, 1024, 3);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// 4. Golden Desert Terrestrial World Texture
function createDesertPlanetTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#4a2f15');
  grad.addColorStop(0.3, '#855320');
  grad.addColorStop(0.55, '#c2853c');
  grad.addColorStop(0.8, '#e0aa5c');
  grad.addColorStop(1, '#573718');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Dune ripples & crater basins
  ctx.fillStyle = 'rgba(60, 32, 10, 0.28)';
  for (let i = 0; i < 20; i++) {
    const cx = (i * 85 + 40) % 1024;
    const cy = (i * 35 + 40) % 512;
    ctx.beginPath();
    ctx.arc(cx, cy, 18 + (i % 4) * 10, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// 5. Rocky Moon Texture
function createMoonTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#3a342f';
  ctx.fillRect(0, 0, 512, 256);

  // Crater impact rings
  for (let i = 0; i < 30; i++) {
    const mx = (i * 43) % 512;
    const my = (i * 27) % 256;
    const r = 6 + (i % 6) * 4;
    ctx.fillStyle = 'rgba(25, 20, 18, 0.6)';
    ctx.beginPath();
    ctx.arc(mx, my, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(200, 185, 170, 0.35)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// 6. Emerald / Aurora Gas Giant Texture
function createEmeraldGasGiantTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const baseGrad = ctx.createLinearGradient(0, 0, 0, 512);
  baseGrad.addColorStop(0, '#06201b');
  baseGrad.addColorStop(0.25, '#0d4a3e');
  baseGrad.addColorStop(0.5, '#16806b');
  baseGrad.addColorStop(0.75, '#2ecc71');
  baseGrad.addColorStop(1, '#082b24');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 1024, 512);

  ctx.fillStyle = 'rgba(168, 255, 230, 0.25)';
  for (let y = 0; y < 512; y += 4) {
    if (Math.sin(y * 0.05) > 0.2) {
      ctx.fillRect(0, y, 1024, 3);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createRingsTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 1024, 0);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.15, 'rgba(249, 115, 22, 0.3)');
  grad.addColorStop(0.35, 'rgba(255, 184, 77, 0.85)');
  grad.addColorStop(0.5, 'rgba(255, 240, 208, 0.95)');
  grad.addColorStop(0.65, 'rgba(255, 138, 31, 0.7)');
  grad.addColorStop(0.8, 'rgba(249, 115, 22, 0.35)');
  grad.addColorStop(0.95, 'rgba(180, 70, 10, 0.15)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 64);

  // Cassini division
  ctx.fillStyle = 'rgba(0,0,0,0.85)';
  ctx.fillRect(520, 0, 18, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const Planet = ({
  type = 'gasGiant', // 'gasGiant' | 'lava' | 'oceanic' | 'desert' | 'moon' | 'emerald'
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

  const texture = useMemo(() => {
    switch (type) {
      case 'lava': return createLavaPlanetTexture();
      case 'oceanic': return createOceanicPlanetTexture();
      case 'desert': return createDesertPlanetTexture();
      case 'moon': return createMoonTexture();
      case 'emerald': return createEmeraldGasGiantTexture();
      case 'gasGiant':
      default:
        return createAmberGasGiantTexture();
    }
  }, [type]);

  const ringsTexture = useMemo(() => (hasRings ? createRingsTexture() : null), [hasRings]);

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

    // Planet axial rotation
    if (surfaceRef.current) {
      surfaceRef.current.rotation.y += delta * rotationSpeed;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * (rotationSpeed * 0.4);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Planet sphere surface */}
      <mesh ref={surfaceRef}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.7}
          metalness={0.15}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* Atmospheric rim glow */}
      <mesh scale={atmosphereScale}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color={atmosphereColor}
          transparent
          opacity={atmosphereOpacity}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Planetary rings */}
      {hasRings && (
        <mesh
          ref={ringsRef}
          rotation={ringsConfig?.rotation || [Math.PI * 0.38, -0.2, 0.3]}
        >
          <ringGeometry
            args={[
              ringsConfig?.innerRadius || radius * 1.35,
              ringsConfig?.outerRadius || radius * 2.3,
              48,
            ]}
          />
          <meshStandardMaterial
            map={ringsTexture}
            side={THREE.DoubleSide}
            transparent
            opacity={0.88}
            roughness={0.4}
            metalness={0.2}
            emissive="#732b05"
            emissiveIntensity={0.3}
          />
        </mesh>
      )}
    </group>
  );
};

export default Planet;