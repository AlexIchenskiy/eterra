import { IChunk, IPosition } from "src/core/models";
import { ISceneState } from "../models/scene.model";
import { createContext } from "react";

export interface ISceneContext {
  state: ISceneState;
  updateCameraPosition: (position: IPosition) => void;
  getActiveChunks: () => IChunk[];
}

export const SceneContext = createContext<ISceneContext | null>(null);