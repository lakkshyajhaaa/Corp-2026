'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

// Constellation Dust
function Stars(props: any) {
  const ref = useRef<any>();
  
  // Generate spherical points for a celestial feel
  const sphere = useMemo(() => random.inSphere(new Float32Array(3000), { radius: 1.5 }), []);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#d4af37" /* Gold/Bronze */
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

// Abstract Bronze Artifact (rotating slowly in the background)
function Artifact() {
  const meshRef = useRef<any>();
  const ringRef1 = useRef<any>();
  const ringRef2 = useRef<any>();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x += delta * 0.05;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.y -= delta * 0.2;
      ringRef1.current.rotation.z += delta * 0.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.x += delta * 0.15;
      ringRef2.current.rotation.z -= delta * 0.1;
    }
  });

  return (
    <group position={[1.5, 0, -2]} scale={[0.8, 0.8, 0.8]}>
      {/* Outer Astrolabe Ring */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[1.2, 0.005, 16, 100]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} transparent opacity={0.3} />
      </mesh>
      
      {/* Inner Astrolabe Ring */}
      <mesh ref={ringRef2} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.005, 16, 100]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} transparent opacity={0.5} />
      </mesh>

      {/* Central Abstract Geometry (e.g. Tetrahedron / Ship abstraction) */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#1a2a40" metalness={0.9} roughness={0.1} />
        {/* Wireframe overlay to look drafted/architectural */}
        <mesh>
          <octahedronGeometry args={[0.301, 0]} />
          <meshBasicMaterial color="#d4af37" wireframe transparent opacity={0.2} />
        </mesh>
      </mesh>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#d4af37" />
        
        <Stars />
        <Artifact />
      </Canvas>
    </div>
  );
}
