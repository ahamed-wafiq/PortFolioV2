import React from 'react';
import styles from './HudRailFrame.module.css';

/**
 * HudRailFrame
 * Bold Chunky Voxel Rocket Mech Frame inspired by the Minecraft-style voxel aerospace rocket.
 * Features 4 massive corner rocket booster pods, diagonal hazard warning stripes,
 * a top rocket launch gantry header with beacons, and a bottom thruster exhaust manifold.
 */
export default function HudRailFrame({
  children,
  className = '',
  telemetryTitle,
  telemetryStatus,
  gantryCode = 'ROCKET // MECH_07',
}) {
  return (
    <div className={`${styles.voxelRocketCard} ${className}`}>
      {/* 1. TOP ROCKET LAUNCH GANTRY HEADER */}
      <div className={styles.launchGantry} aria-hidden="true">
        <div className={styles.gantryAntenna} />
        <div className={styles.gantryBeaconL} />
        <div className={styles.gantryPlate}>
          <span className={styles.gantryDecal}>▲</span>
          <span className={styles.gantryText}>{telemetryTitle || gantryCode}</span>
          <span className={styles.gantryDecal}>▲</span>
        </div>
        <div className={styles.gantryBeaconR} />
      </div>

      {/* 2. CHUNKY CORNER ROCKET BOOSTER PODS (4 Corners) */}
      {/* Top Left Booster Pod */}
      <div className={`${styles.boosterPod} ${styles.podTL}`} aria-hidden="true">
        <div className={styles.boosterNoseCap} />
        <div className={styles.boosterWhiteBody} />
        <div className={styles.boosterVentSlats}>
          <span /><span /><span />
        </div>
        <div className={styles.boosterPistonArmH} />
        <div className={styles.boosterPistonArmV} />
        <div className={styles.boosterSensorLens} />
      </div>

      {/* Top Right Booster Pod */}
      <div className={`${styles.boosterPod} ${styles.podTR}`} aria-hidden="true">
        <div className={styles.boosterNoseCap} />
        <div className={styles.boosterWhiteBody} />
        <div className={styles.boosterVentSlats}>
          <span /><span /><span />
        </div>
        <div className={styles.boosterPistonArmH} />
        <div className={styles.boosterPistonArmV} />
        <div className={styles.boosterSensorLens} />
      </div>

      {/* Bottom Left Booster Pod */}
      <div className={`${styles.boosterPod} ${styles.podBL}`} aria-hidden="true">
        <div className={styles.boosterNoseCap} />
        <div className={styles.boosterWhiteBody} />
        <div className={styles.boosterVentSlats}>
          <span /><span /><span />
        </div>
        <div className={styles.boosterPistonArmH} />
        <div className={styles.boosterPistonArmV} />
        <div className={styles.boosterSensorLens} />
      </div>

      {/* Bottom Right Booster Pod */}
      <div className={`${styles.boosterPod} ${styles.podBR}`} aria-hidden="true">
        <div className={styles.boosterNoseCap} />
        <div className={styles.boosterWhiteBody} />
        <div className={styles.boosterVentSlats}>
          <span /><span /><span />
        </div>
        <div className={styles.boosterPistonArmH} />
        <div className={styles.boosterPistonArmV} />
        <div className={styles.boosterSensorLens} />
      </div>

      {/* 3. LATERAL STRUTS WITH DIAGONAL HAZARD CHEVRONS */}
      <div className={`${styles.hazardStrut} ${styles.hazardLeft}`} aria-hidden="true" />
      <div className={`${styles.hazardStrut} ${styles.hazardRight}`} aria-hidden="true" />

      {/* 4. BOTTOM THRUSTER EXHAUST MANIFOLD & LANDING PISTON BASE */}
      <div className={styles.exhaustManifold} aria-hidden="true">
        <div className={styles.exhaustGrateL} />
        <div className={styles.exhaustCore}>
          <span className={styles.thrusterNozzle} />
          <span className={styles.thrusterFlameGlow} />
          <span className={styles.thrusterNozzle} />
        </div>
        <div className={styles.exhaustGrateR} />
      </div>

      {/* 5. INTERNAL TELEMETRY STATUS BAR */}
      {telemetryStatus && (
        <div className={styles.internalStatusRow}>
          <div className={styles.statusTitleBlock}>
            <span className={styles.statusDot} />
            <span className={styles.statusTitleText}>{telemetryTitle}</span>
          </div>
          <span className={styles.statusValueBadge}>{telemetryStatus}</span>
        </div>
      )}

      {/* 6. INNER CARD CONTENT */}
      <div className={styles.cardInnerContent}>
        {children}
      </div>
    </div>
  );
}
