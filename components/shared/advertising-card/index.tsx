import React from 'react';
import Image from 'next/image';
import { Clock4, SquarePen, Trash2 } from 'lucide-react';

interface IProps {
  image: string;
  title: string;
  date: string;
  id: number;
}

const AdvertisingCard: React.FC<IProps> = ({ image, title, date, id }) => {
  return (
    <div className={'flex flex-col gap-2 w-full'}>
      <Image src={image} alt={'card'} width={600} height={600} className={'rounded-[22px] w-full objective-cover'} />
      <h1 className={'text-[#101010] text-[18px] font-semibold'}>{title}</h1>
      <div className={'flex items-center gap-2'}>
        <Clock4 color={'#727272'} width={17} height={17} />
        <p className={'text-[#727272] text-[12px]'}>{date}
        </p>
      </div>
      <div className={'flex items-center gap-2'}>
        <button
          className={'flex items-center gap-2 text-[#101010] text-[14px] font-semibold border-[1px] border-[#E2E2E2] px-1 rounded-[6px] cursor-pointer hover:bg-[#E2E2E5] transition-all'}>
          <SquarePen color={'#727272'} width={15} height={15} />
          Редактировать
        </button>
        <button
          className={'bg-linear-to-r hover:from-[#FFCACA] hover:to-[#FF7474] flex items-center group hover:text-white gap-2 text-[#101010] text-[14px] hover:border-[#FF9696]  hover:border-[1px] font-semibold border-[1px] border-[#E2E2E2] px-1 rounded-[6px] cursor-pointer hover:bg-[#E2E2E5] transition-all'}>
          <Trash2 className={'group-hover:text-red-500 text-[#727272]'} width={15} height={15} />
          Удалить
        </button>
      </div>
    </div>
  );
};

export default AdvertisingCard;
