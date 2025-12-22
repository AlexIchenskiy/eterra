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

export const AMBIENT_NIGHT_INTENSITY = 0.2;
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
