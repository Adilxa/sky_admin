import React from 'react';
import Header from '@/components/layout/header';
import UploadButton from '@/components/shared/upload-btn';
import AddNewBtn from '@/components/shared/add-new-btn';
import PageContentWrapper from '@/components/ui/page-content-wrapper';
import FillialActivity from '@/components/ui/fillial-activity';
import ApplicationsList from '@/components/ui/applications';
import AppAnalytics from '@/components/ui/analytics';

const HomeScreen = () => {
  return (
    <>
      <Header title={'Главная'} btn={<UploadButton />}
              createBtn={<AddNewBtn text={'Создать кабинет'} route={'room/create'} showPlus={true} />} />
      <div className={'grid grid-cols-12 gap-5 flex-1'}>
        <div className={'col-span-8 flex flex-col gap-5'}>
          <div className={'w-[50%] flex flex-col gap-3'}>
            <h1 style={{ lineHeight: '32px' }} className={'text-[32px] text-[#212227] font-semibold'}>
              Здравствуйте Айтегин,
              рады помочь вам
            </h1>
            <div className={'flex justify-between items-center'}>
              <p className={'text-[16px] text-[#707B81]'}>Clid 098988890907</p>
              <p className={'text-[16px] text-[#707B81]'}>Бишкек, время, с задержкой до 1 часа</p>
            </div>
          </div>
          <FillialActivity />
          <ApplicationsList />
        </div>
        <div className={'col-span-4'}>
          <AppAnalytics />
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
