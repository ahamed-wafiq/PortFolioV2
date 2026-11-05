import React from 'react';
import styles from './AboutSection.module.css';
import TechnologyCore from './TechCore/TechnologyCore';

const AboutSection = () => {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.gridBackground} aria-hidden="true" />

      {/* Main Section Header */}
      <div className={styles.headerBlock}>
        <div className={styles.sectionTag}>
          <span>[SYS_PROFILE // 01]</span>
        </div>
        <h2 className={styles.sectionTitle}>ABOUT THE PILOT</h2>
        <p className={styles.sectionSubtitle}>
          Mission telemetry, background dossier, and engineering disciplines.
        </p>
      </div>

      {/* ================================================================ */}
      {/* UNIFIED COMMAND DECK CONSOLE: PILOT DOSSIER & QUANTUM TECH CORE   */}
      {/* ================================================================ */}
      <div className={styles.commandDeck}>
        {/* Master Corner Accents */}
        <div className={styles.deckCornerTL} />
        <div className={styles.deckCornerTR} />
        <div className={styles.deckCornerBL} />
        <div className={styles.deckCornerBR} />

        {/* Top Master Flight Telemetry Banner */}
        <div className={styles.deckTopBar}>
          <div className={styles.topBarLeft}>
            <div className={styles.liveIndicator}>
              <span className={styles.liveDot} />
              <span>CORE SYNC // STABLE</span>
            </div>
            <span style={{ opacity: 0.4 }}>|</span>
            <span className={styles.topBarTitle}>VESSEL: AW-VOYAGER-II</span>
          </div>

          <div className={styles.topBarCenter}>
            <span>PILOT COMMAND &bull; DUAL-CHANNEL TELEMETRY DECK</span>
          </div>

          <div className={styles.topBarRight}>
            <span className={styles.telemetryTag}>CLEARANCE: LVL 5</span>
            <span>SECTOR 07 &bull; ORBITAL LINK ONLINE</span>
          </div>
        </div>

        {/* Integrated Deck Workspace */}
        <div className={styles.deckBody}>
          {/* Station 1: Pilot Biography & Engineering Dossier */}
          <div className={styles.pilotStation}>
            <div>
              {/* Telemetry Module Tag */}
              <div className={styles.cardTelemetry}>
                <span>▓ ABOUT MODULE // AHAMED WAFIQ ▓</span>
                <div className={styles.telemetryStatus}>
                  <span className={styles.statusDot} />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Pilot Identity Callsign */}
              <div className={styles.pilotIdentityRow}>
                <div className={styles.callsignPill}>
                  <span>CALLSIGN: AW-VOYAGER-II</span>
                </div>
                <span className={styles.roleTag}>[LEAD SYSTEMS ARCHITECT]</span>
              </div>

              {/* Bio Heading */}
              <h3 className={styles.bioHeading}>
                Computer Engineering Student &amp; Full-Stack AI Engineer
              </h3>

              {/* Bio Paragraphs with sci-fi side rail */}
              <div className={styles.bioTextContainer}>
                <p className={styles.bioText}>
                  I am driven by the intersection of high-performance modern web architecture and artificial intelligence. My focus is engineering intelligent, scalable systems that turn complex computational models into fluid, responsive user experiences.
                </p>

                <p className={styles.bioText}>
                  From designing full-stack MERN applications to training deep neural networks and real-time 3D WebGL interfaces, I approach software engineering with precision, curiosity, and an eye for cutting-edge aesthetics.
                </p>
              </div>
            </div>
          </div>

          {/* Central Quantum Data Bus Conduit */}
          <div className={styles.dataBusConduit} aria-hidden="true">
            <div className={styles.busLine} />
            <div className={styles.busPulse} />
            <div className={styles.busNode} />
            <span className={styles.busTextVertical}>QUANTUM DATA BUS &bull; 128 GB/S</span>
            <div className={styles.busNode} />
          </div>

          {/* Station 2: Quantum Technology Reactor Chamber */}
          <div className={styles.reactorStation}>
            <TechnologyCore isEmbedded={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
