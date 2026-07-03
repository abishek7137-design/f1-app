'use client';

import React from 'react';
import MissionControl from '../../components/Live/MissionControl';

export default function LivePage() {
  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh', overflow: 'hidden' }}>
      <MissionControl />
    </main>
  );
}