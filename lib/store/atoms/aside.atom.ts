import { AsideType } from '@/lib/types/aside.type';
import { atom } from 'jotai';

export const AsideConstants: AsideType[] = [
  {
    title: 'Главная',
    path: '/main',
  },
  {
    title: 'Филиал',
    path: '/branches',
  },
  {
    title: 'Креатив',
    path: '/creative',
    visibleState: false,
    subPath: [
      {
        title: 'Реклама',
        path: '/advertising',
      },
      {
        title: 'Товары',
        path: '/goods',
      },
      {
        title: 'Сертификат',
        path: '/certificate',
      },
      {
        title: 'Няня',
        path: '/nanny',
      },
      {
        title: 'Доп услуги',
        path: '/additional-service',
      },
    ],
  },
  {
    title: 'Тарифы',
    path: '/tariff',
  },
];


export const asideAtom = atom(AsideConstants);
