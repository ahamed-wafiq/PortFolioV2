import React from 'react';
import styles from './Sections.module.css';

const CockpitFooter = () => {
  return (
    <footer className={styles.cockpitFooter}>
      <div className={styles.footerLeft}>
        <span style={{ color: '#f97316', fontWeight: 'bold' }}>&bull;</span>
        <span>Ahamed Wafiq &copy; {new Date().getFullYear()}</span>
        <span style={{ opacity: 0.5 }}>|</span>
        <span>All Systems Operational</span>
      </div>

      <div className={styles.footerTelemetry}>
        <span>VESSEL ID: AW-VOYAGER-II &bull; SECTOR 07 &bull; DESTINATION: BRIGHTER TOMORROW</span>
      </div>

      <div>
        <a
          href="#top"
          className={styles.projectBtn}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
        >
          RETURN TO COCKPIT &uarr;
        </a>
      </div>
    </footer>
  );
};

export default CockpitFooter;
