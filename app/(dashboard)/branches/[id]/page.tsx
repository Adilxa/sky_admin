import React from 'react';
import Header from '@/components/layout/header';
import BottomNavigation from '@/components/layout/bottom-navigation';
import BranchAdditionalContent from '@/components/screens/branch-additional-content';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  return (
    <>
      <Header title={'Дополнительный контент'} btn={<></>} />
      <BranchAdditionalContent id={id}/>
    </>
  );
};

export default Page;
