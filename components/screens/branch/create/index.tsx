'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import DnDInput from '@/components/shared/dnd-input';
import InnerPlaceholderInput from '@/components/shared/inner-placeholder-input';
import RichTextEditor from '@/components/shared/text-editor';
import BottomNavigation from '@/components/layout/bottom-navigation';
import TimeRangeInput from '@/components/shared/time-range-input';
import { $api } from '@/API';
import { toast } from 'sonner';

const BranchCreate = () => {
  const router = useRouter();

  const [branchData, setBranchData] = useState({
    image: null as File | null, //
    logo: null as File | null, //
    content: null as File | null, //
    contentVideo: null as File | null, //
    name: '', //
    address: '', //
    time: '', //
    location: '', //
    description: '', //
  });

  const handleImageSelect = (files: File[]) => {
    setBranchData(prev => ({
      ...prev,
      image: files.length > 0 ? files[0] : null,
    }));
  };

  const handleLogoSelect = (files: File[]) => {
    setBranchData(prev => ({
      ...prev,
      logo: files.length > 0 ? files[0] : null,
    }));
  };

  const handleContentSelect = (files: File[]) => {
    setBranchData(prev => ({
      ...prev,
      content: files.length > 0 ? files[0] : null,
    }));
  };

  const handleContentVideoSelect = (files: File[]) => {
    setBranchData(prev => ({
      ...prev,
      contentVideo: files.length > 0 ? files[0] : null,
    }));
  };

  const handleNameChange = (value: string) => {
    setBranchData(prev => ({ ...prev, name: value }));
  };

  const handleAddressChange = (value: string) => {
    setBranchData(prev => ({ ...prev, address: value }));
  };

  const handleTimeChange = (value: string) => {
    setBranchData(prev => ({ ...prev, time: value }));
  };

  const handleLocationChange = (value: string) => {
    setBranchData(prev => ({ ...prev, location: value }));
  };

  const handleDescriptionChange = (content: string) => {
    setBranchData(prev => ({ ...prev, description: content }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (branchData.image) {
      formData.append('image_ticket', branchData.image);
    }
    if (branchData.logo) {
      formData.append('logo_ticket', branchData.logo);
    }
    if (branchData.content) {
      formData.append('image', branchData.content);
    }
    if (branchData.contentVideo) {
      formData.append('video', branchData.contentVideo);
    }

    formData.append('name', branchData.name);
    formData.append('address', branchData.address);
    formData.append('longitude', branchData.location.split('-')[0]);
    formData.append('latitude', branchData.location.split('-')[1]);
    formData.append('order', '0');
    formData.append('description', branchData.description);
    formData.append('opening_time ', branchData.time.split('-')[0]);
    formData.append('closing_time ', branchData.time.split('-')[1]);

    try {
      const res = await $api.post('dashboard/branches/create/', formData);

      toast('Успешно создан');
      console.log(res.data);

      // Get the ID from response and navigate to a new URL
      const branchId = res.data.id;
      if (branchId) {
        // Option 1: Navigate to a new page with the ID as a parameter
        router.push(`/branches/${branchId}`);

        // Option 2: Or add it as a query parameter
        // router.push(`/dashboard/branches?id=${branchId}`);

        // Option 3: Or update the current URL with the ID
        // router.replace(`${window.location.pathname}?id=${branchId}`);
      }

      return res.data;
    } catch (e: any) {
      toast('Что то пошло не так!');
      console.error('Error creating branch:', e.response?.data);
      return e.response?.data;
    }
  };


  return (
    <>
      <Header title={'Добавить филиал'} btn={<></>} />
      <div className={'flex flex-col gap-5'}>
        <div className={'grid grid-cols-12 gap-5'}>
          <div className={'col-span-7 flex items-start gap-5'}>
            <DnDInput
              hide={true}
              tooltip={{ title: 'Добавить имидж билета', description: '' }}
              onFileSelect={handleImageSelect}
              title={'Добавить имидж билета'}
            />
            <DnDInput
              hide={true}
              tooltip={{ title: 'Добавить логотип билета', description: '' }}
              onFileSelect={handleLogoSelect}
              title={'Добавить логотип билета'}
            />
          </div>
          <div className={'col-span-5 flex flex-col gap-3'}>
            <h1 className={'text-[17px] ml-2 text-[#00000080] font-semibold'}>
              Данные парка
            </h1>
            <div className={'flex flex-col gap-4'}>
              <InnerPlaceholderInput
                value={branchData.name}
                placeholder={'Наименование филиала'}
                onChange={handleNameChange}
              />
              <InnerPlaceholderInput
                value={branchData.address}
                placeholder={'Адрес филиала'}
                onChange={handleAddressChange}
              />
              <TimeRangeInput
                value={branchData.time}
                placeholder={'Время работы'}
                onChange={handleTimeChange}
              />
              <InnerPlaceholderInput
                value={branchData.location}
                placeholder={'Долгота и широта (Пр: 42.882004-74.582748)'}
                onChange={handleLocationChange}
              />
            </div>
          </div>
        </div>
        <div className={'grid grid-cols-12 gap-5'}>
          <div className={'col-span-5 flex items-start gap-5 '}>
            <div className={'flex items-start gap-5 w-full'}>
              <DnDInput
                hide={true}
                tooltip={{ title: 'Добавить контент парка', description: '' }}
                onFileSelect={handleContentSelect}
                title={'Контент парка'}
              />
              <div className={'flex flex-col w-full'}>
                <h2 className={'text-[17px] ml-2 text-[#00000080] font-semibold text-transparent'}>1</h2>
                <DnDInput
                  hide={true}
                  tooltip={{ title: 'Добавить логотип билета', description: '' }}
                  onFileSelect={handleContentVideoSelect}
                  title={''}
                  acceptVideo={true}
                />
              </div>
            </div>
          </div>
          <div className={'col-span-7 flex flex-col gap-3'}>
            <h1 className={'text-[17px] ml-2 text-[#00000080] font-semibold text-transparent'}>
              _
            </h1>
            <RichTextEditor
              value={branchData.description}
              onChange={handleDescriptionChange}
              placeholder="Введите описание филиала..."
            />
          </div>
        </div>
      </div>
      <BottomNavigation pages={3} position={1} func={() => handleSubmit()} />
    </>
  );
};

export default BranchCreate;
