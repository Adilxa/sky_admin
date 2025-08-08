'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';

export default function SelectDate() {
  return (
    <div className="flex items-center justify-center">
      <SelectPrimitive.Root defaultValue="today">
        <SelectPrimitive.Trigger
          className="inline-flex items-center justify-between px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 min-w-[180px] cursor-pointer data-[placeholder]:text-gray-500"
        >
          <SelectPrimitive.Value placeholder="Выберите период" />
          <SelectPrimitive.Icon className="ml-2">
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-200 z-50"
            position="popper"
            sideOffset={5}
          >
            <SelectPrimitive.Viewport>
              <SelectPrimitive.Group>
                <SelectPrimitive.Item
                  value="today"
                  className="relative flex items-center px-6 py-3 text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-150 data-[highlighted]:bg-gray-100 data-[highlighted]:outline-none select-none"
                >
                  <SelectPrimitive.ItemText>Сегодня</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>

                <SelectPrimitive.Item
                  value="yesterday"
                  className="relative flex items-center px-6 py-3 text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-150 data-[highlighted]:bg-gray-100 data-[highlighted]:outline-none select-none"
                >
                  <SelectPrimitive.ItemText>Вчера</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>

                <SelectPrimitive.Item
                  value="week"
                  className="relative flex items-center px-6 py-3 text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-150 data-[highlighted]:bg-gray-100 data-[highlighted]:outline-none select-none"
                >
                  <SelectPrimitive.ItemText>Неделя</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>

                <SelectPrimitive.Item
                  value="month"
                  className="relative flex items-center px-6 py-3 text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-150 data-[highlighted]:bg-gray-100 data-[highlighted]:outline-none select-none"
                >
                  <SelectPrimitive.ItemText>Месяц</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>

                <SelectPrimitive.Item
                  value="year"
                  className="relative flex items-center px-6 py-3 text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-150 data-[highlighted]:bg-gray-100 data-[highlighted]:outline-none select-none"
                >
                  <SelectPrimitive.ItemText>Год</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              </SelectPrimitive.Group>
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
}
