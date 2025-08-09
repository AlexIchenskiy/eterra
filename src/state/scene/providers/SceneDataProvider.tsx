import { DEFAULT_SCENE_STATE, ISceneState } from "../models/scene.model";
import React, { useMemo, useReducer } from "react";
import { IGenerator } from "src/core/generator/generator";
import { SceneContext } from "../context/scene.context";
import sceneReducer from "../reducers/scene.reducer";
import { IChunk, IPosition } from "src/core/models";

interface SceneDataProviderProps {
  children: React.ReactNode;
  generator: IGenerator;
  renderDistance?: number;
}

export const SceneDataProvider: React.FC<SceneDataProviderProps> = ({
  children,
  generator,
  renderDistance = 1
}) => {
  const initialState: ISceneState = DEFAULT_SCENE_STATE;

  const [state, dispatch] = useReducer(sceneReducer, initialState);

  const contextValue = useMemo(() => ({
    state,
    updateCameraPosition: (position: IPosition) => {
      dispatch({ type: 'UPDATE_POSITION', payload: position });
    },

    getActiveChunks: (): IChunk[] => {
      // return [...state.chunks.values()];
      return [generator.generate({ x: 0, y: 0 })];
    }
  }), [state]);

  return (
    <SceneContext.Provider value={contextValue} >
      {children}
    </SceneContext.Provider>
  );
}