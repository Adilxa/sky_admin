import React from 'react';
import SelectDate from '@/components/shared/select-date';
import BranchItem from '@/components/shared/branch-item';

const mockBranches = [
  {
    branch: 'ТЦ Ала-Арча',
    income: '106',
    rating: '36.8%',
    work: "17",
    free: "12",
  },
  {
    branch: 'ТЦ Ала-Арча',
    income: '106',
    rating: '36.8%',
    work: "17",
    free: "12",
  },
  {
    branch: 'ТЦ Ала-Арча',
    income: '106',
    rating: '36.8%',
    work: "17",
    free: "12",
  },
  {
    branch: 'ТЦ Ала-Арча',
    income: '106',
    rating: '36.8%',
    work: "17",
    free: "12",
  },
];

const FillialActivity = () => {
  return (
    <div className={'p-6 px-8 rounded-[32px] shadow bg-[var(--aside-bg)] flex flex-col gap-5'}>
      <div className={'flex items-center justify-between'}>
        <h1 className={'text-[28px] text-[#101010] font-semibold'}>Активность Филлалов</h1>
        <SelectDate />
      </div>
      <div className={'overflow-x-auto overflow-hidden flex gap-5 base-scrollbar pb-2'}>
        {mockBranches.map((item, i) => (
          <BranchItem {...item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default FillialActivity;
