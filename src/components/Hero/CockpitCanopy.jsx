import React, { useEffect, useState } from 'react';
import styles from './CockpitCanopy.module.css';

const CockpitCanopy = () => {
  const [vibration, setVibration] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animId;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) * 0.001;
      // High-frequency engine rumble
      const vx = Math.sin(elapsed * 18.0) * 0.75 + Math.sin(elapsed * 9.2) * 0.4;
      const vy = Math.cos(elapsed * 22.0) * 0.6 + Math.sin(elapsed * 6.5) * 0.35;
      setVibration({ x: vx, y: vy });
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      className={styles.canopyWrapper}
      style={{
        transform: `translate3d(${vibration.x}px, ${vibration.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      {/* Top Canopy Arch with 4 Overhead Glowing Amber Lamps */}
      <div className={styles.topCanopyBar}>
        <div className={styles.topBezel}>
          <div className={styles.overheadLamp} />
          <div className={styles.overheadLamp} />
          <div className={styles.overheadLamp} />
          <div className={styles.overheadLamp} />
        </div>
      </div>

      {/* Left Angled A-Pillar with Segmented Orange Status Lights */}
      <div className={styles.leftPillar}>
        <div className={styles.pillarLight} />
        <div className={styles.pillarLight} />
        <div className={styles.pillarLight} />
      </div>

      {/* Right Angled A-Pillar with Segmented Orange Status Lights */}
      <div className={styles.rightPillar}>
        <div className={styles.pillarLight} />
        <div className={styles.pillarLight} />
        <div className={styles.pillarLight} />
      </div>

      {/* SVG Windshield Chamfered Corner Bezels */}
      <svg className={styles.windshieldBezelSvg} preserveAspectRatio="none" viewBox="0 0 100 100">
        {/* Top-Left Chamfer Corner */}
        <polygon points="0,0 20,0 0,26" fill="#3a2a20" />
        <polygon points="0,0 18,0 0,23" fill="#251b14" />
        <line x1="20" y1="0" x2="0" y2="26" stroke="#ea580c" strokeWidth="0.8" />

        {/* Top-Right Chamfer Corner */}
        <polygon points="100,0 80,0 100,26" fill="#3a2a20" />
        <polygon points="100,0 82,0 100,23" fill="#251b14" />
        <line x1="80" y1="0" x2="100" y2="26" stroke="#ea580c" strokeWidth="0.8" />

        {/* Bottom-Left Chamfer Corner */}
        <polygon points="0,100 18,100 0,76" fill="#3a2a20" />
        <line x1="18" y1="100" x2="0" y2="76" stroke="#ea580c" strokeWidth="0.8" />

        {/* Bottom-Right Chamfer Corner */}
        <polygon points="100,100 82,100 100,76" fill="#3a2a20" />
        <line x1="82" y1="100" x2="100" y2="76" stroke="#ea580c" strokeWidth="0.8" />
      </svg>
    </div>
  );
};

export default CockpitCanopy;
