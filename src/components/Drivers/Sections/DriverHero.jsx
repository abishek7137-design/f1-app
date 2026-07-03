'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flag, Clock, FastForward, FlagTriangleRight } from 'lucide-react';
import styles from './DriverHero.module.css';

export default function DriverHero({ driver }) {
  
  // Try to use official images if they exist, otherwise fallback
  const getDriverImageUrl = (id) => {
    const urls = {
      verstappen: "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png",
      hamilton: "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png",
      leclerc: "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png",
      norris: "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png"
    };
    return urls[id] || urls.verstappen;
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1, 
      y: 0,
      transition: { delay: custom * 0.1 + 0.5, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    })
  };

  return (
    <section className={styles.heroSection}>
      
      {/* Background Layer */}
      <div className={styles.backgroundLayer}>
        <motion.div 
          className={styles.garageBg}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ backgroundImage: driver.teamId === 'ferrari' ? `url('/images/ui/hero_ferrari_garage_bg.png')` : `url('/images/ui/hero_garage_bg.png')` }}
        />
        <div className={styles.smokeEffect} />
        <div className={styles.carbonOverlay} />
        
        {/* Dynamic ambient lighting based on team color */}
        <motion.div 
          className={styles.teamAmbientGlow}
          animate={{ backgroundColor: driver.teamColor, opacity: 0.4 }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Content Layer */}
      <div className={styles.contentContainer}>
        
        {/* Left Side: Typography and Stats */}
        <div className={styles.leftColumn}>
          <motion.div 
            className={styles.badge}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ borderLeftColor: driver.teamColor }}
          >
            {driver.number} // {driver.country}
          </motion.div>

          <motion.h1 
            className={styles.driverName}
            key={`name-${driver.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className={styles.firstName}>{driver.firstName}</span>
            <br />
            <span className={styles.lastName}>{driver.lastName}</span>
          </motion.h1>

          <motion.h2 
            className={styles.teamName}
            key={`team-${driver.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ color: driver.teamColor }}
          >
            {driver.team}
          </motion.h2>
          
          {driver.championships > 0 && (
            <motion.div 
              className={styles.championBadge}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Trophy size={20} color="#FFD700" />
              <span>{driver.subtitle ? driver.subtitle.toUpperCase() : `${driver.championships}× WORLD CHAMPION`}</span>
            </motion.div>
          )}

          {/* Animated Stats Row */}
          <div className={styles.statsRow}>
            {[
              { icon: Flag, label: "Wins", value: driver.wins },
              { icon: Trophy, label: "Podiums", value: driver.podiums },
              { icon: Clock, label: "Poles", value: driver.poles },
              { icon: FastForward, label: "Fastest Laps", value: driver.fastestLaps }
            ].map((stat, idx) => (
              <motion.div 
                key={`${driver.id}-stat-${idx}`}
                className={styles.statBox}
                custom={idx}
                variants={statVariants}
                initial="hidden"
                animate="visible"
              >
                <stat.icon size={20} color="rgba(255,255,255,0.4)" />
                <div className={styles.statData}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button 
            className={styles.exploreBtn}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Driver <FlagTriangleRight size={18} />
          </motion.button>

        </div>

        {/* Right Side: Driver Portrait */}
        <div className={styles.rightColumn}>
          <motion.img 
            key={`img-${driver.id}`}
            src={getDriverImageUrl(driver.id)}
            alt={driver.lastName}
            className={styles.driverPortrait}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>

      </div>
    </section>
  );
}
