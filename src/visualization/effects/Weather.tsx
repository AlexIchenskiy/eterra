import { useSceneStore } from '../../state/scene/store/scene.store';
import { Rain } from './Rain';
import { Snow } from './Snow';

export const Weather = () => {
  const weather = useSceneStore((s) => s.weather);

  switch (weather) {
    case 'rain':
      return <Rain />;
    case 'snow':
      return <Snow />;
    case 'clear':
    default:
      return null;
  }
};

