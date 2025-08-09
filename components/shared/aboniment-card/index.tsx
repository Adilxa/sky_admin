import React from 'react';
import RAINBOW_SVG from '../../../assets/svg/rainbow.svg';
import Image from 'next/image';
import { EllipsisVertical } from 'lucide-react';

interface Props {
  title: string;
  location: string;
  money: number;
  desc: string;
}

const AbonimentCard: React.FC<Props> = ({ title, money, desc, location }) => {
  return (
    <div className={'rounded-[32px] bg-[#F1F1F1] p-8 flex flex-col gap-4 shadow-md'}>
      <div className={'flex justify-between items-center'}>
        <div className={'flex items-center gap-4'}>
          <div className={'rounded-full w-[64px] h-[64px] bg-[#B6B6B626] flex items-center justify-center'}>
            <Image src={RAINBOW_SVG} alt={'puzzle'} width={20} height={20} />
          </div>
          <div
            className={'flex flex-col'}>
            <h1 className={'font-bold text-[#292929] text-[32px]'}>{title}</h1>
            <h2 className={'text-[#7B7B7B] text-[15px]'}>
              {location}
            </h2>
          </div>
        </div>
        <EllipsisVertical className={'cursor-pointer'} />
      </div>
      <div className={'flex items-center justify-between'}>
        <h2 className={'text-[#292929] text-[24px] font-semibold'}>
          {desc}
        </h2>
        <h5 className={'text-[#292929] text-[24px] font-semibold'}>{`${money} c`}</h5>
      </div>
    </div>
  );
};

export default AbonimentCard;
