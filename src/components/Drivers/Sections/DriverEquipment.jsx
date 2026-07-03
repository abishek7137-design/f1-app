'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Cog, Hand, Footprints, UserCircle, CheckCircle2 } from 'lucide-react';
import styles from './DriverEquipment.module.css';

const enrichEquipment = (type, data) => {
  const enrichments = {
    helmet: {
      name: "Race Helmet",
      icon: UserCircle,
      description: "Advanced ballistic protection and aerodynamic profile.",
      certification: "FIA 8860-2018",
      technology: ["Carbon Composite", "HANS Compatible", "Anti Fog Visor", "Fire Resistant Interior"],
      x: "25%", y: "15%", targetX: "48%", targetY: "12%" // Hotspot positioning
    },
    suit: {
      name: "Race Suit",
      icon: Shield,
      description: "Ultra-lightweight Nomex fire-resistant racing suit.",
      certification: "FIA 8856-2018",
      technology: ["3-Layer Nomex", "Breathable Mesh", "Anatomical Fit", "Driver Extraction Epaulettes"],
      x: "75%", y: "40%", targetX: "52%", targetY: "35%"
    },
    wheel: {
      name: "Steering Wheel",
      icon: Cog,
      description: "Bespoke carbon fiber command center.",
      certification: "FIA Homologated",
      technology: ["Digital Dash V2", "Rotary Dials", "Clutch Paddles", "Custom Ergonomics"],
      x: "20%", y: "55%", targetX: "45%", targetY: "50%"
    },
    gloves: {
      name: "Race Gloves",
      icon: Hand,
      description: "High-grip biometric racing gloves.",
      certification: "FIA 8856-2018",
      technology: ["Silicon Palm Print", "External Seams", "Biometric Sensors", "Pre-curved Fingers"],
      x: "80%", y: "65%", targetX: "58%", targetY: "58%"
    },
    boots: {
      name: "Race Boots",
      icon: Footprints,
      description: "Featherweight carbon-reinforced racing footwear.",
      certification: "FIA 8856-2018",
      technology: ["Ultralight Frame", "Carbon Heel", "Asymmetric Lacing", "Fire Retardant"],
      x: "25%", y: "85%", targetX: "47%", targetY: "88%"
    }
  };
  
  return { ...enrichments[type], ...data, type };
};

const AnimatedNumber = ({ value, suffix = "" }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/,/g, ''), 10);
    if (isNaN(end)) return;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCurrent(end);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  
  return <span>{current.toLocaleString()}{suffix}</span>;
};

