'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

// Convert lat/lng to 3D Cartesian coordinates
const getCoords = (lat, lng, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
};

const Earth = ({ circuits, selectedCircuit }) => {
  const earthRef = useRef();

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001; // slow rotation
    }
  });

  return (
    <group ref={earthRef}>
      <Sphere args={[2, 64, 64]}>
        <meshBasicMaterial color="#0a0a0a" wireframe={true} transparent opacity={0.3} />
      </Sphere>

      <Sphere args={[1.98, 32, 32]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>

      {circuits.map((circuit) => {
        if (!circuit.coordinates) return null;
        const [lat, lng] = circuit.coordinates;
        const pos = getCoords(lat, lng, 2.02);
        const isSelected = selectedCircuit?.id === circuit.id;

        return (
          <group key={circuit.id} position={pos}>
            <mesh>
              <sphereGeometry args={[isSelected ? 0.08 : 0.03, 16, 16]} />
              <meshBasicMaterial color={isSelected ? "#E8002D" : "#444444"} />
            </mesh>
            {isSelected && (
              <Html distanceFactor={10}>
                <div style={{
                  color: 'white',
                  background: 'rgba(232, 0, 45, 0.8)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  fontFamily: 'Inter, sans-serif',
                  backdropFilter: 'blur(4px)',
                  transform: 'translate3d(-50%, -150%, 0)',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap'
                }}>
                  {circuit.city}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
};

export default function CircuitGlobe({ circuits, selectedCircuit }) {
  return (
    <div style={{ width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', background: 'radial-gradient(circle at center, #111 0%, #000 100%)' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Earth circuits={circuits} selectedCircuit={selectedCircuit} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
