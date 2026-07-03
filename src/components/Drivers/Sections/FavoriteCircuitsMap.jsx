'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { circuitsData } from '../../../data/mockData';
import { MapPin, Info, Camera, PlayCircle, Map as MapIcon, X, Navigation, CloudRain, Sun, Wind, Trophy, Calendar, Zap, Gauge, Flag, Maximize } from 'lucide-react';
import styles from './FavoriteCircuitsMap.module.css';

export default function HuntingGrounds() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCircuit, setSelectedCircuit] = useState(null);

  const filters = ['All', 'Street', 'Permanent', 'Night Race', 'High Speed', 'Historic', 'Newest'];

  // Basic filtering logic mapping to our mock data properties
  const filteredCircuits = circuitsData.filter((circuit) => {
    // Search query check
    if (searchQuery && !circuit.name.toLowerCase().includes(searchQuery.toLowerCase()) && !circuit.country.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Street') return circuit.type === 'Street';
    if (activeFilter === 'Permanent') return circuit.type === 'Permanent';
    if (activeFilter === 'Night Race') return circuit.id === 'singapore' || circuit.id === 'bahrain' || circuit.id === 'saudi-arabia' || circuit.id === 'las-vegas' || circuit.id === 'qatar' || circuit.id === 'abu-dhabi';
    if (activeFilter === 'High Speed') return parseInt(circuit.topSpeed) >= 340;
    if (activeFilter === 'Historic') return circuit.firstGP < 1960;
    if (activeFilter === 'Newest') return circuit.firstGP > 2015;
    return true;
  });

  const imageMap = {
    'bahrain': 'track-01.jpg',
    'saudi-arabia': 'track-02.jpg',
    'australia': 'track-03.jpg',
    'japan': 'track-04.jpg',
    'monaco': 'track-05.jpg',
    'great-britain': 'track-06.jpg',
    'belgium': 'track-07.jpg',
    'italy': 'track-08.jpg',
    'brazil': 'track-01.jpg',
    'singapore': 'track-02.jpg',
    'usa': 'track-03.jpg',
    'abu-dhabi': 'track-04.jpg',
    'spain': 'track-05.jpg',
    'canada': 'track-06.jpg',
    'netherlands': 'track-07.jpg',
    'azerbaijan': 'track-08.jpg',
    'las-vegas': 'track-01.jpg',
    'qatar': 'track-02.jpg'
  };

  return (
    <section className={styles.huntingGrounds}>
      <div className={styles.header}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          🏁 Hunting Grounds
        </motion.h2>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The circuits where legends are made.
        </motion.p>
      </div>

      <div className={styles.filterContainer}>
        {filters.map((filter) => (
          <button
            key={filter}
            className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
        <input 
          type="text" 
          placeholder="Search circuit..." 
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.carouselWrapper}>
        <motion.div className={styles.carousel} layout>
          <AnimatePresence>
            {filteredCircuits.map((circuit) => {
              const imageFileName = imageMap[circuit.id] || 'track-01.jpg';
              
              return (
              <motion.div 
                key={circuit.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={styles.card}
                onClick={() => setSelectedCircuit(circuit)}
              >
                {/* Abstract Dark Gradient Background instead of real image */}
                <div className={styles.cardBg} />
                <div className={styles.cardOverlay} />
                
                <div className={styles.circuitImageWrapper}>
                  <img 
                    src={`/images/backgrounds/${imageFileName}`} 
                    alt={circuit.name} 
                    className={styles.circuitHeroImage}
                    onError={(e) => {
                      if (!e.target.src.includes('track-01.jpg')) {
                        e.target.src = '/images/backgrounds/track-01.jpg';
                      }
                    }}
                  />
                  <div className={styles.circuitImageOverlay} />
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{circuit.name.replace('Circuit', '').trim()}</h3>
                  <div className={styles.cardSubtitle}>
                    <MapPin size={14} color="#E10600" /> {circuit.city}, {circuit.country}
                  </div>
                  
                  <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Length</span>
                      <span className={styles.statValue}>{circuit.length}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Corners</span>
                      <span className={styles.statValue}>{circuit.corners}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Top Speed</span>
                      <span className={styles.statValue}>{circuit.topSpeed}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Lap Record</span>
                      <span className={styles.statValue}>{circuit.lapRecord}</span>
                    </div>
                  </div>

                  <div className={styles.buttonGroup}>
                    <button className={styles.cardBtn} onClick={(e) => { e.stopPropagation(); setSelectedCircuit(circuit); }}><Info size={16}/> View</button>
                    <button className={styles.cardBtn} onClick={(e) => e.stopPropagation()}><PlayCircle size={16}/> Flyover</button>
                    <button className={styles.cardBtn} onClick={(e) => e.stopPropagation()}><Calendar size={16}/> History</button>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Circuit Modal */}
      <AnimatePresence>
        {selectedCircuit && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCircuit(null)}
          >
            <motion.div 
              className={styles.modalScrollWrapper}
              initial={{ y: 100, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 100, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setSelectedCircuit(null)}>
                <X size={24} />
              </button>

              <div className={styles.modalHero}>
                <div className={styles.modalHeroBg} style={{ background: 'linear-gradient(45deg, #111, #222)' }} />
                <div className={styles.modalHeroOverlay} />
                <div className={styles.modalHeroContent}>
                  <div>
                    <h2 className={styles.modalTitle}>{selectedCircuit.name}</h2>
                    <h4 className={styles.modalSubtitle}>{selectedCircuit.grandPrix}</h4>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Flag size={32} color="#fff" />
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#fff' }}>{selectedCircuit.country}</span>
                  </div>
                </div>
              </div>

              <div className={styles.modalBody}>
                
                {/* Left Column: Facts & Media */}
                <div className={styles.modalMain}>
                  
                  {/* Weather Widget */}
                  <div className={styles.weatherWidget}>
                    <div className={styles.weatherMain}>
                      <Sun size={64} color="#facc15" />
                      <div>
                        <div className={styles.weatherTemp}>28°C</div>
                        <div className={styles.weatherDesc}>Clear Skies</div>
                      </div>
                    </div>
                    <div className={styles.weatherStats}>
                      <div className={styles.wStat}>
                        <Wind size={20} color="#60a5fa" />
                        <span className={styles.statLabel}>Wind 12km/h</span>
                      </div>
                      <div className={styles.wStat}>
                        <CloudRain size={20} color="#60a5fa" />
                        <span className={styles.statLabel}>Rain 0%</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.quickFactsGrid}>
                    <div className={styles.factCard}>
                      <Calendar className={styles.factIcon} size={24} />
                      <span className={styles.factLabel}>First Grand Prix</span>
                      <span className={styles.factValue}>{selectedCircuit.firstGP}</span>
                    </div>
                    <div className={styles.factCard}>
                      <Maximize className={styles.factIcon} size={24} />
                      <span className={styles.factLabel}>Length</span>
                      <span className={styles.factValue}>{selectedCircuit.length}</span>
                    </div>
                    <div className={styles.factCard}>
                      <Gauge className={styles.factIcon} size={24} />
                      <span className={styles.factLabel}>Laps</span>
                      <span className={styles.factValue}>{selectedCircuit.laps}</span>
                    </div>
                    <div className={styles.factCard}>
                      <Zap className={styles.factIcon} size={24} />
                      <span className={styles.factLabel}>Lap Record</span>
                      <span className={styles.factValue}>{selectedCircuit.lapRecord}</span>
                    </div>
                    <div className={styles.factCard}>
                      <Trophy className={styles.factIcon} size={24} />
                      <span className={styles.factLabel}>Record Holder</span>
                      <span className={styles.factValue}>{selectedCircuit.recordHolder}</span>
                    </div>
                    <div className={styles.factCard}>
                      <Navigation className={styles.factIcon} size={24} />
                      <span className={styles.factLabel}>Direction</span>
                      <span className={styles.factValue}>{selectedCircuit.direction}</span>
                    </div>
                  </div>

                  <h3 className={styles.mediaSectionTitle}><Camera size={24}/> Track Gallery</h3>
                  <div className={styles.galleryGrid}>
                    <div className={styles.galleryItem}>
                      <div className={styles.galleryImg} style={{ background: 'linear-gradient(45deg, #111, #333)' }} />
                    </div>
                    <div className={styles.galleryItem}>
                      <div className={styles.galleryImg} style={{ background: 'linear-gradient(45deg, #222, #111)' }} />
                    </div>
                    <div className={styles.galleryItem}>
                      <div className={styles.galleryImg} style={{ background: 'linear-gradient(45deg, #333, #222)' }} />
                    </div>
                  </div>

                </div>

                {/* Right Column: Interactive Map */}
                <div className={styles.mapSidebar}>
                  <div className={styles.interactiveMapCard}>
                    <div className={styles.largeMapOutline}>
                      <MapIcon size={120} color="#E10600" />
                    </div>
                    <button className={styles.actionBtn}>
                      <PlayCircle size={20} /> View Flyover
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
