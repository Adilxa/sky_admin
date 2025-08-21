'use client';
import { useState } from 'react';
import helpIcon from '@/assets/svg/helpIcon.svg';
import editIcon from '@/assets/svg/editIcon.svg';
import correctIcon from '@/assets/svg/correctIcon.svg';
import Lock from '@/assets/svg/Lock.svg';
import hide from '@/assets/svg/Hide.svg';
import avatar from '@/assets/png/avatar.png';
import BasiceInput from '@/components/shared/basice-input';
import Image from 'next/image';

const Profile = () => {
  const accesses = [
    'Изменение данных сотрудника',
    'Система лояльности',
    'Отчеты',
    'Редактирование',
    'Сотрудники',
    'Касса',
    'Царь и бог',
    'Аналитика',
    'Креатив',
    'Поддержка',
    'Экспорт',
    'Создание новых услуг',
    'Увольнение',
  ];

  const [selectedAccesses, setSelectedAccesses] = useState<string[]>([]);
  const [edit, setEdit] = useState<boolean>(false);

  const toggleAccess = (item: string) => {
    if (selectedAccesses.includes(item)) {
      setSelectedAccesses(selectedAccesses.filter(a => a !== item));
    } else {
      setSelectedAccesses([...selectedAccesses, item]);
    }
  };

  const buttonContent = edit ? (
    'Сохранить'
  ) : (
    <>
      <Image src={editIcon} alt='edit' /> Редактировать
    </>
  );

  return (
    <div className='bg-white rounded-4xl py-8 px-5'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Профиль</h1>
        <button
          type='button'
          onClick={() => setEdit(!edit)}
          className='flex items-center gap-2 bg-[#4F49FF] py-3 px-5 rounded-full cursor-pointer text-white shadow-[inset_2px_0px_8px_2px_#F8F8F833]'
        >
          {buttonContent}
        </button>
      </div>
      <div className='flex items-center gap-4 mt-8 text-[#727272]'>
        <Image
          src={avatar}
          alt={'avatar'}
          width={80}
          height={80}
          className='rounded-full cursor-pointer'
        />
        <p className='text-base'>
          Загрузите сюда фотографию размером 288x288 px <br /> только в PNG или
          JPG формате
        </p>
      </div>
      <div className='flex justify-between gap-20 mt-8'>
        <div className='flex flex-1 flex-col justify-between gap-6'>
          <BasiceInput type='text' InputText='Алеля Аляляейля' text='ФИО' edit={edit} />
          <BasiceInput
            type='text'
            InputText='chelsiehaley@email.com'
            text='Email'
            icon={correctIcon}
            edit={edit}
          />
          <BasiceInput
            type='text'
            InputText='Суперадмин'
            text='Роль'
            icon={Lock}
            edit={edit}
          />
        </div>

        <div className='flex-1 flex flex-col'>
          <BasiceInput
            type='password'
            InputText='kg-friend'
            text='Пароль'
            icon={hide}
            edit={edit}
          />
          <div className='mt-8'>
            <div className='flex items-center gap-1'>
              <h4 className='text-base font-semibold'>Доступы</h4>
              <Image src={helpIcon} alt='prompt' />
            </div>

            <div className='flex flex-wrap gap-2 border-2 border-[#E2E2E2] rounded-3xl p-2 mt-2'>
              {accesses.map((item, index) => {
                const isSelected = selectedAccesses.includes(item);
                return (
                  <button
                    key={index}
                    onClick={() => toggleAccess(item)}
                    className={`rounded-full py-2 px-4 text-base transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#4F49FF] text-white'
                        : 'bg-[#F1F1F1] text-black'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
