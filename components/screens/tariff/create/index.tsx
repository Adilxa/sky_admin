'use client';

import React from 'react';
import Header from '@/components/layout/header';
import UploadButton from '@/components/shared/upload-btn';
import PageContentWrapper from '@/components/ui/page-content-wrapper';
import AddNewBtn from '@/components/shared/add-new-btn';
import DnDInput from '@/components/shared/dnd-input';
import TariffForm from '@/components/ui/tariff-form';

interface ITariffState {
  logo: File | null;
  illustration: File | null;
  name: string;
  filial: string;
  minAge: string;
  maxAge: string;
  price: string;
  bonus: string;
}

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

const TariffCreateScreen = () => {
  const [tariff, setTariff] = React.useState<ITariffState>({
    logo: null,
    illustration: null,
    name: '',
    filial: '',
    minAge: '',
    maxAge: '',
    price: '',
    bonus: '',
  });

  const handleTariffChange = (field: keyof ITariffForm, value: string) => {
    if (field === 'logo' || field === 'illustration') {
      return;
    }

    setTariff(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    if (tariff.logo) formData.append('logo', tariff.logo);
    if (tariff.illustration) formData.append('illustration', tariff.illustration);
    formData.append('name', tariff.name);
    formData.append('filial', tariff.filial);
    formData.append('minAge', tariff.minAge);
    formData.append('maxAge', tariff.maxAge);
    formData.append('price', tariff.price);
    formData.append('bonus', tariff.bonus);

    console.log('FormData for server:', formData);
  };

  const handleLogoUpload = (files: File[]) => {
    if (files.length > 0) {
      setTariff(prev => ({
        ...prev,
        logo: files[0],
      }));
    }
  };

  const handleIllustrationUpload = (files: File[]) => {
    if (files.length > 0) {
      setTariff(prev => ({
        ...prev,
        illustration: files[0],
      }));
    }
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
          />
        }
        title={'Создание тарифа'}
      >
        <div className={'grid grid-cols-2 gap-6'}>
          <div className={'col-span-1 grid grid-cols-2 gap-6'}>
            <DnDInput
              tooltip={{ title: 'Логотип', description: 'lorem24' }}
              onImageSelect={handleLogoUpload}
            />
            <DnDInput
              tooltip={{ title: 'Иллюстрация', description: 'lorem24' }}
              onImageSelect={handleIllustrationUpload}
            />
          </div>
          <TariffForm
            tariff={{
              logo: tariff.logo?.name || '',
              illustration: tariff.illustration?.name || '',
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
