import React from 'react';
import { AlarmClock, Bolt, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const MainRules = () => {
  return (
    <section className={'bg-[#FFFFFF] rounded-[40px] p-8'}>
      <header className={'flex items-center justify-between'}>
        <h1 className={'font-semibold text-[21px] mb-5'}>Основные правила</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={'flex items-center py-3 px-6 gap-2 rounded-full bg-gradient-to-r from-[#00B7FF] to-[#008CFF] cursor-pointer transition-all duration-200 hover:from-blue-400 hover:to-blue-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50'}>
              <Bolt color={'#FFFFFF'} width={15} height={15} />
              <span className={'font-semibold text-[15px] text-white'}>
                Настроить
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-2 rounded-[25px]" align="end">
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md p-3 focus:bg-gray-50">
              <div className="flex items-center justify-between w-full">
                <div className={'flex items-center gap-2'}>
                  <AlarmClock size={16} className="text-gray-600" />
                  <span className="text-sm font-medium">Срок баллов</span>
                </div>
                <span className={'text-[15px] text-[#0499FF] font-semibold'}>70д</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={'py-3'}>
              Название правила
            </TableHead>
            <TableHead>
              Условие
            </TableHead>
            <TableHead>
              Условие
            </TableHead>
            <TableHead>
              Размер Кэшбэка
            </TableHead>
            <TableHead>
              Срок действия
            </TableHead>
            <TableHead>
              Статус
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className={'py-3'}>
              Кэшбэк за билеты
            </TableCell>
            <TableCell>
              Билет
            </TableCell>
            <TableCell>
              Билет
            </TableCell>
            <TableCell>
              10% от суммы
            </TableCell>
            <TableCell>
              Бессрочно
            </TableCell>
            <TableCell>
              Успешно
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

export default MainRules;
