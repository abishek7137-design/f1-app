'use client';

import React from 'react';
import Circuits2DMap from '../../components/Season/Circuits2DMap';

export default function CircuitsPage() {
  return (
    <main style={{ backgroundColor: '#000', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Circuits2DMap />
    </main>
  );
}