'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { circuitsData } from '../../data/mockData';
import { ChevronRight, Plane, Hotel, Star, ShieldCheck, Map, CheckCircle2 } from 'lucide-react';
import styles from './HospitalityBooking.module.css';

export default function HospitalityBooking() {
  const [selectedRace, setSelectedRace] = useState(circuitsData[1]); // Monaco
  const [activeTab, setActiveTab] = useState('tickets');
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    { id: 'paddock', name: 'Paddock Club™', price: '$8,500', desc: 'The pinnacle of Formula 1 hospitality. Situated directly above the team garages with prime views of the pit lane and start/finish line.', perks: ['Gourmet Dining', 'Open Bar', 'Pit Lane Walk', 'Driver Appearances'] },
    { id: 'champion', name: 'Champions Club', price: '$4,200', desc: 'Premium trackside views combined with expert hospitality, featuring guided paddock tours and exclusive appearances.', perks: ['Premium Seating', 'Catered Meals', 'Paddock Tour', 'Grid Walk'] },
    { id: 'grandstand', name: 'VIP Grandstand', price: '$1,200', desc: 'Reserved premium seating at the most thrilling corners of the circuit, with access to exclusive fan zones.', perks: ['Reserved Seat', 'Fast Track Entry', 'Fan Zone Access'] }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.heroSection}>
        <motion.div 
          key={selectedRace.id}
          className={styles.heroImage} 
          style={{ backgroundImage: `url(${selectedRace.image})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className={styles.heroOverlay} />
        </motion.div>
        
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className={styles.badge}>Formula 1 Experiences</span>
            <h1 className={styles.title}>{selectedRace.name}</h1>
            <p className={styles.subtitle}>Curate your perfect race weekend in {selectedRace.city}</p>
          </motion.div>
        </div>
      </div>

      <div className={styles.bookingContainer}>
        {/* Race Selector */}
        <div className={styles.raceSelector}>
          <h3 className={styles.selectorLabel}>Select Grand Prix</h3>
          <div className={styles.raceList}>
            {circuitsData.map(race => (
              <button 
                key={race.id} 
                className={`${styles.raceBtn} ${selectedRace.id === race.id ? styles.raceBtnActive : ''}`}
                onClick={() => setSelectedRace(race)}
              >
                {race.country}
              </button>
            ))}
          </div>
        </div>

        {/* Builder Area */}
        <div className={styles.builderArea}>
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${activeTab === 'tickets' ? styles.tabActive : ''}`} onClick={() => setActiveTab('tickets')}>
              <Star size={18} /> Hospitality & Tickets
            </button>
            <button className={`${styles.tab} ${activeTab === 'travel' ? styles.tabActive : ''}`} onClick={() => setActiveTab('travel')}>
              <Hotel size={18} /> Travel & Hotels
            </button>
            <button className={`${styles.tab} ${activeTab === 'extras' ? styles.tabActive : ''}`} onClick={() => setActiveTab('extras')}>
              <ShieldCheck size={18} /> Concierge
            </button>
          </div>

          <div className={styles.tabContent}>
            <AnimatePresence mode="wait">
              {activeTab === 'tickets' && (
                <motion.div 
                  key="tickets"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={styles.packagesGrid}
                >
                  {packages.map(pkg => (
                    <div 
                      key={pkg.id} 
                      className={`${styles.packageCard} ${selectedPackage === pkg.id ? styles.packageCardSelected : ''}`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      {selectedPackage === pkg.id && <CheckCircle2 className={styles.checkIcon} color="var(--success)" />}
                      <h4 className={styles.pkgName}>{pkg.name}</h4>
                      <div className={styles.pkgPrice}>{pkg.price} <span>/ person</span></div>
                      <p className={styles.pkgDesc}>{pkg.desc}</p>
                      <ul className={styles.perksList}>
                        {pkg.perks.map((perk, i) => (
                          <li key={i}><ChevronRight size={14} color="var(--f1-red)" /> {perk}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'travel' && (
                <motion.div 
                  key="travel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={styles.travelSection}
                >
                  <div className={styles.placeholderCard}>
                    <Hotel size={48} color="rgba(255,255,255,0.2)" />
                    <h3>Luxury Partner Hotels</h3>
                    <p>Unlock exclusive rates at 5-star properties in {selectedRace.city}.</p>
                    <button className={styles.actionBtn}>Browse Hotels</button>
                  </div>
                  <div className={styles.placeholderCard}>
                    <Plane size={48} color="rgba(255,255,255,0.2)" />
                    <h3>Private Aviation & Transfers</h3>
                    <p>Arrive in style with our helicopter transfer partners.</p>
                    <button className={styles.actionBtn}>Arrange Transport</button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'extras' && (
                <motion.div 
                  key="extras"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={styles.extrasSection}
                >
                   <div className={styles.placeholderCardFull}>
                    <h3>F1 Concierge Service</h3>
                    <p>Let our dedicated team handle your dinner reservations, VIP club access, and exclusive after-party invitations.</p>
                    <button className={styles.actionBtn}>Contact Concierge</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Checkout Bar */}
        <div className={styles.checkoutBar}>
          <div className={styles.summary}>
            <span className={styles.summaryLabel}>Selected Package:</span>
            <span className={styles.summaryValue}>
              {selectedPackage ? packages.find(p => p.id === selectedPackage).name : 'None selected'}
            </span>
          </div>
          <button 
            className={styles.checkoutBtn} 
            disabled={!selectedPackage}
          >
            Request Booking <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
