import { Vector3 } from "three";
import { useSceneStore } from "../../state/scene/store/scene.store";

interface TerrainProps {
  position: Vector3;
}

const TERRAIN_COLOR = "#8BC34A";
const TERRAIN_SNOW_COLOR = "#f0f5f5";

export const Terrain: React.FC<TerrainProps> = ({ position = new Vector3(0, 0, 0) }) => {
  const weather = useSceneStore((state) => state.weather);
  const color = weather === 'snow' ? TERRAIN_SNOW_COLOR : TERRAIN_COLOR;

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[160, 2, 160]} />
        <meshPhongMaterial color={color} />
      </mesh>
    </group>
  );
};