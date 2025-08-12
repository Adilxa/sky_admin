import React from 'react';
import Header from '@/components/layout/header';
import BranchTariffsServices from '@/components/screens/branch-tariffs-services';

const Page = async () => {
  return (
    <>
      <Header title={`Тарифы и услуги`} btn={<></>} />
      <BranchTariffsServices />
    </>
  );
};

export default Page;
