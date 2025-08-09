import type { IChunk, IPosition } from "../models";

export interface IGenerator {
  generate(position: IPosition): IChunk;
}