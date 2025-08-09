import { Vector3 } from "three";

interface TerrainProps {
  position: Vector3;
}

export const Terrain: React.FC<TerrainProps> = ({ position = new Vector3(0, 0, 0) }) => {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[160, 2, 160]} />
        <meshPhongMaterial color={"#8BC34A"} />
      </mesh>
    </group>
  );
}