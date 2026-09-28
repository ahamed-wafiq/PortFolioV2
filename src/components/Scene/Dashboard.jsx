import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural texture for Center Flight Radar Screen
function createCenterRadarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 340;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#07090e';
  ctx.fillRect(0, 0, 512, 340);

  const cx = 256;
  const cy = 175;

  // Concentric radar range rings in orange
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 2;
  [50, 95, 135].forEach((r) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  });

  // Crosshairs & degree ticks
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - 145, cy);
  ctx.lineTo(cx + 145, cy);
  ctx.moveTo(cx, cy - 145);
  ctx.lineTo(cx, cy + 145);
  ctx.stroke();

  // Ship vector icon (arrowhead in center)
  ctx.fillStyle = '#ffb84d';
  ctx.beginPath();
  ctx.moveTo(cx, cy - 22);
  ctx.lineTo(cx + 14, cy + 18);
  ctx.lineTo(cx, cy + 8);
  ctx.lineTo(cx - 14, cy + 18);
  ctx.closePath();
  ctx.fill();

  // Outer border HUD bracket lines
  ctx.strokeStyle = '#ff8a1f';
  ctx.lineWidth = 3;
  ctx.strokeRect(18, 14, 476, 312);

  // Corner brackets
  ctx.lineWidth = 5;
  const bl = 28;
  ctx.beginPath();
  ctx.moveTo(18, 14 + bl);
  ctx.lineTo(18, 14);
  ctx.lineTo(18 + bl, 14);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(494 - bl, 14);
  ctx.lineTo(494, 14);
  ctx.lineTo(494, 14 + bl);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(18, 326 - bl);
  ctx.lineTo(18, 326);
  ctx.lineTo(18 + bl, 326);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(494 - bl, 326);
  ctx.lineTo(494, 326);
  ctx.lineTo(494, 326 - bl);
  ctx.stroke();

  // Telemetry labels
  ctx.fillStyle = '#ff8a1f';
  ctx.font = 'bold 14px monospace';
  ctx.fillText('NAV // SYS_READY', 32, 42);
  ctx.fillText('WARP: ACTIVE', 32, 60);
  ctx.fillText('TARGET: LOCKED', 340, 42);
  ctx.fillText('V: 0.85c', 380, 60);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Procedural texture for Left Display (Spaceship blueprint & diagnostics)
function createLeftDisplayTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 280;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#07090e';
  ctx.fillRect(0, 0, 400, 280);

  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 2;
  ctx.strokeRect(14, 14, 372, 252);

  ctx.fillStyle = '#ffb84d';
  ctx.font = 'bold 13px monospace';
  ctx.fillText('VESSEL HULL STATUS', 28, 38);

  // Spaceship Silhouette
  const sx = 120;
  const sy = 145;
  ctx.strokeStyle = '#ff8a1f';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(sx, sy - 55);
  ctx.lineTo(sx + 24, sy + 15);
  ctx.lineTo(sx + 50, sy + 38);
  ctx.lineTo(sx + 40, sy + 50);
  ctx.lineTo(sx + 15, sy + 42);
  ctx.lineTo(sx, sy + 48);
  ctx.lineTo(sx - 15, sy + 42);
  ctx.lineTo(sx - 40, sy + 50);
  ctx.lineTo(sx - 50, sy + 38);
  ctx.lineTo(sx - 24, sy + 15);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = 'rgba(249, 115, 22, 0.25)';
  ctx.fill();

  // Diagnostic Bars
  ctx.fillStyle = '#f97316';
  ctx.font = '11px monospace';
  const stats = [
    { label: 'THRUST', val: 0.94 },
    { label: 'SHIELD', val: 0.98 },
    { label: 'O2 LEV', val: 0.96 },
    { label: 'REACTOR', val: 0.88 },
    { label: 'WARP', val: 0.85 },
  ];

  stats.forEach((s, idx) => {
    const y = 80 + idx * 34;
    ctx.fillText(s.label, 205, y);
    ctx.fillStyle = '#1c1510';
    ctx.fillRect(205, y + 6, 160, 10);
    ctx.fillStyle = idx === 0 ? '#ffb84d' : '#f97316';
    ctx.fillRect(205, y + 6, 160 * s.val, 10);
    ctx.fillStyle = '#ff8a1f';
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Procedural texture for Right Display (Data telemetry)
function createRightDisplayTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 280;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#07090e';
  ctx.fillRect(0, 0, 400, 280);

  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 2;
  ctx.strokeRect(14, 14, 372, 252);

  ctx.fillStyle = '#ffb84d';
  ctx.font = 'bold 13px monospace';
  ctx.fillText('MISSION TELEMETRY', 28, 38);

  const barHeights = [45, 68, 92, 110, 85, 125, 95, 70, 105, 130, 88, 115];
  barHeights.forEach((h, i) => {
    const bx = 32 + i * 28;
    const by = 230 - h;
    ctx.fillStyle = i % 2 === 0 ? '#f97316' : '#ffb84d';
    ctx.fillRect(bx, by, 18, h);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const Dashboard = ({ reducedMotion }) => {
  const radarSweepRef = useRef();
  const wireCubeRef = useRef();
  const glowSeamRef = useRef();
  const noseSpineRef = useRef();

  const bodyMat = { color: '#0d1016', roughness: 0.7, metalness: 0.55 };
  const topMat = { color: '#161b24', roughness: 0.45, metalness: 0.65 };
  const hullNoseMat = { color: '#10131a', roughness: 0.6, metalness: 0.7 };

  const centerRadarTex = useMemo(() => createCenterRadarTexture(), []);
  const leftDisplayTex = useMemo(() => createLeftDisplayTexture(), []);
  const rightDisplayTex = useMemo(() => createRightDisplayTexture(), []);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;

    // Sweep rotation
    if (radarSweepRef.current) {
      radarSweepRef.current.rotation.z = -t * 2.2;
    }
    // Rotating voxel cube on right MFD
    if (wireCubeRef.current) {
      wireCubeRef.current.rotation.x += delta * 0.9;
      wireCubeRef.current.rotation.y += delta * 1.3;
    }
    // Subtle pulsing engine glow along dashboard and nose spine
    if (glowSeamRef.current) {
      const pulse = 1.2 + Math.sin(t * 3.5) * 0.35;
      glowSeamRef.current.material.emissiveIntensity = pulse;
    }
    if (noseSpineRef.current) {
      const pulse = 1.0 + Math.sin(t * 4.0 + 1.0) * 0.4;
      noseSpineRef.current.material.emissiveIntensity = pulse;
    }
  });

  return (
    <group>
      {/* ==================================================================== */}
      {/* === VISIBLE SPACECRAFT NOSE / PROW (Outside in front of windshield) === */}
      {/* ==================================================================== */}
      <group position={[0.75, -0.65, -5.8]}>
        {/* Main tapered forward nose deck */}
        <mesh position={[0, -0.15, 0]} rotation={[-0.14, 0, 0]}>
          <boxGeometry args={[4.2, 0.35, 4.8]} />
          <meshStandardMaterial {...hullNoseMat} />
        </mesh>

        {/* Tapered nose tip sloping downward */}
        <mesh position={[0, -0.4, -2.8]} rotation={[-0.22, 0, 0]}>
          <boxGeometry args={[2.4, 0.28, 2.2]} />
          <meshStandardMaterial {...hullNoseMat} />
        </mesh>

        {/* Center glowing orange spine / energy conduit on nose */}
        <mesh ref={noseSpineRef} position={[0, 0.05, -0.5]} rotation={[-0.14, 0, 0]}>
          <boxGeometry args={[0.08, 0.05, 4.5]} />
          <meshStandardMaterial
            color="#ffb84d"
            emissive="#ff8a1f"
            emissiveIntensity={1.2}
            toneMapped={false}
          />
        </mesh>

        {/* Left & Right nose beacon fins with amber navigation lights */}
        <mesh position={[-2.1, 0.1, -0.8]} rotation={[-0.14, 0, 0.2]}>
          <boxGeometry args={[0.1, 0.4, 3.2]} />
          <meshStandardMaterial color="#1a202c" roughness={0.5} metalness={0.7} />
        </mesh>
        <mesh position={[-2.12, 0.28, -0.8]} rotation={[-0.14, 0, 0.2]}>
          <boxGeometry args={[0.04, 0.06, 3.0]} />
          <meshStandardMaterial
            color="#ffb84d"
            emissive="#f97316"
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>

        <mesh position={[2.1, 0.1, -0.8]} rotation={[-0.14, 0, -0.2]}>
          <boxGeometry args={[0.1, 0.4, 3.2]} />
          <meshStandardMaterial color="#1a202c" roughness={0.5} metalness={0.7} />
        </mesh>
        <mesh position={[2.12, 0.28, -0.8]} rotation={[-0.14, 0, -0.2]}>
          <boxGeometry args={[0.04, 0.06, 3.0]} />
          <meshStandardMaterial
            color="#ffb84d"
            emissive="#f97316"
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* ==================================================================== */}
      {/* === COCKPIT DASHBOARD CONSOLE (Prominently along bottom of view) === */}
      {/* ==================================================================== */}
      {/* Main dashboard body slab */}
      <mesh position={[0.75, -1.35, -2.6]} rotation={[-0.32, 0, 0]}>
        <boxGeometry args={[9.2, 1.3, 2.2]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>

      {/* Top dashboard plane */}
      <mesh position={[0.75, -0.78, -2.75]} rotation={[-0.26, 0, 0]}>
        <boxGeometry args={[8.8, 0.12, 1.8]} />
        <meshStandardMaterial {...topMat} />
      </mesh>

      {/* Raised console lip */}
      <mesh position={[0.75, -0.66, -3.45]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[8.6, 0.25, 0.25]} />
        <meshStandardMaterial color="#202634" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Glowing orange seam along dashboard ridge */}
      <mesh ref={glowSeamRef} position={[0.75, -0.54, -3.55]}>
        <boxGeometry args={[8.4, 0.025, 0.035]} />
        <meshStandardMaterial
          color="#ffb84d"
          emissive="#f97316"
          emissiveIntensity={1.3}
          toneMapped={false}
        />
      </mesh>

      {/* === CENTER MAIN FLIGHT RADAR DISPLAY === */}
      <group position={[0.75, -0.68, -2.85]} rotation={[-0.26, 0, 0]}>
        <mesh>
          <boxGeometry args={[2.7, 0.06, 1.4]} />
          <meshStandardMaterial map={centerRadarTex} roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.035, 0]}>
          <boxGeometry args={[2.74, 0.015, 1.44]} />
          <meshStandardMaterial
            color="#f97316"
            emissive="#f97316"
            emissiveIntensity={0.85}
            toneMapped={false}
          />
        </mesh>
        {/* Animated Radar Sweep Line */}
        <mesh ref={radarSweepRef} position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.02, 0.95]} />
          <meshBasicMaterial color="#ffb84d" transparent opacity={0.85} />
        </mesh>
      </group>

      {/* === LEFT MULTI-FUNCTION DISPLAY (Ship Blueprint) === */}
      <group position={[-1.95, -0.75, -2.7]} rotation={[-0.26, 0.16, 0]}>
        <mesh>
          <boxGeometry args={[2.0, 0.06, 1.2]} />
          <meshStandardMaterial map={leftDisplayTex} roughness={0.25} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.035, 0]}>
          <boxGeometry args={[2.04, 0.015, 1.24]} />
          <meshStandardMaterial
            color="#f97316"
            emissive="#f97316"
            emissiveIntensity={0.7}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* === RIGHT MULTI-FUNCTION DISPLAY (Telemetry & Voxel Cube) === */}
      <group position={[3.45, -0.75, -2.7]} rotation={[-0.26, -0.16, 0]}>
        <mesh>
          <boxGeometry args={[2.0, 0.06, 1.2]} />
          <meshStandardMaterial map={rightDisplayTex} roughness={0.25} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.035, 0]}>
          <boxGeometry args={[2.04, 0.015, 1.24]} />
          <meshStandardMaterial
            color="#f97316"
            emissive="#f97316"
            emissiveIntensity={0.7}
            toneMapped={false}
          />
        </mesh>
        {/* Rotating 3D wireframe voxel cube */}
        <mesh ref={wireCubeRef} position={[0.6, 0.16, -0.15]}>
          <boxGeometry args={[0.24, 0.24, 0.24]} />
          <meshStandardMaterial
            color="#ffb84d"
            emissive="#ff8a1f"
            emissiveIntensity={1.4}
            wireframe
          />
        </mesh>
      </group>

      {/* === CONSOLE AMBER STATUS BUTTONS & INDICATORS === */}
      {[-0.6, -0.3, 0.0, 0.3, 0.6, 1.5, 1.8, 2.1].map((x, i) => (
        <mesh key={i} position={[x + 0.2, -0.66, -3.35]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[0.07, 0.04, 0.06]} />
          <meshStandardMaterial
            color="#ffb84d"
            emissive={i % 2 === 0 ? '#ff8a1f' : '#f97316'}
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
};

export default Dashboard;