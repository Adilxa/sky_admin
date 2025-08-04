import React, { ReactNode } from 'react';

interface Props {
  btn?: ReactNode;
  title: string;
}

const Header: React.FC<Props> = ({ title, btn }) => {
  return (
    <header className={'flex justify-between'}>
      <h1 className={'text-[32px] color-[#101010] font-semibold'}>
        {title}
      </h1>
      {btn}
    </header>
  );
};

export default Header;
