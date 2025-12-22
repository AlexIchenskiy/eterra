export type VehicleVariant = 'taxi' | 'car' | 'van';

export interface IVehicleConfig {
  path: string;
  scale: number;
  rotation: [number, number, number];
  speed: number;
  height: number;
}

export const VEHICLE_CONFIGS: Record<VehicleVariant, IVehicleConfig> = {
  taxi: {
    path: '/eterra/models/Taxi.glb',
    scale: 2,
    rotation: [0, Math.PI / 2, 0],
    speed: 8,
    height: 0.5,
  },
  car: {
    path: '/eterra/models/Car.glb',
    scale: 0.05,
    rotation: [0, Math.PI, 0],
    speed: 8,
    height: 0.5,
  },
  van: {
    path: '/eterra/models/Van.glb',
    scale: 0.05,
    rotation: [0, Math.PI, 0],
    speed: 8,
    height: 0.5,
  },
};

export const VEHICLE_VARIANTS: VehicleVariant[] = Object.keys(VEHICLE_CONFIGS) as VehicleVariant[];

