'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';

interface ImageUploaderProps {
  onUploadComplete: (urls: string[]) => void;
}

export const ImageUploader = ({ onUploadComplete }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    try {
      const uploads = acceptedFiles.map(async (file) => {
        const formData = new FormData();
        const filename = `${uuidv4()}-${file.name}`;
        formData.append('file', file);
        formData.append('filename', filename);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        return data.url;
      });

      const urls = await Promise.all(uploads);
      onUploadComplete(urls);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: true
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <p className="text-gray-600">업로드 중...</p>
      ) : isDragActive ? (
        <p className="text-blue-500">파일을 여기에 놓으세요</p>
      ) : (
        <p className="text-gray-500">
          이미지를 드래그하거나 클릭하여 업로드하세요
        </p>
      )}
    </div>
  );
}; 