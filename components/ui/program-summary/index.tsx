import React from 'react';

const SummaryProgram = () => {
  return (
    <section className={'bg-[#FFFFFF] rounded-[40px] p-8'}>
      <h1 className={'font-semibold text-[21px] mb-5'}>Сводка по программе</h1>
      <div className={'grid grid-cols-12 gap-3 inset-shadow-sm rounded-[32px] p-3 bg-[#F9F9F9]'}>
        <div className={'col-span-6 shadow  rounded-[19px] bg-white'}>
          <div className={'p-8'}>
            <h3 className={'text-[21px] text-[#6D6D6D] font-medium'}>Всего участников </h3>
            <h1 className={'font-bold text-[49px] text-[#101010]'}>
              35 223
            </h1>
          </div>
        </div>
        <div className={'col-span-6 shadow  rounded-[19px] bg-white'}>
          <div className={'p-8'}>
            <h3 className={'text-[21px] text-[#6D6D6D] font-medium'}> Доступно клиентам</h3>
            <h1 className={'font-bold text-[49px] text-[#101010]'}>
              120 250 sky
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummaryProgram;
