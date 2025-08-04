'use client';

import React, { useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Camera, Trash2, X } from 'lucide-react';
import TooltipTitle from '@/components/shared/tooltip-title';

interface Props {
  tooltip: {
    title: string;
    description: string;
  };
  onImageSelect?: (files: File[]) => void;
  multiple?: boolean;
  maxFiles?: number;
}

const DnDInput: React.FC<Props> = ({
                                     tooltip,
                                     onImageSelect,
                                     multiple = false,
                                     maxFiles = 1,
                                   }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const imageFiles = acceptedFiles.filter(file =>
      file.type.startsWith('image/'),
    );

    if (imageFiles.length === 0) {
      alert('Пожалуйста, выберите только изображения');
      return;
    }

    const newPreviewUrls = imageFiles.map(file => URL.createObjectURL(file));

    if (multiple) {
      const totalFiles = selectedFiles.length + imageFiles.length;
      if (totalFiles > maxFiles) {
        alert(`Максимум ${maxFiles} файлов`);
        return;
      }
      setSelectedFiles(prev => [...prev, ...imageFiles]);
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    } else {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      setSelectedFiles(imageFiles);
      setPreviewUrls(newPreviewUrls);
    }

    if (onImageSelect) {
      onImageSelect(multiple ? [...selectedFiles, ...imageFiles] : imageFiles);
    }
  }, [selectedFiles, previewUrls, multiple, maxFiles, onImageSelect]);

  const removeImage = useCallback((index: number) => {
    URL.revokeObjectURL(previewUrls[index]);

    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);

    setSelectedFiles(newFiles);
    setPreviewUrls(newUrls);

    if (onImageSelect) {
      onImageSelect(newFiles);
    }
  }, [selectedFiles, previewUrls, onImageSelect]);

  React.useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <div className={'flex flex-col gap-3'}>
      <TooltipTitle title={tooltip.title} tooltip={tooltip.description} />
      <Dropzone
        onDrop={handleDrop}
        accept={{
          'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.svg'],
        }}
        multiple={multiple}
        maxFiles={maxFiles}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <section>
            <div
              className={`w-full h-[300px] border-[1px] cursor-pointer hover:border-[2px] transition-all rounded-[32px] p-1 flex items-center flex-col gap-3 text-center justify-center relative overflow-hidden ${
                isDragActive
                  ? 'border-[2px] border-[#2A85FF] bg-blue-50'
                  : 'hover:border-[#2A85FF]'
              }`}
              {...getRootProps()}
            >
              <input {...getInputProps()} />

              {previewUrls.length > 0 ? (
                <div className="w-full h-full relative">
                  <img
                    src={previewUrls[0]}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-[28px]"
                  />
                  {isDragActive && (
                    <div className="absolute inset-0 bg-blue-50/90 flex items-center justify-center rounded-[28px]">
                      <p className={'text-[14px] text-[#2A85FF] font-medium'}>
                        Отпустите изображения здесь...
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className={'w-full flex flex-col items-center justify-center'}>
                  <Camera className={'text-[#727272] mb-2'} size={48} />
                  {isDragActive ? (
                    <p className={'text-[14px] text-[#2A85FF] font-medium'}>
                      Отпустите изображения здесь...
                    </p>
                  ) : (
                    <p className={'text-[14px] text-[#727272]'}>
                      Перетащите изображения сюда, или{' '}
                      <span className={'font-bold text-[#101010]'}>Выберите файлы</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>
        )}
      </Dropzone>
      {previewUrls.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 w-full">
          {previewUrls.map((url, index) => (
            <div key={index}
                 className="w-full rounded-[28px] border-[#F1F1F1] p-2 py-5 pl-3 border-[1px] bg-[#F6F6F8] flex items-center justify-between gap-3">
              <div className={'flex items-center gap-3 w-full truncate'}>
                <div className={'flex flex-col gap-1 truncate flex-1'}>
                  <p className={'text-[#101010] text-[16px] font-semibold truncate'}>
                    {selectedFiles[index]?.name || 'Изображение'}
                  </p>
                  <p className={'text-[16px] text-[#727272]'}>
                    {Math.round((selectedFiles[index]?.size || 0) / 1024)} KB
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeImage(index)}
                className="text-white rounded-full w-[50px] h-[50px] p-4 cursor-pointer transition-colors hover:bg-[#2C2C2C]/80 shadow-[inset_0_1px_2px_0_rgba(248,248,248,0.2)] bg-[#2C2C2C] flex-shrink-0"
                type="button"
              >
                <Trash2 width={18} height={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DnDInput;
