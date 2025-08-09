import { generators } from "./core/generator";
import { SceneDataProvider } from "./state/scene/providers/SceneDataProvider";
import Scene from "./visualization/Scene";

function App() {
  return (
    <SceneDataProvider generator={generators.grid} renderDistance={1} >
      <Scene />
    </SceneDataProvider>
  )
}

export default App;
