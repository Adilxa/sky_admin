import React from 'react';
import TooltipTitle from '@/components/shared/tooltip-title';

interface ITariffForm {
  logo: string;
  illustration: string;
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
  const handleInputChange = (field: keyof ITariffForm) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onTariffChange(field, e.target.value);
  };

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
        <input
          className="rounded-full border-[#E2E2E2] border-[2px] px-4 py-3 outline-none text-[16px] w-full"
          placeholder={'Цум'}
          value={tariff.filial}
          onChange={handleInputChange('filial')}
        />
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
                className="peer rounded-full bg-transparent border-[2px] px-4 py-3 outline-none text-[16px] w-full"
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
                className="peer rounded-full bg-transparent border-[2px] px-4 py-3 outline-none text-[16px] w-full"
                value={tariff.bonus}
                onChange={handleInputChange('bonus')}
              />
              <label
                className={`absolute cursor-text bg-[#F6F6F8] px-1 left-4 text-slate-400 text-sm transition-all transform origin-left ${
                  tariff.bonus
                    ? '-top-2 left-5 text-xs scale-90'
                    : 'top-4'
                }`}>
                Бонус
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TariffForm;
