import React from 'react';
import WindshieldFrame from './WindshieldFrame';
import Dashboard from './Dashboard';
import SideConsole from './SideConsole';

/**
 * Cockpit — Assembles all cockpit sub-components.
 * 
 * Also contains structural elements that connect the sub-components:
 * - Overhead canopy (roof above windshield frame)
 * - Floor pan
 * - Support struts between dashboard and windshield frame
 */
const Cockpit = () => {
  const roofColor = '#161620';
  const floorColor = '#121218';
  const strutColor = '#222230';

  return (
    <group>

      {/* ===== WINDSHIELD FRAME ===== */}
      <WindshieldFrame />

      {/* ===== DASHBOARD ===== */}
      <Dashboard />

      {/* ===== SIDE CONSOLES ===== */}
      <SideConsole side="left" />
      <SideConsole side="right" />


      {/* ===== OVERHEAD CANOPY / ROOF ===== */}
      {/* Extends from behind the camera over to the top windshield frame */}
      <mesh position={[0, 3.6, -1]}>
        <boxGeometry args={[10, 0.4, 7]} />
        <meshStandardMaterial color={roofColor} roughness={0.9} metalness={0.3} />
      </mesh>
      {/* Canopy inner surface detail — slight recess */}
      <mesh position={[0, 3.38, -1.5]}>
        <boxGeometry args={[8, 0.06, 5]} />
        <meshStandardMaterial color="#1e1e28" roughness={0.7} metalness={0.4} />
      </mesh>


      {/* ===== FLOOR PAN ===== */}
      <mesh position={[0, -3.2, -1]}>
        <boxGeometry args={[10, 0.3, 7]} />
        <meshStandardMaterial color={floorColor} roughness={0.95} metalness={0.2} />
      </mesh>


      {/* ===== SUPPORT STRUTS ===== */}
      {/* Diagonal struts connecting dashboard to windshield frame corners */}
      {/* Left strut */}
      <mesh position={[-3.6, -1.3, -3.5]} rotation={[0.3, 0.2, 0.5]}>
        <boxGeometry args={[0.12, 1.2, 0.12]} />
        <meshStandardMaterial color={strutColor} roughness={0.6} metalness={0.5} />
      </mesh>
      {/* Right strut */}
      <mesh position={[3.6, -1.3, -3.5]} rotation={[0.3, -0.2, -0.5]}>
        <boxGeometry args={[0.12, 1.2, 0.12]} />
        <meshStandardMaterial color={strutColor} roughness={0.6} metalness={0.5} />
      </mesh>

    </group>
  );
};

export default Cockpit;
