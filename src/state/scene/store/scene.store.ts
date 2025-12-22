import { create } from 'zustand';
import { IChunk, IPosition } from '../../../core/models';
import { IGenerator } from '../../../core/generator/generator';
import { CELL_SIZE, CHUNK_SIZE } from '../../../core/utils/constants';

export interface ISceneState {
  chunks: Map<string, IChunk>;
  position: IPosition;
  timeOfDay: number;
}

export interface ISceneActions {
  updateCameraPosition: (position: IPosition) => void;
  getActiveChunks: () => IChunk[];
  updateChunks: (generator: IGenerator, renderDistance: number) => void;
  setTimeOfDay: (time: number) => void;
}

export interface ISceneStore extends ISceneState, ISceneActions {}

export const useSceneStore = create<ISceneStore>((set, get) => ({
  chunks: new Map(),
  position: { x: 0, y: 0 },
  timeOfDay: 0,

  updateCameraPosition: (position: IPosition) => {
    set({ position });
  },

  getActiveChunks: (): IChunk[] => {
    return [...get().chunks.values()];
  },

  updateChunks: (generator: IGenerator, renderDistance: number) => {
    const state = get();
    const currentWorldX = Math.floor(state.position.x / CELL_SIZE / CHUNK_SIZE);
    const currentWorldY = Math.floor(state.position.y / CELL_SIZE / CHUNK_SIZE);

    const chunks = new Map(state.chunks);

    for (const [key, chunk] of chunks.entries()) {
      const x = chunk.position.x;
      const y = chunk.position.y;

      if (
        x > currentWorldX + renderDistance ||
        x < currentWorldX - renderDistance ||
        y < currentWorldY - renderDistance ||
        y > currentWorldY + renderDistance
      ) {
        chunks.delete(key);
      }
    }

    for (let i = currentWorldX - renderDistance; i <= currentWorldX + renderDistance; i++) {
      for (let j = currentWorldY - renderDistance; j <= currentWorldY + renderDistance; j++) {
        const newKey = `${i}:${j}`;

        if (!chunks.has(newKey)) {
          chunks.set(newKey, generator.generate({ x: i, y: j }));
        }
      }
    }

    set({ chunks });
  },

  setTimeOfDay: (time: number) => {
    const clampedTime = ((time % 24) + 24) % 24;
    set({ timeOfDay: clampedTime });
  },
}));
