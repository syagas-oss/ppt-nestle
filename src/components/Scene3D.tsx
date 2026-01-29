
import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const THEME = {
  primary: "#2dd4bf",   // Teal 400
  secondary: "#fb7185", // Rose 400
  accent: "#fbbf24",    // Amber 400
  dark: "#0a1210"
};

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Workaround for JSX.IntrinsicElements errors
const Points = 'points' as any;
const BufferGeometry = 'bufferGeometry' as any;
const BufferAttribute = 'bufferAttribute' as any;
const PointsMaterial = 'pointsMaterial' as any;

export const Scene3D: React.FC<{ slideIndex: number; slideCount: number }> = ({ slideIndex, slideCount }) => {
  const points = useRef<THREE.Points>(null!);
  const count = isMobile ? 1500 : 5000; // Aumentamos partículas para más densidad
  const { mouse } = useThree();
  const activeRef = useRef(true);

  useEffect(() => {
    const handleVisibility = () => { activeRef.current = !document.hidden; };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const formations = useMemo(() => {
    const sphere = new Float32Array(count * 3);
    const box = new Float32Array(count * 3);
    const plane = new Float32Array(count * 3);
    const spiral = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // 1. Organic Cell (Main Hero) - Soft sphere with noise
      const r = 5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      sphere[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      sphere[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      sphere[i * 3 + 2] = r * Math.cos(phi);

      // 2. DNA Flow (Flowing Helix) instead of Box
      const t = i * 0.1;
      const helixR = 3;
      box[i * 3] = (i / count) * 30 - 15; // X spread
      box[i * 3 + 1] = Math.sin(t) * helixR + (Math.random() - 0.5); // Y Wave
      box[i * 3 + 2] = Math.cos(t) * helixR + (Math.random() - 0.5) * 5; // Z depth

      // 3. Neural Net (Amorphous Cloud) instead of Plane
      plane[i * 3] = (Math.random() - 0.5) * 25;
      plane[i * 3 + 1] = (Math.random() - 0.5) * 15;
      plane[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // 4. Vortex Tunnel (Deep Focus)
      const angle = i * 0.05;
      const radius = 3 + (i / count) * 8;
      const z = (i / count) * 40 - 20;
      spiral[i * 3] = Math.cos(angle) * radius;
      spiral[i * 3 + 1] = Math.sin(angle) * radius;
      spiral[i * 3 + 2] = z;

      colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1;
    }
    return { sphere, box, plane, spiral, colors };
  }, [count]);

  useFrame((state) => {
    if (!activeRef.current || !points.current || !points.current.geometry) return;

    const time = state.clock.getElapsedTime();
    const pos = points.current.geometry.attributes.position.array as Float32Array;
    const cols = points.current.geometry.attributes.color.array as Float32Array;

    // Smooth Transitions
    let formation;
    if (slideIndex === slideCount - 1) formation = formations.spiral;
    else if (slideIndex === 0) formation = formations.sphere;
    else if (slideIndex > 0 && slideIndex < 5) formation = formations.box; // DNA Flow
    else formation = formations.plane; // Neural Net

    const targetColor = new THREE.Color();
    if (slideIndex < 2) targetColor.set(THEME.primary);
    else if (slideIndex >= 3 && slideIndex <= 5) targetColor.set(THEME.secondary);
    else if (slideIndex === slideCount - 1) targetColor.set(THEME.accent);
    else targetColor.set(THEME.primary);

    const step = isMobile ? 0.03 : 0.05; // Slower, more organic transition

    // Breathing effect
    const breath = 1 + Math.sin(time * 0.5) * 0.05;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Interpolation with breathing
      pos[i3] += (formation[i3] * breath - pos[i3]) * step;
      pos[i3 + 1] += (formation[i3 + 1] * breath - pos[i3 + 1]) * step;
      pos[i3 + 2] += (formation[i3 + 2] * breath - pos[i3 + 2]) * step;

      if (!isMobile) {
        cols[i3] += (targetColor.r - cols[i3]) * 0.02;
        cols[i3 + 1] += (targetColor.g - cols[i3 + 1]) * 0.02;
        cols[i3 + 2] += (targetColor.b - cols[i3 + 2]) * 0.02;
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;
    if (!isMobile) points.current.geometry.attributes.color.needsUpdate = true;

    // Organic Rotation (Slower, floating)
    if (slideIndex === slideCount - 1) {
      points.current.rotation.z = time * 0.05;
      points.current.rotation.y += 0.0005;
    } else {
      // Floating mouse interaction
      state.camera.position.x += (mouse.x * 0.5 - state.camera.position.x) * 0.02;
      state.camera.position.y += (mouse.y * 0.5 - state.camera.position.y) * 0.02;
      state.camera.lookAt(0, 0, 0);

      // Gentle rotation
      points.current.rotation.y = Math.sin(time * 0.1) * 0.2;
      points.current.rotation.x = Math.cos(time * 0.15) * 0.1;
    }
  });

  return (
    <>
      <Stars radius={120} depth={40} count={isMobile ? 2000 : 6000} factor={8} saturation={0} fade speed={1.5} />
      <Points ref={points}>
        <BufferGeometry>
          <BufferAttribute attach="attributes-position" count={count} array={formations.sphere} itemSize={3} />
          <BufferAttribute attach="attributes-color" count={count} array={formations.colors} itemSize={3} />
        </BufferGeometry>
        <PointsMaterial size={isMobile ? 0.12 : 0.07} vertexColors transparent opacity={1.0} sizeAttenuation blending={THREE.AdditiveBlending} />
      </Points>
    </>
  );
};
