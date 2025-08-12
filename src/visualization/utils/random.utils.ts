import seedrandom from 'seedrandom';

export const seededRandomRange = (seed: string, min: number, max: number): number => {
  return seedrandom(seed)() * (max - min) + min;
};

export const seededRandomRangeInt = (seed: string, min: number, max: number): number => {
  return Math.floor(seedrandom(seed)() * (max - min + 1) + min);
};
