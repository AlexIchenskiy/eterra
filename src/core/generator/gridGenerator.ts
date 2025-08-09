import type { IChunk, IPosition } from "../models";
import { BLOCK_SIZE, CHUNK_SIZE } from "../utils/constants";
import type { IGenerator } from "./generator";

export class GridGenerator implements IGenerator {
  generate(position: IPosition): IChunk {
    const data: number[][] = [];

    for (let i = 0; i < CHUNK_SIZE; i++) {
      data[i] = [];

      for (let j = 0; j < CHUNK_SIZE; j++) {
        if (i % BLOCK_SIZE === 0 || j % BLOCK_SIZE === 0) {
          data[i][j] = 0;
        } else {
          data[i][j] = 1;
        }
      }
    }

    return { position, data };
  }
}