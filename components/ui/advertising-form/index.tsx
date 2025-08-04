import React from 'react';
import TooltipTitle from '@/components/shared/tooltip-title';
import RichTextEditor from '@/components/shared/text-editor';

const AdvertisingForm = () => {
  return (
    <form
      className={'col-span-1 border-[1px] p-5 py-10 border-[#F1F1F1] bg-[#F6F6F8] rounded-[24px] flex flex-col gap-5'}>
      <div className={'flex flex-col gap-3'}>
        <TooltipTitle title={'Наименование рекламы'} tooltip={'Наименование рекламы'} />
        <input
          className="rounded-full border-[#E2E2E2] border-[2px] px-4 py-3 outline-none text-[16px] w-full"
          placeholder={'Реклама BableTea '}
        />
        <TooltipTitle title={'Описание'} tooltip={'Минимальное количество не менее 100 символов'} />
        <RichTextEditor />
      </div>
    </form>
  );
};

export default AdvertisingForm;
