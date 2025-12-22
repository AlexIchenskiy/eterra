import { useEffect, useRef } from 'react';
import { Group, Vector3 } from 'three';
import { useGLTF } from '@react-three/drei';
import { VehicleVariant, VEHICLE_CONFIGS } from './vehicle.config';

interface IVehicleProps {
  position: Vector3;
  rotation: number;
  variant: VehicleVariant;
  scale?: number;
}

export const Vehicle: React.FC<IVehicleProps> = ({ 
  position, 
  rotation, 
  variant,
  scale = 1,
}) => {
  const groupRef = useRef<Group>(null!);
  const config = VEHICLE_CONFIGS[variant];
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
      <primitive 
        object={scene.clone()} 
        scale={[modelScale, modelScale, modelScale]}
      />
    </group>
  );
};

