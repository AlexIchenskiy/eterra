import { DEFAULT_SCENE_STATE, ISceneState } from "../models/scene.model";
import React, { useEffect, useMemo, useReducer, useRef } from "react";
import { IGenerator } from "src/core/generator/generator";
import { SceneContext } from "../context/scene.context";
import sceneReducer from "../reducers/scene.reducer";
import { IChunk, IPosition } from "src/core/models";
import { CELL_SIZE, CHUNK_SIZE } from "../../../core/utils/constants";

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
  const lastChunkPos = useRef({ x: 0, y: 0 });

  const contextValue = useMemo(() => ({
    state,
    updateCameraPosition: (position: IPosition) => {
      dispatch({ type: 'UPDATE_POSITION', payload: position });
    },

    getActiveChunks: (): IChunk[] => {
      return [...state.chunks.values()];
    }
  }), [state]);

  useEffect(() => {
    const currentWorldX = Math.floor(state.position.x / CELL_SIZE / CHUNK_SIZE);
    const currentWorldY = Math.floor(state.position.y / CELL_SIZE / CHUNK_SIZE);

    if (
      lastChunkPos.current.x === currentWorldX &&
      lastChunkPos.current.y === currentWorldY &&
      state.chunks.size > 0
    ) {
      return;
    }

    lastChunkPos.current = { x: currentWorldX, y: currentWorldY };

    const chunks = state.chunks;

    for (const [key, chunk] of chunks.entries()) {
      const x = chunk.position.x;
      const y = chunk.position.y;

      if (x > currentWorldX + renderDistance || x < currentWorldX - renderDistance
        || y < currentWorldY - renderDistance || y > currentWorldY + renderDistance) {
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
  }, [state.position.x, state.position.y, state.chunks, renderDistance, generator]);

  return (
    <SceneContext.Provider value={contextValue} >
      {children}
    </SceneContext.Provider>
  );
};