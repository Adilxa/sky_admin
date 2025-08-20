import React from 'react';
import Header from '@/components/layout/header';
import UploadButton from '@/components/shared/upload-btn';
import SummaryProgram from '@/components/ui/program-summary';

const LoyaltySystemPage = () => {
  return (
    <>
      <Header title={'Система лояльности '} btn={<UploadButton />} />

      <SummaryProgram />

    </>
  );
};

export default LoyaltySystemPage;
