import { Color, MathUtils } from 'three';
import {
  NIGHT_COLOR,
  DAWN_COLOR,
  DAY_COLOR,
  DUSK_COLOR,
  NIGHT_INTENSITY,
  DAWN_INTENSITY,
  DAY_INTENSITY,
  AMBIENT_NIGHT_COLOR,
  AMBIENT_DAWN_COLOR,
  AMBIENT_DAY_COLOR,
  AMBIENT_NIGHT_INTENSITY,
  AMBIENT_DAWN_INTENSITY,
  AMBIENT_DAY_INTENSITY,
  SKY_NIGHT_COLOR,
  SKY_DAWN_COLOR,
  SKY_DAY_COLOR,
  SKY_DUSK_COLOR,
} from './constants';

export interface SunColorProperties {
  color: Color;
  intensity: number;
}

export const getSunColorProperties = (time: number): SunColorProperties => {
  const color = new Color();
  let intensity: number;

  if (time >= 5 && time < 7) {
    const t = (time - 5) / 2;
    color.copy(NIGHT_COLOR).lerp(DAWN_COLOR, t);
    intensity = MathUtils.lerp(NIGHT_INTENSITY, DAWN_INTENSITY, t);
  } else if (time >= 7 && time < 10) {
    const t = (time - 7) / 3;
    color.copy(DAWN_COLOR).lerp(DAY_COLOR, t);
    intensity = MathUtils.lerp(DAWN_INTENSITY, DAY_INTENSITY, t);
  } else if (time >= 10 && time < 16) {
    color.copy(DAY_COLOR);
    intensity = DAY_INTENSITY;
  } else if (time >= 16 && time < 18) {
    const t = (time - 16) / 2;
    color.copy(DAY_COLOR).lerp(DUSK_COLOR, t);
    intensity = MathUtils.lerp(DAY_INTENSITY, DAWN_INTENSITY, t);
  } else if (time >= 18 && time < 20) {
    const t = (time - 18) / 2;
    color.copy(DUSK_COLOR).lerp(NIGHT_COLOR, t);
    intensity = MathUtils.lerp(DAWN_INTENSITY, NIGHT_INTENSITY, t);
  } else {
    color.copy(NIGHT_COLOR);
    intensity = NIGHT_INTENSITY;
  }

  return { color, intensity };
};

export const getAmbientColorProperties = (time: number): SunColorProperties => {
  const color = new Color();
  let intensity: number;

  if (time >= 5 && time < 7) {
    const t = (time - 5) / 2;
    color.copy(AMBIENT_NIGHT_COLOR).lerp(AMBIENT_DAWN_COLOR, t);
    intensity = MathUtils.lerp(AMBIENT_NIGHT_INTENSITY, AMBIENT_DAWN_INTENSITY, t);
  } else if (time >= 7 && time < 10) {
    const t = (time - 7) / 3;
    color.copy(AMBIENT_DAWN_COLOR).lerp(AMBIENT_DAY_COLOR, t);
    intensity = MathUtils.lerp(AMBIENT_DAWN_INTENSITY, AMBIENT_DAY_INTENSITY, t);
  } else if (time >= 10 && time < 16) {
    color.copy(AMBIENT_DAY_COLOR);
    intensity = AMBIENT_DAY_INTENSITY;
  } else if (time >= 16 && time < 18) {
    const t = (time - 16) / 2;
    color.copy(AMBIENT_DAY_COLOR).lerp(AMBIENT_DAWN_COLOR, t);
    intensity = MathUtils.lerp(AMBIENT_DAY_INTENSITY, AMBIENT_DAWN_INTENSITY, t);
  } else if (time >= 18 && time < 20) {
    const t = (time - 18) / 2;
    color.copy(AMBIENT_DAWN_COLOR).lerp(AMBIENT_NIGHT_COLOR, t);
    intensity = MathUtils.lerp(AMBIENT_DAWN_INTENSITY, AMBIENT_NIGHT_INTENSITY, t);
  } else {
    color.copy(AMBIENT_NIGHT_COLOR);
    intensity = AMBIENT_NIGHT_INTENSITY;
  }

  return { color, intensity };
};

export const getSkyColor = (time: number): Color => {
  const color = new Color();

  if (time >= 5 && time < 7) {
    const t = (time - 5) / 2;
    color.copy(SKY_NIGHT_COLOR).lerp(SKY_DAWN_COLOR, t);
  } else if (time >= 7 && time < 10) {
    const t = (time - 7) / 3;
    color.copy(SKY_DAWN_COLOR).lerp(SKY_DAY_COLOR, t);
  } else if (time >= 10 && time < 16) {
    color.copy(SKY_DAY_COLOR);
  } else if (time >= 16 && time < 18) {
    const t = (time - 16) / 2;
    color.copy(SKY_DAY_COLOR).lerp(SKY_DUSK_COLOR, t);
  } else if (time >= 18 && time < 20) {
    const t = (time - 18) / 2;
    color.copy(SKY_DUSK_COLOR).lerp(SKY_NIGHT_COLOR, t);
  } else {
    color.copy(SKY_NIGHT_COLOR);
  }

  return color;
};
