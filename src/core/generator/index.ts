import type { IGenerator } from "./generator";
import { GridGenerator } from "./gridGenerator";

export const generators: Record<string, IGenerator> = {
  'grid': new GridGenerator(),
};