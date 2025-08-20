import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Switch: React.FC<SwitchProps> = ({
                                         checked,
                                         onChange,
                                         label,
                                         description,
                                         disabled = false,
                                         size = 'md',
                                       }) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          switch: 'w-10 h-5',
          thumb: 'w-4 h-4',
          translate: 'translate-x-5',
        };
      case 'lg':
        return {
          switch: 'w-16 h-8',
          thumb: 'w-7 h-7',
          translate: 'translate-x-8',
        };
      default:
        return {
          switch: 'w-12 h-6',
          thumb: 'w-5 h-5',
          translate: 'translate-x-6',
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={handleToggle}
          disabled={disabled}
          className={`
            ${sizeClasses.switch}
            relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent 
            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-offset-2
            ${checked
            ? 'bg-blue-600'
            : 'bg-gray-300'
          }
            ${disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:opacity-90'
          }
          `}
        >
          <span
            className={`
              ${sizeClasses.thumb}
              pointer-events-none inline-block rounded-full bg-white shadow-lg transform ring-0 
              transition duration-200 ease-in-out
              ${checked
              ? sizeClasses.translate
              : 'translate-x-0'
            }
            `}
          />
        </button>

        {label && (
          <span
            className={`
              text-sm font-medium select-none cursor-pointer
              ${disabled ? 'text-gray-400' : 'text-gray-900'}
              ${checked ? 'text-blue-900' : 'text-gray-700'}
            `}
            onClick={handleToggle}
          >
            {label}
          </span>
        )}
      </div>

      {description && (
        <div className="flex-1">
          <p className={`text-sm mt-0.5 ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>
            {description}
          </p>
        </div>
      )}
    </div>
  );
};


export default Switch;
