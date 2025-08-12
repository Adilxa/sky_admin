'use client';

import React from 'react';
import { getQueryParam } from '@/lib/helpers/general.helpers';
import AddTariffBtn from '@/components/ui/add-tariff-btn';
import { useQuery } from '@tanstack/react-query';
import { getTariffsList } from '@/components/screens/branch-tariffs-services/api';
import TariffCard from '@/components/ui/tariff-card';
import { LoaderCircle } from 'lucide-react';

const BranchTariffsServices = () => {

  const id: string | null = getQueryParam('id');

  const { data, isLoading } = useQuery({
    queryFn: () => getTariffsList(id ? id : ''),
    queryKey: ['tariffsList'],
  });

  return (
    <div className={'flex flex-col gap-5'}>
      <div>
        <h1 className={'text-[17px] ml-2 text-[#00000080] font-semibold mb-2'}>
          Тарифы
        </h1>
        <div className={'grid grid-cols-3 gap-10'}>
          {
            isLoading ? <LoaderCircle className={'animate-spin'} />
              :
              data.map((el: any) => (
                <TariffCard title={el.name} age={`${el.min_age}-${el.max_age}`} key={el.id} />
              ))
          }
          <AddTariffBtn id={id} />
        </div>
      </div>
      <div>
        <h1 className={'text-[17px] ml-2 text-[#00000080] font-semibold mb-2'}>
          Услуги
        </h1>
        <div className={'grid grid-cols-3 gap-10'}>

          <AddTariffBtn id={id} />
        </div>
      </div>
    </div>
  );
};

export default BranchTariffsServices;
