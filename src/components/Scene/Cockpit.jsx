import React from 'react';
import CockpitFrame from './CockpitFrame';
import Windshield from './Windshield';
import Dashboard from './Dashboard';

const Cockpit = ({ reducedMotion }) => {
  return (
    <group>
      <CockpitFrame />
      <Windshield />
      <Dashboard reducedMotion={reducedMotion} />
    </group>
  );
};

export default Cockpit;