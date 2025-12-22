import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AmbientLight as ThreeAmbientLight, Color, MathUtils } from 'three';
import { useSceneStore } from '../../state/scene/store/scene.store';
import { getAmbientColorProperties } from '../utils/color.utils';
import { interpolateTime } from '../utils/time.utils';
import { LERP_SPEED, AMBIENT_DAY_COLOR, AMBIENT_DAY_INTENSITY } from '../utils/constants';

export const AmbientLight = () => {
  const lightRef = useRef<ThreeAmbientLight>(null!);

  const timeOfDay = useSceneStore((s) => s.timeOfDay);

  const currentTimeRef = useRef(timeOfDay);
  const currentColorRef = useRef(new Color(AMBIENT_DAY_COLOR));
  const currentIntensityRef = useRef(AMBIENT_DAY_INTENSITY);

  useFrame(() => {
    currentTimeRef.current = interpolateTime(timeOfDay, currentTimeRef.current);

    const { color, intensity } = getAmbientColorProperties(currentTimeRef.current);

    currentColorRef.current.lerp(color, LERP_SPEED * 2);
    currentIntensityRef.current = MathUtils.lerp(currentIntensityRef.current, intensity, LERP_SPEED * 2);

    lightRef.current.color.copy(currentColorRef.current);
    lightRef.current.intensity = currentIntensityRef.current;
  });

  return (
    <ambientLight ref={lightRef} />
  );
};
