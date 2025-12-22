import { LERP_SPEED } from './constants';

export const getTimeDiff = (target: number, current: number): number => {
  let diff = target - current;
  if (Math.abs(diff) > 12) {
    diff = diff > 0 ? diff - 24 : diff + 24;
  }
  return diff;
};

export const interpolateTime = (target: number, current: number): number => {
  const diff = getTimeDiff(target, current);

  if (Math.abs(diff) > 0.01) {
    const newTime = current + diff * LERP_SPEED;
    return ((newTime % 24) + 24) % 24;
  }

  return current;
};

