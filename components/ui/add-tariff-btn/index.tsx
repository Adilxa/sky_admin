import React from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  id: string | null;
}

const AddTariffBtn: React.FC<Props> = ({ id }) => {

  const router = useRouter();

  return (
    <div onClick={() => router.push(`/creative/tariff/create?id=${id}`)}
         className={'flex items-center justify-center w-full h-[250px] cursor-pointer rounded-[32px] bg-[#F1F1F180]'}>
      <div className={'flex flex-col gap-1 items-center'}>
        <div className={'p-3 rounded-full bg-[#18181B75]'}>
          <Plus color={'#fff'} />
        </div>
        <h4 className={'text-[15px] text-[#727272] font-semibold'}>
          Добавить тариф
        </h4>
      </div>
    </div>
  );
};

export default AddTariffBtn;
