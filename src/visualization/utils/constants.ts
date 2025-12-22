import { Color } from 'three';

export const SUN_DISTANCE = 100;
export const LERP_SPEED = 0.01;

export const NIGHT_COLOR = new Color('#1a1a2e');
export const DAWN_COLOR = new Color('#ff7b54');
export const DAY_COLOR = new Color('#fffbe6');
export const DUSK_COLOR = new Color('#ff6b35');

export const NIGHT_INTENSITY = 0.1;
export const DAWN_INTENSITY = 0.8;
export const DAY_INTENSITY = 1.5;

export const AMBIENT_NIGHT_COLOR = new Color('#0a0a1a');
export const AMBIENT_DAWN_COLOR = new Color('#4a3a5a');
export const AMBIENT_DAY_COLOR = new Color('#ffffff');

export const AMBIENT_NIGHT_INTENSITY = 0.3;
export const AMBIENT_DAWN_INTENSITY = 0.5;
export const AMBIENT_DAY_INTENSITY = 1.0;

export const SKY_NIGHT_COLOR = new Color('#0a0a1a');
export const SKY_DAWN_COLOR = new Color('#ff9966');
export const SKY_DAY_COLOR = new Color('#87CEEB');
export const SKY_DUSK_COLOR = new Color('#ff6b4a');

export const BUILDING_COLORS = ['#FFFFFF', '#D9948C', '#DBCC9A', '#9ADBA5', '#A0DEC3', '#D095DF'];

export const BUILDING_LIGHT_COLORS = ['#ffff66', '#fff5cc', '#ffd480', '#b3e5ff'];

export const BUILDING_OPTIONS = ['regular', 'circular'] as const;

export type BuildingOption = typeof BUILDING_OPTIONS[number];

export const RAIN_PARTICLE_COUNT = 5000;
export const RAIN_AREA_SIZE = 100;
export const RAIN_FALL_SPEED = 0.4;
export const RAIN_WIND_SPEED = 0.15;
export const RAIN_PARTICLE_SIZE = 0.08;
export const RAIN_COLOR = '#aaccff';
export const RAIN_OPACITY = 0.5;

export const SNOW_PARTICLE_COUNT = 3000;
export const SNOW_AREA_SIZE = 100;
export const SNOW_FALL_SPEED = 0.15;
export const SNOW_WIND_SPEED = 0.05;
export const SNOW_DRIFT_SPEED = 0.02;
export const SNOW_PARTICLE_SIZE = 0.2;
export const SNOW_COLOR = '#ffffff';
export const SNOW_OPACITY = 0.8;

export const STREETLIGHT_POLE_COLORS = ['#333333', '#444444', '#2a2a2a', '#1a1a1a'];
export const STREETLIGHT_POLE_HEIGHT = 4;
export const STREETLIGHT_POLE_RADIUS = 0.1;
export const STREETLIGHT_BULB_RADIUS = 0.3;

export const TREE_TRUNK_COLORS = ['#4a3728', '#5c4033', '#3d2914'];
export const TREE_FOLIAGE_COLORS = ['#228b22', '#2e8b57', '#3cb371', '#006400'];
export const TREE_TRUNK_HEIGHT = 2;
export const TREE_TRUNK_RADIUS = 0.15;
export const TREE_FOLIAGE_RADIUS_X = 1.2;
export const TREE_FOLIAGE_RADIUS_Y = 1.8;
export const TREE_FOLIAGE_RADIUS_Z = 1.2;

export const AIRCRAFT_MAX_COUNT = 20;
export const AIRCRAFT_DESPAWN_CHUNKS = 2.5;

export const VEHICLE_MAX_COUNT = 20;
export const VEHICLE_DESPAWN_CHUNKS = 2;