import { generators } from "./core/generator";
import { SceneDataProvider } from "./state/scene/providers/SceneDataProvider";
import Scene from "./visualization/Scene";
import { Menu, Tooltip } from "./ui";

function App() {
  return (
    <SceneDataProvider generator={generators.grid} renderDistance={1}>
      <Scene />
      <Tooltip />
      <Menu />
    </SceneDataProvider>
  );
}

export default App;
