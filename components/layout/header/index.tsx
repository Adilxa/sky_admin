import React, { ReactNode } from 'react';

interface Props {
  btn?: ReactNode;
  createBtn?: ReactNode;
  title: string;
}

const Header: React.FC<Props> = ({ title, btn, createBtn }) => {
  return (
    <header className={'flex justify-between'}>
      <h1 className={'text-[32px] color-[#101010] font-semibold'}>
        {title}
      </h1>
      <div className={'flex items-center gap-2'}>
        {btn}
        {createBtn}
      </div>
    </header>
  );
};

export default Header;
