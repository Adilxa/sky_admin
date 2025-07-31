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
];


export const asideAtom = atom(AsideConstants);