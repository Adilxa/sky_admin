'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import TooltipTitle from '@/components/shared/tooltip-title';
import RichTextEditor from '@/components/shared/text-editor';

const AdvertisingForm: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [startDateOpen, setStartDateOpen] = useState<boolean>(false);
  const [endDateOpen, setEndDateOpen] = useState<boolean>(false);

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

      <div className={'grid grid-cols-2 gap-5'}>
        {/* Дата начала */}
        <div className="relative">
          <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'peer rounded-full bg-transparent border-[2px] border-gray-300 px-4 py-3 text-[16px] w-full h-auto justify-start text-left font-normal hover:bg-transparent hover:border-gray-400',
                  !startDate && 'text-transparent',
                )}
              >
                {startDate ? (
                  <span className="text-black">
                    {format(startDate, 'dd MMMM yyyy', { locale: ru })}
                  </span>
                ) : (
                  <span className="text-transparent">dd MMMM yyyy</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  setStartDate(date);
                  setStartDateOpen(false);
                }}
                disabled={(date) =>
                  date < new Date() || date < new Date('1900-01-01')
                }
                initialFocus
                locale={ru}
              />
            </PopoverContent>
          </Popover>
          <label
            className={`absolute cursor-text bg-[#F6F6F8] px-1 left-4 text-slate-400 text-sm transition-all transform origin-left pointer-events-none ${
              startDate || startDateOpen
                ? '-top-2 left-5 text-xs scale-90'
                : 'top-4'
            }`}
          >
            От
          </label>
        </div>

        {/* Дата окончания */}
        <div className="relative">
          <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'peer rounded-full bg-transparent border-[2px] border-gray-300 px-4 py-3 text-[16px] w-full h-auto justify-start text-left font-normal hover:bg-transparent hover:border-gray-400',
                  !endDate && 'text-transparent',
                )}
              >
                {endDate ? (
                  <span className="text-black">
                    {format(endDate, 'dd MMMM yyyy', { locale: ru })}
                  </span>
                ) : (
                  <span className="text-transparent">dd MMMM yyyy</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => {
                  setEndDate(date);
                  setEndDateOpen(false);
                }}
                locale={ru}
              />
            </PopoverContent>
          </Popover>
          <label
            className={`absolute cursor-text bg-[#F6F6F8] px-1 left-4 text-slate-400 text-sm transition-all transform origin-left pointer-events-none ${
              endDate || endDateOpen
                ? '-top-2 left-5 text-xs scale-90'
                : 'top-4'
            }`}
          >
            До
          </label>
        </div>
      </div>
    </form>
  );
};

export default AdvertisingForm;
