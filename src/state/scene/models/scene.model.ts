import { IChunk, IPosition } from "src/core/models";

export interface ISceneState {
  chunks: Map<string, IChunk>;
  position: IPosition;
}

export const DEFAULT_SCENE_STATE: ISceneState = {
  chunks: new Map(),
  position: { x: 0, y: 0 },
}