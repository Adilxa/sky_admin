'use client';
import helpIcon from '@/assets/svg/helpIcon.svg';
import Image from 'next/image';
import { useState } from 'react';

interface InputProps {
  type: string;
  InputText: string;
  text: string;
  icon?: string;
  edit: boolean;
}

const BasiceInput = ({ type, InputText, text, icon, edit }: InputProps) => {
  const [inputText, setInputText] = useState<string>(InputText);
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      <div className='flex items-center gap-1'>
        <h4 className='text-base font-semibold'>{text}</h4>
        <Image src={helpIcon} alt='prompt' className='w-4 h-4' />
      </div>
      <div className='flex justify-between items-center border-2 border-#E2E2E2-100 rounded-full px-5 py-3 mt-2'>
        <input
          className='text-base w-full outline-none'
          type={show ? 'text' : type}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          disabled={!edit}
        />
        {icon && (
          <Image
            className='w-6 h-6'
            style={{ cursor: type == 'password' ? 'pointer' : '' }}
            src={icon}
            alt='prompt'
            onClick={() => (type == 'password' ? setShow(!show) : null)}
          />
        )}
      </div>
    </div>
  );
};

export default BasiceInput;
