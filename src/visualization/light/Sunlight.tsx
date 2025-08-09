import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const Sunlight = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null!);

  const { camera } = useThree();

  useFrame(() => {
    lightRef.current.position.copy(camera.position).add(new THREE.Vector3(25, 50, 25));
    lightRef.current.target.position.copy(camera.position);
    lightRef.current.target.updateMatrixWorld();
  });

  return (
    <>
      <directionalLight
        ref={lightRef}
        intensity={1.5}
        color="yellow"
        castShadow
      />
    </>
  );
};