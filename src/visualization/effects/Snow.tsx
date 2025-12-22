import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { BufferAttribute, Points as ThreePoints } from 'three';
import {
  SNOW_PARTICLE_COUNT,
  SNOW_AREA_SIZE,
  SNOW_FALL_SPEED,
  SNOW_WIND_SPEED,
  SNOW_DRIFT_SPEED,
  SNOW_PARTICLE_SIZE,
  SNOW_COLOR,
  SNOW_OPACITY,
} from '../utils/constants';

const RESPAWN_DISTANCE = SNOW_AREA_SIZE * 0.6;

export const Snow = () => {
  const pointsRef = useRef<ThreePoints>(null!);
  const { camera } = useThree();
  const timeRef = useRef(0);

  const positions = useMemo(() => {
    const pos = new Float32Array(SNOW_PARTICLE_COUNT * 3);
    for (let i = 0; i < SNOW_PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * SNOW_AREA_SIZE;
      pos[i * 3 + 1] = Math.random() * SNOW_AREA_SIZE;
      pos[i * 3 + 2] = (Math.random() - 0.5) * SNOW_AREA_SIZE;
    }
    return pos;
  }, []);

  const offsets = useMemo(() => {
    return new Float32Array(SNOW_PARTICLE_COUNT).map(() => Math.random() * Math.PI * 2);
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    timeRef.current += delta;

    const positionAttribute = pointsRef.current.geometry.getAttribute('position') as BufferAttribute;
    const posArray = positionAttribute.array as Float32Array;
    const camX = camera.position.x;
    const camZ = camera.position.z;

    for (let i = 0; i < SNOW_PARTICLE_COUNT; i++) {
      const drift = Math.sin(timeRef.current * 2 + offsets[i]) * SNOW_DRIFT_SPEED;
      
      posArray[i * 3] += (SNOW_WIND_SPEED + drift) * delta * 60;
      posArray[i * 3 + 1] -= SNOW_FALL_SPEED * delta * 60;
      posArray[i * 3 + 2] += Math.cos(timeRef.current * 1.5 + offsets[i]) * SNOW_DRIFT_SPEED * delta * 60;

      const dx = posArray[i * 3] - camX;
      const dz = posArray[i * 3 + 2] - camZ;
      const distSq = dx * dx + dz * dz;

      if (posArray[i * 3 + 1] < -10 || distSq > RESPAWN_DISTANCE * RESPAWN_DISTANCE) {
        posArray[i * 3] = camX + (Math.random() - 0.5) * SNOW_AREA_SIZE;
        posArray[i * 3 + 1] = Math.random() * SNOW_AREA_SIZE;
        posArray[i * 3 + 2] = camZ + (Math.random() - 0.5) * SNOW_AREA_SIZE;
      }
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={SNOW_COLOR}
        size={SNOW_PARTICLE_SIZE}
        sizeAttenuation
        depthWrite={false}
        opacity={SNOW_OPACITY}
      />
    </Points>
  );
};
