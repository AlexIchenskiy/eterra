import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { BufferAttribute, Points as ThreePoints } from 'three';
import {
  RAIN_PARTICLE_COUNT,
  RAIN_AREA_SIZE,
  RAIN_FALL_SPEED,
  RAIN_WIND_SPEED,
  RAIN_PARTICLE_SIZE,
  RAIN_COLOR,
  RAIN_OPACITY,
} from '../utils/constants';

const RESPAWN_DISTANCE = RAIN_AREA_SIZE * 0.6;

export const Rain = () => {
  const pointsRef = useRef<ThreePoints>(null!);
  const { camera } = useThree();

  const positions = useMemo(() => {
    const pos = new Float32Array(RAIN_PARTICLE_COUNT * 3);
    for (let i = 0; i < RAIN_PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * RAIN_AREA_SIZE;
      pos[i * 3 + 1] = Math.random() * RAIN_AREA_SIZE;
      pos[i * 3 + 2] = (Math.random() - 0.5) * RAIN_AREA_SIZE;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const positionAttribute = pointsRef.current.geometry.getAttribute('position') as BufferAttribute;
    const posArray = positionAttribute.array as Float32Array;
    const camX = camera.position.x;
    const camZ = camera.position.z;

    for (let i = 0; i < RAIN_PARTICLE_COUNT; i++) {
      posArray[i * 3] += RAIN_WIND_SPEED * delta * 60;
      posArray[i * 3 + 1] -= RAIN_FALL_SPEED * delta * 60;

      const dx = posArray[i * 3] - camX;
      const dz = posArray[i * 3 + 2] - camZ;
      const distSq = dx * dx + dz * dz;

      if (posArray[i * 3 + 1] < -10 || distSq > RESPAWN_DISTANCE * RESPAWN_DISTANCE) {
        posArray[i * 3] = camX + (Math.random() - 0.5) * RAIN_AREA_SIZE;
        posArray[i * 3 + 1] = Math.random() * RAIN_AREA_SIZE;
        posArray[i * 3 + 2] = camZ + (Math.random() - 0.5) * RAIN_AREA_SIZE;
      }
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={RAIN_COLOR}
        size={RAIN_PARTICLE_SIZE}
        sizeAttenuation
        depthWrite={false}
        opacity={RAIN_OPACITY}
      />
    </Points>
  );
};
