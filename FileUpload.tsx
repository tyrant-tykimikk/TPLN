import React, { useRef, useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  file,
  onFileChange,
  className = ''
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [file]);

  const handleContainerClick = () => {
    inputRef.current?.click();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div 
      onClick={handleContainerClick}
      className={`w-full h-full flex flex-col items-center justify-center cursor-pointer p-4 relative overflow-hidden ${className}`}
    >
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => onFileChange(e.target.files?.[0] || null)}
      />

      {preview ? (
        <>
          <img 
            src={preview} 
            alt="Preview" 
            className="absolute inset-0 w-full h-full object-contain bg-white z-0" 
          />
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 p-1 bg-white/80 rounded-full text-red-600 z-10 hover:bg-white"
          >
            <X size={16} />
          </button>
        </>
      ) : (
        <div className="text-center z-10 pointer-events-none">
          <div 
            className="text-lg font-bold text-gray-300 mb-2 uppercase tracking-widest select-none"
            dangerouslySetInnerHTML={{ __html: label }}
          />
          <div className="flex flex-col items-center text-blue-500 mt-2">
            <Upload size={24} className="mb-1" />
            <span className="text-xs bg-blue-50 px-2 py-1 rounded">點擊上傳圖片</span>
          </div>
        </div>
      )}
    </div>
  );
};