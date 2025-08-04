import React from 'react';
import { CircleQuestionMark } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';

interface Props {
  title: string;
  tooltip: string;
}

const TooltipTitle: React.FC<Props> = ({ title, tooltip }) => {
  return (
    <div className={'flex items-center gap-2'}>
      <h3 className={'text-[#101010] text-[14px] font-semibold'}>
        {title}
      </h3>
      <Tooltip>
        <TooltipTrigger>
          <CircleQuestionMark className={'cursor-pointer'} width={15} height={15}/>
        </TooltipTrigger>
        <TooltipContent className={'bg-white p-1 border-[1px] rounded-md'}>
          <p className={'text-gray text-[12px]'}>
            {tooltip}
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default TooltipTitle;
