import { FLOOR_HEIGHT } from "../../../core/utils/constants";
import { BUILDING_COLORS, BUILDING_LIGHT_COLORS } from "./../../utils/constants";
import { Vector3 } from "three";
import * as THREE from "three";

interface CircularBuildingProps {
  position: Vector3;
  size?: number;
  floors?: number;
  color?: string;
  lightColor?: string;
}

const createFloor = (r: number, h: number, color: string) => {
  const geometry = new THREE.CylinderGeometry(r, r, h, 32, 1, false);
  return new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color }));
};

export const CircularBuilding: React.FC<CircularBuildingProps> = ({
  position = new Vector3(0, 0, 0),
  size = 5,
  floors = 2,
  color = BUILDING_COLORS[0],
  lightColor = BUILDING_LIGHT_COLORS[0],
}) => {
  const height = FLOOR_HEIGHT * floors;
  const windowRadius = size / 1.8;
  const windowHeight = FLOOR_HEIGHT / 2;
  const radius = size / 2;
  const floorComponents = [];

  for (let floor = 0; floor <= floors; floor++) {
    const yPos = -height / 2 + floor * FLOOR_HEIGHT;
    const win = createFloor(windowRadius, windowHeight, color);
    win.position.set(0, yPos, 0);
    floorComponents.push(<primitive key={`w-${floor}`} object={win} />);
  }

  return (
    <group position={new Vector3(position.x, height / 2, position.z)}>
      <mesh>
        <cylinderGeometry args={[radius, radius, height, 64]} />
        <meshStandardMaterial color={lightColor} emissive={lightColor} emissiveIntensity={2} />
      </mesh>
      {floorComponents}
    </group>
  );
};
