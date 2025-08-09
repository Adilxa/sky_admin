import React, { ReactNode } from 'react';
import CustomInput from '@/components/shared/custon-input';
import SHADE_PNG from '../../../assets/png/shade.png';
import Image from 'next/image';
import FiltrationSettings from '@/components/shared/filtration-settings';

interface Props {
  children: React.ReactNode;
  title: string;
  search?: boolean;
  btn?: ReactNode;
  inpPosition?: 'right' | 'left';
  filters?: boolean;
}

const PageContentWrapper: React.FC<Props> = ({ children, title, search, btn, inpPosition, filters = false }) => {
  return (
    <main className={'bg-[var(--aside-bg)] rounded-[32px] py-6 px-8 relative overflow-hidden'}>
      <div className={'flex justify-between items-center mb-5'}>
        <div className={'flex items-center gap-3'}>
          <h1 className={'color-[#101010] font-semibold text-[20px]'}>
            {title}
          </h1>
          {
            search &&
            inpPosition === 'left' && (
              <CustomInput />
            )
          }
          {
            filters && (
              <FiltrationSettings />
            )
          }
        </div>
        <div className={'flex items-center gap-3'}>
          {
            search && inpPosition === 'right' && (
              <CustomInput />
            )
          }
          {btn ? btn : ''}
        </div>
      </div>
      <div className={'overflow-y-auto py-2 hide-scrollbar pb-[15vh] pt-[2vh]'}
           style={{ height: 'calc(100vh - 30vh)' }}>
        {children}
      </div>
      <Image
        className={'absolute bottom-6 left-8 z-[9999999999999999] right-8 w-full pointer-events-none'}
        src={SHADE_PNG}
        alt={'shadow'}
      />
    </main>
  );
};

export default PageContentWrapper;
