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
    title: 'Система лояльности',
    path: '/loyalty-system',
  },
  {
    title: 'Профиль',
    path: '/profile',
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
      {
        title: 'Тарифы',
        path: '/tariff',
      },
      {
        title: 'Абонементы',
        path: '/aboniments',
      },
      {
        title: 'Сертификаты',
        path: '/certificates',
      },
    ],
  },
  {
    title: 'Тарифы',
    path: '/tariff',
    visibleState: false,
    subPath: [
      {
        title: 'Тарифы',
        path: '/tariff',
      },
      {
        title: 'Товары',
        path: '/goods',
      },
    ],
  },
];


export const asideAtom = atom(AsideConstants);
