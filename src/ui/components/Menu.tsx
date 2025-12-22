import { useEffect, useRef } from 'react';
import { X, Clock, Sun, Sunrise, Sunset, Moon, Cloud, CloudRain, CloudSnow } from 'lucide-react';
import { useUIStore } from '../../state/ui/store/ui.store';
import { useSceneStore } from '../../state/scene/store/scene.store';
import { CircleSelector, ICircleSelectorOption } from './CircleSelector';

export const Menu: React.FC = () => {
  const isMenuOpen = useUIStore((s) => s.isMenuOpen);
  const openMenu = useUIStore((s) => s.openMenu);
  const closeMenu = useUIStore((s) => s.closeMenu);
  const setTimeOfDay = useSceneStore((s) => s.setTimeOfDay);
  const setWeather = useSceneStore((s) => s.setWeather);

  const lastTapRef = useRef(0);
  const lastClickRef = useRef(0);

  const timeOptions: ICircleSelectorOption[] = [
    { id: 'dawn', icon: Sunrise, label: 'Dawn (6:00)', onClick: () => setTimeOfDay(6) },
    { id: 'noon', icon: Sun, label: 'Noon (12:00)', onClick: () => setTimeOfDay(12) },
    { id: 'dusk', icon: Sunset, label: 'Dusk (18:00)', onClick: () => setTimeOfDay(18) },
    { id: 'night', icon: Moon, label: 'Night (0:00)', onClick: () => setTimeOfDay(0) },
  ];

  const weatherOptions: ICircleSelectorOption[] = [
    { id: 'clear', icon: Sun, label: 'Clear', onClick: () => setWeather('clear') },
    { id: 'rain', icon: CloudRain, label: 'Rain', onClick: () => setWeather('rain') },
    { id: 'snow', icon: CloudSnow, label: 'Snow', onClick: () => setWeather('snow') },
  ];

  useEffect(() => {
    const handleDoubleClick = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastClickRef.current < 300) {
        e.preventDefault();
        openMenu();
      }
      lastClickRef.current = now;
    };

    const handleDoubleTap = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        e.preventDefault();
        openMenu();
      }
      lastTapRef.current = now;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener('click', handleDoubleClick);
    window.addEventListener('touchend', handleDoubleTap);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('click', handleDoubleClick);
      window.removeEventListener('touchend', handleDoubleTap);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, openMenu, closeMenu]);

  if (!isMenuOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 p-4 flex items-start justify-start bg-black/50 backdrop-blur-sm"
      onDoubleClick={closeMenu}
    >
      <div className="flex items-start justify-start flex-col gap-4">
        <button
          onClick={closeMenu}
          className="w-10 h-10 rounded-full border-2 border-white/80 
            hover:bg-white/10 transition-all duration-200 flex items-center justify-center cursor-pointer"
        >
          <X size={18} className="text-white" />
        </button>

        <CircleSelector icon={Clock} options={timeOptions} />
        <CircleSelector icon={Cloud} options={weatherOptions} />
      </div>
    </div>
  );
};
