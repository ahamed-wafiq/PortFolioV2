import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './HeroContent.module.css';

const HeroContent = () => {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.01 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.leftColumn}>
        {/* Eyebrow: >> HI, I'M (Matching First Image) */}
        <motion.div
          className={styles.eyebrow}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: reduceMotion ? 0 : 0.1 }}
        >
          <span className={styles.chevron}>&gt;&gt;</span> HI, I'M
        </motion.div>

        {/* Title: AHAMED WAFIQ in Chunky Pixel Font with Pixel Brackets (Matching First Image) */}
        <motion.div
          className={styles.nameContainer}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: reduceMotion ? 0 : 0.2 }}
        >
          <div className={styles.bracketTL} aria-hidden="true" />
          <div className={styles.bracketTR} aria-hidden="true" />
          <div className={styles.bracketBL} aria-hidden="true" />
          <div className={styles.bracketBR} aria-hidden="true" />

          <h1 className={styles.nameHeading}>
            <span className={styles.nameWord}>AHAMED</span>
            <span className={styles.nameWord}>WAFIQ</span>
          </h1>
        </motion.div>

        {/* Role Badge: [ AI/ML ENGINEER • MERN STACK DEVELOPER ] (Matching First Image) */}
        <motion.div
          className={styles.roleBadge}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: reduceMotion ? 0 : 0.3 }}
        >
          <span className={styles.badgeText}>
            AI/ML ENGINEER &bull; MERN STACK DEVELOPER
          </span>
        </motion.div>

        {/* Short Description (Matching First Image) */}
        <motion.p
          className={styles.description}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: reduceMotion ? 0 : 0.4 }}
        >
          Building intelligent systems and modern web experiences.
        </motion.p>

        {/* Dual Control Buttons: Orange "VIEW PROJECTS" + Cream "GET IN TOUCH" (Matching First Image) */}
        <motion.div
          className={styles.ctaGroup}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: reduceMotion ? 0 : 0.5 }}
        >
          <a href="#work" className={`${styles.btn} ${styles.btnPrimary}`}>
            <span>VIEW PROJECTS</span>
            <span className={styles.btnArrow}>&rarr;</span>
          </a>

          <a href="#contact" className={`${styles.btn} ${styles.btnSecondary}`}>
            <span>GET IN TOUCH</span>
            <span className={styles.btnArrow}>&rarr;</span>
          </a>
        </motion.div>
      </div>

      {/* Right Column: Kept transparent so the giant planet and space vista are fully visible */}
      <div className={styles.rightColumn} aria-hidden="true" />
    </div>
  );
};

export default HeroContent;
