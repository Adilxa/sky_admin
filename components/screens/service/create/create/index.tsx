'use client';

import React from 'react';
import Header from '@/components/layout/header';
import UploadButton from '@/components/shared/upload-btn';
import PageContentWrapper from '@/components/ui/page-content-wrapper';
import AddNewBtn from '@/components/shared/add-new-btn';
import DnDInput from '@/components/shared/dnd-input';
import TooltipTitle from '@/components/shared/tooltip-title';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { onCreateAdditionalService } from '@/components/screens/service/create/create/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ServiceData {
  image: File | null;
  title: string;
  description: string;
}

const CreateNewService = () => {
  const [serviceData, setServiceData] = React.useState<ServiceData>({
    image: null,
    title: '',
    description: '',
  });

  const router = useRouter();

  const handleImageSelect = (files: File[]) => {
    setServiceData(prev => ({
      ...prev,
      image: files.length > 0 ? files[0] : null,
    }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ServiceData) => onCreateAdditionalService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['serviceList'] });
      toast('Успешно создался');
      setServiceData({
        image: null,
        title: '',
        description: '',
      });
    },
    onError: () => {
      toast('Что то пошло не так');
    },
  });

  const handleSubmit = () => {
    if (!serviceData.title.trim()) {
      toast('Название обязательно для заполнения');
      return;
    }
    router.back();
    mutation.mutate(serviceData);
  };

  return (
    <>
      <Header title={'Создать сервис'} btn={<UploadButton />} />
      <PageContentWrapper
        search={false}
        btn={
          <AddNewBtn
            showPlus={false}
            route={''}
            text={'Добавить сервис'}
            func={handleSubmit}
          />
        }
        title={'Создание сервиса'}
      >
        <div className={'grid grid-cols-4 gap-5'}>
          <div className={'col-span-1'}>
            <DnDInput
              hide={true}
              tooltip={{ title: 'Добавить имидж билета', description: '' }}
              onFileSelect={handleImageSelect}
              title={''}
            />
          </div>
          <div className={'col-span-2 bg-[#F6F6F8] rounded-[24px] px-5 py-5 border-[1px] border-[#F1F1F1]'}>
            <div className={'flex flex-col gap-4'}>
              <div className={'flex flex-col gap-1'}>
                <TooltipTitle title={'Название'} tooltip={'Название'} />
                <input
                  className="rounded-full border-[1px] bg-[#F1F1F1] px-4 pl-4 py-3 outline-none text-[16px] w-full"
                  placeholder="VR"
                  value={serviceData.title}
                  onChange={(e) => setServiceData({ ...serviceData, title: e.target.value })}
                />
              </div>
              <div className={'flex flex-col gap-1'}>
                <TooltipTitle title={'Описание'} tooltip={'Описание'} />
                <textarea
                  className="rounded-[12px] border-[1px] bg-[#F1F1F1] px-4 pl-4 py-3 outline-none text-[16px] w-full"
                  placeholder="Реклама BableTea "
                  rows={5}
                  value={serviceData.description}
                  onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </PageContentWrapper>
    </>
  );
};

export default CreateNewService;
