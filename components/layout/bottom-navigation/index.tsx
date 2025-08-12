'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface Props {
  pages: number;
  position: number;
  func: () => void;
}

const BottomNavigation: React.FC<Props> = ({ pages, position, func }) => {

  const generateArr = () => {

    let pos = position - 1;

    const arr = [];
    for (let i = 0; i < pages; i++) {
      arr.push({
        active: i === pos,
        index: i,
      });
    }
    return arr;
  };


  console.log(generateArr());

  return (
    <div className={'flex justify-between w-full'}>
      <div className={'w-[64px] h-[64px]'}></div>
      <div className={'flex items-center gap-2'}>
        {
          generateArr().map((el) => <span key={el.index}
                                          className={`w-[110px] h-[2px] rounded-full ${el.active ? 'bg-[#5932EA]' : 'bg-gray-200 '}`}></span>)
        }
      </div>
      <div onClick={() => func()}
           className={'w-[64px] cursor-pointer h-[64px] rounded-full flex items-center justify-center border-[1px] border-gray-300'}>
        <ArrowRight />
      </div>

    </div>
  );
};

export default BottomNavigation;
