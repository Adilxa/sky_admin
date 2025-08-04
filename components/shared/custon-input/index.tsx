'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { debounce, setQueryParam, getQueryParam } from '@/lib/helpers/general.helpers';
import { Search } from 'lucide-react';

const CustomInput = () => {

  const [value, setValue] = React.useState('');
  const [displayValue, setDisplayValue] = useState(getQueryParam('search') || '');

  const debouncedSetValue = useMemo(
    () => debounce((newValue: string) => {
      setValue(newValue);
      setQueryParam('search', newValue);
    }, 300),
    [],
  );

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setDisplayValue(newValue);
    debouncedSetValue(newValue);

  }, [debouncedSetValue]);


  return (
    <div className="relative">
      <input
        className="rounded-full bg-[#F1F1F1] px-4 pl-12 py-3 outline-none text-[16px] w-full"
        value={displayValue}
        onChange={onChange}
        placeholder="Искать..."
      />
      <Search
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
      />
    </div>
  );
};

export default CustomInput;
