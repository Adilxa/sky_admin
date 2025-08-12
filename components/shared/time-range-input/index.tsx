import React, { useState } from 'react';

interface Props {
  placeholder: string;
  value: string; // "HH:mm-HH:mm"
  onChange: (value: string) => void;
}

const TimeRangeInput: React.FC<Props> = ({ placeholder, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const [start, end] = value ? value.split('-') : ['', ''];

  const handleStartChange = (val: string) => {
    onChange(`${val}-${end}`);
  };

  const handleEndChange = (val: string) => {
    onChange(`${start}-${val}`);
  };

  const isActive =
    isFocused || start.length > 0 || end.length > 0;

  return (
    <div className="relative w-full">
      <div
        className="flex items-center justify-end gap-2 w-full px-4 pt-6 pb-2 bg-[#F6F6F8] border border-gray-200 rounded-lg transition-all duration-200"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <div className="flex items-center justify-end gap-4">
          <input
            type="time"
            value={start}
            onChange={(e) => handleStartChange(e.target.value)}
            className="bg-transparent outline-none appearance-none w-full"
          />
          <input
            type="time"
            value={end}
            onChange={(e) => handleEndChange(e.target.value)}
            className="bg-transparent outline-none appearance-none w-full"
          />
        </div>
      </div>
      <label
        className={`absolute left-4 text-gray-500 pointer-events-none transition-all duration-200 ${
          isActive ? 'top-4 text-base' : 'top-4 text-base'
        }`}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default TimeRangeInput;
