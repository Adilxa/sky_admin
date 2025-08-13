import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBranchesList, getServiceList } from './api';
import { getQueryParam } from '@/lib/helpers/general.helpers';
import TooltipTitle from '@/components/shared/tooltip-title';
import { useRouter } from 'next/navigation';

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

interface IService {
  id: number;
  name: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface IServiceForm {
  service: string;
  filial: string;
  minAge: string;
  maxAge: string;
  price: string;
  bonus: string;
}

interface ServiceFormProps {
  service: IServiceForm;
  onServiceChange: (field: keyof IServiceForm, value: string) => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ service, onServiceChange }) => {
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

  const router = useRouter();

  const handleInputChange = (field: keyof IServiceForm) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onServiceChange(field, e.target.value);
  };

  const { data: branchesList, isLoading: branchesLoading } = useQuery<IBranch[]>({
    queryKey: ['branchesList'],
    queryFn: () => getBranchesList(),
  });

  const { data: serviceList, isLoading: servicesLoading } = useQuery<IService[]>({
    queryKey: ['serviceList'],
    queryFn: () => getServiceList(),
  });

  const handleBranchSelect = (branchId: number) => {
    onServiceChange('filial', String(branchId));
    setIsBranchDropdownOpen(false);
  };

  const handleServiceSelect = (serviceId: number) => {
    onServiceChange('service', String(serviceId));
    setIsServiceDropdownOpen(false);
  };

  const toggleBranchDropdown = () => {
    if (paramId) return;
    setIsBranchDropdownOpen(!isBranchDropdownOpen);
  };

  const toggleServiceDropdown = () => {
    setIsServiceDropdownOpen(!isServiceDropdownOpen);
  };

  const paramId = getQueryParam('id');

  const selectedBranch = branchesList?.find(branch => String(branch.id) === service.filial);
  const branchDisplayValue = selectedBranch ? selectedBranch.name : service.filial;

  const selectedService = serviceList?.find(srv => String(srv.id) === service.service);
  const serviceDisplayValue = selectedService ? selectedService.name : '';

  return (
    <form
      className={'col-span-1 border-[1px] p-5 py-10 border-[#F1F1F1] bg-[#F6F6F8] rounded-[24px] flex flex-col gap-5'}>
      <div className={'flex flex-col gap-3'}>
        <TooltipTitle title={'Выберите сервис'} tooltip={'Выберите сервис'} />
        <div className="relative">
          <input
            className="rounded-full border-[#E2E2E2] border-[2px] px-4 py-3 outline-none text-[16px] w-full cursor-pointer"
            placeholder={'Выберите сервис'}
            value={serviceDisplayValue}
            onClick={toggleServiceDropdown}
            readOnly
          />
          <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={toggleServiceDropdown}
          >
            <svg
              className={`w-5 h-5 transition-transform ${isServiceDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {isServiceDropdownOpen && (
            <div
              className="absolute hide-scrollbar p-4 px-4 top-full left-0 right-0 mt-2 bg-white border border-[#E2E2E2] rounded-2xl shadow-lg z-10 max-h-60 overflow-y-auto">
              {servicesLoading ? (
                <div className="px-4 py-3 text-gray-500">Загрузка...</div>
              ) : serviceList && serviceList.length > 0 ? (
                serviceList.map((srv) => (
                  <div
                    key={srv.id}
                    className="px-4 py-3 rounded-[12px] hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleServiceSelect(srv.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="">{srv.name}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500">Нет доступных сервисов</div>
              )}
              <div
                className="px-4 py-3 cursor-pointer"
                onClick={() => router.push('/creative/service/create/create')}
              >
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-[#325AEA]">+ Добавить сервис</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={'flex flex-col gap-3'}>
        <TooltipTitle title={'Филиал'} tooltip={'Филиал'} />
        <div className="relative">
          <input
            className={`rounded-full border-[#E2E2E2] border-[2px] px-4 py-3 outline-none text-[16px] w-full ${
              paramId ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
            placeholder={'Выберите филиал'}
            value={branchDisplayValue}
            onClick={toggleBranchDropdown}
            readOnly
            disabled={!!paramId}
          />
          <div
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
              paramId ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
            onClick={toggleBranchDropdown}
          >
            <svg
              className={`w-5 h-5 transition-transform ${isBranchDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {isBranchDropdownOpen && !paramId && (
            <div
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E2E2E2] rounded-2xl shadow-lg z-10 max-h-60 overflow-y-auto">
              {branchesLoading ? (
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
              value={service.minAge}
              onChange={handleInputChange('minAge')}
            />
          </div>
          <div className="w-full">
            <div className="relative">
              <input
                className="rounded-full border-[2px] px-4 py-3 outline-none text-[16px] w-full focus:border-[1px] focus:border-black"
                value={service.price}
                onChange={handleInputChange('price')}
              />
              <label
                className={`absolute cursor-text bg-[#F6F6F8] px-1 left-4 text-slate-400 text-sm transition-all transform origin-left ${
                  service.price
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
              value={service.maxAge}
              onChange={handleInputChange('maxAge')}
            />
          </div>
          <div className="w-full">
            <div className="relative">
              <input
                className="rounded-full border-[2px] px-4 py-3 outline-none text-[16px] w-full focus:border-[1px] focus:border-black"
                value={service.bonus}
                onChange={handleInputChange('bonus')}
              />
              <label
                className={`absolute cursor-text bg-[#F6F6F8] px-1 left-4 text-slate-400 text-sm transition-all transform origin-left ${
                  service.bonus
                    ? '-top-2 left-5 text-xs scale-90'
                    : 'top-4'
                }`}>
                Время
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ServiceForm;
