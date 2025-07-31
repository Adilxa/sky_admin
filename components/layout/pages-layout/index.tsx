import React from 'react';
import Aside from '@/components/layout/aside';

interface Props {
  children: React.ReactNode;
}

const PagesLayout: React.FC<Props> = ({ children }) => {
  return (
    <section className={'grid grid-cols-1 md:grid-cols-24 w-full min-h-[100dvh]'}>
      <div className={'hidden md:block md:col-span-6 lg:col-span-4 xl:col-span-3'}>
        <Aside />
      </div>
      <div className={'col-span-1 md:col-span-18 lg:col-span-20 xl:col-span-21 overflow-y-scroll'}>
        {children}
      </div>
    </section>
  );
};

export default PagesLayout;