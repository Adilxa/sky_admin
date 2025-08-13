'use client';

import React, { useEffect } from 'react';
import Header from '@/components/layout/header';
import UploadButton from '@/components/shared/upload-btn';
import PageContentWrapper from '@/components/ui/page-content-wrapper';
import AddNewBtn from '@/components/shared/add-new-btn';
import { getQueryParam } from '@/lib/helpers/general.helpers';
import { onCreateTariff } from '@/components/screens/tariff/create/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import ServiceForm from '@/components/ui/service-form';
import { onCreateService } from '@/components/screens/service/create/api';

interface ITariffState {
  service: string;
  filial: string;
  minAge: string;
  maxAge: string;
  price: string;
  bonus: string;
}

export interface ITariffForm {
  service: string;
  filial: string;
  minAge: string;
  maxAge: string;
  price: string;
  bonus: string;
}

const ServiceCreateScreen = () => {
  const [tariff, setTariff] = React.useState<ITariffState>({
    service: '',
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
  }, [idParam]);

  const handleTariffChange = (field: keyof ITariffForm, value: string) => {
    setTariff(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: (data: any) => onCreateService(data),
    onSuccess: () => {
      toast('Успешно создано');
      idParam ? router.push(`/branches/services?id=${idParam}`) : router.push('/creative/tariff');
    },
  });

  const handleSubmit = () => {
    const tariffData = {
      service: tariff.service,
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
      <Header title={'Сервисы'} btn={<UploadButton />} />
      <PageContentWrapper
        search={false}
        btn={
          <AddNewBtn
            showPlus={false}
            route={''}
            text={'Добавить сервис'}
            func={() => handleSubmit()}
          />
        }
        title={'Создание сервиса'}
      >
        <div className={'grid grid-cols-2 gap-6'}>
          <ServiceForm
            service={tariff}
            onServiceChange={handleTariffChange}
          />
        </div>
      </PageContentWrapper>
    </>
  );
};

export default ServiceCreateScreen;
