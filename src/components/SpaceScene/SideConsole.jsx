import React from 'react';

/**
 * SideConsole — Interior wall/console panel on one side of the cockpit.
 * 
 * Props:
 *   side: 'left' | 'right' — which side to render
 * 
 * Contains:
 * - Main wall panel
 * - Structural ribs for visual detail
 * - Small display area
 * - Armrest element
 * - Accent strip
 */
const SideConsole = ({ side = 'left' }) => {
  const mirror = side === 'left' ? -1 : 1;
  const wallColor = '#1c1c26';
  const ribColor = '#2a2a36';
  const panelColor = '#0e0e14';
  const accentColor = side === 'left' ? '#00bcd4' : '#7c4dff';

  return (
    <group>

      {/* ===== MAIN WALL PANEL ===== */}
      {/* Extends from behind the camera to the windshield frame */}
      <mesh position={[mirror * 4.5, 0, -1.5]} rotation={[0, mirror * -0.15, 0]}>
        <boxGeometry args={[0.6, 5, 6]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} metalness={0.4} />
      </mesh>

      {/* ===== STRUCTURAL RIBS ===== */}
      {/* Horizontal ribs along the wall for detail */}
      {[-0.8, 0.0, 0.8, 1.6].map((yOff, i) => (
        <mesh 
          key={i} 
          position={[mirror * 4.15, yOff, -1.5]} 
          rotation={[0, mirror * -0.15, 0]}
        >
          <boxGeometry args={[0.08, 0.1, 5.5]} />
          <meshStandardMaterial color={ribColor} roughness={0.6} metalness={0.55} />
        </mesh>
      ))}

      {/* ===== SMALL SIDE DISPLAY ===== */}
      {/* A recessed display panel at about eye level */}
      <mesh position={[mirror * 4.1, 0.4, -2.5]} rotation={[0, mirror * -0.35, 0]}>
        <boxGeometry args={[0.06, 0.6, 0.9]} />
        <meshStandardMaterial color={panelColor} roughness={0.15} metalness={0.85} />
      </mesh>
      {/* Display border */}
      <mesh position={[mirror * 4.12, 0.4, -2.5]} rotation={[0, mirror * -0.35, 0]}>
        <boxGeometry args={[0.04, 0.75, 1.1]} />
        <meshStandardMaterial color={ribColor} roughness={0.5} metalness={0.6} />
      </mesh>

      {/* ===== ARMREST / LOWER CONSOLE EXTENSION ===== */}
      <mesh position={[mirror * 3.8, -1.0, -0.5]} rotation={[0, mirror * -0.1, 0]}>
        <boxGeometry args={[0.8, 0.25, 2.5]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} metalness={0.45} />
      </mesh>

      {/* ===== ACCENT STRIP ===== */}
      <mesh position={[mirror * 4.08, -0.15, -2.0]} rotation={[0, mirror * -0.15, 0]}>
        <planeGeometry args={[0.02, 3.5]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.4}
          toneMapped={false}
        />
      </mesh>

    </group>
  );
};

export default SideConsole;
