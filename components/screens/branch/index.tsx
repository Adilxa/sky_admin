'use client';

import React from 'react';
import Header from '@/components/layout/header';
import UploadButton from '@/components/shared/upload-btn';
import PageContentWrapper from '@/components/ui/page-content-wrapper';
import AddNewBtn from '@/components/shared/add-new-btn';
import LOCATION from '../../../assets/png/location.png';
import BranchCard from '@/components/shared/branch-card';
import { useQuery } from '@tanstack/react-query';
import { getBranchesList } from '@/components/screens/branch/api';
import { LoaderCircle } from 'lucide-react';

const BranchScreen = () => {

  const { data, isLoading } = useQuery({
      queryKey: ['branchesList'],
      queryFn: () => getBranchesList(),
    })
  ;

  if (isLoading) {
    return <LoaderCircle className={'animate-spin'} />;
  }
  return (
    <>
      <Header title={'Филиалы'} btn={<AddNewBtn text='Создать филиал' route='/branches/create' showPlus={true}/>} />
      <PageContentWrapper filters={false} search={false} title={''} inpPosition={'left'}
                          btn={<></>}>
        <div className={'grid grid-cols-4 gap-10 flex-1'}>
          {
            data?.map((item: any, index: number) => (
              <BranchCard key={`${item?.name}_${index}`} title={item?.name} image={item?.image}
                          location={item?.address} />
            ))
          }
        </div>
      </PageContentWrapper>
    </>
  );
};

export default BranchScreen;