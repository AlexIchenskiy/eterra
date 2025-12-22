import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Color, Fog } from 'three';
import { useSceneStore } from '../../state/scene/store/scene.store';
import { getSkyColor } from '../utils/color.utils';
import { interpolateTime } from '../utils/time.utils';
import { LERP_SPEED, SKY_DAY_COLOR } from '../utils/constants';
import { CELL_SIZE, CHUNK_SIZE } from '../../core/utils/constants';

const FOG_NEAR = (CHUNK_SIZE * CELL_SIZE) * 0.6;
const FOG_FAR = (CHUNK_SIZE * CELL_SIZE) * 0.9;

export const Sky = () => {
  const { gl, scene } = useThree();

  const timeOfDay = useSceneStore((s) => s.timeOfDay);

  const currentTimeRef = useRef(timeOfDay);
  const currentColorRef = useRef(new Color(SKY_DAY_COLOR));

  useFrame(() => {
    currentTimeRef.current = interpolateTime(timeOfDay, currentTimeRef.current);

    const skyColor = getSkyColor(currentTimeRef.current);
    currentColorRef.current.lerp(skyColor, LERP_SPEED * 2);

    gl.setClearColor(currentColorRef.current);

    if (scene.fog instanceof Fog) {
      scene.fog.color.copy(currentColorRef.current);
    }
  });

  return (
    <fog attach="fog" args={[SKY_DAY_COLOR, FOG_NEAR, FOG_FAR]} />
  );
};

