import { useContext } from "react";
import { ISceneContext, SceneContext } from "../context/scene.context";

export const useScene = (): ISceneContext => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useScene must be used within a SceneDataProvider');
  }
  return context;
};