import { useMemo } from "react";
import { CELL_SIZE } from "../../core/utils/constants";
import { Vector3 } from "three";
import { IPosition } from "../../core/models";

export type RoadType = 'vertical' | 'horizontal' | 'cross';

interface RoadProps {
  position: Vector3;
  type: RoadType;
}

interface RoadPlaneProps {
  width: number;
  length: number;
}

interface RoadLineProps {
  width: number;
  length: number;
  position: IPosition;
}

const RoadLine = ({ width, length, position }: RoadLineProps) => {
  return (
    <mesh
      position={new Vector3(position.x, position.y, 0.01)}
    >
      <planeGeometry args={[width, length]} />
      <meshStandardMaterial color="#fff" />
    </mesh>
  );
};

const RoadPlane = ({ width, length }: RoadPlaneProps) => {
  const meshes = useMemo(() => {
    const elements = [];

    const fraction = CELL_SIZE / 6;
    const lineWidth = width < length ? CELL_SIZE / 10 / 6 : CELL_SIZE / 10;
    const lineLength = width > length ? CELL_SIZE / 10 / 6 : CELL_SIZE / 10;

    for (let i = 0; i < 3; i++) {
      const offsetX = width > length ? fraction * 2 * i : 0;
      const offsetY = width < length ? fraction * 2 * i : 0;

      elements.push(
        <RoadLine
          width={lineWidth}
          length={lineLength}
          position={{ x: offsetX, y: offsetY }}
        />
      );
    }

    return elements;
  }, [width, length]);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[width, length]} />
      {meshes}
      <meshStandardMaterial color="#222" />
    </mesh>
  );
};

export const Road: React.FC<RoadProps> = ({ position = new Vector3(0, 0, 0), type = 'vertical' }) => {
  const meshes = useMemo(() => {
    const elements = [];

    switch (type) {
      case 'cross':
        elements.push(
          <RoadPlane width={CELL_SIZE * 0.75} length={CELL_SIZE} />,
          <RoadPlane width={CELL_SIZE} length={CELL_SIZE * 0.75} />
        );
        break;
      case 'vertical':
        elements.push(
          <RoadPlane width={CELL_SIZE} length={CELL_SIZE * 0.75} />
        );
        break;
      case 'horizontal':
        elements.push(
          <RoadPlane width={CELL_SIZE * 0.75} length={CELL_SIZE} />
        );
        break;
    }

    return elements;
  }, [type]);

  return (
    <group position={position}>
      {meshes}
    </group>
  );
};