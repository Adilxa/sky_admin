import React from 'react';
import Header from '@/components/layout/header';
import UploadButton from '../../shared/upload-btn';
import PageContentWrapper from '@/components/ui/page-content-wrapper';
import AddNewBtn from '@/components/shared/add-new-btn';
import TariffCard from '@/components/ui/tariff-card';

const mockData = [
  {
    title: 'Sky Kids',
    sky: 14,
    age: '1-5',
    id: 1,
  },
  {
    title: 'Sky Kids',
    sky: 14,
    age: '1-5',
    id: 2,
  },
  {
    title: 'Sky Kids',
    sky: 14,
    age: '1-5',
    id: 3,
  },
  {
    title: 'Sky Kids',
    sky: 14,
    age: '1-5',
    id: 4,
  },
  {
    title: 'Sky Kids',
    sky: 14,
    age: '1-5',
    id: 5,
  },
  {
    title: 'Sky Kids',
    sky: 14,
    age: '1-5',
    id: 6,
  },
  {
    title: 'Sky Kids',
    sky: 14,
    age: '1-5',
    id: 7,
  },
];

const TariffScreen = () => {

  return (
    <>
      <Header title={'Тарифы'} btn={<UploadButton />} />
      <PageContentWrapper title={'Тарифы '} inpPosition={'left'}
                          btn={<AddNewBtn route={'/tariff/create'} text={'Создать тариф'} />}>
        <div className={'grid grid-cols-3 gap-6 flex-1'}>
          {
            mockData.map((item) => (
              <TariffCard key={item.id} title={item.title} sky={item.sky} age={item.age} />
            ))
          }
        </div>
      </PageContentWrapper>
    </>
  );
};

export default TariffScreen;
