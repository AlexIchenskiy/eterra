export type AircraftVariant = 'blimp' | 'jet' | 'balloon';

export interface IAircraftConfig {
  path: string;
  scale: number;
  rotation: [number, number, number];
  speed: number;
  heightMin: number;
  heightMax: number;
}

export const AIRCRAFT_CONFIGS: Record<AircraftVariant, IAircraftConfig> = {
  blimp: {
    path: '/eterra/models/Blimp.glb',
    scale: 0.025,
    rotation: [0, -Math.PI / 2, 0],
    speed: 4,
    heightMin: 40,
    heightMax: 55,
  },
  jet: {
    path: '/eterra/models/Jet.glb',
    scale: 0.030,
    rotation: [0, 0, 0],
    speed: 14,
    heightMin: 45,
    heightMax: 60,
  },
  balloon: {
    path: '/eterra/models/Balloon.glb',
    scale: 0.020,
    rotation: [0, -Math.PI / 2, 0],
    speed: 2,
    heightMin: 35,
    heightMax: 60,
  },
};

export const AIRCRAFT_VARIANTS: AircraftVariant[] = Object.keys(AIRCRAFT_CONFIGS) as AircraftVariant[];

