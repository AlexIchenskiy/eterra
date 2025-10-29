export const CHUNK_SIZE = 8;
export const BLOCK_SIZE = 4;

export const CELL_SIZE = 10;

export const DEFAULT_HEIGHT = 30;
export const FLOOR_HEIGHT = 5;

export const DAY_SKY_COLOR = '#87CEEB';

export const BUILDING_COLORS = ['#FFFFFF', '#D9948C', '#DBCC9A', '#9ADBA5', '#A0DEC3', '#D095DF'];

export const BUILDING_LIGHT_COLORS = ['#ffff66', '#fff5cc', '#ffd480', '#b3e5ff'];

export const BUILDING_OPTIONS = ['regular', 'circular'] as const;

export type BuildingOption = typeof BUILDING_OPTIONS[number];