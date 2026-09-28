import React from 'react';
import { Canvas } from '@react-three/fiber';
import Cockpit from './Cockpit';
import CockpitLighting from './CockpitLighting';

const Scene = () => {
  return (
    <Canvas
      camera={{ 
        position: [0, 0.5, 0], 
        fov: 60, 
        near: 0.1, 
        far: 100 
      }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <CockpitLighting />
      <Cockpit />
    </Canvas>
  );
};

export default Scene;
