import React from 'react';
import PUZZLE_SVG from '../../../assets/svg/Puzzle.svg';
import Image from 'next/image';

interface Props {
  title: string;
  age: string;
}

const TariffCard: React.FC<Props> = ({ title, age }) => {
  return (
    <div className={'rounded-[32px] bg-[#F1F1F1] p-8 flex flex-col gap-4 shadow-md'}>
      <div className={'rounded-full w-[64px] h-[64px] bg-[#B6B6B626] flex items-center justify-center'}>
        <Image src={PUZZLE_SVG} alt={'puzzle'} width={20} height={20} />
      </div>
      <h1 className={'font-bold text-[#292929] text-[32px]'}>{title}</h1>
      <div className={'flex items-center justify-between'}>
        <h2 className={'text-[#292929] text-[24px] font-semibold'}>
          {age}
        </h2>
      </div>
    </div>
  );
};

export default TariffCard;
