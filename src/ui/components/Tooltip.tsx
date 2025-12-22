import { useUIStore } from '../../state/ui/store/ui.store';

interface ITooltipProps {
  message?: string;
}

export const Tooltip: React.FC<ITooltipProps> = ({
  message = 'Double-click or double-tap to open menu'
}) => {
  const hasMenuBeenOpened = useUIStore((s) => s.hasMenuBeenOpened);

  if (hasMenuBeenOpened) {
    return null;
  }

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-50">
      <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm animate-pulse text-center">
        {message}
      </div>
    </div>
  );
};

