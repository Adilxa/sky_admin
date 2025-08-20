import React from 'react';

const SummaryProgram = () => {
  return (
    <section className={'bg-[#FFFFFF] rounded-[40px] p-5'}>
      <h1 className={'font-semibold text-[21px] mb-3'}>Сводка по программе</h1>
      <div className={'grid grid-cols-12 gap-3 inset-shadow-sm'}>
        <div className={'col-span-6'}>
          <h3>Всего участников </h3>
        </div>
        <div className={'col-span-6'}>
          <h3> Доступно клиентам</h3>
        </div>
      </div>
    </section>
  );
};

export default SummaryProgram;
