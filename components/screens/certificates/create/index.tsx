'use client';

import React from 'react';
import Header from '@/components/layout/header';
import UploadButton from '@/components/shared/upload-btn';
import PageContentWrapper from '@/components/ui/page-content-wrapper';
import AddNewBtn from '@/components/shared/add-new-btn';
import DnDInput from '@/components/shared/dnd-input';
import AdvertisingForm from '@/components/ui/advertising-form';
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

const CertificateCreate = () => {

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

  return (
    <>
      <Header title={'Сертификаты'} btn={<UploadButton />} />
      <PageContentWrapper
        search={false}
        inpPosition={'right'}
        btn={
          // <AddNewBtn
          //   showPlus={false}
          //   route={''}
          //   text={''}
          // />
          <div></div>
        }
        title={'Добавить сертификат'}
      >
        <div className={'grid grid-cols-2 gap-6'}>
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

export default CertificateCreate;
