'use client';

import React, { useRef, useState, useEffect } from 'react';
import BRANCH_SVG from '../../../assets/svg/branch_office.svg';
import Image from 'next/image';
import { CircleQuestionMark } from 'lucide-react';

interface Props {
  branch: string,
  income: string,
  rating: string,
  work: string,
  free: string,
}

const BranchItem: React.FC<Props> = ({ branch, income, rating, work, free }) => {

  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(`${branch} - isIntersecting:`, entry.isIntersecting, 'ratio:', entry.intersectionRatio);
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 1,
        rootMargin: '0px', // Без отступов
      },
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [branch]);

  const getBackgroundColor = () => {
    if (isVisible) {
      return 'bg-white';
    }
    return 'bg-[#F1F1F1]';
  };

  const isActive = isVisible;

  return (
    <div
      ref={itemRef}
      className={`rounded-[32px] p-5 flex items-center justify-between gap-5 transition-colors duration-300 min-w-[350px] flex-shrink-0 ${getBackgroundColor()}`}
    >
      <div
        className={`flex flex-col items-center gap-2 h-full p-3 py-4 rounded-full ${isActive ? 'bg-gray-200' : 'bg-white'} justify-between`}>
        <Image src={BRANCH_SVG} alt={'branch'} />
        <CircleQuestionMark />
      </div>
      <div className={'flex gap-10 items-end'}>
        <div className={'flex flex-col items-start'}>
          <h2 className={`text-[16px] font-semibold text-[#101010]`}>
            {branch}
          </h2>
          <h1 className={`text-[60px] font-semibold 'text-[#101010]`}>
            {income}k
          </h1>
          <div className={'flex items-center gap-2'}>
            <p
              className={'text-[#00A656] text-[14px] font-semibold py-1 px-2 rounded-[8px] border-[1px] border-[#00A65626] bg-[#00A6560D]'}>
              {rating}
            </p>
            <p className={`text-[14px] text-[#7B7B7B]`}>
              заказов
            </p>
          </div>
        </div>
        <div className={'flex flex-col gap-2'}>
          <div className={'flex flex-col gap-1 items-end'}>
            <p className={`text-[12px] text-[#7B7B7B]`}>
              Работают
            </p>
            <h5 className={`font-semibold text-[20px] text-[#101010]`}>
              {work}
            </h5>
          </div>
          <div className={'flex flex-col gap-1 items-end'}>
            <p className={`text-[12px] text-[#7B7B7B]`}>
              Свободны
            </p>
            <h5 className={`font-semibold text-[20px] text-[#101010]`}>
              {free}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchItem;
