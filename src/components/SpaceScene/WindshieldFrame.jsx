import React from 'react';

/**
 * WindshieldFrame — The structural border around the panoramic viewing area.
 * 
 * Creates a trapezoidal frame: wider at the bottom, slightly narrower at top.
 * Each bar has real thickness (depth in Z) and multiple layers for visual depth.
 * 
 * Camera is at [0, 0.5, 0] with FOV 60.
 * Frame sits at z ≈ -4, well within the frustum.
 */
const WindshieldFrame = () => {
  const framePrimary = '#2a2a35';
  const frameTrim = '#3a3a48';
  const frameEdge = '#1e1e28';

  return (
    <group>

      {/* ===== BOTTOM FRAME BAR ===== */}
      {/* Main structural bar */}
      <mesh position={[0, -1.4, -4]}>
        <boxGeometry args={[8.5, 0.45, 0.7]} />
        <meshStandardMaterial color={framePrimary} roughness={0.6} metalness={0.6} />
      </mesh>
      {/* Inner trim strip */}
      <mesh position={[0, -1.2, -3.8]}>
        <boxGeometry args={[7.8, 0.12, 0.15]} />
        <meshStandardMaterial color={frameTrim} roughness={0.5} metalness={0.7} />
      </mesh>


      {/* ===== TOP FRAME BAR ===== */}
      <mesh position={[0, 3.0, -4]} rotation={[-0.05, 0, 0]}>
        <boxGeometry args={[7, 0.5, 0.8]} />
        <meshStandardMaterial color={framePrimary} roughness={0.6} metalness={0.6} />
      </mesh>
      {/* Top inner trim */}
      <mesh position={[0, 2.78, -3.75]}>
        <boxGeometry args={[6.2, 0.12, 0.15]} />
        <meshStandardMaterial color={frameTrim} roughness={0.5} metalness={0.7} />
      </mesh>


      {/* ===== LEFT PILLAR (A-pillar) ===== */}
      {/* Angled inward from bottom-left to top-left */}
      <mesh position={[-3.9, 0.8, -4]} rotation={[0, 0, 0.13]}>
        <boxGeometry args={[0.45, 5.2, 0.7]} />
        <meshStandardMaterial color={framePrimary} roughness={0.6} metalness={0.6} />
      </mesh>
      {/* Left pillar inner trim */}
      <mesh position={[-3.7, 0.8, -3.8]} rotation={[0, 0, 0.13]}>
        <boxGeometry args={[0.12, 4.6, 0.15]} />
        <meshStandardMaterial color={frameTrim} roughness={0.5} metalness={0.7} />
      </mesh>


      {/* ===== RIGHT PILLAR (A-pillar) ===== */}
      <mesh position={[3.9, 0.8, -4]} rotation={[0, 0, -0.13]}>
        <boxGeometry args={[0.45, 5.2, 0.7]} />
        <meshStandardMaterial color={framePrimary} roughness={0.6} metalness={0.6} />
      </mesh>
      {/* Right pillar inner trim */}
      <mesh position={[3.7, 0.8, -3.8]} rotation={[0, 0, -0.13]}>
        <boxGeometry args={[0.12, 4.6, 0.15]} />
        <meshStandardMaterial color={frameTrim} roughness={0.5} metalness={0.7} />
      </mesh>


      {/* ===== CORNER BRACKETS ===== */}
      {/* Bottom-Left */}
      <mesh position={[-3.95, -1.15, -4]} rotation={[0, 0, 0.78]}>
        <boxGeometry args={[0.6, 0.6, 0.5]} />
        <meshStandardMaterial color={frameEdge} roughness={0.7} metalness={0.5} />
      </mesh>
      {/* Bottom-Right */}
      <mesh position={[3.95, -1.15, -4]} rotation={[0, 0, -0.78]}>
        <boxGeometry args={[0.6, 0.6, 0.5]} />
        <meshStandardMaterial color={frameEdge} roughness={0.7} metalness={0.5} />
      </mesh>
      {/* Top-Left */}
      <mesh position={[-3.3, 2.75, -4]} rotation={[0, 0, 0.78]}>
        <boxGeometry args={[0.55, 0.55, 0.5]} />
        <meshStandardMaterial color={frameEdge} roughness={0.7} metalness={0.5} />
      </mesh>
      {/* Top-Right */}
      <mesh position={[3.3, 2.75, -4]} rotation={[0, 0, -0.78]}>
        <boxGeometry args={[0.55, 0.55, 0.5]} />
        <meshStandardMaterial color={frameEdge} roughness={0.7} metalness={0.5} />
      </mesh>


      {/* ===== CENTER VERTICAL DIVIDER (thin structural rib) ===== */}
      <mesh position={[0, 0.8, -4.05]}>
        <boxGeometry args={[0.08, 4.0, 0.2]} />
        <meshStandardMaterial color={frameEdge} roughness={0.7} metalness={0.5} />
      </mesh>

    </group>
  );
};

export default WindshieldFrame;
