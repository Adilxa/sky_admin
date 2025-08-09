import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const FiltrationSettings = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={'cursor-pointer rounded-full border-[1px] border-[#E2E2E2] py-6 flex items-center justify-center h-full aspect-square'}
      >
        <SlidersHorizontal color={'#727272'} width={15} height={15} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>1 1</DropdownMenuItem>
        <DropdownMenuItem>1 1</DropdownMenuItem>
        <DropdownMenuItem>1 2 1</DropdownMenuItem>
        <DropdownMenuItem>;;</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FiltrationSettings;
