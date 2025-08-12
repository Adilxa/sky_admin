import React, { useState } from 'react';

interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

const InnerPlaceholderInput: React.FC<Props> = ({ placeholder, value, onChange, type = 'text' }) => {
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isFocused || value.length > 0;

  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 pt-6 pb-2 text-base bg-[#F6F6F8] border border-[1px] outline-none border-gray-200 rounded-lg transition-all duration-200"
      />
      <label
        className={`absolute left-4 text-gray-500 pointer-events-none transition-all duration-200 ${
          isActive
            ? 'top-2 text-xs text-gray-400'
            : 'top-4 text-base'
        }`}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default InnerPlaceholderInput;
