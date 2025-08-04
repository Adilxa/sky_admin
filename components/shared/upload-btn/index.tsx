import React from 'react';
import { CloudUpload } from 'lucide-react';

const UploadButton = () => {
  return (
    <button
      className="flex text-[14px] hover:bg-[#2C2C2C]/80 shadow-[inset_0_1px_2px_0_rgba(248,248,248,0.2)] bg-[#2C2C2C] transition-all cursor-pointer font-semibold items-center justify-center gap-2  rounded-full px-6 py-3 text-white"
    >
      <CloudUpload width={18} height={18} />
      Отправить
    </button>
  );
};

export default UploadButton;
