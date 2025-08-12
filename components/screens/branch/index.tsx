import React from 'react';
import Header from '@/components/layout/header';
import UploadButton from '@/components/shared/upload-btn';
import PageContentWrapper from '@/components/ui/page-content-wrapper';
import AddNewBtn from '@/components/shared/add-new-btn';
import LOCATION from '../../../assets/png/location.png';
import BranchCard from '@/components/shared/branch-card';

const mockData = [
  {
    title: 'Sky Kids',
    location: 'hhehhehe llell lellel dsad sad sad as ddasdasd',
    image: LOCATION,
  },
];

const BranchScreen = () => {
  return (
    <>
      <Header title={'Филиалы'} btn={<UploadButton />} />
      <PageContentWrapper filters={true} search={true} title={'Филиалы'} inpPosition={'left'}
                          btn={<AddNewBtn route={'/branches/create'} text={'Создать филиал'} />}>
        <div className={'grid grid-cols-4 gap-10 flex-1'}>
          {
            mockData.map((item, index) => (
              <BranchCard key={`${item.title}_${index}`} {...item} />
            ))
          }
        </div>
      </PageContentWrapper>
    </>
  );
};

export default BranchScreen;
