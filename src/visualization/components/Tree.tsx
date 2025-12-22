import { Vector3 } from 'three';
import {
  TREE_TRUNK_COLORS,
  TREE_FOLIAGE_COLORS,
  TREE_TRUNK_HEIGHT,
  TREE_TRUNK_RADIUS,
  TREE_FOLIAGE_RADIUS_X,
  TREE_FOLIAGE_RADIUS_Y,
  TREE_FOLIAGE_RADIUS_Z,
} from '../utils/constants';
import { seededRandomRangeInt, seededRandomRange } from '../utils/random.utils';

interface ITreeProps {
  position: Vector3;
  seed: string;
}

export const Tree: React.FC<ITreeProps> = ({ position, seed }) => {
  const trunkColor = TREE_TRUNK_COLORS[seededRandomRangeInt(seed + '-trunk', 0, TREE_TRUNK_COLORS.length - 1)];
  const foliageColor = TREE_FOLIAGE_COLORS[seededRandomRangeInt(seed + '-foliage', 0, TREE_FOLIAGE_COLORS.length - 1)];
  
  const scale = seededRandomRange(seed + '-scale', 0.7, 1.3);
  const trunkHeight = TREE_TRUNK_HEIGHT * scale;
  const foliageScaleX = TREE_FOLIAGE_RADIUS_X * scale;
  const foliageScaleY = TREE_FOLIAGE_RADIUS_Y * scale;
  const foliageScaleZ = TREE_FOLIAGE_RADIUS_Z * scale;

  return (
    <group position={position}>
      <mesh position={[0, trunkHeight / 2, 0]}>
        <cylinderGeometry args={[TREE_TRUNK_RADIUS, TREE_TRUNK_RADIUS * 1.2, trunkHeight, 8]} />
        <meshStandardMaterial color={trunkColor} />
      </mesh>

      <mesh 
        position={[0, trunkHeight + foliageScaleY * 0.6, 0]}
        scale={[foliageScaleX, foliageScaleY, foliageScaleZ]}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={foliageColor} />
      </mesh>
    </group>
  );
};
