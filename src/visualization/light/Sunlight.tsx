import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Color, DirectionalLight, MathUtils, Vector3 } from 'three';
import { useSceneStore } from '../../state/scene/store/scene.store';
import { getSunColorProperties } from '../utils/color.utils';
import { interpolateTime } from '../utils/time.utils';
import { SUN_DISTANCE, LERP_SPEED, DAY_COLOR, DAY_INTENSITY } from '../utils/constants';

const getSunPosition = (time: number): Vector3 => {
  const angle = ((time - 6) / 24) * Math.PI * 2;
  return new Vector3(
    Math.cos(angle) * SUN_DISTANCE,
    Math.sin(angle) * SUN_DISTANCE,
    0
  );
};

export const Sunlight = () => {
  const lightRef = useRef<DirectionalLight>(null!);

  const { camera } = useThree();
  const timeOfDay = useSceneStore((s) => s.timeOfDay);

  const currentTimeRef = useRef(timeOfDay);
  const currentColorRef = useRef(new Color(DAY_COLOR));
  const currentIntensityRef = useRef(DAY_INTENSITY);

  useFrame(() => {
    currentTimeRef.current = interpolateTime(timeOfDay, currentTimeRef.current);

    const position = getSunPosition(currentTimeRef.current);
    const { color, intensity } = getSunColorProperties(currentTimeRef.current);

    currentColorRef.current.lerp(color, LERP_SPEED * 2);
    currentIntensityRef.current = MathUtils.lerp(currentIntensityRef.current, intensity, LERP_SPEED * 2);

    const sunWorldPos = camera.position.clone().add(position);

    lightRef.current.position.copy(sunWorldPos);
    lightRef.current.color.copy(currentColorRef.current);
    lightRef.current.intensity = currentIntensityRef.current;
    lightRef.current.target.position.copy(camera.position);
    lightRef.current.target.updateMatrixWorld();
  });

  return (
    <directionalLight
      ref={lightRef}
      castShadow
    />
  );
};
