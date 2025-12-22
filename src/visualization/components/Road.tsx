import { useMemo } from "react";
import { CELL_SIZE } from "../../core/utils/constants";
import { Vector3 } from "three";
import { IPosition } from "../../core/models";
import { StreetLight } from "./StreetLight";
import { Tree } from "./Tree";
import { seededRandomRange, seededRandomRangeInt } from "../utils/random.utils";

export type RoadType = 'vertical' | 'horizontal' | 'cross';
export type RoadDecorationType = 'streetlight' | 'tree';

interface IRoadProps {
  position: Vector3;
  type: RoadType;
  decorations?: boolean;
  maxDecorations?: number;
  seed?: string;
}

interface IRoadPlaneProps {
  width: number;
  length: number;
}

interface IRoadLineProps {
  width: number;
  length: number;
  position: IPosition;
}

const DECORATION_TYPES: RoadDecorationType[] = ['streetlight', 'tree'];

const RoadLine = ({ width, length, position }: IRoadLineProps) => {
  return (
    <mesh position={new Vector3(position.x, position.y, 0.01)}>
      <planeGeometry args={[width, length]} />
      <meshStandardMaterial color="#fff" />
    </mesh>
  );
};

const RoadPlane = ({ width, length }: IRoadPlaneProps) => {
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
          key={i}
          width={lineWidth}
          length={lineLength}
          position={{ x: offsetX, y: offsetY }}
        />
      );
    }

    return elements;
  }, [width, length]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[width, length]} />
      {meshes}
      <meshStandardMaterial color="#222" />
    </mesh>
  );
};

const getDecorationPositions = (type: RoadType, count: number): Vector3[] => {
  const positions: Vector3[] = [];
  const edgeOffset = CELL_SIZE * 0.45;
  const alongOffset = CELL_SIZE * 0.2;

  if (type === 'vertical') {
    for (let i = 0; i < count; i++) {
      const side = i % 2 === 0 ? 1 : -1;
      const xPos = Math.floor(i / 2) * alongOffset - alongOffset * 0.5;
      positions.push(new Vector3(xPos, 0, side * edgeOffset));
    }
  } else if (type === 'horizontal') {
    for (let i = 0; i < count; i++) {
      const side = i % 2 === 0 ? 1 : -1;
      const zPos = Math.floor(i / 2) * alongOffset - alongOffset * 0.5;
      positions.push(new Vector3(side * edgeOffset, 0, zPos));
    }
  } else {
    const corners = [
      new Vector3(edgeOffset, 0, edgeOffset),
      new Vector3(-edgeOffset, 0, edgeOffset),
      new Vector3(edgeOffset, 0, -edgeOffset),
      new Vector3(-edgeOffset, 0, -edgeOffset),
    ];
    for (let i = 0; i < count && i < 4; i++) {
      positions.push(corners[i]);
    }
  }

  return positions;
};

export const Road: React.FC<IRoadProps> = ({
  position = new Vector3(0, 0, 0),
  type = 'vertical',
  decorations = false,
  maxDecorations = 2,
  seed = 'road',
}) => {
  const roadMeshes = useMemo(() => {
    const elements = [];

    switch (type) {
      case 'cross':
        elements.push(
          <RoadPlane key="v" width={CELL_SIZE * 0.75} length={CELL_SIZE} />,
          <RoadPlane key="h" width={CELL_SIZE} length={CELL_SIZE * 0.75} />
        );
        break;
      case 'vertical':
        elements.push(<RoadPlane key="v" width={CELL_SIZE} length={CELL_SIZE * 0.75} />);
        break;
      case 'horizontal':
        elements.push(<RoadPlane key="h" width={CELL_SIZE * 0.75} length={CELL_SIZE} />);
        break;
    }

    return elements;
  }, [type]);

  const decorationElements = useMemo(() => {
    if (!decorations) return null;

    const elements = [];
    const decorationCount = seededRandomRangeInt(seed + '-count', 0, maxDecorations);
    
    if (decorationCount === 0) return null;

    const positions = getDecorationPositions(type, decorationCount);

    for (let i = 0; i < decorationCount; i++) {
      const decorSeed = `${seed}-dec-${i}`;
      const decorationType = DECORATION_TYPES[seededRandomRangeInt(decorSeed + '-type', 0, DECORATION_TYPES.length - 1)];
      const pos = positions[i];
      const rotation = seededRandomRange(decorSeed + '-rot', 0, Math.PI * 2);

      if (decorationType === 'streetlight') {
        elements.push(
          <group key={`dec-${i}`} position={pos}>
            <group rotation={[0, rotation, 0]}>
              <StreetLight position={new Vector3(0, 0, 0)} seed={decorSeed} />
            </group>
          </group>
        );
      } else {
        elements.push(
          <group key={`dec-${i}`} position={pos}>
            <group rotation={[0, rotation, 0]}>
              <Tree position={new Vector3(0, 0, 0)} seed={decorSeed} />
            </group>
          </group>
        );
      }
    }

    return elements;
  }, [decorations, maxDecorations, seed, type]);

  return (
    <group position={position}>
      {roadMeshes}
      {decorationElements}
    </group>
  );
};
