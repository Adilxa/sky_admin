'use client';

import React from 'react';
import Header from '@/components/layout/header';
import UploadButton from '@/components/shared/upload-btn';
import PageContentWrapper from '@/components/ui/page-content-wrapper';
import AddNewBtn from '@/components/shared/add-new-btn';
import ADSVG from '../../../assets/svg/adImage.svg';
import AdvertisingCard from '@/components/shared/advertising-card';

const mockData = [
  {
    image: ADSVG,
    title: 'Реклама BableTea',
    date: 'Апр 9, 2044 до Апр 10, 2044',
    id: 1,
  },
  {
    image: ADSVG,
    title: 'Реклама BableTea',
    date: 'Апр 9, 2044 до Апр 10, 2044',
    id: 2,
  },
  {
    image: ADSVG,
    title: 'Реклама BableTea',
    date: 'Апр 9, 2044 до Апр 10, 2044',
    id: 3,
  },
  {
    image: ADSVG,
    title: 'Реклама BableTea',
    date: 'Апр 9, 2044 до Апр 10, 2044',
    id: 4,
  },
];

const AdvertisingScreen = () => {
  return (
    <>
      <Header title={'Создание рекламы '} btn={<UploadButton />} />
      <PageContentWrapper title={'Реклама'} inpPosition={'left'} search={true}
                          btn={<AddNewBtn text={'Добавить рекламу'} route={'/creative/advertising/create'} />}>
        <div className={'grid grid-cols-3 gap-6 flex-1'}>
          {
            mockData.map((item) => (
              <AdvertisingCard key={item.id} image={item.image} title={item.title} date={item.date} id={item.id} />
            ))
          }
        </div>
      </PageContentWrapper>
    </>
  );
};

export default AdvertisingScreen;
