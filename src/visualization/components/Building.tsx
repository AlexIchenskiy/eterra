import { Vector3 } from "three";

interface BuildingProps {
  position: Vector3;
  size?: number,
  height?: number,
}

export const Building: React.FC<BuildingProps> = ({ position = new Vector3(0, 0, 0), size = 5, height = 5 }) => {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[size, height, size]} />
        <meshPhongMaterial />
      </mesh>
    </group>
  );
}