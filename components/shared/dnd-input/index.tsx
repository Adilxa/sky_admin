'use client';

import React, { useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Camera, Trash2, X, Video, FileImage } from 'lucide-react';
import TooltipTitle from '@/components/shared/tooltip-title';

interface Props {
  hide?: boolean;
  tooltip: {
    title: string;
    description: string;
  };
  onFileSelect?: (files: File[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  title?: string;
  acceptBoth?: boolean; // true = и видео и изображения, false = используется acceptVideo
  acceptVideo?: boolean; // true = только видео, false = только изображения (работает если acceptBoth = false)
}

const DnDInput: React.FC<Props> = ({
                                     tooltip,
                                     onFileSelect,
                                     multiple = false,
                                     maxFiles = 1,
                                     hide = false,
                                     title,
                                     acceptBoth = false,
                                     acceptVideo = false,
                                   }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const isVideoFile = (file: File) => file.type.startsWith('video/');
  const isImageFile = (file: File) => file.type.startsWith('image/');

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    let validFiles: File[] = [];

    if (acceptBoth) {
      validFiles = acceptedFiles.filter(file =>
        isVideoFile(file) || isImageFile(file),
      );
    } else {
      validFiles = acceptedFiles.filter(file => {
        return acceptVideo ? isVideoFile(file) : isImageFile(file);
      });
    }

    if (validFiles.length === 0) {
      let fileTypes: string;
      if (acceptBoth) {
        fileTypes = 'изображения или видео файлы';
      } else {
        fileTypes = acceptVideo ? 'видео файлы' : 'изображения';
      }
      alert(`Пожалуйста, выберите только ${fileTypes}`);
      return;
    }

    const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));

    if (multiple) {
      const totalFiles = selectedFiles.length + validFiles.length;
      if (totalFiles > maxFiles) {
        alert(`Максимум ${maxFiles} файлов`);
        return;
      }
      setSelectedFiles(prev => [...prev, ...validFiles]);
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    } else {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      setSelectedFiles(validFiles);
      setPreviewUrls(newPreviewUrls);
    }

    if (onFileSelect) {
      onFileSelect(multiple ? [...selectedFiles, ...validFiles] : validFiles);
    }
  }, [selectedFiles, previewUrls, multiple, maxFiles, onFileSelect, acceptVideo, acceptBoth]);

  const removeFile = useCallback((index: number) => {
    URL.revokeObjectURL(previewUrls[index]);

    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);

    setSelectedFiles(newFiles);
    setPreviewUrls(newUrls);

    if (onFileSelect) {
      onFileSelect(newFiles);
    }
  }, [selectedFiles, previewUrls, onFileSelect]);

  React.useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const acceptedFileTypes: any = (() => {
    if (acceptBoth) {
      // Принимаем и изображения и видео
      return {
        'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
        'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.m4v'],
      };
    } else {
      // Используем старую логику
      return acceptVideo
        ? { 'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.m4v'] }
        : { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] };
    }
  })();

  const renderPreview = (url: string, file: File) => {
    if (isVideoFile(file)) {
      return (
        <video
          src={url}
          className="w-full h-full object-cover rounded-[28px]"
          controls={false}
          muted
          preload="metadata"
        />
      );
    } else {
      return (
        <img
          src={url}
          alt="Preview"
          className="w-full h-full object-cover rounded-[28px]"
        />
      );
    }
  };

  // Определяем иконку и текст в зависимости от режима
  const getEmptyStateContent = () => {
    if (acceptBoth) {
      return {
        icon: <FileImage className="text-[#727272] mb-2" size={48} />,
        dragText: 'Отпустите медиа файлы здесь...',
        placeholderText: 'Перетащите изображения или видео сюда, или ',
      };
    } else if (acceptVideo) {
      return {
        icon: <Video className="text-[#727272] mb-2" size={48} />,
        dragText: 'Отпустите видео здесь...',
        placeholderText: 'Перетащите видео сюда, или ',
      };
    } else {
      return {
        icon: <Camera className="text-[#727272] mb-2" size={48} />,
        dragText: 'Отпустите изображения здесь...',
        placeholderText: 'Перетащите изображения сюда, или ',
      };
    }
  };

  const emptyStateContent = getEmptyStateContent();

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        {!hide && (
          <TooltipTitle title={tooltip.title} tooltip={tooltip.description} />
        )}
        <h2 className={'text-[17px] ml-2 text-[#00000080] font-semibold'}>{title}</h2>

        <Dropzone
          onDrop={handleDrop}
          multiple={multiple}
          maxFiles={maxFiles}
          accept={acceptedFileTypes}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <section className="w-full">
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
                    {renderPreview(previewUrls[0], selectedFiles[0])}
                    {isDragActive && (
                      <div className="absolute inset-0 bg-blue-50/90 flex items-center justify-center rounded-[28px]">
                        <p className="text-[14px] text-[#2A85FF] font-medium">
                          {emptyStateContent.dragText}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center justify-center">
                    {emptyStateContent.icon}
                    {isDragActive ? (
                      <p className="text-[14px] text-[#2A85FF] font-medium">
                        {emptyStateContent.dragText}
                      </p>
                    ) : (
                      <p className="text-[14px] px-5 text-[#727272]">
                        {emptyStateContent.placeholderText}
                        <span className="font-bold text-[#101010]">Выберите файлы</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}
        </Dropzone>

        {/* Область для превью файлов */}
        {previewUrls.length > 0 && (
          <div className="w-full space-y-2">
            {previewUrls.map((url, index) => (
              <div
                key={index}
                className="w-full rounded-[28px] border-[#F1F1F1] p-2 py-3 pl-3 border-[1px] bg-[#F6F6F8] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 w-full truncate">
                  <div className="flex flex-col gap-1 truncate flex-1">
                    <p className="text-[#101010] text-[14px] font-semibold truncate">
                      {selectedFiles[index]?.name || (isVideoFile(selectedFiles[index]) ? 'Видео' : 'Изображение')}
                    </p>
                    <p className="text-[14px] text-[#727272]">
                      {Math.round((selectedFiles[index]?.size || 0) / 1024)} KB
                      {isVideoFile(selectedFiles[index]) ? ' • Видео' : ' • Изображение'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFile(index)}
                  className="text-white rounded-full w-[40px] h-[40px] p-2 cursor-pointer transition-colors hover:bg-[#2C2C2C]/80 shadow-[inset_0_1px_2px_0_rgba(248,248,248,0.2)] bg-[#2C2C2C] flex-shrink-0 flex items-center justify-center"
                  type="button"
                >
                  <Trash2 width={16} height={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DnDInput;
