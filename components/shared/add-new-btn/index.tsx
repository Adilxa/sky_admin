'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  text: string;
  route: string;
  showPlus?: boolean;
  func?: () => void;
}

const AddNewBtn: React.FC<Props> = ({ text, route, showPlus = true, func }) => {

  const router = useRouter();

  const onClickBtn = () => {
    if (func) {
      func();
    }
    router.push(route);
  };

  return (
    <button
      onClick={onClickBtn}
      className={'bg-[#4F49FF] hover:bg-[#4F49FF]/80 shadow-[inset_0_1px_2px_0_rgba(248,248,248,0.2)]  px-4 py-3 text-white transition-all cursor-pointer rounded-full flex items-center gap-1 text-[16px] font-semibold'}>
      {showPlus && <Plus width={20} height={20} />}
      {text}
    </button>
  );
};

export default AddNewBtn;
