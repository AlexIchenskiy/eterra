import { SceneActions } from "../actions/scene.actions";
import { ISceneState } from "../models/scene.model";

const sceneReducer = (state: ISceneState, action: SceneActions): ISceneState => {
  switch (action.type) {
    case 'UPDATE_POSITION':
      return { ...state, position: action.payload };
    default:
      return state;
  }
};

export default sceneReducer;