import type { IChunk, IPosition } from "../models";
import { BLOCK_SIZE, CHUNK_SIZE } from "../utils/constants";
import type { IGenerator } from "./generator";

export class GridGenerator implements IGenerator {
  generate(position: IPosition): IChunk {
    const data: number[][] = [];

    for (let i = 0; i < CHUNK_SIZE; i++) {
      data[i] = [];

      for (let j = 0; j < CHUNK_SIZE; j++) {
        if (i % BLOCK_SIZE === 0 && j % BLOCK_SIZE === 0) {
          data[i][j] = 2; // Cross
        }
        else if (i % BLOCK_SIZE === 0) {
          data[i][j] = 3; // Vertical road (y-axis)
        }
        else if (j % BLOCK_SIZE === 0) {
          data[i][j] = 4; // Horizontal road (x-axis)
        } else {
          data[i][j] = 1; // Building
        }
      }
    }

    return { position, data };
  }
}