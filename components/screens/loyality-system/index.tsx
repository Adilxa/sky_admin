import React from 'react';
import Header from '@/components/layout/header';
import UploadButton from '@/components/shared/upload-btn';
import SummaryProgram from '@/components/ui/program-summary';
import MainRules from '@/components/ui/main-rules';

const LoyaltySystemPage = () => {
  return (
    <>
      <Header title={'Система лояльности '} btn={<UploadButton />} />
      <SummaryProgram />
      <MainRules />
    </>
  );
};

export default LoyaltySystemPage;
