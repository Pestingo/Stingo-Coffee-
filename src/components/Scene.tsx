import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Stylized Coffee Cup */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.5, 1.2, 32]} />
        <meshStandardMaterial color="#4d2a00" roughness={0.5} metalness={0.2} />
      </mesh>
      
      {/* Cup Handle */}
      <mesh position={[0.9, 0, 0]}>
        <torusGeometry args={[0.3, 0.1, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#4d2a00" roughness={0.5} metalness={0.2} />
      </mesh>
      
      {/* Coffee Surface */}
      <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.65, 32]} />
        <meshStandardMaterial color="#2a1600" roughness={0.3} metalness={0.4} />
      </mesh>
      
      {/* Steam Particles */}
      <group position={[0, 0.7, 0]}>
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[Math.sin(i) * 0.2, i * 0.1, Math.cos(i) * 0.2]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default Scene;