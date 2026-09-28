import React from 'react';
import SpaceScene from '../Scene/SpaceScene';
import TargetingHUD from './TargetingHUD';
import CockpitCanopy from './CockpitCanopy';
import CockpitDashboard from './CockpitDashboard';
import Navbar from './Navbar';
import HeroContent from './HeroContent';
import styles from './HeroContainer.module.css';

const HeroContainer = () => {
  return (
    <section id="top" className={styles.heroContainer}>
      {/* ================================================================ */}
      {/* LAYER 1, 2, 3, 4: REAL-TIME 3D WEBGL SPACE VISTA               */}
      {/* (1: Galaxy & Warp Stars, 2: Giant Planet, 3: Asteroids, 4: Station) */}
      {/* ================================================================ */}
      <div className={styles.spaceVistaLayer}>
        <SpaceScene />
      </div>

      {/* Atmospheric Amber Cosmic Glow Overlay */}
      <div className={styles.atmosphereHaze} aria-hidden="true" />

      {/* ================================================================ */}
      {/* LAYER 5: TARGETING HUD RETICLE & TELEMETRY                       */}
      {/* ================================================================ */}
      <TargetingHUD />

      {/* ================================================================ */}
      {/* LAYER 6: COCKPIT WINDSHIELD CANOPY FRAME & AMBER LAMPS           */}
      {/* ================================================================ */}
      <CockpitCanopy />

      {/* ================================================================ */}
      {/* LAYER 7: BOTTOM SPACECRAFT DASHBOARD & 3 ANIMATED MFD SCREENS     */}
      {/* ================================================================ */}
      <CockpitDashboard />

      {/* ================================================================ */}
      {/* LAYER 8: INTERACTIVE PORTFOLIO UI (Cream Navbar & Hero Content)  */}
      {/* ================================================================ */}
      <div className={styles.uiOverlay}>
        <Navbar />
        <HeroContent />
      </div>
    </section>
  );
};

export default HeroContainer;
