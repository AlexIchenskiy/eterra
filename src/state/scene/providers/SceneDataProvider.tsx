import React, { useEffect, useRef } from "react";
import { IGenerator } from "../../../core/generator/generator";
import { useSceneStore } from "../store/scene.store";
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
  const position = useSceneStore((s) => s.position);
  const chunks = useSceneStore((s) => s.chunks);
  const updateChunks = useSceneStore((s) => s.updateChunks);

  const lastChunkPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const currentWorldX = Math.floor(position.x / CELL_SIZE / CHUNK_SIZE);
    const currentWorldY = Math.floor(position.y / CELL_SIZE / CHUNK_SIZE);

    if (
      lastChunkPos.current.x === currentWorldX &&
      lastChunkPos.current.y === currentWorldY &&
      chunks.size > 0
    ) {
      return;
    }

    lastChunkPos.current = { x: currentWorldX, y: currentWorldY };
    updateChunks(generator, renderDistance);
  }, [position.x, position.y, chunks.size, renderDistance, generator, updateChunks]);

  return <>{children}</>;
};
