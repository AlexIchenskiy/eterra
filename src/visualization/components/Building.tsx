import { FLOOR_HEIGHT } from "../../core/utils/constants";
import { Vector3 } from "three";
import * as THREE from "three";

interface BuildingProps {
  position: Vector3;
  size?: number,
  floors?: number,
}

const createWindow = (w: number, h: number) => {
  const windowShape = new THREE.Shape();
  windowShape.moveTo(0, 0);
  windowShape.lineTo(w, 0);
  windowShape.lineTo(w, h);
  windowShape.lineTo(0, h);
  windowShape.lineTo(0, 0);

  const extrudeSettings = {
    depth: 0.1,
    bevelEnabled: false
  };

  const geometry = new THREE.ExtrudeGeometry(windowShape, extrudeSettings);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffff66,
    emissive: 0xffff66,
    emissiveIntensity: 1.2
  });

  return new THREE.Mesh(geometry, material);
};

export const Building: React.FC<BuildingProps> = ({ position = new Vector3(0, 0, 0), size = 5, floors = 2 }) => {
  const height = FLOOR_HEIGHT * floors;
  const windowWidth = size / 4;
  const windowHeight = FLOOR_HEIGHT / 4;

  const sides = [
    { rotY: Math.PI / 2, offset: [size / 2 - 0.01, 0, -size / 4 + windowWidth * 1.5], axis: 'x' },
    { rotY: -Math.PI / 2, offset: [-size / 2 - 0.01, 0, -size / 4 + windowWidth / 2], axis: 'x' },
    { rotY: Math.PI, offset: [size / 4 - windowWidth / 2, 0, size / 2 + 0.01], axis: 'y' },
    { rotY: -Math.PI, offset: [size / 4 - windowWidth / 2, 0, -size / 2 + 0.01], axis: 'y' }
  ];

  const windows = [];
  for (let floor = 0; floor < floors; floor++) {
    const yPos = -height / 2 + floor * FLOOR_HEIGHT + windowHeight * 1.5;

    for (const side of sides) {
      for (let i = -1; i <= 1; i += 2) {
        const win = createWindow(windowWidth, windowHeight);
        win.position.set(side.offset[0] + (side.axis === 'y' ? i * 1.5 : 0), yPos, side.offset[2] + (side.axis === 'x' ? i * 1.5 : 0));
        win.rotation.y = side.rotY;
        windows.push(<primitive key={`w-${floor}-${side.rotY}-${i}`} object={win} />);
      }
    }
  }

  return (
    <group position={new Vector3(position.x, height / 2, position.z)}>
      <mesh>
        <boxGeometry args={[size, height, size]} />
        <meshPhongMaterial />
      </mesh>
      {windows}
    </group>
  );
};