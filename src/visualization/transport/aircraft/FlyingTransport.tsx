import { useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { Aircraft } from './Aircraft';
import { AircraftVariant, AIRCRAFT_VARIANTS, AIRCRAFT_CONFIGS } from './aircraft.config';
import { CHUNK_SIZE, CELL_SIZE } from '../../../core/utils/constants';
import {
  AIRCRAFT_MAX_COUNT,
  AIRCRAFT_DESPAWN_CHUNKS,
} from '../../utils/constants';

const DESPAWN_DISTANCE = CHUNK_SIZE * CELL_SIZE * AIRCRAFT_DESPAWN_CHUNKS;

interface IFlyingVehicle {
  id: number;
  position: Vector3;
  direction: Vector3;
  rotation: number;
  variant: AircraftVariant;
  speed: number;
}

let nextId = 0;

const createAircraft = (camPos: Vector3): IFlyingVehicle => {
  const variant = AIRCRAFT_VARIANTS[Math.floor(Math.random() * AIRCRAFT_VARIANTS.length)];
  const config = AIRCRAFT_CONFIGS[variant];

  const spawnAngle = Math.random() * Math.PI * 2;
  const spawnDist = DESPAWN_DISTANCE * 0.8;
  
  const spawnX = camPos.x + Math.cos(spawnAngle) * spawnDist;
  const spawnZ = camPos.z + Math.sin(spawnAngle) * spawnDist;
  const height = config.heightMin + Math.random() * (config.heightMax - config.heightMin);

  const directionAngle = Math.random() * Math.PI * 2;
  const direction = new Vector3(
    Math.cos(directionAngle),
    0,
    Math.sin(directionAngle)
  ).normalize();

  const speed = config.speed;

  return {
    id: nextId++,
    position: new Vector3(spawnX, height, spawnZ),
    direction,
    rotation: Math.atan2(direction.x, direction.z),
    variant,
    speed,
  };
};

export const FlyingTransport = () => {
  const { camera } = useThree();
  const [vehicles, setVehicles] = useState<IFlyingVehicle[]>([]);

  const updateVehicles = useCallback((camPos: Vector3, delta: number) => {
    setVehicles((prev) => {
      let updated = prev.map((vehicle) => ({
        ...vehicle,
        position: new Vector3(
          vehicle.position.x + vehicle.direction.x * vehicle.speed * delta,
          vehicle.position.y,
          vehicle.position.z + vehicle.direction.z * vehicle.speed * delta
        ),
      }));

      updated = updated.filter((vehicle) => {
        const dx = vehicle.position.x - camPos.x;
        const dz = vehicle.position.z - camPos.z;
        return Math.sqrt(dx * dx + dz * dz) <= DESPAWN_DISTANCE;
      });

      while (updated.length < AIRCRAFT_MAX_COUNT) {
        updated.push(createAircraft(camPos));
      }

      return updated;
    });
  }, []);

  useFrame((_, delta) => {
    updateVehicles(camera.position, delta);
  });

  return (
    <>
      {vehicles.map((vehicle) => (
        <Aircraft
          key={vehicle.id}
          position={vehicle.position}
          rotation={vehicle.rotation}
          variant={vehicle.variant}
        />
      ))}
    </>
  );
};

