import React from 'react';
import { motion } from 'framer-motion';
import styles from './CockpitHUDOverlay.module.css';

const CockpitHUDOverlay = () => {
  return (
    <div className={styles.cockpitOverlay} aria-hidden="true">
      {/* Windshield Center Targeting HUD Reticle with gentle flight tracking */}
      <motion.div
        className={styles.centerReticle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className={styles.reticleCrossH} />
        <div className={styles.reticleCrossV} />
        <div className={styles.reticleOuterBox}>
          <div className={styles.reticleCornerTL} />
          <div className={styles.reticleCornerTR} />
          <div className={styles.reticleCornerBL} />
          <div className={styles.reticleCornerBR} />
        </div>
        <div className={styles.reticleCircle}>
          <div className={styles.reticleCenterDot} />
        </div>
      </motion.div>

      {/* Subtle pulsing lights over dashboard screens */}
      <div className={styles.dashboardLightsPulse} />

      {/* Subtle Engine Thruster Ambient Underglow */}
      <div className={styles.thrusterUnderglow} />
    </div>
  );
};

export default CockpitHUDOverlay;
