import { BUILDING_COLORS, BUILDING_LIGHT_COLORS, BUILDING_OPTIONS, BuildingOption } from "../../../core/utils/constants";
import { Vector3 } from "three";
import { RegularBuilding } from "./RegularBuilding";
import { CircularBuilding } from "./CircularBuilding";

interface BuildingProps {
  position: Vector3;
  size?: number,
  floors?: number,
  color?: string,
  lightColor?: string,
  variant?: BuildingOption,
}

export const Building: React.FC<BuildingProps> = ({ position = new Vector3(0, 0, 0), size = 5, floors = 2, color = BUILDING_COLORS[0], lightColor = BUILDING_LIGHT_COLORS[0], variant = BUILDING_OPTIONS[0] }) => {
  switch (variant) {
    case 'circular':
      return (
        <CircularBuilding
          position={position}
          size={size}
          floors={floors}
          color={color}
          lightColor={lightColor}
        />
      );
    default:
      return (
        <RegularBuilding
          position={position}
          size={size}
          floors={floors}
          color={color}
        />
      );
  };
};