import React, { useState } from 'react';
import styles from './Sections.module.css';
import HudRailFrame from './HudRailFrame/HudRailFrame';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [transmitted, setTransmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTransmitted(true);
    setTimeout(() => {
      setTransmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.gridBackground} aria-hidden="true" />

      <div className={styles.headerBlock}>
        <div className={styles.sectionTag}>
          <span>[SUBSPACE_COMM // 04]</span>
        </div>
        <h2 className={styles.sectionTitle}>INITIATE TRANSMISSION</h2>
        <p className={styles.sectionSubtitle}>
          Open communication channels for engineering opportunities, projects, or collaborations.
        </p>
      </div>

      <div className={styles.contactGrid}>
        {/* Left Column: Direct Comms Dossier with Blender 3D HUD Rail Frame */}
        <HudRailFrame
          telemetryTitle="COMM FREQUENCY: DIRECT"
          telemetryStatus="SIGNAL 100%"
        >
          <div className={styles.commsInfo}>
            <div className={styles.commsItem}>
              <div className={styles.commsIcon}>@</div>
              <div>
                <div className={styles.commsLabel}>PRIMARY EMAIL</div>
                <div className={styles.commsValue}>
                  <a href="mailto:ahamedwafiq@example.com">ahamedwafiq@example.com</a>
                </div>
              </div>
            </div>

            <div className={styles.commsItem}>
              <div className={styles.commsIcon}>GH</div>
              <div>
                <div className={styles.commsLabel}>CODE REPOSITORY</div>
                <div className={styles.commsValue}>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    github.com/ahamedwafiq
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.commsItem}>
              <div className={styles.commsIcon}>IN</div>
              <div>
                <div className={styles.commsLabel}>NETWORK LINK</div>
                <div className={styles.commsValue}>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/ahamedwafiq
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.commsItem}>
              <div className={styles.commsIcon}>LOC</div>
              <div>
                <div className={styles.commsLabel}>CURRENT STATION</div>
                <div className={styles.commsValue}>
                  India / Remote Worldwide
                </div>
              </div>
            </div>
          </div>
        </HudRailFrame>

        {/* Right Column: Transmission Form Panel with Blender 3D HUD Rail Frame */}
        <HudRailFrame
          telemetryTitle="DISPATCH CONSOLE"
          telemetryStatus="ENCRYPT: SHA-256"
        >

          {transmitted ? (
            <div style={{ padding: '2rem 0', textAlign: 'center' }}>
              <div style={{ color: '#ffb84d', fontFamily: 'var(--font-pixel)', fontSize: '1rem', marginBottom: '0.5rem' }}>
                [TRANSMISSION SENT]
              </div>
              <p style={{ color: '#c8aa82', fontSize: '0.9rem' }}>
                Signal acknowledged. Response will be dispatched shortly.
              </p>
            </div>
          ) : (
            <form className={styles.transmissionForm} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="pilot-name">
                  IDENTIFICATION / NAME
                </label>
                <input
                  id="pilot-name"
                  type="text"
                  required
                  placeholder="Enter your name or callsign"
                  className={styles.cockpitInput}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="pilot-email">
                  COMM ADDRESS / EMAIL
                </label>
                <input
                  id="pilot-email"
                  type="email"
                  required
                  placeholder="your.email@network.com"
                  className={styles.cockpitInput}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="pilot-msg">
                  SIGNAL PAYLOAD / MESSAGE
                </label>
                <textarea
                  id="pilot-msg"
                  required
                  placeholder="Type your transmission payload..."
                  className={styles.cockpitTextarea}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className={styles.transmitButton}>
                TRANSMIT SIGNAL &rarr;
              </button>
            </form>
          )}
        </HudRailFrame>
      </div>
    </section>
  );
};

export default ContactSection;
