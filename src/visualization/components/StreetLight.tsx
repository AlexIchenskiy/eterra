import { Vector3 } from 'three';
import {
  STREETLIGHT_POLE_COLORS,
  STREETLIGHT_POLE_HEIGHT,
  STREETLIGHT_POLE_RADIUS,
  STREETLIGHT_BULB_RADIUS,
  BUILDING_LIGHT_COLORS,
} from '../utils/constants';
import { seededRandomRangeInt } from '../utils/random.utils';

interface IStreetLightProps {
  position: Vector3;
  seed: string;
}

export const StreetLight: React.FC<IStreetLightProps> = ({ position, seed }) => {
  const poleColor = STREETLIGHT_POLE_COLORS[seededRandomRangeInt(seed + '-pole', 0, STREETLIGHT_POLE_COLORS.length - 1)];
  const bulbColor = BUILDING_LIGHT_COLORS[seededRandomRangeInt(seed + '-bulb', 0, BUILDING_LIGHT_COLORS.length - 1)];
  const bulbY = STREETLIGHT_POLE_HEIGHT + STREETLIGHT_BULB_RADIUS * 0.5;

  return (
    <group position={position}>
      <mesh position={[0, STREETLIGHT_POLE_HEIGHT / 2, 0]}>
        <cylinderGeometry args={[STREETLIGHT_POLE_RADIUS, STREETLIGHT_POLE_RADIUS, STREETLIGHT_POLE_HEIGHT, 8]} />
        <meshStandardMaterial color={poleColor} />
      </mesh>

      <mesh position={[0, bulbY, 0]}>
        <sphereGeometry args={[STREETLIGHT_BULB_RADIUS, 16, 16]} />
        <meshStandardMaterial
          color={bulbColor}
          emissive={bulbColor}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};
