import React from 'react';
import Header from '@/components/layout/header';
import UploadButton from '@/components/shared/upload-btn';
import AddNewBtn from '@/components/shared/add-new-btn';
import PageContentWrapper from '@/components/ui/page-content-wrapper';
import DnDInput from '@/components/shared/dnd-input';
import AdvertisingForm from '@/components/ui/advertising-form';

const AdvertisingCreateScreen = () => {
  return (
    <>
      <Header title={'Создание рекламы '} btn={<UploadButton />} />
      <PageContentWrapper
        search={true}
        inpPosition={'right'}
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
          <DnDInput hide={true} tooltip={{ title: 'Реклама', description: 'Реклама' }}></DnDInput>
          <AdvertisingForm />
        </div>
      </PageContentWrapper>;
    </>
  )
    ;
};

export default AdvertisingCreateScreen;
