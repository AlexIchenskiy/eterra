import { IPosition } from "src/core/models";

export type SceneActions =
  | { type: 'UPDATE_POSITION'; payload: IPosition };