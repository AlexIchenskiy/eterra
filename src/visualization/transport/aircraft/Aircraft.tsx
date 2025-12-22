import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Vector3, Group } from 'three';
import { AircraftVariant, AIRCRAFT_CONFIGS } from './aircraft.config';

Object.values(AIRCRAFT_CONFIGS).forEach((config) => {
  useGLTF.preload(config.path);
});

interface IAircraftProps {
  position: Vector3;
  rotation: number;
  variant: AircraftVariant;
  scale?: number;
}

export const Aircraft: React.FC<IAircraftProps> = ({ 
  position, 
  rotation, 
  variant,
  scale = 1,
}) => {
  const groupRef = useRef<Group>(null!);
  const config = AIRCRAFT_CONFIGS[variant];
  const { scene } = useGLTF(config.path);

  const modelScale = config.scale * scale;

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.set(
        config.rotation[0],
        config.rotation[1] + rotation,
        config.rotation[2]
      );
    }
  }, [rotation, config.rotation]);

  return (
    <group ref={groupRef} position={position}>
      <primitive object={scene.clone()} scale={modelScale} />
    </group>
  );
};

