import React from 'react';
import { EllipsisVertical, MapPin } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';

interface Props {
  title: string;
  location: string;
  image: string | StaticImageData;
}

const BranchCard: React.FC<Props> = ({ title, location, image }) => {
  return (
    <div className={'rounded-[32px] bg-[#F1F1F1] p-6 flex flex-col gap-2'}>
      <div className={'flex items-center justify-between'}>
        <h1 className={'text-[25px] font-bold text-[#292929]'}>{title}</h1>
        <EllipsisVertical className={'cursor-pointer'} />
      </div>
      <div className={'flex items-center gap-2 text-[17px] text-[#757575]'}>
        <MapPin color={'#757575'} className="flex-shrink-0" />
        <span className="truncate">{location}</span>
      </div>
      <Image className={'w-full object-cover rounded-[18px] h-[150px]'} width={500} height={500} src={image}
             alt={'locationimage'} />
    </div>
  );
};

export default BranchCard;
