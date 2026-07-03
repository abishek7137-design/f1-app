'use client';

import React from 'react';
import HospitalityBooking from '../../components/Tickets/HospitalityBooking';
import Footer from '../../components/Navigation/Footer';

export default function TicketsPage() {
  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <HospitalityBooking />
      <Footer />
    </main>
  );
}
