import React from 'react';

interface Props {
  children: React.ReactNode;
}

const PageWrapper: React.FC<Props> = ({ children }) => {
  return (
    <section className={'p-[40px] bg-[#fafbff] flex flex-col h-full w-full gap-5 [&>*:last-child]:flex-1 hide-scrollbar'}>
      {children}
    </section>
  );
};

export default PageWrapper;
