import { useState } from 'react';
import { LucideIcon } from 'lucide-react';

export interface ICircleSelectorOption {
  id: string;
  icon: LucideIcon;
  label?: string;
  onClick: () => void;
}

interface ICircleSelectorProps {
  icon: LucideIcon;
  options: ICircleSelectorOption[];
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-18 h-18',
};

const iconSizes = {
  sm: 16,
  md: 22,
  lg: 28,
};

export const CircleSelector: React.FC<ICircleSelectorProps> = ({
  icon: MainIcon,
  options,
  size = 'md',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMainClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOptionClick = (option: ICircleSelectorOption) => {
    option.onClick();
    setIsExpanded(false);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleMainClick}
        className={`${sizeClasses[size]} rounded-full border-2 border-white/80 
          ${isExpanded ? 'bg-white/20' : 'hover:bg-white/10'} 
          transition-all duration-200 flex items-center justify-center cursor-pointer`}
      >
        <MainIcon size={iconSizes[size]} className="text-white" />
      </button>

      {isExpanded && (
        <div className="flex items-center gap-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className={`${sizeClasses.sm} rounded-full border-2 border-white/60 
                hover:bg-white/10 transition-all duration-200 flex items-center justify-center cursor-pointer`}
              title={option.label}
            >
              <option.icon size={iconSizes.sm} className="text-white" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

