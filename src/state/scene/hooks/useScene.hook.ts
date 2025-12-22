import { useShallow } from 'zustand/react/shallow';
import { useSceneStore } from '../store/scene.store';

export const useScene = () => {
  const state = useSceneStore(
    useShallow((s) => ({ chunks: s.chunks, position: s.position }))
  );
  const updateCameraPosition = useSceneStore((s) => s.updateCameraPosition);
  const getActiveChunks = useSceneStore((s) => s.getActiveChunks);

  return {
    state,
    updateCameraPosition,
    getActiveChunks,
  };
};
