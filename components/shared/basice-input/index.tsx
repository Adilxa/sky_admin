import helpIcon from '@/assets/svg/helpIcon.svg';
import Image from 'next/image';

interface InputProps {
  type: string;
  InputText: string;
  text: string;
  icon?: string;
}
const BasiceInput = ({ type, InputText, text, icon }: InputProps) => {
  return (
    <div>
      <div className='flex items-center gap-1'>
        <h4 className='text-base font-semibold'>{text}</h4>
        <Image src={helpIcon} alt='prompt' className='w-4 h-4' />
      </div>
      <div className='flex justify-between items-center border-2 border-#E2E2E2-100 rounded-full px-5 py-3 mt-2'>
        <span className='text-base'>
          {type == 'password' ? '•'.repeat(InputText.length) : InputText}
        </span>
        {icon && <Image className='w-6 h-6' src={icon} alt='prompt' />}
      </div>
    </div>
  );
};

export default BasiceInput;
