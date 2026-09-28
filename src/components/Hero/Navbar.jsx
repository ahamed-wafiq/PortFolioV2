import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME', href: '#top' },
    { id: 'about', label: 'ABOUT', href: '#about' },
    { id: 'projects', label: 'PROJECTS', href: '#work' },
    { id: 'skills', label: 'SKILLS', href: '#skills' },
    { id: 'contact', label: 'CONTACT', href: '#contact' },
  ];

  return (
    <motion.header
      className={styles.headerContainer}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Cream Pixel-Art Navigation Capsule (Matching First Image Reference) */}
      <nav className={styles.pixelCapsule} aria-label="Flight navigation">
        <a href="#top" className={styles.brandGroup} onClick={() => setActiveSection('home')}>
          {/* Pixel Cube Icon */}
          <div className={styles.pixelCube} aria-hidden="true">
            <div className={styles.cubeTop} />
            <div className={styles.cubeLeft} />
            <div className={styles.cubeRight} />
          </div>
          <span className={styles.brandName}>Ahamed Wafiq</span>
        </a>

        <div className={styles.capsuleDivider} aria-hidden="true" />

        {/* Navigation Tabs (Desktop) */}
        <div className={styles.navLinks}>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className={styles.menuToggle}
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
        </button>
      </nav>

      {/* Top Right Destination Tag (Matching First Image Reference) */}
      <div className={styles.destinationTag}>
        <div className={styles.destText}>
          DESTINATION<br />
          <strong>A BRIGHTER TOMORROW</strong>
        </div>
        <div className={styles.destIcon}>
          <div className={styles.destInnerBox} />
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`${styles.mobileItem} ${activeSection === item.id ? styles.activeMobileItem : ''}`}
              onClick={() => {
                setActiveSection(item.id);
                setMobileMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