export default function DriverEquipment({ driver }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  if (!driver.equipment) return null;

  const equipmentList = [
    enrichEquipment('helmet', driver.equipment.helmet),
    enrichEquipment('suit', driver.equipment.suit),
    enrichEquipment('wheel', driver.equipment.wheel),
    enrichEquipment('gloves', driver.equipment.gloves),
    enrichEquipment('boots', driver.equipment.boots),
  ];

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePosition({
      x: (clientX / window.innerWidth - 0.5) * 20,
      y: (clientY / window.innerHeight - 0.5) * 20
    });
  };

  return (
    <section className={styles.showcaseSection} onMouseMove={handleMouseMove}>
      
      {/* Background Environment */}
      <div className={styles.backgroundEnvironment}>
        <div className={styles.carbonGrid} />
        <div className={styles.smokeEffect} />
        <div className={styles.redBeams} />
        <div className={styles.particles} />
      </div>

      <div className={styles.header}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Race Technology
        </motion.h2>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Every component engineered for milliseconds.
        </motion.p>
      </div>

      {/* 3D Showcase Area */}
      <div className={styles.showcaseWrapper}>
        
        {/* Parallax Driver Silhouette */}
        <motion.div 
          className={styles.silhouetteContainer}
          animate={{ x: mousePosition.x * -1, y: mousePosition.y * -1 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <img src="/images/ui/f1_driver_silhouette.png" alt="Driver Silhouette" className={styles.silhouetteImage} />
        </motion.div>

        {/* SVG Connection Lines */}
        <svg className={styles.svgOverlay}>
          {equipmentList.map((eq, i) => (
            <motion.line
              key={`line-${i}`}
              x1={eq.x}
              y1={eq.y}
              x2={eq.targetX}
              y2={eq.targetY}
              stroke="rgba(225, 6, 0, 0.4)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: hoveredNode === eq.type ? 1 : 0.2 
              }}
              transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', ease: "linear" }}
            />
          ))}
        </svg>

        {/* Hotspots */}
        {equipmentList.map((eq, i) => {
          const isHovered = hoveredNode === eq.type;
          const isFaded = hoveredNode && !isHovered;
          const Icon = eq.icon;
          
          // Determine panel slide direction based on x position
          const slideDirection = parseInt(eq.x) > 50 ? -20 : 20;

          return (
            <div 
              key={eq.type}
              className={`${styles.hotspotNode} ${isFaded ? styles.faded : ''}`}
              style={{ left: eq.x, top: eq.y }}
              onMouseEnter={() => setHoveredNode(eq.type)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <motion.div 
                className={styles.pulseDot}
                animate={{ 
                  scale: isHovered ? [1, 1.5, 1] : [1, 1.2, 1],
                  boxShadow: isHovered 
                    ? '0 0 30px rgba(225, 6, 0, 0.8)' 
                    : '0 0 10px rgba(225, 6, 0, 0.4)'
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Glass Detail Panel */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div 
                    className={styles.glassPanel}
                    initial={{ opacity: 0, x: slideDirection, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: slideDirection, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    style={{ [parseInt(eq.x) > 50 ? 'right' : 'left']: '40px' }}
                  >
                    <div className={styles.panelHeader}>
                      <motion.div 
                        className={styles.panelIcon}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Icon size={32} color="#E10600" />
                      </motion.div>
                      <div>
                        <h4 className={styles.panelTitle}>{eq.name}</h4>
                        <p className={styles.panelDesc}>{eq.description}</p>
                      </div>
                    </div>

                    <div className={styles.panelSpecs}>
                      <div className={styles.specItem}>
                        <span className={styles.specKey}>Weight</span>
                        <span className={styles.specVal}>{eq.weight}</span>
                      </div>
                      <div className={styles.specItem}>
                        <span className={styles.specKey}>Manufacturer</span>
                        <span className={styles.specVal}>{eq.brand}</span>
                      </div>
                      <div className={styles.specItem}>
                        <span className={styles.specKey}>Material</span>
                        <span className={styles.specVal}>{eq.material || "Carbon Kevlar"}</span>
                      </div>
                    </div>

                    <div className={styles.panelCert}>
                      <span className={styles.certKey}>Certification</span>
                      <span className={styles.certVal}>{eq.certification}</span>
                    </div>

                    <div className={styles.panelTech}>
                      <span className={styles.techTitle}>Technology Features</span>
                      <ul className={styles.techList}>
                        {eq.technology.map((tech, idx) => (
                          <li key={idx}>
                            <CheckCircle2 size={12} color="#E10600" /> {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom Performance Strip */}
      <div className={styles.performanceStrip}>
        <div className={styles.perfStat}>
          <span className={styles.perfNum}><AnimatedNumber value="320" suffix=" km/h" /></span>
          <span className={styles.perfLabel}>Air Resistance</span>
        </div>
        <div className={styles.perfStat}>
          <span className={styles.perfNum}><AnimatedNumber value="800" suffix="°C" /></span>
          <span className={styles.perfLabel}>Brake Temp</span>
        </div>
        <div className={styles.perfStat}>
          <span className={styles.perfNum}><AnimatedNumber value="15000" suffix=" RPM" /></span>
          <span className={styles.perfLabel}>Engine Limit</span>
        </div>
        <div className={styles.perfStat}>
          <span className={styles.perfNum}><AnimatedNumber value="5" suffix="G" /></span>
          <span className={styles.perfLabel}>Cornering Force</span>
        </div>
        <div className={styles.perfStat}>
          <span className={styles.perfNum}>1.6L</span>
          <span className={styles.perfLabel}>Turbo Hybrid</span>
        </div>
      </div>
    </section>
  );
}
