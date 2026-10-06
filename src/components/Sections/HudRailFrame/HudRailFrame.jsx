import React from 'react';
import styles from './HudRailFrame.module.css';

/**
 * HudRailFrame
 * Procedural Sci-Fi HUD Rail Frame inspired by Blender 3D modular aerospace chassis.
 * Features beveled titanium rails, heavy gold corner armor blocks, glowing neon conduits,
 * side heat-sink vents, and a top telemetry header bezel.
 */
export default function HudRailFrame({
  children,
  className = '',
  telemetryTitle,
  telemetryStatus,
}) {
  return (
    <div className={`${styles.railFrameCard} ${className}`}>
      {/* 1. Top Beveled Telemetry Header Bezel */}
      <div className={styles.headerBezel}>
        <div className={styles.headerLedLeft} />
        <div className={styles.headerPlate}>
          <span className={styles.headerPlateTitle}>
            {telemetryTitle || 'SUBSPACE TERMINAL'}
          </span>
        </div>
        <div className={styles.headerLedRight} />
      </div>

      {/* 2. Reinforced Heavy Gold Corner Armor Lugs */}
      <div className={`${styles.cornerArmor} ${styles.cornerTL}`} aria-hidden="true">
        <div className={styles.cornerArmH} />
        <div className={styles.cornerArmV} />
        <div className={styles.cornerLedDot} />
      </div>

      <div className={`${styles.cornerArmor} ${styles.cornerTR}`} aria-hidden="true">
        <div className={styles.cornerArmH} />
        <div className={styles.cornerArmV} />
        <div className={styles.cornerLedDot} />
      </div>

      <div className={`${styles.cornerArmor} ${styles.cornerBL}`} aria-hidden="true">
        <div className={styles.cornerArmH} />
        <div className={styles.cornerArmV} />
        <div className={styles.cornerLedDot} />
      </div>

      <div className={`${styles.cornerArmor} ${styles.cornerBR}`} aria-hidden="true">
        <div className={styles.cornerArmH} />
        <div className={styles.cornerArmV} />
        <div className={styles.cornerLedDot} />
      </div>

      {/* 3. Lateral Heat Sink / Vent Slats (Left & Right) */}
      <div className={`${styles.sideVents} ${styles.sideVentsLeft}`} aria-hidden="true">
        <div className={styles.ventSlat} />
        <div className={styles.ventSlat} />
        <div className={styles.ventSlat} />
        <div className={styles.ventSlat} />
      </div>

      <div className={`${styles.sideVents} ${styles.sideVentsRight}`} aria-hidden="true">
        <div className={styles.ventSlat} />
        <div className={styles.ventSlat} />
        <div className={styles.ventSlat} />
        <div className={styles.ventSlat} />
      </div>

      {/* 4. Glowing Inset Neon Conduits */}
      <div className={styles.neonConduitTop} aria-hidden="true" />
      <div className={styles.neonConduitBottom} aria-hidden="true" />
      <div className={styles.neonConduitLeft} aria-hidden="true" />
      <div className={styles.neonConduitRight} aria-hidden="true" />

      {/* 5. Telemetry Status Bar inside card */}
      {telemetryStatus && (
        <div className={styles.cardHeaderBar}>
          <span className={styles.cardHeaderTitle}>{telemetryTitle}</span>
          <div className={styles.telemetryStatusBadge}>
            <span className={styles.statusDot} />
            <span>{telemetryStatus}</span>
          </div>
        </div>
      )}

      {/* 6. Card Interior Content */}
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
}
