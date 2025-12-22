import { useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { Vehicle } from './Vehicle';
import { VehicleVariant, VEHICLE_VARIANTS, VEHICLE_CONFIGS } from './vehicle.config';
import { CHUNK_SIZE, CELL_SIZE, BLOCK_SIZE } from '../../../core/utils/constants';
import {
  VEHICLE_MAX_COUNT,
  VEHICLE_DESPAWN_CHUNKS,
} from '../../utils/constants';

const DESPAWN_DISTANCE = CHUNK_SIZE * CELL_SIZE * VEHICLE_DESPAWN_CHUNKS;
const LANE_OFFSET = 1.5;

interface IGroundVehicle {
  id: number;
  position: Vector3;
  direction: Vector3;
  rotation: number;
  variant: VehicleVariant;
  speed: number;
  height: number;
}

let nextId = 0;

const getRoadPosition = (camPos: Vector3): { x: number; z: number; isHorizontal: boolean } => {
  const roadSpacing = BLOCK_SIZE * CELL_SIZE;
  
  const spawnDistance = DESPAWN_DISTANCE * 0.8;
  const angle = Math.random() * Math.PI * 2;
  const rawX = camPos.x + Math.cos(angle) * spawnDistance;
  const rawZ = camPos.z + Math.sin(angle) * spawnDistance;
  
  const nearestHorizontalRoad = Math.round(rawZ / roadSpacing) * roadSpacing;
  const nearestVerticalRoad = Math.round(rawX / roadSpacing) * roadSpacing;
  
  const distToHorizontal = Math.abs(rawZ - nearestHorizontalRoad);
  const distToVertical = Math.abs(rawX - nearestVerticalRoad);
  
  if (distToHorizontal < distToVertical) {
    return { x: rawX, z: nearestHorizontalRoad, isHorizontal: true };
  } else {
    return { x: nearestVerticalRoad, z: rawZ, isHorizontal: false };
  }
};

const createVehicle = (camPos: Vector3): IGroundVehicle => {
  const variant = VEHICLE_VARIANTS[Math.floor(Math.random() * VEHICLE_VARIANTS.length)];
  const config = VEHICLE_CONFIGS[variant];

  const roadPos = getRoadPosition(camPos);
  
  const dirSign = Math.random() > 0.5 ? 1 : -1;
  const direction = roadPos.isHorizontal
    ? new Vector3(dirSign, 0, 0)
    : new Vector3(0, 0, dirSign);
  
  const rotation = roadPos.isHorizontal
    ? (dirSign > 0 ? -Math.PI / 2 : Math.PI / 2)
    : (dirSign > 0 ? Math.PI : 0);

  const laneX = roadPos.isHorizontal ? roadPos.x : roadPos.x + dirSign * LANE_OFFSET;
  const laneZ = roadPos.isHorizontal ? roadPos.z - dirSign * LANE_OFFSET : roadPos.z;

  return {
    id: nextId++,
    position: new Vector3(laneX, config.height, laneZ),
    direction,
    rotation,
    variant,
    speed: config.speed,
    height: config.height,
  };
};

export const GroundTransport = () => {
  const { camera } = useThree();
  const [vehicles, setVehicles] = useState<IGroundVehicle[]>([]);

  const updateVehicles = useCallback((camPos: Vector3, delta: number) => {
    setVehicles((prev) => {
      let updated = prev.map((vehicle) => ({
        ...vehicle,
        position: new Vector3(
          vehicle.position.x + vehicle.direction.x * vehicle.speed * delta,
          vehicle.height,
          vehicle.position.z + vehicle.direction.z * vehicle.speed * delta
        ),
      }));

      updated = updated.filter((vehicle) => {
        const dx = vehicle.position.x - camPos.x;
        const dz = vehicle.position.z - camPos.z;
        return Math.sqrt(dx * dx + dz * dz) <= DESPAWN_DISTANCE;
      });

      while (updated.length < VEHICLE_MAX_COUNT) {
        updated.push(createVehicle(camPos));
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
        <Vehicle
          key={vehicle.id}
          position={vehicle.position}
          rotation={vehicle.rotation}
          variant={vehicle.variant}
        />
      ))}
    </>
  );
};

