'use client';

import React, { useState } from 'react';
import BottomNavigation from '@/components/layout/bottom-navigation';
import DnDInput from '@/components/shared/dnd-input';
import { $api } from '@/API';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface DndInput {
  id: string;
  files: File[];
}

interface Props {
  id: string;
}


const addAdditionalContent = async (id: string, files: File[]) => {
  try {
    const formData = new FormData();
    formData.append('branch', id);

    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        formData.append('images', file);
      } else if (file.type.startsWith('video/')) {
        formData.append('videos', file);
      }
    });

    const res = await $api.post('dashboard/branches/branch-gallery/create/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (e: any) {
    return e.response.data;
  }
};

const BranchAdditionalContent: React.FC<Props> = ({ id }) => {
  const [dndInputs, setDndInputs] = useState<DndInput[]>([
    { id: crypto.randomUUID(), files: [] },
  ]);

  const router = useRouter();

  const handleFileSelect = (inputId: string, files: File[]): void => {
    setDndInputs((prev: DndInput[]) => {
      const newInputs = prev.map(input =>
        input.id === inputId ? { ...input, files } : input,
      );

      const lastInput = newInputs[newInputs.length - 1];
      const isLastInputFilled = lastInput.id === inputId && files.length > 0;

      if (isLastInputFilled && newInputs.length < 100) {
        newInputs.push({ id: crypto.randomUUID(), files: [] });
      }

      const filteredInputs = newInputs.filter((input, index) => {
        if (input.files.length > 0) return true;

        if (index === newInputs.length - 1) return true;

        return false;
      });

      if (filteredInputs.length === 0) {
        return [{ id: crypto.randomUUID(), files: [] }];
      }

      return filteredInputs;
    });
  };

  const getAllFiles = (): File[] => {
    return dndInputs.flatMap(input => input.files);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-5">
        {dndInputs.map((input) => (
          <DnDInput
            key={input.id}
            hide={true}
            tooltip={{ title: '', description: '' }}
            acceptBoth={true}
            onFileSelect={(files: File[]) => handleFileSelect(input.id, files)}
          />
        ))}
      </div>
      <BottomNavigation
        pages={3}
        position={2}
        func={async () => {
          const allFiles = getAllFiles();
          console.log('Все файлы:', allFiles);
          try {
            const result = await addAdditionalContent(id, allFiles);
            console.log('Результат загрузки:', result);

            toast('Успешно загружено');
            router.push(`/branches/services?id=${id}`);
          } catch (error) {
            console.error('Ошибка загрузки:', error);
            toast('Ошибка при загрузке файлов');

          }
        }}
      />
    </>
  );
};

export default BranchAdditionalContent;
