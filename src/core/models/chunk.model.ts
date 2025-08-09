import type { IPosition } from "./position.model";

export interface IChunk {
  position: IPosition;
  data: number[][];
}