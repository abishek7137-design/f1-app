'use client';

import React from 'react';
import { Search, Map, Flag } from 'lucide-react';
import styles from './CircuitFilter.module.css';

export default function CircuitFilter({ 
  searchQuery, 
  setSearchQuery, 
  selectedContinent, 
  setSelectedContinent,
  selectedType,
  setSelectedType
}) {
  const continents = ['All', 'Europe', 'Asia', 'North America', 'South America', 'Oceania'];
  const types = ['All', 'Permanent', 'Street'];

  return (
    <div className={styles.filterWrapper}>
      <div className={`${styles.filterContainer} glass`}>
        
        <div className={styles.searchGroup}>
          <Search size={20} className={styles.icon} />
          <input 
            type="text" 
            placeholder="Search circuits..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.divider} />

        <div className={styles.filterGroup}>
          <Map size={20} className={styles.icon} />
          <select 
            value={selectedContinent} 
            onChange={(e) => setSelectedContinent(e.target.value)}
            className={styles.select}
          >
            {continents.map(c => <option key={c} value={c}>{c === 'All' ? 'All Continents' : c}</option>)}
          </select>
        </div>

        <div className={styles.divider} />

        <div className={styles.filterGroup}>
          <Flag size={20} className={styles.icon} />
          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className={styles.select}
          >
            {types.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
          </select>
        </div>

      </div>
    </div>
  );
}
