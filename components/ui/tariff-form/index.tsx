import React, { useState } from 'react';
import TooltipTitle from '@/components/shared/tooltip-title';
import { useQuery } from '@tanstack/react-query';
import { getBranchesList } from '@/components/ui/tariff-form/api';
import { getQueryParam } from '@/lib/helpers/general.helpers';

interface IBranch {
  id: number;
  name: string;
  status: string;
  status_display: string;
  image: string;
  address: string;
  opening_time: string;
  closing_time: string;
  order: number;
}

interface ITariffForm {
  name: string;
  filial: string;
  minAge: string;
  maxAge: string;
  price: string;
  bonus: string;
}

interface TariffFormProps {
  tariff: ITariffForm;
  onTariffChange: (field: keyof ITariffForm, value: string) => void;
}

const TariffForm: React.FC<TariffFormProps> = ({ tariff, onTariffChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (field: keyof ITariffForm) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onTariffChange(field, e.target.value);
  };

  const { data: branchesList, isLoading } = useQuery<IBranch[]>({
    queryKey: ['branchesList'],
    queryFn: () => getBranchesList(),
  });

  const handleBranchSelect = (branchId: number) => {
    onTariffChange('filial', String(branchId));
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    if (paramId) return;
    setIsDropdownOpen(!isDropdownOpen);
  };

  const paramId = getQueryParam('id');

  const selectedBranch = branchesList?.find(branch => String(branch.id) === tariff.filial);
  const displayValue = selectedBranch ? selectedBranch.name : tariff.filial;

  return (
    <form
      className={'col-span-1 border-[1px] p-5 py-10 border-[#F1F1F1] bg-[#F6F6F8] rounded-[24px] flex flex-col gap-5'}>
      <div className={'flex flex-col gap-3'}>
        <TooltipTitle title={'Наименование тарифа'} tooltip={'Наименование тарифа'} />
        <input
          className="rounded-full border-[#E2E2E2] border-[2px] px-4 py-3 outline-none text-[16px] w-full"
          placeholder={'Реклама BableTea '}
          value={tariff.name}
          onChange={handleInputChange('name')}
        />
      </div>

      <div className={'flex flex-col gap-3'}>
        <TooltipTitle title={'Филиал'} tooltip={'Филиал'} />
        <div className="relative">
          <input
            className={`rounded-full border-[#E2E2E2] border-[2px] px-4 py-3 outline-none text-[16px] w-full ${
              paramId ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
            placeholder={'Выберите филиал'}
            value={displayValue}
            onClick={toggleDropdown}
            readOnly
            disabled={!!paramId}
          />
          <div
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
              paramId ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
            onClick={toggleDropdown}
          >
            <svg
              className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {isDropdownOpen && !paramId && (
            <div
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E2E2E2] rounded-2xl shadow-lg z-10 max-h-60 overflow-y-auto">
              {isLoading ? (
                <div className="px-4 py-3 text-gray-500">Загрузка...</div>
              ) : branchesList && branchesList.length > 0 ? (
                branchesList.map((branch) => (
                  <div
                    key={branch.id}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                    onClick={() => handleBranchSelect(branch.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{branch.name}</div>
                        <div className="text-sm text-gray-500">{branch.address}</div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {branch.opening_time} - {branch.closing_time}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500">Нет доступных филиалов</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={'grid grid-cols-2 gap-5'}>
        <div className={'col-span-1 flex flex-col gap-10'}>
          <div className={'flex flex-col gap-3'}>
            <TooltipTitle title={'Минимальный возраст'} tooltip={'Минимальный возраст'} />
            <input
              className="rounded-full border-[#E2E2E2] border-[2px] px-4 py-3 outline-none text-[16px] w-full"
              placeholder={'1'}
              value={tariff.minAge}
              onChange={handleInputChange('minAge')}
            />
          </div>
          <div className="w-full">
            <div className="relative">
              <input
                className="rounded-full border-[2px] px-4 py-3 outline-none text-[16px] w-full focus:border-[1px] focus:border-black"
                value={tariff.price}
                onChange={handleInputChange('price')}
              />
              <label
                className={`absolute cursor-text bg-[#F6F6F8] px-1 left-4 text-slate-400 text-sm transition-all transform origin-left ${
                  tariff.price
                    ? '-top-2 left-5 text-xs scale-90'
                    : 'top-4'
                }`}>
                Цена
              </label>
            </div>
          </div>
        </div>
        <div className={'col-span-1 flex flex-col gap-10'}>
          <div className={'flex flex-col gap-3'}>
            <TooltipTitle title={'Максимальный возраст'} tooltip={'Максимальный возраст'} />
            <input
              className="rounded-full border-[#E2E2E2] border-[2px] px-4 py-3 outline-none text-[16px] w-full"
              placeholder={'12'}
              value={tariff.maxAge}
              onChange={handleInputChange('maxAge')}
            />
          </div>
          <div className="w-full">
            <div className="relative">
              <input
                className="rounded-full border-[2px] px-4 py-3 outline-none text-[16px] w-full focus:border-[1px] focus:border-black"
                value={tariff.bonus}
                onChange={handleInputChange('bonus')}
              />
              <label
                className={`absolute cursor-text bg-[#F6F6F8] px-1 left-4 text-slate-400 text-sm transition-all transform origin-left ${
                  tariff.bonus
                    ? '-top-2 left-5 text-xs scale-90'
                    : 'top-4'
                }`}>
                Валидность в днях
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TariffForm;
