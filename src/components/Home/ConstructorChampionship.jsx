'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import Link from 'next/link';
import styles from './ConstructorChampionship.module.css';

// Reusable Counter for Points
function Counter({ from, to, duration = 2 }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration, ease: "easeOut", delay: 0.5 });
    return controls.stop;
  }, [count, to, duration]);

  return <motion.span>{rounded}</motion.span>;
}

export default function ConstructorChampionship() {
  const teams = [
    { pos: 1, id: "mclaren", name: "McLaren", points: 516, color: "#FF8000" },
    { pos: 2, id: "redbull", name: "Red Bull Racing", points: 475, color: "#3671C6" },
    { pos: 3, id: "ferrari", name: "Ferrari", points: 441, color: "#E8002D" },
    { pos: 4, id: "mercedes", name: "Mercedes", points: 329, color: "#27F4D2" },
    { pos: 5, id: "astonmartin", name: "Aston Martin", points: 86, color: "#229971" },
    { pos: 6, id: "racingbulls", name: "Racing Bulls", points: 34, color: "#FFFFFF" },
    { pos: 7, id: "haas", name: "Haas F1 Team", points: 31, color: "#FFFFFF" },
    { pos: 8, id: "williams", name: "Williams", points: 16, color: "#005AFF" },
    { pos: 9, id: "alpine", name: "Alpine", points: 13, color: "#0090FF" },
    { pos: 10, id: "sauber", name: "Sauber", points: 0, color: "#52E252" }
  ];

  const maxPoints = teams[0].points; // McLaren 516

  const handleImageError = (e, teamId) => {
    if (e.target.src.includes('.png')) {
      e.target.src = `/images/teams/${teamId}.webp`;
    } else {
      e.target.src = "/images/drivers/placeholder.jpg";
    }
  };

  return (
    <section className={styles.section}>
      {/* SVG Filters for Heat Distortion */}
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="heat-distortion">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className={styles.carbonBg} />
      <div className={styles.ambientLight} />

      <div className={styles.sectionHeader}>
        <div>
          <h3 className={styles.subtitle}>Standings</h3>
          <h2 className={styles.title}>Constructor Championship</h2>
        </div>
        <Link href="/standings" className={styles.viewAll}>
          Full Standings
        </Link>
      </div>

      <div className={styles.chartContainer}>
        {teams.map((team, index) => {
          
          let glowColor = team.color;
          if (team.id === "haas") glowColor = "#FF0000";
          if (team.id === "racingbulls") glowColor = "#4477FF";
          if (team.id === "sauber") glowColor = "#00FF00";

          // Calculate percentage width. Even 0 points needs some width to show the car.
          const percentage = Math.max((team.points / maxPoints) * 100, 15); 

          return (
            <motion.div 
              key={team.id} 
              className={styles.teamRow}
              style={{ '--team-glow': glowColor }}
              whileHover="hover"
            >
              
              {/* Left Side: Team Info */}
              <div className={styles.teamInfo}>
                <span className={styles.position}>0{team.pos}</span>
                <div className={styles.identity}>
                  <h3 className={styles.teamName}>{team.name}</h3>
                  <div className={styles.pointsWrapper}>
                    <span className={styles.points}>
                      <Counter from={0} to={team.points} duration={2} />
                    </span>
                    <span className={styles.ptsLabel}>PTS</span>
                  </div>
                </div>
              </div>

              {/* Right Side: The Track */}
              <div className={styles.barTrack}>
                <div className={styles.trackOverlay} />
                
                {/* The "Driving" Car acting as the progress bar */}
                <motion.div 
                  className={styles.drivingProgress}
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${percentage}%` }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.2 + (index * 0.15), // Staggered starting grid effect
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                >
                  <div className={styles.carWrapper}>
                    {/* Team Underglow */}
                    <div className={styles.underGlow} style={{ background: glowColor }} />
                    
                    <motion.div 
                      className={styles.carModelContainer}
                      variants={{
                        hover: { 
                          rotateZ: -2,
                          scale: 1.05,
                          y: -5
                        }
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <img 
                        src={`/images/cars/car_${team.id}.png`}
                        alt={team.name} 
                        className={styles.carModel} 
                        onError={(e) => handleImageError(e, team.id)}
                      />
                      
                      {/* Hover Physics Elements */}
                      <div className={styles.heatExhaust} />
                      <div className={styles.lightSweep} />
                      
                    </motion.div>
                    
                    {/* Floor Reflection */}
                    <div className={styles.floorReflection} style={{ background: `radial-gradient(ellipse at center, ${glowColor}60 0%, transparent 60%)` }} />
                  </div>
                </motion.div>
              </div>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
