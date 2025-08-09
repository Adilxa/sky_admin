import React from 'react';
import Header from '@/components/layout/header';
import UploadButton from '@/components/shared/upload-btn';
import PageContentWrapper from '@/components/ui/page-content-wrapper';
import AddNewBtn from '@/components/shared/add-new-btn';
import AbonimentCard from '@/components/shared/aboniment-card';

const AbonimentMock = [
  {
    title: 'SKYTURBO',
    location: 'Айтматова ТЦ Азия молл',
    desc: '30 посещений/ м',
    money: 2500,
  },
  {
    title: 'SKYTURBO',
    location: 'Айтматова ТЦ Азия молл',
    desc: '30 посещений/ м',
    money: 2500,
  },
  {
    title: 'SKYTURBO',
    location: 'Айтматова ТЦ Азия молл',
    desc: '30 посещений/ м',
    money: 2500,
  },
  {
    title: 'SKYTURBO',
    location: 'Айтматова ТЦ Азия молл',
    desc: '30 посещений/ м',
    money: 2500,
  },
  {
    title: 'SKYTURBO',
    location: 'Айтматова ТЦ Азия молл',
    desc: '30 посещений/ м',
    money: 2500,
  },
];

const AbonimetScreen = () => {
  return (
    <>
      <Header title={'Абонементы'} btn={<UploadButton />} />
      <PageContentWrapper filters={true} search={true} title={'Абонементы'} inpPosition={'left'}
                          btn={<AddNewBtn route={'/creative/aboniments/create'} text={'Создать абонемент'} />}>
        <div className={'grid grid-cols-2 gap-6 flex-1'}>
          {
            AbonimentMock.map((el, i) => <AbonimentCard key={`${el.title}_${i}`} {...el} />)
          }
        </div>
      </PageContentWrapper>
    </>
  );
};

export default AbonimetScreen;
