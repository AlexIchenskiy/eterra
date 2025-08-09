import seedrandom from 'seedrandom';

export const seededRandomRange = (seed: string, min: number, max: number): number => {
  return seedrandom(seed)() * (max - min) + min;
}