'use client';

import React, { useEffect } from 'react';
import Header from '@/components/layout/header';
import UploadButton from '@/components/shared/upload-btn';
import PageContentWrapper from '@/components/ui/page-content-wrapper';
import AddNewBtn from '@/components/shared/add-new-btn';
import TariffForm from '@/components/ui/tariff-form';
import { getQueryParam } from '@/lib/helpers/general.helpers';
import { onCreateTariff } from '@/components/screens/tariff/create/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ITariffState {
  name: string;
  filial: string;
  minAge: string;
  maxAge: string;
  price: string;
  bonus: string;
}

export interface ITariffForm {
  name: string;
  filial: string;
  minAge: string;
  maxAge: string;
  price: string;
  bonus: string;
}

const TariffCreateScreen = () => {
  const [tariff, setTariff] = React.useState<ITariffState>({
    name: '',
    filial: '',
    minAge: '',
    maxAge: '',
    price: '',
    bonus: '',
  });

  const idParam: string | null = getQueryParam('id');

  const router = useRouter();

  useEffect(() => {
    setTariff((prev) => idParam != null ? { ...prev, filial: idParam } : { ...prev });
  }, [router]);

  const handleTariffChange = (field: keyof ITariffForm, value: string) => {
    setTariff(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: (data: ITariffForm) => onCreateTariff(data),
    onSuccess: () => {
      toast('Успешно создано');
      idParam ? router.push(`/branches/services?id=${idParam}`) : router.push('/creative/tariff');
    },
  });

  const handleSubmit = () => {
    const tariffData = {
      name: tariff.name,
      filial: tariff.filial,
      minAge: tariff.minAge,
      maxAge: tariff.maxAge,
      price: tariff.price,
      bonus: tariff.bonus,
    };
    mutation.mutate(tariffData);
  };


  return (
    <>
      <Header title={'Тарифы'} btn={<UploadButton />} />
      <PageContentWrapper
        search={false}
        btn={
          <AddNewBtn
            showPlus={false}
            route={''}
            text={'Добавить тариф'}
            func={() => handleSubmit()}
          />
        }
        title={'Создание тарифа'}
      >
        <div className={'grid grid-cols-2 gap-6'}>
          <TariffForm
            tariff={{
              name: tariff.name,
              filial: tariff.filial,
              minAge: tariff.minAge,
              maxAge: tariff.maxAge,
              price: tariff.price,
              bonus: tariff.bonus,
            }}
            onTariffChange={handleTariffChange}
          />
        </div>
      </PageContentWrapper>
    </>
  );
};

export default TariffCreateScreen;
