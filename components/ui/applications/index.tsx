import React from 'react';
import SelectDate from '@/components/shared/select-date';

const ApplicationsList = () => {
  return (
    <div className={'p-6 px-8 rounded-[32px] shadow bg-[var(--aside-bg)] flex flex-col gap-5'}>
      <div className={'flex items-center justify-between'}>
        <h1 className={'text-[28px] text-[#101010] font-semibold'}>Заявки приложения</h1>
        <SelectDate />
      </div>
    </div>
  );
};

export default ApplicationsList;
