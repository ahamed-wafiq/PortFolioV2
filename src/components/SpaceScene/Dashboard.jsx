import React from 'react';

/**
 * Dashboard — The lower cockpit console.
 * 
 * Multi-layered structure with:
 * - Main body (deep box that wraps under the camera)
 * - Angled top surface (the desk you'd look down at)
 * - Front fascia connecting to the windshield frame
 * - Instrument bezels and control surfaces
 * - Emissive accent strips
 * 
 * Camera is at [0, 0.5, 0]. Dashboard is below and in front.
 */
const Dashboard = () => {
  const bodyColor = '#1a1a24';
  const surfaceColor = '#252530';
  const panelColor = '#2e2e3a';
  const bezelColor = '#0e0e14';
  const accentCyan = '#00bcd4';
  const accentViolet = '#7c4dff';

  return (
    <group>

      {/* ===== MAIN DASHBOARD BODY ===== */}
      {/* Large deep console wrapping below the viewer */}
      <mesh position={[0, -2.2, -1.5]}>
        <boxGeometry args={[9, 1.8, 5]} />
        <meshStandardMaterial color={bodyColor} roughness={0.75} metalness={0.5} />
      </mesh>

      {/* ===== ANGLED TOP SURFACE ===== */}
      {/* The working desk surface, angled toward the viewer */}
      <mesh position={[0, -1.2, -2]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[8.2, 0.12, 3.5]} />
        <meshStandardMaterial color={surfaceColor} roughness={0.55} metalness={0.6} />
      </mesh>

      {/* ===== FRONT FASCIA ===== */}
      {/* Vertical face connecting dashboard top to windshield frame bottom */}
      <mesh position={[0, -1.35, -3.6]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[8.5, 0.4, 0.25]} />
        <meshStandardMaterial color={bodyColor} roughness={0.7} metalness={0.55} />
      </mesh>

      {/* ===== RAISED RIDGE along front edge ===== */}
      <mesh position={[0, -1.1, -3.5]}>
        <boxGeometry args={[7.5, 0.1, 0.2]} />
        <meshStandardMaterial color={panelColor} roughness={0.5} metalness={0.65} />
      </mesh>


      {/* ===== CENTER DISPLAY RECESS ===== */}
      {/* Recessed area for main instrument display */}
      <mesh position={[0, -1.05, -2.6]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[2.4, 0.06, 1.4]} />
        <meshStandardMaterial color={bezelColor} roughness={0.15} metalness={0.85} />
      </mesh>
      {/* Display bezel border */}
      <mesh position={[0, -1.04, -2.6]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[2.6, 0.04, 1.6]} />
        <meshStandardMaterial color={panelColor} roughness={0.5} metalness={0.6} />
      </mesh>


      {/* ===== LEFT INSTRUMENT PANEL ===== */}
      <mesh position={[-2.4, -1.1, -2.2]} rotation={[-0.3, 0.12, 0]}>
        <boxGeometry args={[1.6, 0.06, 1.2]} />
        <meshStandardMaterial color={panelColor} roughness={0.6} metalness={0.5} />
      </mesh>
      {/* Left panel bezel */}
      <mesh position={[-2.4, -1.07, -2.4]} rotation={[-0.3, 0.12, 0]}>
        <boxGeometry args={[1.0, 0.04, 0.6]} />
        <meshStandardMaterial color={bezelColor} roughness={0.2} metalness={0.8} />
      </mesh>


      {/* ===== RIGHT INSTRUMENT PANEL ===== */}
      <mesh position={[2.4, -1.1, -2.2]} rotation={[-0.3, -0.12, 0]}>
        <boxGeometry args={[1.6, 0.06, 1.2]} />
        <meshStandardMaterial color={panelColor} roughness={0.6} metalness={0.5} />
      </mesh>
      {/* Right panel bezel */}
      <mesh position={[2.4, -1.07, -2.4]} rotation={[-0.3, -0.12, 0]}>
        <boxGeometry args={[1.0, 0.04, 0.6]} />
        <meshStandardMaterial color={bezelColor} roughness={0.2} metalness={0.8} />
      </mesh>


      {/* ===== EMISSIVE ACCENT STRIPS ===== */}

      {/* Cyan accent — front dashboard edge */}
      <mesh position={[0, -1.08, -3.45]}>
        <planeGeometry args={[5, 0.03]} />
        <meshStandardMaterial
          color={accentCyan}
          emissive={accentCyan}
          emissiveIntensity={0.7}
          toneMapped={false}
        />
      </mesh>

      {/* Left instrument accent */}
      <mesh position={[-2.4, -1.04, -2.55]} rotation={[-0.3, 0.12, 0]}>
        <planeGeometry args={[0.8, 0.025]} />
        <meshStandardMaterial
          color={accentCyan}
          emissive={accentCyan}
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </mesh>

      {/* Right instrument accent */}
      <mesh position={[2.4, -1.04, -2.55]} rotation={[-0.3, -0.12, 0]}>
        <planeGeometry args={[0.8, 0.025]} />
        <meshStandardMaterial
          color={accentViolet}
          emissive={accentViolet}
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </mesh>

      {/* Small status indicator dots */}
      {[-0.4, -0.15, 0.15, 0.4].map((xOff, i) => (
        <mesh key={i} position={[xOff, -1.02, -2.9]} rotation={[-0.3, 0, 0]}>
          <circleGeometry args={[0.03, 12]} />
          <meshStandardMaterial
            color={i < 2 ? accentCyan : accentViolet}
            emissive={i < 2 ? accentCyan : accentViolet}
            emissiveIntensity={0.6}
            toneMapped={false}
          />
        </mesh>
      ))}

    </group>
  );
};

export default Dashboard;
